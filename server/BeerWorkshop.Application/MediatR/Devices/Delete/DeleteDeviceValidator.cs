using FluentValidation;

namespace BeerWorkshop.Application.MediatR.Devices.Delete;

public class DeleteDeviceValidator : AbstractValidator<DeleteDeviceCommand>
{
    public DeleteDeviceValidator()
    {
        RuleFor(p => p.Id)
            .NotNull().WithMessage("Device ID is required")
            .NotEqual(Guid.Empty).WithMessage("Device ID is required");
    }
}