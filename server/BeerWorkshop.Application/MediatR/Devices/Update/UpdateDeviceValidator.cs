using FluentValidation;

namespace BeerWorkshop.Application.MediatR.Devices.Update;

public class UpdateDeviceValidator : AbstractValidator<UpdateDeviceCommand>
{
    public UpdateDeviceValidator()
    {
        RuleFor(p => p.Id)
            .NotNull().WithMessage("Device ID is required")
            .NotEqual(Guid.Empty).WithMessage("Device ID is required");
            
        RuleFor(p => p.Data).NotNull().WithMessage("Device data cannot be null");
        RuleFor(p => p.Data.Name).NotEmpty().WithMessage("Device name is required");
        RuleFor(p => p.Data.ShortName).NotEmpty().WithMessage("Device name is required");
    }
}