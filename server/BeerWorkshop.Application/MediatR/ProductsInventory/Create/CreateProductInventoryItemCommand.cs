using BeerWorkshop.Application.Dto.Requests.ProductsInventory;
using BeerWorkshop.Application.Dto.Responses;
using BeerWorkshop.Application.Dto.Responses.ProductsInventory;
using MediatR;

namespace BeerWorkshop.Application.MediatR.ProductsInventory.Create;

public record CreateProductInventoryItemCommand(CreateProductInventoryItemRequestDto Data) : IRequest<MediatrResponseDto<ProductInventoryItemResponseDto>>;
