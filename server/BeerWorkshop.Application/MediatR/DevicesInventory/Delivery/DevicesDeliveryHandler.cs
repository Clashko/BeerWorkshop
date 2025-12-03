using AutoMapper;
using BeerWorkshop.Application.Dto.Responses;
using BeerWorkshop.Application.Dto.Responses.Devices;
using BeerWorkshop.Application.Dto.Responses.DevicesInventory;
using BeerWorkshop.Application.Helpers;
using BeerWorkshop.Application.Models;
using BeerWorkshop.Application.Services.Interfaces;
using BeerWorkshop.Database.Contexts;
using BeerWorkshop.Database.Entities.Devices;
using MediatR;

namespace BeerWorkshop.Application.MediatR.DevicesInventory.Delivery
{
    public class DevicesDeliveryHandler(BeerWorkshopContext context, ICheckGenerator checkGenerator, IMapper mapper) : IRequestHandler<DevicesDeliveryCommand, MediatrResponseDto<CreateDevicesDeliveryResponseDto>>
    {
        public async Task<MediatrResponseDto<CreateDevicesDeliveryResponseDto>> Handle(DevicesDeliveryCommand request, CancellationToken cancellationToken)
        {
            using var transaction = context.Database.BeginTransaction();
            try
            {
                var user = await context.Users.FindAsync([request.UserId], cancellationToken);

                if (user is null)
                    return MediatrResponseDto<CreateDevicesDeliveryResponseDto>.NotFound("User not found");

                var result = new List<DeviceInventoryResponseDto>();
                var totalAmount = 0m;
                var checkId = Guid.NewGuid();
                var transactionDate = DateTime.Now;

                var checkRows = new List<CheckRow>();
                var statistic = new List<DevicesStatisticEntity>();

                foreach (var delivery in request.Deliveries)
                {
                    var device = await context.Devices.FindAsync([delivery.DeviceId], cancellationToken);

                    if (device is null)
                    {
                        await transaction.RollbackAsync(cancellationToken);
                        return MediatrResponseDto<CreateDevicesDeliveryResponseDto>.NotFound($"Device with id {delivery.DeviceId} for new items delivery not founded");
                    }

                    var deviceItemsResult = new List<DeviceInventoryItemResponseDto>();

                    foreach (var item in delivery.Items)
                    {
                        var inventoryItem = mapper.Map<DevicesInventoryEntity>(item);

                        context.DevicesInventory.Add(inventoryItem);

                        var priceWithVat = inventoryItem.PurchasePrice * (1 + inventoryItem.PurchaseVat / 100);

                        var itemTotalAmount = TotalAmountCalculator.CalculateTotalAmount(priceWithVat, 1, inventoryItem.Quantity);

                        statistic.Add(new DevicesStatisticEntity
                        {
                            DeviceId = inventoryItem.DeviceId,
                            CheckId = checkId,
                            TransactionType = Database.Enums.TransactionType.Arrival,
                            Quantity = inventoryItem.Quantity,
                            TotalAmount = itemTotalAmount,
                            TransactionDate = transactionDate
                        });

                        totalAmount += itemTotalAmount;

                        checkRows.Add(new CheckRow(inventoryItem.Device.ShortName, Database.Enums.UnitOfMeasure.Piece, inventoryItem.Quantity, inventoryItem.PurchasePrice, 1, totalAmount, null, inventoryItem.PurchaseVat));

                        deviceItemsResult.Add(mapper.Map<DeviceInventoryItemResponseDto>(inventoryItem));
                    }

                    result.Add(new DeviceInventoryResponseDto(mapper.Map<DeviceResponseDto>(device), deviceItemsResult));
                }

                var check = await checkGenerator.GenerateAndSaveCheckAsync(checkId, checkRows, totalAmount, transactionDate, Database.Enums.TransactionType.Arrival, user);

                await context.DevicesStatistic.AddRangeAsync(statistic, cancellationToken);

                await context.SaveChangesAsync(cancellationToken);

                await transaction.CommitAsync(cancellationToken);

                return MediatrResponseDto<CreateDevicesDeliveryResponseDto>.Success(new CreateDevicesDeliveryResponseDto(result, check, totalAmount), "Devices delivery successfully applyed");
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync(cancellationToken);

                Console.WriteLine(ex.Message);
                return MediatrResponseDto<CreateDevicesDeliveryResponseDto>.Failure($"Error in devices delivery apply process: {ex.Message}");
            }
        }
    }
}