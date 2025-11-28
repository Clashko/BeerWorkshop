using BeerWorkshop.Database.Enums;

namespace BeerWorkshop.Application.Dto.Responses.WriteOff;

public record ExpiringProductInventoryItemResponseDto(
    Guid Id,
    decimal Quantity,
    DateTime IncomingDate,
    DateTime? OpeningDate,
    DateTime ManufactureDate,
    int ExpirationTime,
    ExpirationMeasure ExpirationMeasure,
    ExpirationCountingDateType ExpirationCountingDateType
);