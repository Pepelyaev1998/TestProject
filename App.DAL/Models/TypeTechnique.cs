using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace App.DAL.Models
{
    [Owned]
    public class TypeTechnique
    {
        public double Length { get; set; }
        public LocationPoint Point { get; set; }
        public string Color { get; set; }
        public double Width { get; set; }
        public double Layer { get; set; }
    }
}
