using AutoMapper;
using BeerWorkshop.Application.Dto.Responses;
using BeerWorkshop.Application.Dto.Responses.DevicesInventory;
using BeerWorkshop.Database.Contexts;
using BeerWorkshop.Database.Entities.Devices;
using MediatR;

namespace BeerWorkshop.Application.MediatR.DevicesInventory.Create;

public class CreateDeviceInventoryItemHandler(BeerWorkshopContext context, IMapper mapper) : IRequestHandler<CreateDeviceInventoryItemCommand, MediatrResponseDto<DeviceInventoryItemResponseDto>>
{
    public async Task<MediatrResponseDto<DeviceInventoryItemResponseDto>> Handle(CreateDeviceInventoryItemCommand request, CancellationToken cancellationToken)
    {
        using var transaction = context.Database.BeginTransaction();
        try
        {
            var inventoryItem = mapper.Map<DevicesInventoryEntity>(request.Data);

            context.DevicesInventory.Add(inventoryItem);

            await context.SaveChangesAsync(cancellationToken);

            var statistic = new DevicesStatisticEntity
            {
                DeviceId = request.Data.DeviceId,
                TransactionType = Database.Enums.TransactionType.Arrival,
                Quantity = request.Data.Quantity,
                TotalAmount = request.Data.PurchasePrice * request.Data.Quantity,
                TransactionDate = DateTime.Now
            };

            context.DevicesStatistic.Add(statistic);

            await context.SaveChangesAsync(cancellationToken);

            await transaction.CommitAsync(cancellationToken);

            var result = mapper.Map<DeviceInventoryItemResponseDto>(inventoryItem);

            return MediatrResponseDto<DeviceInventoryItemResponseDto>.Success(result, "Device inventory item successfully created");
        }
        catch (Exception ex)
        {
            await transaction.RollbackAsync(cancellationToken);
            
            Console.WriteLine(ex.Message);
            return MediatrResponseDto<DeviceInventoryItemResponseDto>.Failure($"Error while creating inventory item: {ex.Message}");
        }
    }
}