using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace App.Models
{
    public class Room
    {
        public int Id { get; set; }
        public double Length { get; set; }
        public double Width { get; set; }
        public string Name { get; set; }
        public TechniqueAndType[] Technique { get; set; }
    }
}
