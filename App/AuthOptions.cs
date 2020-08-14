using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace App
{
    public class AuthOptions
    {
        public const string ISSUER = "MyAuthServer"; 
        public const string AUDIENCE = "http://localhost:44397/"; 
        const string KEY = "mysupersecret_secretkey!123";  
        public const int LIFETIME = 60; 
        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(KEY));
        }
    }
}
