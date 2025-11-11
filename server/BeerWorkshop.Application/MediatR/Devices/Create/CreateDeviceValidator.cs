using FluentValidation;

namespace BeerWorkshop.Application.MediatR.Devices.Create;

public class CreateDeviceValidator : AbstractValidator<CreateDeviceCommand>
{
    public CreateDeviceValidator()
    {
        RuleFor(p => p.Data).NotNull().WithMessage("Device data cannot be null");
        RuleFor(p => p.Data.Name).NotEmpty().WithMessage("Device name is required");
        RuleFor(p => p.Data.ShortName).NotEmpty().WithMessage("Device name is required");
    }
}