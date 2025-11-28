using AutoMapper;
using BeerWorkshop.Application.Dto.Responses;
using BeerWorkshop.Application.Dto.Responses.DevicesInventory;
using BeerWorkshop.Database.Contexts;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BeerWorkshop.Application.MediatR.DevicesInventory.Update;

public class UpdateDeviceInventoryItemHandler(BeerWorkshopContext context, IMapper mapper) : IRequestHandler<UpdateDeviceInventoryItemCommand, MediatrResponseDto<DeviceInventoryItemResponseDto>>
{
    public async Task<MediatrResponseDto<DeviceInventoryItemResponseDto>> Handle(UpdateDeviceInventoryItemCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var invetoryItem = await context.DevicesInventory.FindAsync([request.Id], cancellationToken: cancellationToken);

            if (invetoryItem is null)
                MediatrResponseDto<DeviceInventoryItemResponseDto>.NotFound("Updatable Device inventory item not founded");

            mapper.Map(request.Data, invetoryItem);
            context.Entry(invetoryItem!).State = EntityState.Modified;

            await context.SaveChangesAsync(cancellationToken);

            var result = mapper.Map<DeviceInventoryItemResponseDto>(invetoryItem);

            return MediatrResponseDto<DeviceInventoryItemResponseDto>.Success(result, $"Device inventory item with id: {request.Id} is successfully updated");
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return MediatrResponseDto<DeviceInventoryItemResponseDto>.Failure($"Error while updating Device inventory item: {ex.Message}");
        }
    }
}