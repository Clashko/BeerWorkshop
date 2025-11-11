using BeerWorkshop.Application.Dto.Responses;
using MediatR;

namespace BeerWorkshop.Application.MediatR.Products.Delete;

public record DeleteProductCommand(Guid Id) : IRequest<MediatrResponseDto<Unit>>;