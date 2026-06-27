using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Hazel.Api.Data;
using Hazel.Api.DTOs;
using Hazel.Api.Models;
using Hazel.Api.Services;
using System.Security.Claims;
using System.Threading.Tasks;
using System;

namespace Hazel.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly HazelDbContext _context;
        private readonly ITokenService _tokenService;
        private readonly PasswordHasher<User> _passwordHasher;

        public AuthController(HazelDbContext context, ITokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
            _passwordHasher = new PasswordHasher<User>();
        }

        // POST: api/auth/register
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            if (await _context.Users.AnyAsync(u => u.Email.ToLower() == request.Email.ToLower()))
            {
                return BadRequest(new { message = "Email is already registered." });
            }

            var user = new User
            {
                Email = request.Email,
                Role = "User", // default role
                CreatedAt = DateTime.UtcNow
            };

            user.PasswordHash = _passwordHasher.HashPassword(user, request.Password);

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            var token = _tokenService.GenerateToken(user);

            return Ok(new AuthResponse
            {
                Token = token,
                Email = user.Email,
                Role = user.Role
            });
        }

        // POST: api/auth/login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email.ToLower() == request.Email.ToLower());
            if (user == null)
            {
                return Unauthorized(new { message = "Invalid email or password." });
            }

            var result = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, request.Password);
            if (result == PasswordVerificationResult.Failed)
            {
                return Unauthorized(new { message = "Invalid email or password." });
            }

            var token = _tokenService.GenerateToken(user);

            return Ok(new AuthResponse
            {
                Token = token,
                Email = user.Email,
                Role = user.Role
            });
        }

        // POST: api/auth/forgot-password
        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordRequest request)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email.ToLower() == request.Email.ToLower());
            if (user == null)
            {
                // To prevent user enumeration, we would usually return Ok, but for local demo/validation we can return error or success
                return BadRequest(new { message = "Email address not found." });
            }

            // For demonstration, reset password to "reset123" so they can easily try logging in again
            var temporaryPassword = "reset123";
            user.PasswordHash = _passwordHasher.HashPassword(user, temporaryPassword);
            
            _context.Users.Update(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = $"Password has been reset. Use '{temporaryPassword}' to sign in and update your password immediately." });
        }

        // GET: api/auth/profile
        [Authorize]
        [HttpGet("profile")]
        public async Task<IActionResult> GetProfile()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null) return Unauthorized();

            var userId = int.Parse(userIdClaim.Value);
            var user = await _context.Users.FindAsync(userId);
            if (user == null) return NotFound(new { message = "User not found." });

            return Ok(new UserProfileResponse
            {
                Id = user.Id,
                Email = user.Email,
                Role = user.Role,
                CreatedAt = user.CreatedAt
            });
        }

        // PUT: api/auth/profile
        [Authorize]
        [HttpPut("profile")]
        public async Task<IActionResult> UpdateProfile([FromBody] UpdateProfileRequest request)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null) return Unauthorized();

            var userId = int.Parse(userIdClaim.Value);
            var user = await _context.Users.FindAsync(userId);
            if (user == null) return NotFound(new { message = "User not found." });

            // Check if changing email and if new email already exists
            if (user.Email.ToLower() != request.Email.ToLower() &&
                await _context.Users.AnyAsync(u => u.Email.ToLower() == request.Email.ToLower()))
            {
                return BadRequest(new { message = "Email is already in use by another user." });
            }

            user.Email = request.Email;

            // If updating password
            if (!string.IsNullOrEmpty(request.NewPassword))
            {
                if (string.IsNullOrEmpty(request.CurrentPassword))
                {
                    return BadRequest(new { message = "Current password is required to set a new password." });
                }

                var verificationResult = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, request.CurrentPassword);
                if (verificationResult == PasswordVerificationResult.Failed)
                {
                    return BadRequest(new { message = "Invalid current password." });
                }

                user.PasswordHash = _passwordHasher.HashPassword(user, request.NewPassword);
            }

            _context.Users.Update(user);
            await _context.SaveChangesAsync();

            // Return new token in case email changed
            var token = _tokenService.GenerateToken(user);

            return Ok(new AuthResponse
            {
                Token = token,
                Email = user.Email,
                Role = user.Role
            });
        }

        // GET: api/auth/users (Admin Feature)
        [Authorize(Roles = "Admin")]
        [HttpGet("users")]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _context.Users
                .Select(u => new UserProfileResponse
                {
                    Id = u.Id,
                    Email = u.Email,
                    Role = u.Role,
                    CreatedAt = u.CreatedAt
                })
                .ToListAsync();

            return Ok(users);
        }
    }
}
