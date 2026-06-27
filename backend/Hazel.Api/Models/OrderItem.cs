namespace Hazel.Api.Models
{
    public class OrderItem
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public int CakeId { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }

        public Cake? Cake { get; set; }
    }
}
