using FluentValidation;

namespace BeerWorkshop.Application.MediatR.ProductsInventory.Update;

public class UpdateProductInventoryItemValidator : AbstractValidator<UpdateProductInventoryItemCommand>
{
    public UpdateProductInventoryItemValidator()
    {
        RuleFor(p => p.Id)
            .NotNull().WithMessage("Product inventory item ID is required")
            .NotEqual(Guid.Empty).WithMessage("Product inventory item ID is required");

        RuleFor(p => p.Data).NotNull().WithMessage("Product inventory item data cannot be null");

        RuleFor(p => p.Data.IncomingDate).NotNull().WithMessage("Product inventory item incoming date is required");

        RuleFor(p => p.Data.PurchasePrice)
            .NotNull().WithMessage("Product inventory item purchase price is required")
            .Must(v => v > 0).WithMessage("Product inventory item purchase price must be greater than zero");
        
        RuleFor(p => p.Data.RetailPrice)
            .NotNull().WithMessage("Product inventory item retail price is required")
            .Must(v => v > 0).WithMessage("Product inventory item retail price must be greater than zero");

        RuleFor(p => p.Data.ManufactureDate).NotNull().WithMessage("Product inventory item manufacture date is required");

        RuleFor(p => p.Data.ExpirationTime)
            .NotNull().WithMessage("Product inventory item expiration time is required")
            .Must(v => v > 0).WithMessage("Product inventory item expiration time must be greater than zero");

        RuleFor(p => p.Data.ExpirationMeasure).IsInEnum().WithMessage("Invalid expiration measure type");
    }
}