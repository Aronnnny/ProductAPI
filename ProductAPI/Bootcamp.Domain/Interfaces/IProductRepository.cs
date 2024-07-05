using Bootcamp.Domain.Models;

namespace Bootcamp.Infrastructure.Interfaces
{
    public interface IProductRepository
    {
        Task<IEnumerable<Product>> GetAll();
        Task<Product> GetById(Guid id);
        Task<bool> Add(Product product);
        Task<bool> Update(Guid id, Product product);
        Task<bool> Delete(Guid id);
    }
}
