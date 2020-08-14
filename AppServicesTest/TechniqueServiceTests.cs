using App.BLL.Models;
using App.BLL.Services.Technique;
using App.Common;
using App.DAL.Models;
using App.DAL.Repositories;
using AutoMapper;
using Moq;
using System.Collections.Generic;
using System.Linq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using App.ComparerForTest;

namespace AppTest
{  
    [TestClass]
    public class TechniqueServiceTests
    {
        [AssemblyInitialize]
        public static void Init(TestContext tc)
        {
            Mapper.Initialize(cfg =>
            {
                cfg.CreateMap<TechniqueDTO, Technique>();
                cfg.CreateMap<UserDTO, User>()
                .ForMember("Password", opt => opt.MapFrom(c => c.Password));
                cfg.CreateMap<Technique, TechniqueDTO>();
                cfg.CreateMap<User, UserDTO>();
            });
        }
        [TestMethod]
        public void GetTechniqueResultTechniquesList()
        {

            var mock = new Mock<IEntityRepository>();
            mock.Setup(repo => repo.Techniques).Returns(GetTestTechnique().AsQueryable());
            var techniqueService = new TechniqueService(mock.Object);
            CollectionAssert.AreEqual(new List<TechniqueDTO> { new TechniqueDTO { Id = 1, Name = "monitor", Model = "AASS", Amount = 4, Number = 213633, Status = StatusModel.Used, Notation = "" } }, techniqueService.GetTechniqueList().ToList(), new MyComparer());
        }
        [TestMethod]
        public void SaveTechniqueTest()
        {
            var mock = new Mock<IEntityRepository>();
            var techniqueService = new TechniqueService(mock.Object);
            var techniqueDTO = new TechniqueDTO() { Id = 1, Name = "monitor", Model = "AASS", Amount = 4, Number = 213633, Status = StatusModel.Used, Notation = "" };
            techniqueService.SaveTechnique(techniqueDTO);
            mock.Verify(r => r.Save());
            mock.Verify(r => r.SaveEntity(It.IsAny<Technique>()), Times.Once);
        }
        [TestMethod]
        public void DeleteTechniqueTest()
        {
            var mock = new Mock<IEntityRepository>();
            mock.Setup(repo => repo.Techniques).Returns(GetTestTechnique().AsQueryable());
            var techniqueService = new TechniqueService(mock.Object);
            var techniqueDTO = new TechniqueDTO() { Id = 1, Name = "monitor", Model = "AASS", Amount = 4, Number = 213633, Status = StatusModel.Used, Notation = "" };
            techniqueService.DeleteTechnique(techniqueDTO);
            mock.Verify(r => r.Save());
            mock.Verify(r => r.DeleteEntity(It.IsAny<Technique>()), Times.Once);
        }
        [TestMethod]
        public void GetTechniqueResultNullWithParametrIdNull()
        {
            var mock = new Mock<IEntityRepository>();
            mock.Setup(repo => repo.Techniques).Returns(GetTestTechnique().AsQueryable());
            var techniqueService = new TechniqueService(mock.Object);
            Assert.IsNull(techniqueService.GetTechnique(null));
        }
        [TestMethod]
        public void GetTechniqueResultNullWithParametrIdNotFound()
        {
            var mock = new Mock<IEntityRepository>();
            mock.Setup(repo => repo.Techniques).Returns(GetTestTechnique().AsQueryable());
            var techniqueService = new TechniqueService(mock.Object);
            Assert.IsNull(techniqueService.GetTechnique(2));
        }
        [TestMethod]
        public void GetTechniqueResultTechniqueWithParametrId()
        {
            var mock = new Mock<IEntityRepository>();
            mock.Setup(repo => repo.Techniques).Returns(GetTestTechnique().AsQueryable());
            var techniqueService = new TechniqueService(mock.Object);
            Assert.IsInstanceOfType(Mapper.Map<Technique, TechniqueDTO>(GetTestTechnique().Where(x => x.Id == 1).FirstOrDefault()), techniqueService.GetTechnique(1).GetType());
            Assert.AreEqual(Mapper.Map<Technique, TechniqueDTO>(GetTestTechnique().Where(x => x.Id == 1).FirstOrDefault()).Id, techniqueService.GetTechnique(1).Id);
            Assert.AreEqual(Mapper.Map<Technique, TechniqueDTO>(GetTestTechnique().Where(x => x.Id == 1).FirstOrDefault()).Name, techniqueService.GetTechnique(1).Name);
            Assert.AreEqual(Mapper.Map<Technique, TechniqueDTO>(GetTestTechnique().Where(x => x.Id == 1).FirstOrDefault()).Model, techniqueService.GetTechnique(1).Model);
            Assert.AreEqual(Mapper.Map<Technique, TechniqueDTO>(GetTestTechnique().Where(x => x.Id == 1).FirstOrDefault()).Number, techniqueService.GetTechnique(1).Number);
            Assert.AreEqual(Mapper.Map<Technique, TechniqueDTO>(GetTestTechnique().Where(x => x.Id == 1).FirstOrDefault()).Status, techniqueService.GetTechnique(1).Status);
            Assert.AreEqual(Mapper.Map<Technique, TechniqueDTO>(GetTestTechnique().Where(x => x.Id == 1).FirstOrDefault()).Notation, techniqueService.GetTechnique(1).Notation);
            Assert.AreEqual(Mapper.Map<Technique, TechniqueDTO>(GetTestTechnique().Where(x => x.Id == 1).FirstOrDefault()).Amount, techniqueService.GetTechnique(1).Amount);
        }
        private IEnumerable<Technique> GetTestTechnique()
        {
            var technique = new List<Technique>
            {
                new Technique {Id=1, Name="monitor", Model="AASS", Amount=4, Number=213633, Status=StatusModel.Used , Notation=""},
            };
            return technique;
        }
    }
}
