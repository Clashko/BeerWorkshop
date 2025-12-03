using BeerWorkshop.Application.Dto.Requests.DevicesInventory;
using BeerWorkshop.Application.Dto.Responses;
using BeerWorkshop.Application.Dto.Responses.DevicesInventory;
using MediatR;

namespace BeerWorkshop.Application.MediatR.DevicesInventory.Delivery;

public record DevicesDeliveryCommand(IEnumerable<CreateDevicesDeliveryRequestDto> Deliveries, Guid UserId) : IRequest<MediatrResponseDto<CreateDevicesDeliveryResponseDto>>;