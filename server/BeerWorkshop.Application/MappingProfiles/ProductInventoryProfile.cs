using AutoMapper;
using BeerWorkshop.Application.Dto.Requests.ProductsInventory;
using BeerWorkshop.Application.Dto.Responses.ProductsInventory;
using BeerWorkshop.Database.Entities.Products;

namespace BeerWorkshop.Application.MappingProfiles;

public class ProductInventoryProfile : Profile
{
    public ProductInventoryProfile()
    {
        CreateMap<ProductsInventoryEntity, ProductInventoryItemResponseDto>();
        CreateMap<ProductInventoryItemResponseDto, ProductsInventoryEntity>();

        CreateMap<ProductEntity, ProductInventoryResponseDto>()
            .ForMember(m => m.Product, opt => opt.MapFrom(src => src))
            .ForMember(m => m.InventoryItems, opt => opt.MapFrom(src => src.Inventory));

        CreateMap<CreateProductInventoryItemRequestDto, ProductsInventoryEntity>();
        CreateMap<UpdateProductInventoryItemRequestDto, ProductsInventoryEntity>();
    }
}