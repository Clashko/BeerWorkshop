using AutoMapper;
using BeerWorkshop.Application.Dto.Responses;
using BeerWorkshop.Application.Dto.Responses.Devices;
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
            var devicesInventory = await context.DevicesInventory.Include(p => p.Device).GroupBy(p => p.Device).ToListAsync(cancellationToken);

            if (devicesInventory == null || devicesInventory.Count == 0)
                return MediatrResponseDto<IEnumerable<DeviceInventoryResponseDto>>.NotFound("Devices inventory empty");

            var result = devicesInventory.Select(g => new DeviceInventoryResponseDto(
                Device: mapper.Map<DeviceResponseDto>(g.Key),
                InventoryItems: mapper.Map<IEnumerable<DeviceInventoryItemResponseDto>>(g)
            ));

            return MediatrResponseDto<IEnumerable<DeviceInventoryResponseDto>>.Success(result, $"Founded inventory items: {result.Sum(pi => pi.InventoryItems.Count())}");
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return MediatrResponseDto<IEnumerable<DeviceInventoryResponseDto>>.Failure($"Error while reading Devices inventory: {ex.Message}");
        }
    }
}