using BeerWorkshop.Application.Dto.Requests.Checks;
using BeerWorkshop.Application.Dto.Responses;
using BeerWorkshop.Application.Dto.Responses.Checks;
using MediatR;

namespace BeerWorkshop.Application.MediatR.Checks.Read;

public record ReadChecksQuery(ReadChecksRequestDto Data) : IRequest<MediatrResponseDto<IEnumerable<CheckResponseDto>>>;