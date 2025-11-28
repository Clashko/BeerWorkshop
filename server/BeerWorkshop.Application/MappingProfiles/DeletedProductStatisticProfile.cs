using AutoMapper;
using BeerWorkshop.Database.Entities.Products;
using BeerWorkshop.Database.Enums;

namespace BeerWorkshop.Application.MappingProfiles;

public class DeletedProductStatisticProfile : Profile
{
    public DeletedProductStatisticProfile()
    {
        CreateMap<ProductsStatisticEntity, DeletedProductsStatisticEntity>()
        .ForMember(s => s.ProductName, opt => opt.MapFrom((src, dest, destMember, context) =>
        {
            var param = (string)context.Items["ProductName"];
            return param;
        }))
        .ForMember(s => s.ProductType, opt => opt.MapFrom((src, dest, destMember, context) =>
        {
            var param = (ProductType)context.Items["ProductType"];
            return param;
        }));
    }
}