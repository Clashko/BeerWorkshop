namespace BeerWorkshop.Application.Dto.Requests.WriteOff
{
    public record WriteOffRequestDto(IEnumerable<Guid> Ids, string Cashier);
}