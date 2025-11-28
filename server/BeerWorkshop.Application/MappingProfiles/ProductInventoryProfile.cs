using AutoMapper;
using BeerWorkshop.Application.Dto.Requests.ProductsInventory;
using BeerWorkshop.Application.Dto.Responses.ProductsInventory;
using BeerWorkshop.Database.Entities.Products;

namespace BeerWorkshop.Application.MappingProfiles;

public class ProductInventoryProfile : Profile
{
    public ProductInventoryProfile()
    {
        CreateMap<ProductInventoryItemResponseDto, ProductsInventoryEntity>();

        CreateMap<ProductsInventoryEntity, ProductInventoryItemResponseDto>();
        CreateMap<ProductEntity, ProductInventoryResponseDto>()
            .ForMember(m => m.Product, opt => opt.MapFrom(src => src))
            .ForMember(m => m.InventoryItems, opt => opt.MapFrom(src => src.Inventory));

        CreateMap<IGrouping<ProductEntity, ProductsInventoryEntity>, ProductInventoryResponseDto>()
            .ForMember(dest => dest.Product,
                       opt => opt.MapFrom(src => src.Key))
            .ForMember(dest => dest.InventoryItems,
                       opt => opt.MapFrom(src => src));


        CreateMap<CreateProductInventoryItemRequestDto, ProductsInventoryEntity>();
        CreateMap<UpdateProductInventoryItemRequestDto, ProductsInventoryEntity>();
    }
}