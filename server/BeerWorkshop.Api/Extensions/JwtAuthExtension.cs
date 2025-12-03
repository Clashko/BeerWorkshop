using System.Text;
using BeerWorkshop.Application.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

namespace BeerWorkshop.Api.Extensions;

public static class JwtAuthExtension
{
    public static void AddJwtAuthentication(this IServiceCollection services, AuthConfiguration configuration)
    {
        services.AddAuthentication(opts =>
        {
            opts.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            opts.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        }).AddJwtBearer(opts =>
        {
            opts.RequireHttpsMetadata = false;
            opts.SaveToken = true;
            opts.TokenValidationParameters = new TokenValidationParameters()
            {
                ValidateIssuer = true,
                ValidIssuer = configuration.JwtIssuer,

                ValidateAudience = true,
                ValidAudience = configuration.JwtAudience,

                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(configuration.JwtSecureKey)),

                ValidateLifetime = true,                // <--- обязательно
                ClockSkew = TimeSpan.Zero
            };
        });
    }
}