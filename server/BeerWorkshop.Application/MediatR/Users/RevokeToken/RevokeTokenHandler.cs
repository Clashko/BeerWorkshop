using BeerWorkshop.Application.Dto.Responses;
using BeerWorkshop.Application.Models;
using BeerWorkshop.Database.Contexts;
using MediatR;

namespace BeerWorkshop.Application.MediatR.Users.RevokeToken;

public class RevokeTokenHandler(BeerWorkshopContext context) : IRequestHandler<RevokeTokenCommand, MediatrResponseDto<Unit>>
{
    public async Task<MediatrResponseDto<Unit>> Handle(RevokeTokenCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var existingUser = await context.Users.FindAsync([request.UserId], cancellationToken);
            if (existingUser is null)
                return MediatrResponseDto<Unit>.NotFound("Authenticated user not founded");

            existingUser.RefreshToken = null;
            existingUser.RefreshTokenExpiryTime = null;

            await context.SaveChangesAsync(cancellationToken);

            return MediatrResponseDto<Unit>.Success(Unit.Value, "User succesfully unauthorized");
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return MediatrResponseDto<Unit>.Failure($"Error in unauthorize process: {ex.Message}");
        }
    }
}