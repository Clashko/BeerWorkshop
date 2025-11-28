using BeerWorkshop.Database.Enums;

namespace BeerWorkshop.Application.Dto.Responses.Statistic;

public record StatisticProductRowResponseDto(
    string Name,
    ProductType ProductType,
    TransactionType TransactionType,
    decimal Quantity,
    decimal Price,
    string? Discount,
    decimal TotalAmount,
    DateTime TransactionDate
);