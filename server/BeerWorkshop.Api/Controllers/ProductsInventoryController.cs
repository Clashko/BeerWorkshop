using BeerWorkshop.Application.Dto.Requests.ProductsInventory;
using BeerWorkshop.Application.MediatR.ProductsInventory.Create;
using BeerWorkshop.Application.MediatR.ProductsInventory.Delivery;
using BeerWorkshop.Application.MediatR.ProductsInventory.Read;
using BeerWorkshop.Application.MediatR.ProductsInventory.Update;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BeerWorkshop.Api.Controllers;

[Authorize]
public class ProductsInventoryController(IMediator mediator) : BaseApiController
{
    [HttpGet]
    public async Task<IActionResult> Read() => HandleResult(await mediator.Send(new ReadProductsInventoryQuery()));

    // [HttpPost]
    // public async Task<IActionResult> Create(CreateProductInventoryItemRequestDto dto) => HandleResult(await mediator.Send(new CreateProductInventoryItemCommand(dto)));

    [HttpPost]
    public async Task<IActionResult> Create(IEnumerable<CreateProductsDeliveryRequestDto> deliveries) => HandleResult(await mediator.Send(new ProductsDeliveryCommand(deliveries, GetAuthenticatedUserId())));

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, UpdateProductInventoryItemRequestDto dto) => HandleResult(await mediator.Send(new UpdateProductInventoryItemCommand(id, dto)));
}