using System.Security.Claims;
using BeerWorkshop.Database.Entities.Users;

namespace BeerWorkshop.Application.Services.Interfaces;

public interface ITokenService
{
    string GenerateAccessToken(UserEntity user);
    string GenerateRefreshToken();
    ClaimsPrincipal GetPrincipalFromExpiredToken(string token);
}