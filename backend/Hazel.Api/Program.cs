using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Hazel.Api.Data;
using Hazel.Api.Middleware;
using Hazel.Api.Services;
using System.Text;
using System.IO;
using System;

var builder = WebApplication.CreateBuilder(args);

// ---------------------------
// DATABASE
// ---------------------------
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<HazelDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

// ---------------------------
// SERVICES
// ---------------------------
builder.Services.AddScoped<ITokenService, TokenService>();

// ---------------------------
// JWT AUTH
// ---------------------------
var jwtSettings = builder.Configuration.GetSection("Jwt");
var keyString = jwtSettings.GetValue<string>("Key") 
    ?? throw new InvalidOperationException("JWT Secret Key is not configured.");

var key = Encoding.UTF8.GetBytes(keyString);

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = true,
        ValidIssuer = jwtSettings["Issuer"],
        ValidateAudience = true,
        ValidAudience = jwtSettings["Audience"],
        ValidateLifetime = true,
        ClockSkew = TimeSpan.Zero
    };
});

// ---------------------------
// ✅ FIXED CORS (DEV SAFE)
// ---------------------------
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.AllowAnyOrigin()      // ✅ fixes your 5174 issue
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddControllers();

// ---------------------------
// SWAGGER
// ---------------------------
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo 
    { 
        Title = "Hazel Cake Shop API", 
        Version = "v1" 
    });

    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "Enter: Bearer {your JWT token}",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});

var app = builder.Build();

// ---------------------------
// MIDDLEWARE PIPELINE
// ---------------------------

app.UseMiddleware<ExceptionHandlingMiddleware>();

// Ensure uploads folder exists
var wwwrootPath = app.Environment.WebRootPath ?? 
                  Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");

var uploadsPath = Path.Combine(wwwrootPath, "uploads");

if (!Directory.Exists(uploadsPath))
{
    Directory.CreateDirectory(uploadsPath);
}

// Serve uploaded images
app.UseStaticFiles();

// Swagger
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Hazel API v1");
});

// ✅ CORS must come BEFORE auth
app.UseCors("AllowReactApp");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// ---------------------------
// DB INIT
// ---------------------------
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<HazelDbContext>();
        context.Database.EnsureCreated();
        DbInitializer.Initialize(context);
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "Database seeding error.");
    }
}

app.Run();