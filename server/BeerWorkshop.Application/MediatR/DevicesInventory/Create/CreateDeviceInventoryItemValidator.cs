using FluentValidation;

namespace BeerWorkshop.Application.MediatR.DevicesInventory.Create;

public class CreateDeviceInventoryItemValidator : AbstractValidator<CreateDeviceInventoryItemCommand>
{
    public CreateDeviceInventoryItemValidator()
    {
        RuleFor(p => p.Data).NotNull().WithMessage("Device inventory item data cannot be null");

        RuleFor(p => p.Data.DeviceId)
            .NotNull().WithMessage("Device ID is required")
            .NotEqual(Guid.Empty).WithMessage("Device ID is required");

        RuleFor(p => p.Data.IncomingDate).NotNull().WithMessage("Device inventory item incoming date is required");

        RuleFor(p => p.Data.PurchasePrice)
            .NotNull().WithMessage("Device inventory item purchase price is required")
            .Must(v => v > 0).WithMessage("Device inventory item purchase price must be greater than zero");
        
        RuleFor(p => p.Data.RetailPrice)
            .NotNull().WithMessage("Device inventory item retail price is required")
            .Must(v => v > 0).WithMessage("Device inventory item retail price must be greater than zero");
    }
}