using BeerWorkshop.Application.Models;

namespace BeerWorkshop.Application.Services.Interfaces;

public interface ICheckNumberService
{
    CheckNumberServiceParameters GetParameters();
}