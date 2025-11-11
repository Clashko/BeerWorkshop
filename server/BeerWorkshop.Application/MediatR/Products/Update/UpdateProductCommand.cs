using BeerWorkshop.Application.Dto.Requests.Products;
using BeerWorkshop.Application.Dto.Responses;
using BeerWorkshop.Application.Dto.Responses.Products;
using MediatR;

namespace BeerWorkshop.Application.MediatR.Products.Update;

public record UpdateProductCommand(Guid Id, UpdateProductRequestDto Data) : IRequest<MediatrResponseDto<ProductResponseDto>>;