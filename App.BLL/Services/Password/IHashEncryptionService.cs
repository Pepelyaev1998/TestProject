using System;
using System.Collections.Generic;
using System.Text;

namespace App.BLL.Services.Password
{
    interface IHashEncryptionService
    {
        HashedData Hash(string data);
        bool IsEquals(HashedData hashedData, string stringToCheck);
      
    }
}
