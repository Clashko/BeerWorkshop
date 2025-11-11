using BeerWorkshop.Application.Dto.Requests.Basket;
using FluentValidation;

namespace BeerWorkshop.Application.MediatR.Basket;

public class RealizationItemValidator : AbstractValidator<RealizationItemRequestDto>
{
    public RealizationItemValidator()
    {
        RuleFor(x => x.Id)
            .NotNull().WithMessage("Realization item ID is required")
            .NotEqual(Guid.Empty).WithMessage("Realization item ID is required");

        RuleFor(x => x.Quantity)
            .NotNull().WithMessage("Realization item quantity is required")
            .GreaterThan(0).WithMessage("Realization item quantity must be greater than zero");

        When(x => x.DiscountPercent is not null, () =>
        {
            RuleFor(x => x.DiscountPercent).GreaterThan(0).WithMessage("Realization item quantity must be greater than zero");
        });
    }
}