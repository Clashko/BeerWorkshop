using BeerWorkshop.Application.Dto.Requests.Products;
using BeerWorkshop.Application.Dto.Responses;
using BeerWorkshop.Application.Dto.Responses.Products;
using MediatR;

namespace BeerWorkshop.Application.MediatR.Products.Create;

public record CreateProductCommand(CreateProductRequestDto Data) : IRequest<MediatrResponseDto<ProductResponseDto>>;
