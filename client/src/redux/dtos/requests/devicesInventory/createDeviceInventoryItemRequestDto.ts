export interface CreateDeviceInventoryItemRequestDto{
    quantity: number,
    incomingDate: Date,
    purchasePrice: number,
    retailPrice: number,
    deviceId: string
}