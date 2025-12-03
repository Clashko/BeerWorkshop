using BeerWorkshop.Application.Models;
using BeerWorkshop.Database.Entities.Users;
using BeerWorkshop.Database.Enums;

namespace BeerWorkshop.Application.Services.Interfaces;

public interface ICheckGenerator
{
    Task<string> GenerateAndSaveCheckAsync(Guid checkRowGuid, List<CheckRow> checkRows, decimal totalPrice, DateTime transactionDate, TransactionType transactionType, UserEntity cashier);
    CheckGenerationResult GenerateCheck(CheckModel checkModel, TransactionType transactionType);
}