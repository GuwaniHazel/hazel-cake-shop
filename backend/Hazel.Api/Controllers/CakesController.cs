using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Hazel.Api.Data;
using Hazel.Api.DTOs;
using Hazel.Api.Models;
using System.IO;
using System.Threading.Tasks;
using System;

namespace Hazel.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CakesController : ControllerBase
    {
        private readonly HazelDbContext _context;
        private readonly IWebHostEnvironment _env;

        public CakesController(HazelDbContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        // GET: api/cakes
        [HttpGet]
        public async Task<IActionResult> GetAllCakes([FromQuery] string? category, [FromQuery] string? search)
        {
            var query = _context.Cakes.AsQueryable();

            if (!string.IsNullOrEmpty(category) && category.ToLower() != "all")
            {
                query = query.Where(c => c.Category.ToLower() == category.ToLower());
            }

            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(c => c.Name.Contains(search) || (c.Description != null && c.Description.Contains(search)));
            }

            var cakes = await query.ToListAsync();
            return Ok(cakes);
        }

        // GET: api/cakes/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCakeById(int id)
        {
            var cake = await _context.Cakes.FindAsync(id);
            if (cake == null)
            {
                return NotFound(new { message = "Cake not found." });
            }
            return Ok(cake);
        }

        // POST: api/cakes (Admin Only)
        [Authorize(Roles = "Admin")]
        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> CreateCake([FromForm] CakeUpsertRequest request)
        {
            var cake = new Cake
            {
                Name = request.Name,
                Description = request.Description,
                Price = request.Price,
                Category = request.Category,
                CreatedAt = DateTime.UtcNow
            };

            if (request.ImageFile != null && request.ImageFile.Length > 0)
            {
                cake.ImageUrl = await SaveImageAsync(request.ImageFile);
            }
            else
            {
                cake.ImageUrl = "/uploads/placeholder.jpg"; // default placeholder
            }

            _context.Cakes.Add(cake);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCakeById), new { id = cake.Id }, cake);
        }

        // PUT: api/cakes/{id} (Admin Only)
        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> UpdateCake(int id, [FromForm] CakeUpsertRequest request)
        {
            var cake = await _context.Cakes.FindAsync(id);
            if (cake == null)
            {
                return NotFound(new { message = "Cake not found." });
            }

            cake.Name = request.Name;
            cake.Description = request.Description;
            cake.Price = request.Price;
            cake.Category = request.Category;

            if (request.ImageFile != null && request.ImageFile.Length > 0)
            {
                // Optionally delete the old image if it's not a pre-seeded one
                if (!string.IsNullOrEmpty(cake.ImageUrl) && !cake.ImageUrl.Contains("placeholder") && cake.ImageUrl.StartsWith("/uploads/"))
                {
                    DeleteImage(cake.ImageUrl);
                }

                cake.ImageUrl = await SaveImageAsync(request.ImageFile);
            }

            _context.Cakes.Update(cake);
            await _context.SaveChangesAsync();

            return Ok(cake);
        }

        // DELETE: api/cakes/{id} (Admin Only)
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCake(int id)
        {
            var cake = await _context.Cakes.FindAsync(id);
            if (cake == null)
            {
                return NotFound(new { message = "Cake not found." });
            }

            // Optionally delete the associated image
            if (!string.IsNullOrEmpty(cake.ImageUrl) && !cake.ImageUrl.Contains("placeholder") && cake.ImageUrl.StartsWith("/uploads/"))
            {
                DeleteImage(cake.ImageUrl);
            }

            _context.Cakes.Remove(cake);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Cake deleted successfully." });
        }

        private async Task<string> SaveImageAsync(IFormFile file)
        {
            var wwwRootPath = _env.WebRootPath;
            if (string.IsNullOrEmpty(wwwRootPath))
            {
                // Fallback in case WebRootPath is not initialized (e.g., in integration test environments)
                wwwRootPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
            }

            var uploadsFolder = Path.Combine(wwwRootPath, "uploads");
            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            var uniqueFileName = Guid.NewGuid().ToString() + "_" + Path.GetFileName(file.FileName);
            var filePath = Path.Combine(uploadsFolder, uniqueFileName);

            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(fileStream);
            }

            return "/uploads/" + uniqueFileName;
        }

        private void DeleteImage(string relativePath)
        {
            var wwwRootPath = _env.WebRootPath;
            if (string.IsNullOrEmpty(wwwRootPath))
            {
                wwwRootPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
            }

            // Map the virtual path "/uploads/xyz.jpg" to physical path
            var fileName = relativePath.Replace("/uploads/", "");
            var filePath = Path.Combine(wwwRootPath, "uploads", fileName);

            if (System.IO.File.Exists(filePath))
            {
                try
                {
                    System.IO.File.Delete(filePath);
                }
                catch
                {
                    // Ignore exception if file is locked or cannot be deleted
                }
            }
        }
    }
}
