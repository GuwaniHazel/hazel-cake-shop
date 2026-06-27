using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace Hazel.Api.DTOs
{
    public class CakeUpsertRequest
    {
        [Required]
        public string Name { get; set; } = string.Empty;
        
        public string? Description { get; set; }
        
        [Required]
        [Range(0.01, 100000.00, ErrorMessage = "Price must be greater than zero.")]
        public decimal Price { get; set; }
        
        [Required]
        public string Category { get; set; } = string.Empty;
        
        public IFormFile? ImageFile { get; set; }
    }
}
