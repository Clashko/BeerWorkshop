using AutoMapper;
using BeerWorkshop.Application.Dto.Responses;
using BeerWorkshop.Application.Dto.Responses.ProductsInventory;
using BeerWorkshop.Database.Contexts;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BeerWorkshop.Application.MediatR.ProductsInventory.Update;

public class UpdateProductInventoryItemHandler(BeerWorkshopContext context, IMapper mapper) : IRequestHandler<UpdateProductInventoryItemCommand, MediatrResponseDto<ProductInventoryItemResponseDto>>
{
    public async Task<MediatrResponseDto<ProductInventoryItemResponseDto>> Handle(UpdateProductInventoryItemCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var invetoryItem = await context.ProductsInventory.FindAsync([request.Id], cancellationToken: cancellationToken);

            if (invetoryItem is null)
                MediatrResponseDto<ProductInventoryItemResponseDto>.NotFound("Updatable product inventory item not founded");

            mapper.Map(request.Data, invetoryItem);
            context.Entry(invetoryItem!).State = EntityState.Modified;

            await context.SaveChangesAsync(cancellationToken);

            var result = mapper.Map<ProductInventoryItemResponseDto>(invetoryItem);

            return MediatrResponseDto<ProductInventoryItemResponseDto>.Success(result, $"Product inventory item with id: {request.Id} is successfully updated");
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return MediatrResponseDto<ProductInventoryItemResponseDto>.Failure($"Error while updating product inventory item: {ex.Message}");
        }
    }
}