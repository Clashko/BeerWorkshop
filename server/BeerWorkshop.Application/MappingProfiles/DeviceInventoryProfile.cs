using AutoMapper;
using BeerWorkshop.Application.Dto.Requests.DevicesInventory;
using BeerWorkshop.Application.Dto.Responses.DevicesInventory;
using BeerWorkshop.Database.Entities.Devices;

namespace BeerWorkshop.Application.MappingProfiles;

public class DeviceInventoryProfile : Profile
{
    public DeviceInventoryProfile()
    {
        CreateMap<DevicesInventoryEntity, DeviceInventoryItemResponseDto>();
        CreateMap<DeviceInventoryItemResponseDto, DevicesInventoryEntity>();

        CreateMap<DeviceEntity, DeviceInventoryResponseDto>()
            .ForMember(m => m.Device, opt => opt.MapFrom(src => src))
            .ForMember(m => m.InventoryItems, opt => opt.MapFrom(src => src.Inventory));
            
        CreateMap<CreateDeviceInventoryItemRequestDto, DevicesInventoryEntity>();
        CreateMap<UpdateDeviceInventoryItemRequestDto, DevicesInventoryEntity>();
    }
}