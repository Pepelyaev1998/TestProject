using System;
using App.BLL.Infrastructure;
using App.BLL.Interfaces;
using App.BLL.Services.Location;
using App.BLL.Services.Technique;
using App.BLL.Services.User;
using AutoMapper.Configuration;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace App.Util
{
    public static class Module
    {
        public static void Register(IServiceCollection services, Microsoft.Extensions.Configuration.IConfiguration configuration)
        {

            services.AddTransient<IUserService, UserService>();
            services.AddTransient<ITechniqueService, TechniqueService>();
            services.AddTransient<ILocationService, LocationService>();
            ServiceModule.Register(services, configuration);

        }


    }
}
