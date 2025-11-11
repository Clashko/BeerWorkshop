using BeerWorkshop.Application.Dto.Responses;
using MediatR;

namespace BeerWorkshop.Application.MediatR.Checks.GetContent;

public record GetCheckContentCommand(Guid Id) : IRequest<MediatrResponseDto<string>>;