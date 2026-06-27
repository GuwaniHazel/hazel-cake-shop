using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Hazel.Api.Data;
using System.Threading.Tasks;

namespace Hazel.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BranchesController : ControllerBase
    {
        private readonly HazelDbContext _context;

        public BranchesController(HazelDbContext context)
        {
            _context = context;
        }

        // GET: api/branches
        [HttpGet]
        public async Task<IActionResult> GetAllBranches()
        {
            var branches = await _context.Branches.ToListAsync();
            return Ok(branches);
        }
    }
}
