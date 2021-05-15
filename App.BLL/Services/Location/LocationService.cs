using App.BLL.Interfaces;
using App.BLL.Models;
using System.Collections.Generic;
using AutoMapper;
using App.DAL.Repositories;
using System.Linq;
using TechniqueAlias = App.DAL.Models;
using App.Common;

namespace App.BLL.Services.Location
{
   public class LocationService : ILocationService
    {
        IEntityRepository EntityRepository { get; set; }

        public LocationService(IEntityRepository entityRepository)
        {
            EntityRepository = entityRepository;
        }
        public void DeleteRoom(RoomDTO roomDto)
        {
           
           
        }
        public void SaveRoom(RoomDTO roomDto)
        {
            
         
        }
        public RoomDTO GetRoom(int? id)
        {
            RoomDTO room = new RoomDTO() { Id = 1, Length = 222, Width = 300, Name = "Room1" };
            return room;

        }
        public IEnumerable<RoomDTO> GetRoomList()
        {
            RoomDTO[] r = new RoomDTO[2];
            TechniqueDTO tech = new TechniqueDTO() { Id = 1, Name = "dd", Number = 2, Amount = 3, Model = "sdd", Status = StatusModel.DontUsed, Notation = "ex" };
            TypeTechniqueDTO tt = new TypeTechniqueDTO() { Id = 1, Width = 3, Length = 3, Layer = 1, Point = new LocationPointDTO() { X = 488, Y = 240 }, Color = "orange" };
            TechniqueAndTypeDTO ttt = new TechniqueAndTypeDTO { Technique = tech, TypeTechnique = tt };
            TechniqueAndTypeDTO[] techniqueList = new TechniqueAndTypeDTO[] { ttt };
            RoomDTO room = new RoomDTO() { Id = 1, Length = 222, Width = 300, Name = "Room1" };
            room.Technique = techniqueList;
            r[0] = room;
            RoomDTO room1 = new RoomDTO() { Id = 2, Length = 222, Width = 300, Name = "Room2" };
            room1.Technique = techniqueList;
            r[1] = room1;
            return r;

        }
    }
}
