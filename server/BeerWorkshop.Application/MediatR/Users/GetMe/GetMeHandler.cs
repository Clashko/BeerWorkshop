using AutoMapper;
using BeerWorkshop.Application.Dto.Responses;
using BeerWorkshop.Application.Dto.Responses.Users;
using BeerWorkshop.Database.Contexts;
using MediatR;

namespace BeerWorkshop.Application.MediatR.Users.GetMe;

public class GetMeHandler(BeerWorkshopContext context, IMapper mapper) : IRequestHandler<GetMeCommand, MediatrResponseDto<UserResponseDto>>
{
    public async Task<MediatrResponseDto<UserResponseDto>> Handle(GetMeCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var existingUser = await context.Users.FindAsync([request.UserId], cancellationToken);

            if (existingUser == null)
                return MediatrResponseDto<UserResponseDto>.NotFound("User not founded");

            var result = mapper.Map<UserResponseDto>(existingUser);

            return MediatrResponseDto<UserResponseDto>.Success(result, "User successfully founded");
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return MediatrResponseDto<UserResponseDto>.Failure($"Error in get me process: {ex.Message}");
        }
    }
}