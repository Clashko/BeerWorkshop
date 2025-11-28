using AutoMapper;
using BeerWorkshop.Application.Dto.Requests.Users;
using BeerWorkshop.Application.Dto.Responses.Users;
using BeerWorkshop.Database.Entities.Users;

namespace BeerWorkshop.Application.MappingProfiles;

public class UserProfile : Profile
{
    public UserProfile()
    {
        CreateMap<RegisterUserRequestDto, UserEntity>();
        CreateMap<UserEntity, UserResponseDto>();
    }
}