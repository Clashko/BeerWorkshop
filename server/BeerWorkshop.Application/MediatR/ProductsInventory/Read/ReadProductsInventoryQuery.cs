using BeerWorkshop.Application.Dto.Responses;
using BeerWorkshop.Application.Dto.Responses.ProductsInventory;
using MediatR;

namespace BeerWorkshop.Application.MediatR.ProductsInventory.Read;

public record ReadProductsInventoryQuery() : IRequest<MediatrResponseDto<IEnumerable<ProductInventoryResponseDto>>>;