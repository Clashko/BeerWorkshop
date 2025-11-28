using BeerWorkshop.Application.Dto.Responses;
using BeerWorkshop.Application.Dto.Responses.Users;
using BeerWorkshop.Application.Helpers;
using BeerWorkshop.Application.Models;
using BeerWorkshop.Application.Services.Interfaces;
using BeerWorkshop.Database.Contexts;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BeerWorkshop.Application.MediatR.Users.Login;

public class LoginHandler(BeerWorkshopContext context, ITokenService tokenService, AuthConfiguration configuration) : IRequestHandler<LoginCommand, MediatrResponseDto<TokensResponseDto>>
{
    public async Task<MediatrResponseDto<TokensResponseDto>> Handle(LoginCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var existingUser = await context.Users.FirstOrDefaultAsync(u => u.Login.Equals(request.Dto.Login), cancellationToken);

            if (existingUser == null)
                return MediatrResponseDto<TokensResponseDto>.NotFound($"User with login: {request.Dto.Login} not founded");

            if (!existingUser.Password.Equals(CryptHelper.Md5Hash(request.Dto.Login, request.Dto.Password)))
                return MediatrResponseDto<TokensResponseDto>.Failure($"User password is incorrect");

            var token = tokenService.GenerateAccessToken(existingUser);
            var refreshToken = tokenService.GenerateRefreshToken();

            existingUser.RefreshToken = refreshToken;
            existingUser.RefreshTokenExpiryTime = DateTime.Now.AddDays(configuration.RefreshTokenLifeTimeInDays);

            await context.SaveChangesAsync(cancellationToken);

            return MediatrResponseDto<TokensResponseDto>.Success(new TokensResponseDto(token, refreshToken), "User successfully logged in");
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return MediatrResponseDto<TokensResponseDto>.Failure($"Error in login process: {ex.Message}");
        }
    }
}