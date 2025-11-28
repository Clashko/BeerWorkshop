using FluentValidation;

namespace BeerWorkshop.Application.MediatR.Users.Register;

public class RegisterValidator : AbstractValidator<RegisterCommand>
{
    public RegisterValidator()
    {
        RuleFor(p => p.Dto).NotNull().WithMessage("User data cannot be null");
        RuleFor(p => p.Dto.Login).NotEmpty().WithMessage("User name is required");
        RuleFor(p => p.Dto.FirstName).NotEmpty().WithMessage("User firstname is required");
        RuleFor(p => p.Dto.LastName).NotEmpty().WithMessage("User lastname is required");
        RuleFor(p => p.Dto.SurName).NotEmpty().WithMessage("User surname is required");
    }
}