using App.BLL.Models;
using App.BLL.Services.User;
using App.DAL.Models;
using App.DAL.Repositories;
using AutoMapper;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System.Collections.Generic;
using System.Linq;


namespace AppTest
{
    [TestClass]
    public class UserServiceTests
    {
        [TestMethod]
        public void GetUserResultUser()
        {
            var mock = new Mock<IEntityRepository>();
            mock.Setup(repo => repo.Users).Returns(GetTestUsers().AsQueryable());
            var userService = new UserService(mock.Object);
            var result = userService.GetUser("i.pepel@itran.com", "12345");
            Assert.IsInstanceOfType(GetTestUsers().Where(p => p.Email == "i.pepel@itran.com").FirstOrDefault(), result.GetType());
            Assert.AreEqual(GetTestUsers().Where(p => p.Email == "i.pepel@itran.com").FirstOrDefault().Email, result.Email);
            Assert.AreEqual(GetTestUsers().Where(p => p.Email == "i.pepel@itran.com").FirstOrDefault().Id, result.Id);
            Assert.AreEqual(GetTestUsers().Where(p => p.Email == "i.pepel@itran.com").FirstOrDefault().Password, result.Password);
            Assert.AreEqual(GetTestUsers().Where(p => p.Email == "i.pepel@itran.com").FirstOrDefault().Password_salt, result.Password_salt);
        }
        [TestMethod]
        public void GetUserResultNull()
        {
            var mock = new Mock<IEntityRepository>();
            mock.Setup(repo => repo.Users).Returns(GetTestUsers().AsQueryable());
            var userService = new UserService(mock.Object);
            var result = userService.GetUser("", "12345");
            Assert.IsNull(result);
            result = userService.GetUser("i.pepel@itran.com", "");
            Assert.IsNull(result);
            result = userService.GetUser("i.pepel@itran.com", "4564576");
            Assert.IsNull(result);
            result = userService.GetUser("i.pepel@itran", "4564576");
            Assert.IsNull(result);
        }
        [TestMethod]
        public void SaveUserAndAddsUser()
        {
            var mock = new Mock<IEntityRepository>();
            var userService = new UserService(mock.Object);
            var userDTO = new UserDTO() { Email = "i.pepel@itran.com", Password = "12345" };
            userService.SaveUser(userDTO);
            mock.Verify(r => r.Save());
            mock.Verify(r => r.SaveEntity(It.IsAny<User>()), Times.Once);

        }
        private IEnumerable<User> GetTestUsers()
        {
            var user = new List<User>
            {
                new User { Id=1, Email="i.pepel@itran.com",Password="F8EF44FAA9BF23EF96331DA87F168CB771DB6F92E1A4D1D75E7C3C0DBEBA15B9",Password_salt="43e7ce81e87e4c86ac6ba3da8d6e0279"},
            };
            return user;
        }
    }
}
