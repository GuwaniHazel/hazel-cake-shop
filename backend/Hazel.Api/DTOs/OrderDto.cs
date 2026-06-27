using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Hazel.Api.DTOs
{
    public class OrderItemRequest
    {
        [Required]
        public int CakeId { get; set; }

        [Required]
        [Range(1, 100, ErrorMessage = "Quantity must be between 1 and 100.")]
        public int Quantity { get; set; }
    }

    public class OrderRequest
    {
        [Required]
        [MinLength(1, ErrorMessage = "Order must contain at least one item.")]
        public List<OrderItemRequest> OrderItems { get; set; } = new();
    }

    public class OrderItemResponse
    {
        public int Id { get; set; }
        public int CakeId { get; set; }
        public string CakeName { get; set; } = string.Empty;
        public string? CakeImageUrl { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
    }

    public class OrderResponse
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string UserEmail { get; set; } = string.Empty;
        public DateTime OrderDate { get; set; }
        public decimal TotalAmount { get; set; }
        public string Status { get; set; } = "Pending";
        public List<OrderItemResponse> OrderItems { get; set; } = new();
    }

    public class OrderStatusUpdateRequest
    {
        [Required]
        public string Status { get; set; } = string.Empty;
    }
}
