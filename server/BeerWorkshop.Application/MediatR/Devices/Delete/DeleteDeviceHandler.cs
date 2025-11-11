using BeerWorkshop.Application.Dto.Responses;
using BeerWorkshop.Database.Contexts;
using MediatR;

namespace BeerWorkshop.Application.MediatR.Devices.Delete;

public class DeleteDevicesHandler(BeerWorkshopContext context) : IRequestHandler<DeleteDeviceCommand, MediatrResponseDto<Unit>>
{
    public async Task<MediatrResponseDto<Unit>> Handle(DeleteDeviceCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var device = await context.Devices.FindAsync([request.Id], cancellationToken: cancellationToken);

            if (device is null)
                return MediatrResponseDto<Unit>.NotFound("Device not founded");

            context.Devices.Remove(device);

            await context.SaveChangesAsync(cancellationToken);

            return MediatrResponseDto<Unit>.Success(Unit.Value, $"Device with id: {request.Id} is successfully deleted");
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return MediatrResponseDto<Unit>.Failure($"Error while deleting Device: {ex.Message}");
        }
    }
}