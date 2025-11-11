using BeerWorkshop.Database.Enums;

namespace BeerWorkshop.Application.Dto.Responses.Statistic;

public record StatisticRowResponseDto(
    string Name,
    TransactionType TransactionType,
    decimal Quantity,
    decimal Price,
    string Discount,
    decimal TotalAmount,
    DateTime TransactionDate
);