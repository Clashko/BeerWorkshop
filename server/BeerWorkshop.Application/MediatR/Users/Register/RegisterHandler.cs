using AutoMapper;
using BeerWorkshop.Application.Dto.Responses;
using BeerWorkshop.Application.Helpers;
using BeerWorkshop.Database.Contexts;
using BeerWorkshop.Database.Entities.Users;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BeerWorkshop.Application.MediatR.Users.Register;

public class RegisterHandler(BeerWorkshopContext context, IMapper mapper) : IRequestHandler<RegisterCommand, MediatrResponseDto<Unit>>
{
    public async Task<MediatrResponseDto<Unit>> Handle(RegisterCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var existingUser = await context.Users.FirstOrDefaultAsync(u => u.Login.Equals(request.Dto.Login), cancellationToken);

            if (existingUser != null)
                return MediatrResponseDto<Unit>.Failure($"User with login: {request.Dto.Login} already exists");

            var user = mapper.Map<UserEntity>(request.Dto);

            user.Password = CryptHelper.Md5Hash(request.Dto.Login, request.Dto.Password);

            context.Users.Add(user);

            await context.SaveChangesAsync(cancellationToken);

            return MediatrResponseDto<Unit>.Success(Unit.Value, "User successfully registered");
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return MediatrResponseDto<Unit>.Failure($"Error while registering user: {ex.Message}");
        }
    }
}