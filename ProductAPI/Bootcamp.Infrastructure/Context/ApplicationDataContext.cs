using Bootcamp.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace Bootcamp.Infrastructure.Context
{
    public class ApplicationDataContext : DbContext
    {
        public ApplicationDataContext(DbContextOptions<ApplicationDataContext> options) : base(options) { }

        public DbSet<Product> Products { get; set; }
    }
}
