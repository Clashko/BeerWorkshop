using System.Text.Json.Serialization;
using BeerWorkshop.Application.Converters;

namespace BeerWorkshop.Application.Models;

public class CheckNumberServiceParameters
{
    [JsonConverter(typeof(JsonCheckDateTimeConverter))]
    public DateTime WorkingDate { get; set; }
    public int OrderNumber { get; set; }
}