using BeerWorkshop.Application.Dto.Requests.Users;
using BeerWorkshop.Application.Dto.Responses;
using BeerWorkshop.Application.Dto.Responses.Users;
using BeerWorkshop.Application.Models;
using BeerWorkshop.Application.Services.Interfaces;
using BeerWorkshop.Database.Contexts;
using BeerWorkshop.Database.Entities.Users;
using MediatR;

namespace BeerWorkshop.Application.MediatR.Users.RefreshToken;

public class RefreshTokenHandler(BeerWorkshopContext context, ITokenService tokenService, AuthConfiguration configuration) : IRequestHandler<RefreshTokenCommand, MediatrResponseDto<TokensResponseDto>>
{
    public async Task<MediatrResponseDto<TokensResponseDto>> Handle(RefreshTokenCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var existingUser = await GetUser(request.Dto, cancellationToken);

            var newToken = tokenService.GenerateAccessToken(existingUser);
            var newRefreshToken = tokenService.GenerateRefreshToken();

            existingUser.RefreshToken = newRefreshToken;
            existingUser.RefreshTokenExpiryTime = DateTime.Now.AddDays(configuration.RefreshTokenLifeTimeInDays);

            await context.SaveChangesAsync(cancellationToken);

            return MediatrResponseDto<TokensResponseDto>.Success(new TokensResponseDto(newToken, newRefreshToken), "Token succesfully refreshed");
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return MediatrResponseDto<TokensResponseDto>.Failure($"Error in refresh token process: {ex.Message}");
        }
    }

    private async Task<UserEntity> GetUser(RefreshTokenRequestDto request, CancellationToken cancellationToken)
    {
        var principal = tokenService.GetPrincipalFromExpiredToken(request.Token);

        if (principal is null || principal.Identity is null || principal.Identity.Name is null)
            throw new Exception("Invalid access token");

        var user = await context.Users.FindAsync([Guid.Parse(principal.Identity.Name)], cancellationToken);

        if (user is null)
            throw new Exception("Can't find user by expired token");

        if (user.RefreshToken is null || user.RefreshTokenExpiryTime is null)
            throw new Exception("RefreshToken or RefreshTokenExpiryTime doesn't set in database");

        if (!user.RefreshToken.Equals(request.RefreshToken) || user.RefreshTokenExpiryTime <= DateTime.Now)
            throw new Exception("RefreshToken is invalid or expired");

        return user;
    }
}