using System;
using System.Collections.Generic;
using System.Text;

namespace App.BLL.Models
{
    public class RoomDTO
    {
        public int Id { get; set; }
        public double Length { get; set; }
        public double Width { get; set; }
        public string Name { get; set; }
        public TechniqueAndTypeDTO[] Technique { get; set; }
    }
}
