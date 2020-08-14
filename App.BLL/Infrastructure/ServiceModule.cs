using App.DAL.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;

namespace App.BLL.Infrastructure
{
    public static class ServiceModule
    {
        public static void Register(IServiceCollection services, IConfiguration Configuration)
        {
            services.AddDbContext<IEntityRepository, EntityRepository>(options => options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
        }
    }
}
