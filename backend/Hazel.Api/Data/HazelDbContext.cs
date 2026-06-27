using Microsoft.EntityFrameworkCore;
using Hazel.Api.Models;

namespace Hazel.Api.Data
{
    public class HazelDbContext : DbContext
    {
        public HazelDbContext(DbContextOptions<HazelDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; } = null!;
        public DbSet<Cake> Cakes { get; set; } = null!;
        public DbSet<Order> Orders { get; set; } = null!;
        public DbSet<OrderItem> OrderItems { get; set; } = null!;
        public DbSet<Branch> Branches { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure table names explicitly to match MySQL schema
            modelBuilder.Entity<User>().ToTable("Users");
            modelBuilder.Entity<Cake>().ToTable("Cakes");
            modelBuilder.Entity<Order>().ToTable("Orders");
            modelBuilder.Entity<OrderItem>().ToTable("OrderItems");
            modelBuilder.Entity<Branch>().ToTable("Branches");

            // Configure relationships
            modelBuilder.Entity<Order>()
                .HasOne(o => o.User)
                .WithMany()
                .HasForeignKey(o => o.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<OrderItem>()
                .HasOne(oi => oi.Cake)
                .WithMany()
                .HasForeignKey(oi => oi.CakeId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<OrderItem>()
                .HasOne<Order>()
                .WithMany(o => o.OrderItems)
                .HasForeignKey(oi => oi.OrderId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
