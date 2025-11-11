using BeerWorkshop.Application.Dto.Responses;
using BeerWorkshop.Application.Dto.Responses.Products;
using MediatR;

namespace BeerWorkshop.Application.MediatR.Products.Read;

public record ReadProductsQuery() : IRequest<MediatrResponseDto<IEnumerable<ProductResponseDto>>>;