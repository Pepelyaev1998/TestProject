using App.Common;

namespace App.BLL.Models
{
    public class TechniqueDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Model { get; set; }
        public int Number { get; set; }
        public int Amount { get; set; }
        public StatusModel Status { get; set; }
        public string Notation { get; set; }
    }
}

