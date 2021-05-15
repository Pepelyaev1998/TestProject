using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace App.DAL.Models
{
    [Owned]
    public class LocationPoint
    {
        public double X { get; set; }
        public double Y { get; set; }
    }
}
