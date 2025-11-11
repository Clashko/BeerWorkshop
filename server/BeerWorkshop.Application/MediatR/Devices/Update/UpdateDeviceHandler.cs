using AutoMapper;
using BeerWorkshop.Application.Dto.Responses;
using BeerWorkshop.Application.Dto.Responses.Devices;
using BeerWorkshop.Database.Contexts;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BeerWorkshop.Application.MediatR.Devices.Update;

public class UpdateDeviceHandler(BeerWorkshopContext context, IMapper mapper) : IRequestHandler<UpdateDeviceCommand, MediatrResponseDto<DeviceResponseDto>>
{
    public async Task<MediatrResponseDto<DeviceResponseDto>> Handle(UpdateDeviceCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var device = await context.Devices.FirstOrDefaultAsync(p => p.Id.Equals(request.Id), cancellationToken: cancellationToken);

            if (device is null)
                MediatrResponseDto<DeviceResponseDto>.NotFound("Updatable device not founded");

            mapper.Map(request.Data, device);
            context.Entry(device!).State = EntityState.Modified;

            await context.SaveChangesAsync(cancellationToken);

            var result = mapper.Map<DeviceResponseDto>(device);

            return MediatrResponseDto<DeviceResponseDto>.Success(result, $"Device with id: {request.Id} is successfully updated");
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return MediatrResponseDto<DeviceResponseDto>.Failure($"Error while updating Device: {ex.Message}");
        }
    }
}