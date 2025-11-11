using AutoMapper;
using BeerWorkshop.Application.Dto.Responses.Checks;
using BeerWorkshop.Database.Entities;

namespace BeerWorkshop.Application.MappingProfiles;

public class ChecksProfile : Profile
{
    public ChecksProfile()
    {
        CreateMap<CheckEntity, CheckResponseDto>()
            .ForMember(dest => dest.CheckItems, opt => opt.MapFrom(src => new List<CheckItemResponseDto>()))
            .AfterMap((src, dest) =>
            {
                if (src.ProductsStatistics.Count > 0)
                {
                    dest.CheckItems.AddRange(src.ProductsStatistics.Select(ps => new CheckItemResponseDto(ps.Product.Name, ps.Quantity, ps.Price, ps.Discount)));
                }
                if (src.DeletedProductsStatistics.Count > 0)
                {
                    dest.CheckItems.AddRange(src.DeletedProductsStatistics.Select(dps => new CheckItemResponseDto(dps.ProductName, dps.Quantity, dps.Price, dps.Discount)));
                }
                if (src.DevicesStatistics.Count > 0)
                {
                    dest.CheckItems.AddRange(src.DevicesStatistics.Select(ds => new CheckItemResponseDto(ds.Device.Name, ds.Quantity, ds.Price, ds.Discount)));
                }
                if (src.DeletedDevicesStatistics.Count > 0)
                {
                    dest.CheckItems.AddRange(src.DeletedDevicesStatistics.Select(dds => new CheckItemResponseDto(dds.DeviceName, dds.Quantity, dds.Price, dds.Discount)));
                }
            });
    }
}