using BeerWorkshop.Application.Enums;
using FluentValidation;

namespace BeerWorkshop.Application.MediatR.Checks.Read;

public class ReadChecksValidator : AbstractValidator<ReadChecksQuery>
{
    public ReadChecksValidator()
    {
        RuleFor(p => p.Data).NotNull().WithMessage("Read checks data cannot be null");
        RuleFor(p => p.Data.PeriodType).IsInEnum().WithMessage("Read checks invalid period type");
        RuleFor(p => p.Data.FirstDate).NotNull().WithMessage("Read checks first date is required");

        When(p => p.Data.PeriodType.Equals(ReadChecksPeriodType.Period), () =>
        {
            RuleFor(p => p.Data.SecondDate).NotNull().WithMessage("Read checks second date is required");
            RuleFor(p => p.Data.FirstDate).LessThan(p => p.Data.SecondDate).WithMessage("Read checks first date must be less than second date");
        });
    }
}