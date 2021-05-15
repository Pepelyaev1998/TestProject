using App.BLL.Models;
using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using App.Models;
using Microsoft.AspNetCore.Authentication.Cookies;
using App.Util;
using System.Web.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.SpaServices.Webpack;
using System.Net.Http;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace App
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                     .AddJwtBearer(options =>
                     {
                         options.RequireHttpsMetadata = false;
                         options.TokenValidationParameters = new TokenValidationParameters
                         {
                             // укзывает, будет ли валидироваться издатель при валидации токена
                             ValidateIssuer = true,
                             // строка, представляющая издателя
                             ValidIssuer = AuthOptions.ISSUER,

                             // будет ли валидироваться потребитель токена
                             ValidateAudience = true,
                             // установка потребителя токена
                             ValidAudience = AuthOptions.AUDIENCE,
                             // будет ли валидироваться время существования
                             ValidateLifetime = true,

                             // установка ключа безопасности
                             IssuerSigningKey = AuthOptions.GetSymmetricSecurityKey(),
                             // валидация ключа безопасности
                             ValidateIssuerSigningKey = true,
                         };
                     });
            services.AddMvc();
            Module.Register(services, Configuration);
        }
        public void InitializeMapper()
        {
            Mapper.Initialize(cfg =>
                {
                    cfg.CreateMap<TechniqueDTO, DAL.Models.Technique>();
                    cfg.CreateMap<UserDTO, DAL.Models.User>()
                    .ForMember("Password", opt => opt.MapFrom(c => c.Password));
                    cfg.CreateMap<Technique, TechniqueDTO>();
                    cfg.CreateMap<User, UserDTO>();
                    cfg.CreateMap<Room, RoomDTO>();
                    cfg.CreateMap<TechniqueAndType,TechniqueAndTypeDTO>();
                    cfg.CreateMap<TypeTechnique,TypeTechniqueDTO>();
                    cfg.CreateMap<LocationPoint,LocationPointDTO>();
                    cfg.CreateMap<RoomDTO,DAL.Models.Room>();
                    cfg.CreateMap<TechniqueAndTypeDTO,DAL.Models.TechniqueAndType>();
                    cfg.CreateMap<TypeTechniqueDTO,DAL.Models.TypeTechnique>();
                    cfg.CreateMap<LocationPointDTO,DAL.Models.LocationPoint>();
                });
        }
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();

                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                {
                    HotModuleReplacement = true
                });
            }

            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseAuthentication();
            app.UseMvc();
            InitializeMapper();

        }
    }
}
