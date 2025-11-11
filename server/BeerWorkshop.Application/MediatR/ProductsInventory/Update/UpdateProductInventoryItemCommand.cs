using BeerWorkshop.Application.Dto.Requests.ProductsInventory;
using BeerWorkshop.Application.Dto.Responses;
using BeerWorkshop.Application.Dto.Responses.ProductsInventory;
using MediatR;

namespace BeerWorkshop.Application.MediatR.ProductsInventory.Update;

public record UpdateProductInventoryItemCommand(Guid Id, UpdateProductInventoryItemRequestDto Data) : IRequest<MediatrResponseDto<ProductInventoryItemResponseDto>>;
