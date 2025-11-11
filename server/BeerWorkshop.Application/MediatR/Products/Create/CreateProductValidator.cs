using FluentValidation;

namespace BeerWorkshop.Application.MediatR.Products.Create;

public class CreateProductValidator : AbstractValidator<CreateProductCommand>
{
    public CreateProductValidator()
    {
        RuleFor(p => p.Data).NotNull().WithMessage("Product data cannot be null");
        RuleFor(p => p.Data.Name).NotEmpty().WithMessage("Product name is required");
        RuleFor(p => p.Data.ShortName).NotEmpty().WithMessage("Product name is required");
        RuleFor(p => p.Data.ProductType).IsInEnum().WithMessage("Ivalid product type");
        RuleFor(p => p.Data.UnitOfMeasure).IsInEnum().WithMessage("Ivalid unit of measure");
    }
}