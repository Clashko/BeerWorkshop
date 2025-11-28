using FluentValidation;

namespace BeerWorkshop.Application.MediatR.Users.RefreshToken;

public class RefreshTokenValidator : AbstractValidator<RefreshTokenCommand>
{
    public RefreshTokenValidator()
    {
        RuleFor(p => p.Dto).NotNull().WithMessage("RefreshToken data cannot be null");
        RuleFor(p => p.Dto.Token).NotEmpty().WithMessage("Token is required");
        RuleFor(p => p.Dto.RefreshToken).NotEmpty().WithMessage("RefreshToken is required");
    }
}