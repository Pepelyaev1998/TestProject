using App.BLL.Models;
using System.Collections;

namespace App.ComparerForTest
{
    public class MyComparer : IComparer
    {
        public int Compare(object x, object y)
        {
            var x1 = (TechniqueDTO)x;
            var y1 = (TechniqueDTO)y;

            if (x1.Id == y1.Id & x1.Number == y1.Number & x1.Status == y1.Status & x1.Model == y1.Model & x1.Notation == y1.Notation & x1.Name == y1.Name)
                return 0;

            return -1;
        }
    }
}
