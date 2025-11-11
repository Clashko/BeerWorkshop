using BeerWorkshop.Database.Contexts;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;

namespace BeerWorkshop.Api.Extensions;

public static class WebApplicationExtensions
{
    public static void ConfigureApp(this WebApplication app)
    {
        if (app.Environment.IsDevelopment())
        {
            app.MapOpenApi();
            app.MapScalarApiReference("/docs", opt =>
            {
                opt.WithTitle("Beer workshop documentation");
            });
        }

        app.UseCors("AllowAllPolicy");
        app.MapControllers();
    }
    public static void MigrateDatabase(this WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<BeerWorkshopContext>();
        dbContext.Database.Migrate();
    }
}