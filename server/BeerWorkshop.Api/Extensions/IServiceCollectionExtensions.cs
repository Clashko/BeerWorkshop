using BeerWorkshop.Api.Behaviors;
using BeerWorkshop.Application.MappingProfiles;
using BeerWorkshop.Application.MediatR.Products.Create;
using BeerWorkshop.Application.MediatR.Products.Read;
using BeerWorkshop.Application.Models;
using BeerWorkshop.Application.Services;
using BeerWorkshop.Application.Services.Interfaces;
using BeerWorkshop.Database.Contexts;
using FluentValidation;
using FluentValidation.AspNetCore;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi;

namespace BeerWorkshop.Api.Extensions;

public static class IServiceCollectionExtensions
{
    public static void ConfigureServices(this IServiceCollection services, IConfiguration configuration)
    {
        var authConfig = configuration.GetRequiredSection("AuthConfiguration").Get<AuthConfiguration>() ?? throw new Exception("Can't load Auth config");
        services.AddSingleton(authConfig);

        services.AddDbContext<BeerWorkshopContext>(opt =>
            opt.UseSqlite(configuration.GetConnectionString("BeerWorkshopDbConnectionString")));

        services.AddControllers();

        services.AddSwaggerDocs();

        services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(ReadProductsHandler).Assembly));

        services.AddAutoMapper(typeof(ProductProfile).Assembly);

        services.AddFluentValidationAutoValidation();
        services.AddValidatorsFromAssembly(typeof(CreateProductValidator).Assembly);

        services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));

        services.AddSingleton<ICheckNumberService, CheckNumberService>();
        services.AddScoped<ICheckGenerator, CheckGenerator>();

        services.AddScoped<ITokenService, TokenService>();

        services.AddJwtAuthentication(authConfig);

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

    public static void AddSwaggerDocs(this IServiceCollection services) =>
        services.AddSwaggerGen(opt =>
        {
            opt.SwaggerDoc("BeerWorkshopService", new OpenApiInfo
            {
                Title = "Beer Workshop",
                Version = "v1",
                Description = "Beer Workshop Service is designed to control products and devices of the beer store"
            });

            opt.AddSecurityDefinition("bearer", new OpenApiSecurityScheme
            {
                Description = "Введите JWT токен в формате: Bearer {token}",
                Name = "Authorization",
                In = ParameterLocation.Header,
                Type = SecuritySchemeType.Http,
                Scheme = "bearer",
                BearerFormat = "JWT"
            });

            opt.CustomSchemaIds(type => type.ToString());
        });
}