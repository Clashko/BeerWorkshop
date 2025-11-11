using BeerWorkshop.Application.Dto.Requests.Devices;
using BeerWorkshop.Application.MediatR.Devices.Create;
using BeerWorkshop.Application.MediatR.Devices.Delete;
using BeerWorkshop.Application.MediatR.Devices.Read;
using BeerWorkshop.Application.MediatR.Devices.Update;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace BeerWorkshop.Api.Controllers;

public class DevicesController(IMediator mediator) : BaseApiController
{
    [HttpGet]
    public async Task<IActionResult> Read() => HandleResult(await mediator.Send(new ReadDevicesQuery()));

    [HttpPost]
    public async Task<IActionResult> Create(CreateDeviceRequestDto dto) => HandleResult(await mediator.Send(new CreateDeviceCommand(dto)));

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, UpdateDeviceRequestDto dto) => HandleResult(await mediator.Send(new UpdateDeviceCommand(id, dto)));

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id) => HandleResult(await mediator.Send(new DeleteDeviceCommand(id)));
}