using BeerWorkshop.Application.Dto.Responses;
using BeerWorkshop.Database.Contexts;
using MediatR;

namespace BeerWorkshop.Application.MediatR.Checks.GetContent
{
    public class GetCheckContentHandler(BeerWorkshopContext context) : IRequestHandler<GetCheckContentCommand, MediatrResponseDto<string>>
    {
        public async Task<MediatrResponseDto<string>> Handle(GetCheckContentCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var check = await context.Checks.FindAsync([request.Id], cancellationToken);

                if (check is null)
                    return MediatrResponseDto<string>.NotFound("Check not founded");

                var result = File.ReadAllText(check.Path);

                return MediatrResponseDto<string>.Success(result, $"Check successfully founded");
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return MediatrResponseDto<string>.Failure($"Error while reading checks: {ex.Message}");
            }
        }
    }
}