using Microsoft.Extensions.Configuration;

namespace BeerWorkshop.Application.Helpers
{
    public static class DirectoryHelper
    {
        public static string CreateCheckDirectoriesAndGeneratePath(this IConfiguration configuration, int orderNumber, DateTime transactionDate)
        {
            var path = configuration.GetSection("CheckConfiguration").GetValue<string>("CheckSavingPath");

            path ??= Environment.CurrentDirectory;

            path = Path.Combine(path, transactionDate.Year.ToString());
            if (!Directory.Exists(path))
                Directory.CreateDirectory(path);

            path = Path.Combine(path, transactionDate.ToString("MMMM"));
            if (!Directory.Exists(path))
                Directory.CreateDirectory(path);

            path = Path.Combine(path, transactionDate.ToString("dddd"));
            if (!Directory.Exists(path))
                Directory.CreateDirectory(path);

            path = Path.Combine(path, $"Order№{orderNumber}.txt");

            return path;
        }
    }
}