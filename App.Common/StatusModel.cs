using System.ComponentModel.DataAnnotations;

namespace App.Common
{

    public enum StatusModel : byte
    {
        [Display(Name = "Used")]
        Used,
        [Display(Name = "Not used")]
        DontUsed
    }
}
