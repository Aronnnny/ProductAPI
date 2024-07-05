namespace Bootcamp.Infrastructure.Interfaces
{
    public interface IRepository<T> where T : class
    {
        Task<IEnumerable<T>> GetAll();
        Task<T> GetById(Guid id);
        Task<bool> Add(T entity);
        Task<bool> Update(Guid id, T entity); 
        Task<bool> Delete(Guid id);
    }
}
