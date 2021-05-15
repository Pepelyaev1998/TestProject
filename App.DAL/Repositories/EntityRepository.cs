using App.DAL.Models;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace App.DAL.Repositories
{
    public sealed class EntityRepository : DbContext, IEntityRepository
    {
        private readonly DbSet<User> _users;
        private readonly DbSet<Technique> _techniques;
        //private readonly DbSet<Room> rooms;
        //private readonly DbSet<TechniqueAndType> techniqueAngTypes;
        //private readonly DbSet<TypeTechnique> typeTechniques;
        //private readonly DbSet<LocationPoint> locationPoints;

        public EntityRepository(DbContextOptions dbContextOptions)
            : base(dbContextOptions)
        {
          //  Database.Migrate();
         //   Database.EnsureCreated();
            _users = Set<User>();
            _techniques = Set<Technique>();
            //rooms = Set<Room>();
            //techniqueAngTypes = Set<TechniqueAndType>();
            //typeTechniques = Set<TypeTechnique>();
            //locationPoints = Set<LocationPoint>();
        }

        public IQueryable<User> Users => _users.AsNoTracking();
        public IQueryable<Technique> Techniques => _techniques.AsNoTracking();
        //public IQueryable<Room> Rooms => rooms.Include(t => t.Technique).AsNoTracking();
        public void SaveEntity(Entity entity)
        {

            Entry(entity).State = entity.Id == default ? EntityState.Added : EntityState.Modified;

        }
        public void DeleteEntity(Entity entity)
        {
            Entry(entity).State = EntityState.Deleted;

        }
        public void Save()
        {
            SaveChanges();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>();
            modelBuilder.Entity<Technique>();
        }
        //private bool disposed = false;
        //public virtual void Dispose(bool disposing)
        //{
        //    if (!disposed)
        //    {
        //        if (disposing)
        //        {
        //            Dispose();
        //        }
        //        disposed = true;
        //    }
        //}

        //public override void Dispose()
        //{
        //    Dispose(true);
        //    GC.SuppressFinalize(this);
        //}
    }
}
