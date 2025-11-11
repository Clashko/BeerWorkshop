using AutoMapper;
using BeerWorkshop.Database.Entities.Products;

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
        }));
    }
}