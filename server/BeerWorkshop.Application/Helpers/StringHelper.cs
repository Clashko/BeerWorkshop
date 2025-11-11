namespace BeerWorkshop.Application.Helpers
{
    public static class StringHelper
    {
        public static string PaddingLeft(this string value, int lineLenght)
        {
            var result = new string(' ', CalculatePadding(value, lineLenght)) + value;
            return result;
        }

        private static int CalculatePadding(string value, int lineLenght)
        {
            var result = (lineLenght - value.Length) / 2;
            return result;
        }
    }
}