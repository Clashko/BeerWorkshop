using System.Security.Cryptography;
using System.Text;

namespace BeerWorkshop.Application.Helpers
{
    public static class CryptHelper
    {
        public static string Md5Hash(string login, string password)
        {
            var changedInput = $"UsrLgn{login.ToLower()}UsrPsw{password}";
            var data = MD5.HashData(Encoding.UTF8.GetBytes(changedInput));
            var sbuilder = new StringBuilder();
            foreach (var t in data)
                sbuilder.Append(t.ToString("x2"));
            return sbuilder.ToString();
        }
    }
}