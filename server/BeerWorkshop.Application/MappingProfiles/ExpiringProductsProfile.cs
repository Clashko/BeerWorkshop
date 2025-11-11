using AutoMapper;
using BeerWorkshop.Application.Dto.Responses.WriteOff;
using BeerWorkshop.Database.Entities.Products;

namespace BeerWorkshop.Application.MappingProfiles;

public class ExpiringProductsProfile : Profile
{
    public ExpiringProductsProfile()
    {
        CreateMap<ProductsInventoryEntity, ExpiringProductInventoryItemResponseDto>();
    }
}