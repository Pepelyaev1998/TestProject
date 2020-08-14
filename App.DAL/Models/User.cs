namespace App.DAL.Models
{
    public class User : Entity
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string Password_salt { get; set; }
    }
}
