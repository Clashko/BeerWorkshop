using AutoMapper;
using BeerWorkshop.Application.Dto.Responses;
using BeerWorkshop.Application.Dto.Responses.DevicesInventory;
using BeerWorkshop.Database.Contexts;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BeerWorkshop.Application.MediatR.DevicesInventory.Read;

public class ReadDevicesInventoryHandler(BeerWorkshopContext context, IMapper mapper) : IRequestHandler<ReadDevicesInventoryQuery, MediatrResponseDto<IEnumerable<DeviceInventoryResponseDto>>>
{
    public async Task<MediatrResponseDto<IEnumerable<DeviceInventoryResponseDto>>> Handle(ReadDevicesInventoryQuery request, CancellationToken cancellationToken)
    {
        try
        {
            var devicesInventory = await context.Devices.Include(p => p.Inventory).ToListAsync(cancellationToken);

            if (devicesInventory == null || devicesInventory.Count == 0)
                return MediatrResponseDto<IEnumerable<DeviceInventoryResponseDto>>.NotFound("Devices inventory empty");

            var result = mapper.Map<IEnumerable<DeviceInventoryResponseDto>>(devicesInventory);

            return MediatrResponseDto<IEnumerable<DeviceInventoryResponseDto>>.Success(result, $"Founded inventory items: {devicesInventory.Sum(pi => pi.Inventory.Count)}");
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return MediatrResponseDto<IEnumerable<DeviceInventoryResponseDto>>.Failure($"Error while reading Devices inventory: {ex.Message}");
        }
    }
}