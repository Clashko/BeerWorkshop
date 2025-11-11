using AutoMapper;
using BeerWorkshop.Application.Dto.Requests.Products;
using BeerWorkshop.Application.Dto.Responses.Products;
using BeerWorkshop.Database.Entities.Products;

namespace BeerWorkshop.Application.MappingProfiles;

public class ProductProfile : Profile
{
    public ProductProfile()
    {
        CreateMap<ProductEntity, ProductResponseDto>();
        CreateMap<CreateProductRequestDto, ProductEntity>();
        CreateMap<UpdateProductRequestDto, ProductEntity>();
    }
}