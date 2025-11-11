using System.Text.Json;
using System.Text.Json.Serialization;

namespace BeerWorkshop.Application.Converters;

public class JsonCheckDateTimeConverter : JsonConverter<DateTime>
{
    private readonly string format = "dd.MM.yyyy";

    public override DateTime Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        string? dateString = reader.GetString();
        return DateTime.ParseExact(dateString!, format, null);
    }

    public override void Write(Utf8JsonWriter writer, DateTime value, JsonSerializerOptions options)
    {
        writer.WriteStringValue(value.ToString(format));
    }
}