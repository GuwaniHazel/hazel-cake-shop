using Microsoft.AspNetCore.Identity;
using Hazel.Api.Models;
using Hazel.Api.Data;
using System.Linq;
using System;

namespace Hazel.Api.Data
{
    public static class DbInitializer
    {
        public static void Initialize(HazelDbContext context)
        {
            // Seed Admin User if not exists
            var adminEmail = "admin@123";
            var adminUser = context.Users.FirstOrDefault(u => u.Email == adminEmail);

            if (adminUser == null)
            {
                var hasher = new PasswordHasher<User>();
                var newAdmin = new User
                {
                    Email = adminEmail,
                    Role = "Admin",
                    CreatedAt = DateTime.UtcNow
                };
                newAdmin.PasswordHash = hasher.HashPassword(newAdmin, "admin123");

                context.Users.Add(newAdmin);
                context.SaveChanges();
            }
        }
    }
}
