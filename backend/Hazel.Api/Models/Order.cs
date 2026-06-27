using System;
using System.Collections.Generic;

namespace Hazel.Api.Models
{
    public class Order
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.UtcNow;
        public decimal TotalAmount { get; set; }
        public string Status { get; set; } = "Pending"; // Pending, Processing, Completed, Cancelled

        public User? User { get; set; }
        public List<OrderItem> OrderItems { get; set; } = new();
    }
}
