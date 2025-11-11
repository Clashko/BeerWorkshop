using System.Text.Json;
using BeerWorkshop.Application.Models;
using BeerWorkshop.Application.Services.Interfaces;

namespace BeerWorkshop.Application.Services;

public class CheckNumberService : ICheckNumberService
{
    private readonly string parametersFileName = "CheckNumberServiceParameters.json";
    private readonly JsonSerializerOptions options = new() { WriteIndented = true };

    private readonly CheckNumberServiceParameters parameters;

    public CheckNumberService()
    {
        if (File.Exists(parametersFileName))
        {
            var jsonString = File.ReadAllText(parametersFileName);
            var json = JsonSerializer.Deserialize<CheckNumberServiceParameters>(jsonString);
            if (json is not null && json.WorkingDate == DateTime.Now)
            {
                parameters = json;
                return;
            }
        }

        parameters = new CheckNumberServiceParameters()
        {
            WorkingDate = DateTime.Now,
            OrderNumber = 0
        };
    }

    public CheckNumberServiceParameters GetParameters()
    {
        if (!parameters.WorkingDate.DayOfYear.Equals(DateTime.Now.DayOfYear))
        {
            parameters.WorkingDate = DateTime.Now;
            parameters.OrderNumber = 1;
        }
        else
        {
            ++parameters.OrderNumber;
        }

        Save();

        return parameters;
    }

    private void Save()
    {
        string jsonString = JsonSerializer.Serialize(parameters, options);
        File.WriteAllText(parametersFileName, jsonString);
    }
}