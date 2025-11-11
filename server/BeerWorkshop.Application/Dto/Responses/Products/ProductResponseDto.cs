using BeerWorkshop.Database.Enums;

namespace BeerWorkshop.Application.Dto.Responses.Products;

public record ProductResponseDto(Guid Id, string Name, string ShortName, ProductType ProductType, UnitOfMeasure UnitOfMeasure);