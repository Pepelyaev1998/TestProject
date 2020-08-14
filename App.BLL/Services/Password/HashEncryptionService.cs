using System;
using System.Security.Cryptography;
using System.Text;

namespace App.BLL.Services.Password
{
    class HashEncryptionService : IHashEncryptionService
    {
        public HashedData Hash(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                return null;
            }

            var result = new HashedData();
            result.Salt = CreateSalt();
            result.Hash = EncryptData(data, result.Salt);
            return result;
        }

        public bool IsEquals(HashedData hashedData, string stringToCheck)
        {
            return string.Compare(
                hashedData.Hash,
                EncryptData(stringToCheck, hashedData.Salt),
                StringComparison.OrdinalIgnoreCase) == 0;
        }

        private string EncryptData(string data, string salt)
        {
            var bytesToCrypt = Encoding.UTF8.GetBytes(CombineDataAndSalt(data, salt));
            return string.Concat(
                Array.ConvertAll(new SHA256Managed().ComputeHash(bytesToCrypt, 0, bytesToCrypt.Length), x => x.ToString("X2")));
        }

        private string CreateSalt()
        {
            return Guid.NewGuid().ToString("N");
        }

        private string CombineDataAndSalt(string data, string salt)
        {
            return string.Format("{0}{1}", data, salt);
        }
    }
}

