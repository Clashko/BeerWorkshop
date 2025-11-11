using BeerWorkshop.Database.Enums;

namespace BeerWorkshop.Application.Dto.Requests.Products;

public record UpdateProductRequestDto(string Name, string ShortName, ProductType ProductType, UnitOfMeasure UnitOfMeasure);