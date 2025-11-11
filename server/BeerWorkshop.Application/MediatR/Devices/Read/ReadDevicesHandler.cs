using AutoMapper;
using BeerWorkshop.Application.Dto.Responses;
using BeerWorkshop.Application.Dto.Responses.Devices;
using BeerWorkshop.Database.Contexts;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BeerWorkshop.Application.MediatR.Devices.Read;

public class ReadDevicesHandler(BeerWorkshopContext context, IMapper mapper) : IRequestHandler<ReadDevicesQuery, MediatrResponseDto<IEnumerable<DeviceResponseDto>>>
{
    public async Task<MediatrResponseDto<IEnumerable<DeviceResponseDto>>> Handle(ReadDevicesQuery request, CancellationToken cancellationToken)
    {
        try
        {
            var devices = await context.Devices.ToListAsync(cancellationToken);
            
            if (devices == null || devices.Count == 0)
                return MediatrResponseDto<IEnumerable<DeviceResponseDto>>.NotFound("Devices not founded");

            var result = mapper.Map<IEnumerable<DeviceResponseDto>>(devices);

            return MediatrResponseDto<IEnumerable<DeviceResponseDto>>.Success(result, $"Founded Devices: {devices.Count}");
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return MediatrResponseDto<IEnumerable<DeviceResponseDto>>.Failure($"Error while reading Devices: {ex.Message}");
        }
    }
}