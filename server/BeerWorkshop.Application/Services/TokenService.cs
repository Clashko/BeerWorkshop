using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using BeerWorkshop.Application.Models;
using BeerWorkshop.Application.Services.Interfaces;
using BeerWorkshop.Database.Entities.Users;
using Microsoft.IdentityModel.Tokens;

namespace BeerWorkshop.Application.Services;

public class TokenService(AuthConfiguration configuration) : ITokenService
{
    public string GenerateAccessToken(UserEntity user)
    {
        var secureKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(configuration.JwtSecureKey));
        var signingCredentials = new SigningCredentials(secureKey, SecurityAlgorithms.HmacSha256);
        var tokenOptions = new JwtSecurityToken(
            issuer: configuration.JwtIssuer,
            audience: configuration.JwtAudience,
            claims: [
                new(ClaimTypes.Name, user.Id.ToString()),
            ],
            expires: DateTime.UtcNow.AddMinutes(configuration.JwtLifeTimeInMinutes),
            signingCredentials: signingCredentials
        );
        var token = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
        return token;
    }

    public string GenerateRefreshToken()
    {
        var randomNumber = new byte[32];
        using var rng = RandomNumberGenerator.Create();
        rng.GetBytes(randomNumber);
        return Convert.ToBase64String(randomNumber);
    }

    public ClaimsPrincipal GetPrincipalFromExpiredToken(string token)
    {
        var tokenValidationParameters = new TokenValidationParameters
        {
            ValidateAudience = false,
            ValidateIssuer = false,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(configuration.JwtSecureKey)),
            ValidateLifetime = false
        };
        var tokenHandler = new JwtSecurityTokenHandler();
        var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out var securityToken);
        return securityToken is not JwtSecurityToken jwtSecurityToken || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase)
            ? throw new Exception("Invalid access token")
            : principal;
    }
}