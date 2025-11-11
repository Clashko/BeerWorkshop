using BeerWorkshop.Application.Models;
using BeerWorkshop.Database.Enums;

namespace BeerWorkshop.Application.Services.Interfaces;

public interface ICheckGenerator
{
    CheckGenerationResult GenerateCheck(CheckModel checkModel, TransactionType transactionType);
}