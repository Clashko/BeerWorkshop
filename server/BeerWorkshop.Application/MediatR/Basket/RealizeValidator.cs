using FluentValidation;

namespace BeerWorkshop.Application.MediatR.Basket;

public class RealizeValidator : AbstractValidator<RealizeCommand>
{
    public RealizeValidator()
    {
        RuleFor(p => p.Data).NotNull().WithMessage("Realize data cannot be null");
        RuleForEach(p => p.Data.Products).SetValidator(new RealizationItemValidator());
        RuleForEach(p => p.Data.Devices).SetValidator(new RealizationItemValidator());
        When(p => p.Data.TotalDiscount != null, () =>
        {
            RuleFor(p => p.Data.TotalDiscount).GreaterThan(0).WithMessage("Realize total discount must be greater than zero");
        });

        RuleFor(p => p.UserId)
            .NotNull().WithMessage("User is not authorized")
            .NotEqual(Guid.Empty).WithMessage("User is not authorized");
    }
}