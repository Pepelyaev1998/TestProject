using App.BLL.Interfaces;
using App.BLL.Models;
using App.BLL.Services.Password;
using App.DAL.Repositories;
using AutoMapper;
using System.Linq;
using UserAlias = App.DAL.Models;

namespace App.BLL.Services.User
{
    public class UserService : IUserService
    {
        IEntityRepository EntityRepository { get; set; }

        public UserService(IEntityRepository entityRepository)
        {
            EntityRepository = entityRepository;
        }

        public void SaveUser(UserDTO userDTO)
        {
            var user = Mapper.Map<UserDTO, UserAlias.User>(userDTO);
            var hashedData = new HashEncryptionService().Hash(user.Password);
            user.Password = hashedData.Hash;
            user.Password_salt = hashedData.Salt;
            EntityRepository.SaveEntity(user);
            EntityRepository.Save();
        }
        public UserAlias.User GetUser(string email, string password)
        {
            if (email.Length == 0)
                return null;
            var user = EntityRepository.Users.Where(p => p.Email == email).FirstOrDefault();
            if (password.Length == 0)
                return null;
            if (user == null)
                return null;
            var isEqual = new HashEncryptionService().IsEquals(new HashedData { Hash = user.Password, Salt = user.Password_salt }, password);
            if (isEqual)
                return user;
            return null;

        }
        //public UserAlias.User GetUser()
        //{
        //    var user = EntityRepository.Users.FirstOrDefault();

        //    return user;

        //}
        //public void Dispose()
        //{
        //    EntityRepository.Dispose();
        //}
    }
}
