﻿using System.ComponentModel.DataAnnotations;

namespace App.Models
{
    public class User
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "No Email specified")]
        ////[RegularExpression(@"^(?("")(""[^""]+?""@)|(([0-9a-z]((\.(?!\.))|[-!#\$%&'\*\+/=\?\^`\{\}\|~\w])*)(?<=[0-9a-z])@))" +
        ////        @"(?(\[)(\[(\d{1,3}\.){3}\d{1,3}\])|(([0-9a-z][-\w]*[0-9a-z]*\.)+[a-z0-9]{2,17}))$", ErrorMessage = "Некорректный email")]
        //[EmailAddress(ErrorMessage = "Incorrect email")]
        public string Email { get; set; }

        [Required(ErrorMessage = "A password is not specified")]
        //[DataType(DataType.Password)]
        //[StringLength(150, MinimumLength = 5, ErrorMessage = "The password is too short!")]
        public string Password { get; set; }

        //[DataType(DataType.Password)]
        //[Compare("Password", ErrorMessage = "Password entered incorrectly")]
        public string ConfirmPassword { get; set; }
    }
}
