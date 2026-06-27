namespace Hazel.Api.Models
{
    public class Branch
    {
        public int Id { get; set; }
        public string City { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string MapUrl { get; set; } = string.Empty;
    }
}
