using BeerWorkshop.Database.Enums;

namespace BeerWorkshop.Application.Dto.Responses.Checks;

public record CheckResponseDto(
    Guid Id,
    int OrderNumber,
    decimal TotalAmount,
    TransactionType TransactionType,
    DateTime TransactionDate,

    List<CheckItemResponseDto> CheckItems
);