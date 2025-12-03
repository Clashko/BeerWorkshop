using BeerWorkshop.Application.Dto.Requests.DevicesInventory;
using BeerWorkshop.Application.MediatR.DevicesInventory.Delivery;
using BeerWorkshop.Application.MediatR.DevicesInventory.Read;
using BeerWorkshop.Application.MediatR.DevicesInventory.Update;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BeerWorkshop.Api.Controllers;

[Authorize]
public class DevicesInventoryController(IMediator mediator) : BaseApiController
{
    [HttpGet]
    public async Task<IActionResult> Read() => HandleResult(await mediator.Send(new ReadDevicesInventoryQuery()));

    // [HttpPost]
    // public async Task<IActionResult> Create(CreateDeviceInventoryItemRequestDto dto) => HandleResult(await mediator.Send(new CreateDeviceInventoryItemCommand(dto)));

    [HttpPost]
    public async Task<IActionResult> Create(IEnumerable<CreateDevicesDeliveryRequestDto> deliveries) => HandleResult(await mediator.Send(new DevicesDeliveryCommand(deliveries, GetAuthenticatedUserId())));

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, UpdateDeviceInventoryItemRequestDto dto) => HandleResult(await mediator.Send(new UpdateDeviceInventoryItemCommand(id, dto)));
}