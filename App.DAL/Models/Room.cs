using System;
using System.Collections.Generic;
using System.Text;

namespace App.DAL.Models
{
    public class Room : Entity
    {
        public double Length { get; set; }
        public double Width { get; set; }
        public string Name { get; set; }
        public List<TechniqueAndType> Technique { get; set; }
    }
}
