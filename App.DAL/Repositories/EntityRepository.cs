using App.DAL.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;

namespace App.DAL.Repositories
{
    public class EntityRepository : DbContext, IEntityRepository
    {
        private readonly DbSet<User> users;
        private readonly DbSet<Technique> techniques;

        public EntityRepository(DbContextOptions dbContextOptions)
            : base(dbContextOptions)
        {
          //  Database.Migrate();
         //   Database.EnsureCreated();
            users = Set<User>();
            techniques = Set<Technique>();
        }

        public IQueryable<User> Users => users.AsNoTracking();
        public IQueryable<Technique> Techniques => techniques.AsNoTracking();
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
