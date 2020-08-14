using App.Common;

namespace App.DAL.Models
{
    public class Technique : Entity
    {
        public string Name { get; set; }
        public string Model { get; set; }
        public int Number { get; set; }
        public int Amount { get; set; }
        public StatusModel Status { get; set; }
        public string Notation { get; set; }
    }
}
