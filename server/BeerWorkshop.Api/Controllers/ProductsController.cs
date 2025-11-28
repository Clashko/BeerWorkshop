using BeerWorkshop.Application.Dto.Requests.Products;
using BeerWorkshop.Application.MediatR.Products.Create;
using BeerWorkshop.Application.MediatR.Products.Delete;
using BeerWorkshop.Application.MediatR.Products.Read;
using BeerWorkshop.Application.MediatR.Products.Update;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BeerWorkshop.Api.Controllers;

[Authorize]
public class ProductsController(IMediator mediator) : BaseApiController
{
    [HttpGet]
    public async Task<IActionResult> Read() => HandleResult(await mediator.Send(new ReadProductsQuery()));

    [HttpPost]
    public async Task<IActionResult> Create(CreateProductRequestDto dto) => HandleResult(await mediator.Send(new CreateProductCommand(dto)));

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, UpdateProductRequestDto dto) => HandleResult(await mediator.Send(new UpdateProductCommand(id, dto)));

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id) => HandleResult(await mediator.Send(new DeleteProductCommand(id)));
}