using App.BLL.Models;
using UserAlias = App.DAL.Models;
namespace App.BLL.Interfaces
{
    public interface IUserService
    {
        void SaveUser(UserDTO userDTO);
        UserAlias.User GetUser(string email, string password);
        //UserAlias.User GetUser();
    }
}
