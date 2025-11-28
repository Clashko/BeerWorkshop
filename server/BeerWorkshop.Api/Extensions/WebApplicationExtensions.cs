using BeerWorkshop.Database.Contexts;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.EntityFrameworkCore;

namespace BeerWorkshop.Api.Extensions;

public static class WebApplicationExtensions
{
    public static void ConfigureApp(this WebApplication app)
    {
        app.UseForwardedHeaders(new ForwardedHeadersOptions
        {
            ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
        });

        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/BeerWorkshopService/swagger.json", "BeerWorkshop v1");
                c.RoutePrefix = "swagger";
            });
        }
        app.UseRouting();

        app.UseCors("AllowAllPolicy");

        app.UseAuthentication();
        app.UseAuthorization();

        app.MapControllers();
    }
    public static void MigrateDatabase(this WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<BeerWorkshopContext>();
        dbContext.Database.Migrate();
    }
}