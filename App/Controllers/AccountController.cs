using App.BLL.Models;
using App.BLL.Interfaces;
using App.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Newtonsoft.Json;

namespace App.Controllers
{
    [Route("api/users")]
    //[EnableCors("AllowAllOrigin")]
    public class AccountController : Controller
    {
        readonly IUserService userService;
        public AccountController(IUserService userService)
        {
            this.userService = userService;
        }
        //[HttpGet]
        //public IActionResult Register()
        //{
        //    return View(new User());
        //}
        //[HttpPost]
        //public async Task<IActionResult> Register(User userModel)
        //{
        //    //try
        //    //{var user 
        //    if (ModelState.IsValid && userModel != null)
        //    {
        //        if (userService.GetUser() != null) return Content("Пользователь уже зарегистрирован");
        //        var userDTO = Mapper.Map<User, UserDTO>(userModel);
        //        userService.SaveUser(userDTO);
        //        await Authenticate(userDTO.Email);
        //        return Content("Аккаун зарегестрирован!");
        //    }
        //    return View(userModel);
        //    //}
        //    //catch (Exception exception) { return Content(exception.Message); }
        //}
        //[HttpGet]
        //public IActionResult Login()
        //{
        //    return View();
        //}
        [HttpPost]
        public async Task Login([FromBody]User userModel)
        {
            var identity = GetIdentity(userModel);
            await Token(identity);
        }
        public async Task Token(ClaimsIdentity identity)
        {
            if (identity == null)
            {
                Response.StatusCode = 400;
                await Response.WriteAsync("Invalid username or password.");
                return;
            }

            var now = DateTime.UtcNow;
            // создаем JWT-токен
            var jwt = new JwtSecurityToken(
                    issuer: AuthOptions.ISSUER,
                    audience: AuthOptions.AUDIENCE,
                    notBefore: now,
                    claims: identity.Claims,
                    expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                    signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            var response = new
            {
                access_token = encodedJwt,
            };

            // сериализация ответа
            Response.ContentType = "application/json";
            await Response.WriteAsync(JsonConvert.SerializeObject(response, new JsonSerializerSettings { Formatting = Formatting.Indented }));
        }
        private ClaimsIdentity GetIdentity(User userModel)
        {
            var userForLogin = userService.GetUser(userModel.Email, userModel.Password);
            if (userForLogin != null)
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, userForLogin.Email),
                    //new Claim(ClaimsIdentity.DefaultRoleClaimType, person.Role)
                };
                ClaimsIdentity claimsIdentity =
                new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
                    ClaimsIdentity.DefaultRoleClaimType);
                return claimsIdentity;
            }
            return null;
        }
        //private async Task Authenticate(string userName)
        //{
        //    var claims = new List<Claim>
        //    {
        //        new Claim(ClaimsIdentity.DefaultNameClaimType, userName)
        //    };
        //    ClaimsIdentity id = new ClaimsIdentity(claims, "ApplicationCookie", ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType);
        //    await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(id));

        //}
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return RedirectToAction("Login", "Account");
        }
        //protected override void Dispose(bool disposing)
        //{
        //    userService.Dispose();
        //    base.Dispose(disposing);
        //}
    }
}