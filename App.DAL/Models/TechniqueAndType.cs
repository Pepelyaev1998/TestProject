using System;
using System.Collections.Generic;
using System.Text;

namespace App.DAL.Models
{
    public class TechniqueAndType
    {
        public Technique Technique { get; set; }
        public TypeTechnique TypeTechnique { get; set; }
        public int RoomId { get; set; }
        public Room Room { get; set; }
    }
}
