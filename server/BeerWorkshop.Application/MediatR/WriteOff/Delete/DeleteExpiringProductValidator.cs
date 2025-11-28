using FluentValidation;

namespace BeerWorkshop.Application.MediatR.WriteOff.Delete;

public class DeleteExpiringProductValidator : AbstractValidator<DeleteExpiringProductCommand>
{
    public DeleteExpiringProductValidator()
    {
        RuleFor(p => p.Ids).NotNull().WithMessage("Expiring product Ids list is required");

        RuleFor(p => p.UserId)
            .NotNull().WithMessage("User is not authorized")
            .NotEqual(Guid.Empty).WithMessage("User is not authorized");
    }
}