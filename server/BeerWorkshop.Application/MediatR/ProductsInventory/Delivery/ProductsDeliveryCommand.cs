using BeerWorkshop.Application.Dto.Requests.ProductsInventory;
using BeerWorkshop.Application.Dto.Responses;
using BeerWorkshop.Application.Dto.Responses.ProductsInventory;
using MediatR;

namespace BeerWorkshop.Application.MediatR.ProductsInventory.Delivery;

public record ProductsDeliveryCommand(IEnumerable<CreateProductsDeliveryRequestDto> Deliveries, Guid UserId) : IRequest<MediatrResponseDto<CreateProductsDeliveryResponseDto>>;