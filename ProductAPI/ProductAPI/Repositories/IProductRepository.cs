using ProductAPI.Models;

namespace ProductAPI.Repositories
{
    public interface IProductRepository
    {
        Task<IEnumerable<Product>> Get();
        Task<Product> GetById(Guid id);
        Task<bool> Add(Product product);
        Task<bool> Update(Guid id, Product product);
        Task<bool> Delete(Guid id);
    }
}
