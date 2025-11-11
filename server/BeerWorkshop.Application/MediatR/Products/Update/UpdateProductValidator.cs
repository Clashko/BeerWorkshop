using FluentValidation;

namespace BeerWorkshop.Application.MediatR.Products.Update;

public class UpdateProductValidator : AbstractValidator<UpdateProductCommand>
{
    public UpdateProductValidator()
    {
        RuleFor(p => p.Id)
            .NotNull().WithMessage("Product ID is required")
            .NotEqual(Guid.Empty).WithMessage("Product ID is required");
            
        RuleFor(p => p.Data).NotNull().WithMessage("Product data cannot be null");
        RuleFor(p => p.Data.Name).NotEmpty().WithMessage("Product name is required");
        RuleFor(p => p.Data.ShortName).NotEmpty().WithMessage("Product name is required");
        RuleFor(p => p.Data.ProductType).IsInEnum().WithMessage("Ivalid product type");
        RuleFor(p => p.Data.UnitOfMeasure).IsInEnum().WithMessage("Ivalid unit of measure");
    }
}