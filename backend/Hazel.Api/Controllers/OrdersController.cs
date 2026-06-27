using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Hazel.Api.Data;
using Hazel.Api.DTOs;
using Hazel.Api.Models;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using System;

namespace Hazel.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class OrdersController : ControllerBase
    {
        private readonly HazelDbContext _context;

        public OrdersController(HazelDbContext context)
        {
            _context = context;
        }

        // POST: api/orders
        [HttpPost]
        public async Task<IActionResult> CreateOrder([FromBody] OrderRequest request)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null) return Unauthorized();
            var userId = int.Parse(userIdClaim.Value);

            if (request.OrderItems == null || !request.OrderItems.Any())
            {
                return BadRequest(new { message = "Order must contain at least one item." });
            }

            var order = new Order
            {
                UserId = userId,
                OrderDate = DateTime.UtcNow,
                Status = "Pending",
                TotalAmount = 0
            };

            var orderItems = new List<OrderItem>();
            decimal totalAmount = 0;

            foreach (var item in request.OrderItems)
            {
                var cake = await _context.Cakes.FindAsync(item.CakeId);
                if (cake == null)
                {
                    return BadRequest(new { message = $"Cake with ID {item.CakeId} not found." });
                }

                var orderItem = new OrderItem
                {
                    CakeId = item.CakeId,
                    Quantity = item.Quantity,
                    Price = cake.Price
                };

                orderItems.Add(orderItem);
                totalAmount += cake.Price * item.Quantity;
            }

            order.TotalAmount = totalAmount;
            order.OrderItems = orderItems;

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Order placed successfully.", orderId = order.Id });
        }

        // GET: api/orders/my
        [HttpGet("my")]
        public async Task<IActionResult> GetMyOrders()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null) return Unauthorized();
            var userId = int.Parse(userIdClaim.Value);

            var orders = await _context.Orders
                .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.Cake)
                .Where(o => o.UserId == userId)
                .OrderByDescending(o => o.OrderDate)
                .Select(o => new OrderResponse
                {
                    Id = o.Id,
                    UserId = o.UserId,
                    OrderDate = o.OrderDate,
                    TotalAmount = o.TotalAmount,
                    Status = o.Status,
                    OrderItems = o.OrderItems.Select(oi => new OrderItemResponse
                    {
                        Id = oi.Id,
                        CakeId = oi.CakeId,
                        CakeName = oi.Cake != null ? oi.Cake.Name : "Unknown Cake",
                        CakeImageUrl = oi.Cake != null ? oi.Cake.ImageUrl : null,
                        Quantity = oi.Quantity,
                        Price = oi.Price
                    }).ToList()
                })
                .ToListAsync();

            return Ok(orders);
        }

        // GET: api/orders (Admin Only)
        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<IActionResult> GetAllOrders()
        {
            var orders = await _context.Orders
                .Include(o => o.User)
                .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.Cake)
                .OrderByDescending(o => o.OrderDate)
                .Select(o => new OrderResponse
                {
                    Id = o.Id,
                    UserId = o.UserId,
                    UserEmail = o.User != null ? o.User.Email : "Unknown User",
                    OrderDate = o.OrderDate,
                    TotalAmount = o.TotalAmount,
                    Status = o.Status,
                    OrderItems = o.OrderItems.Select(oi => new OrderItemResponse
                    {
                        Id = oi.Id,
                        CakeId = oi.CakeId,
                        CakeName = oi.Cake != null ? oi.Cake.Name : "Unknown Cake",
                        CakeImageUrl = oi.Cake != null ? oi.Cake.ImageUrl : null,
                        Quantity = oi.Quantity,
                        Price = oi.Price
                    }).ToList()
                })
                .ToListAsync();

            return Ok(orders);
        }

        // PUT: api/orders/{id}/status (Admin Only)
        [Authorize(Roles = "Admin")]
        [HttpPut("{id}/status")]
        public async Task<IActionResult> UpdateOrderStatus(int id, [FromBody] OrderStatusUpdateRequest request)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                return NotFound(new { message = "Order not found." });
            }

            var validStatuses = new[] { "Pending", "Processing", "Completed", "Cancelled" };
            if (!validStatuses.Contains(request.Status))
            {
                return BadRequest(new { message = "Invalid order status. Allowed statuses are: Pending, Processing, Completed, Cancelled." });
            }

            order.Status = request.Status;
            _context.Orders.Update(order);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Order status updated successfully." });
        }
    }
}
