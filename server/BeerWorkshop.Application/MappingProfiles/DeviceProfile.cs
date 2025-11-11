using AutoMapper;
using BeerWorkshop.Application.Dto.Requests.Devices;
using BeerWorkshop.Application.Dto.Responses.Devices;
using BeerWorkshop.Database.Entities.Devices;

namespace BeerWorkshop.Application.MappingProfiles;

public class DeviceProfile : Profile
{
    public DeviceProfile()
    {
        CreateMap<DeviceEntity, DeviceResponseDto>();
        CreateMap<CreateDeviceRequestDto, DeviceEntity>();
        CreateMap<UpdateDeviceRequestDto, DeviceEntity>();
    }
}