using System.Collections.Generic;
using App.BLL.Models;
using App.Common;
using Microsoft.AspNetCore.Mvc;
using App.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using System;
using Microsoft.AspNetCore.Hosting;
using App.BLL.Interfaces;

namespace App.Controllers
{
    [Route("api/locations")]
    public class LocationController : Controller
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        ILocationService locationService;
        public LocationController(ILocationService locationService, IHostingEnvironment hostingEnvironment)
        {
            this.locationService = locationService;
            _hostingEnvironment = hostingEnvironment;
        }
        [Authorize]
        [HttpGet]
        public IEnumerable<Room> Get()
        {
            return Mapper.Map<IEnumerable<RoomDTO>, List<Room>>(locationService.GetRoomList());
        }
        [Authorize]
        [HttpPost]
        public IActionResult Post([FromBody] Room room)//create or update
        {
            if (room != null)
            {
                locationService.SaveRoom(Mapper.Map<Room, RoomDTO>(room));
                return Ok(room);
            }
            return BadRequest(ModelState);
        }
        [Authorize]
        [HttpDelete("{id}")]
        public IActionResult Delete(int? id)
        {

            var room = locationService.GetRoom(id);
            if (room != null)
            {
                locationService.DeleteRoom(room);
                return Ok(room);
            }
            return BadRequest();
        }
    }
}
