using BeerWorkshop.Database.Enums;

namespace BeerWorkshop.Application.Dto.Requests.Products;

public record CreateProductRequestDto(string Name, string ShortName, ProductType ProductType, UnitOfMeasure UnitOfMeasure);