using FluentValidation;

namespace BeerWorkshop.Application.MediatR.Products.Delete;

public class DeleteProductValidator : AbstractValidator<DeleteProductCommand>
{
    public DeleteProductValidator()
    {
        RuleFor(p => p.Id)
            .NotNull().WithMessage("Product ID is required")
            .NotEqual(Guid.Empty).WithMessage("Product ID is required");
    }
}