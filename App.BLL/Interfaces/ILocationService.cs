using App.BLL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace App.BLL.Interfaces
{
   public interface ILocationService
    {
        void SaveRoom(RoomDTO roomDto);
        void DeleteRoom(RoomDTO roomDto);
        RoomDTO GetRoom(int? id);
        IEnumerable<RoomDTO> GetRoomList();
    }
}
