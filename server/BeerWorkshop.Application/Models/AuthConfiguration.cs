namespace BeerWorkshop.Application.Models
{
    public record AuthConfiguration(string JwtSecureKey, int JwtLifeTimeInMinutes, int RefreshTokenLifeTimeInDays, string JwtIssuer, string JwtAudience);
}