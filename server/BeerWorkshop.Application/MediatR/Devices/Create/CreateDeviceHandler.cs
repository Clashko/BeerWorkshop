using AutoMapper;
using BeerWorkshop.Application.Dto.Responses;
using BeerWorkshop.Application.Dto.Responses.Devices;
using BeerWorkshop.Database.Contexts;
using BeerWorkshop.Database.Entities.Devices;
using MediatR;

namespace BeerWorkshop.Application.MediatR.Devices.Create;

public class CreateDevicesHandler(BeerWorkshopContext context, IMapper mapper) : IRequestHandler<CreateDeviceCommand, MediatrResponseDto<DeviceResponseDto>>
{
    public async Task<MediatrResponseDto<DeviceResponseDto>> Handle(CreateDeviceCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var device = mapper.Map<DeviceEntity>(request.Data);

            context.Devices.Add(device);

            await context.SaveChangesAsync(cancellationToken);

            var result = mapper.Map<DeviceResponseDto>(device);

            return MediatrResponseDto<DeviceResponseDto>.Success(result, "Device successfully created");
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return MediatrResponseDto<DeviceResponseDto>.Failure($"Error while creating Device: {ex.Message}");
        }
    }
}