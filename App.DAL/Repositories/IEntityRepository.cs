using App.DAL.Models;
using System.Linq;

namespace App.DAL.Repositories
{
   public interface IEntityRepository
    {
        void SaveEntity(Entity entity);
        void DeleteEntity(Entity entity);
        IQueryable<Technique> Techniques { get; }
        IQueryable<User> Users { get; }
        void Save();
        void Dispose();
    }
}
