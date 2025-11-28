using FluentValidation;

namespace BeerWorkshop.Application.MediatR.Users.Login;

public class LoginValidator : AbstractValidator<LoginCommand>
{
    public LoginValidator()
    {
        RuleFor(p => p.Dto).NotNull().WithMessage("User data cannot be null");
        RuleFor(p => p.Dto.Login).NotEmpty().WithMessage("User name is required");
        RuleFor(p => p.Dto.Password).NotEmpty().WithMessage("User password is required");
    }
}