using System.Reflection;
using BeerWorkshop.Api.Behaviors;
using BeerWorkshop.Application.MappingProfiles;
using BeerWorkshop.Application.MediatR.Products.Create;
using BeerWorkshop.Application.MediatR.Products.Read;
using BeerWorkshop.Application.Services;
using BeerWorkshop.Application.Services.Interfaces;
using BeerWorkshop.Database.Contexts;
using FluentValidation;
using FluentValidation.AspNetCore;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BeerWorkshop.Api.Extensions;

public static class IServiceCollectionExtensions
{
    public static void ConfigureServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<BeerWorkshopContext>(opt =>
            opt.UseSqlite(configuration.GetConnectionString("BeerWorkshopDbConnectionString")));

        services.AddControllers();

        services.AddOpenApi();

        services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(ReadProductsHandler).Assembly));

        services.AddAutoMapper(typeof(ProductProfile).Assembly);

        services.AddFluentValidationAutoValidation();
        services.AddValidatorsFromAssembly(typeof(CreateProductValidator).Assembly);

        services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));

        services.AddTransient<ICheckNumberService, CheckNumberService>();
        services.AddSingleton<ICheckGenerator, CheckGenerator>();

        services.AddCors(options =>
        {
            options.AddPolicy(name: "AllowAllPolicy",
                builder =>
                {
                    builder.AllowAnyOrigin()
                           .AllowAnyMethod()
                           .AllowAnyHeader();
                });
        });
    }
}