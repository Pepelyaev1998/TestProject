using System;
using System.Collections.Generic;
using System.Text;

namespace App.BLL.Models
{
    public class TypeTechniqueDTO
    {
        public int Id { get; set; }
        public double Length { get; set; }
        public LocationPointDTO Point { get; set; }
        public string Color { get; set; }
        public double Width { get; set; }
        public double Layer { get; set; }
    }
}
