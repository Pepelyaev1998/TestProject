using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace App.Models
{
    public class TypeTechnique
    {
        public int Id { get; set; }
        public double Length { get; set; }
        public LocationPoint Point { get; set; }
        public string Color { get; set; }
        public double Width { get; set; }
        public double Layer { get; set; }
    }
}
