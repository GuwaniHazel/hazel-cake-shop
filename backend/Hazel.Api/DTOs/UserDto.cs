using System;
using System.ComponentModel.DataAnnotations;

namespace Hazel.Api.DTOs
{
    public class UserProfileResponse
    {
        public int Id { get; set; }
        public string Email { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
    }

    public class UpdateProfileRequest
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        public string? CurrentPassword { get; set; }

        [MinLength(6, ErrorMessage = "New password must be at least 6 characters long.")]
        public string? NewPassword { get; set; }
    }
}
