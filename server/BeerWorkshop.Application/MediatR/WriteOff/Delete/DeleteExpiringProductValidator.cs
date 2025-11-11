using FluentValidation;

namespace BeerWorkshop.Application.MediatR.WriteOff.Delete;

public class DeleteExpiringProductValidator : AbstractValidator<DeleteExpiringProductCommand>
{
    public DeleteExpiringProductValidator()
    {
        RuleFor(p => p.Data.Ids).NotNull().WithMessage("Expiring product Ids list is required");
        RuleFor(p => p.Data.Cashier)
            .NotNull().WithMessage("Expiring product Ids list is required")
            .NotEmpty().WithMessage("Expiring product Ids list is required");
    }
}