using BeerWorkshop.Application.Dto.Requests.ProductsInventory;
using BeerWorkshop.Application.MediatR.ProductsInventory.Create;
using BeerWorkshop.Application.MediatR.ProductsInventory.Read;
using BeerWorkshop.Application.MediatR.ProductsInventory.Update;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace BeerWorkshop.Api.Controllers;

public class ProductsInventoryController(IMediator mediator) : BaseApiController
{
    [HttpGet]
    public async Task<IActionResult> Read() => HandleResult(await mediator.Send(new ReadProductsInventoryQuery()));

    [HttpPost]
    public async Task<IActionResult> Create(CreateProductInventoryItemRequestDto dto) => HandleResult(await mediator.Send(new CreateProductInventoryItemCommand(dto)));

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, UpdateProductInventoryItemRequestDto dto) => HandleResult(await mediator.Send(new UpdateProductInventoryItemCommand(id, dto)));
}