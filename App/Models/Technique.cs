using App.Common;
using System.ComponentModel.DataAnnotations;

namespace App.Models
{
    public class Technique
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Not specified the name!")]
        public string Name { get; set; }
        [Required(ErrorMessage = "Model is not listed!")]
        public string Model { get; set; }
        [Required(ErrorMessage = "No number specified!")]
        public int Number { get; set; }
        [Required(ErrorMessage = "No quantity specified!")]
        public int Amount { get; set; }
        public StatusModel Status { get; set; }
        public string Notation { get; set; }

    }
}
