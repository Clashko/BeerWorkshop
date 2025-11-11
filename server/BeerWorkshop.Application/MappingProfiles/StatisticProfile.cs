using AutoMapper;
using BeerWorkshop.Application.Dto.Responses.Statistic;
using BeerWorkshop.Database.Entities.Devices;
using BeerWorkshop.Database.Entities.Products;

namespace BeerWorkshop.Application.MappingProfiles;

public class StatisticProfile : Profile
{
    public StatisticProfile()
    {
        CreateMap<ProductsStatisticEntity, StatisticRowResponseDto>().ForMember(m => m.Name, opt => opt.MapFrom(src => src.Product.Name));
        CreateMap<DevicesStatisticEntity, StatisticRowResponseDto>().ForMember(m => m.Name, opt => opt.MapFrom(src => src.Device.Name));
    }
}