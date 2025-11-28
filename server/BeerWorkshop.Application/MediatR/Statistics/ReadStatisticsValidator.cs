using FluentValidation;

namespace BeerWorkshop.Application.MediatR.Statistics;

public class ReadStatisticsValidator : AbstractValidator<ReadStatisticsQuery>
{
    public ReadStatisticsValidator()
    {
        RuleFor(p => p.Dto).NotNull().WithMessage("Read statistics dto cannot be null");
        RuleFor(p => p.Dto.FirstDate).NotNull().WithMessage("Read statistics first date is required");
        RuleFor(p => p.Dto.SecondDate).NotNull().WithMessage("Read statistics second date is required");
    }
}