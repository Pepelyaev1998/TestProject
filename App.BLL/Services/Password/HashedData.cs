namespace App.BLL.Services.Password
{
    class HashedData
    {
        public string Salt { get; internal set; }
        public string Hash { get; internal set; }
    }
}
