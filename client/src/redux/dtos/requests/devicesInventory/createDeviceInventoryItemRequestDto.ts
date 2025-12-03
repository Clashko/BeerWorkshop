export interface CreateDeviceInventoryItemRequestDto{
    quantity: number,
    incomingDate: Date,
    purchasePrice: number,
    purchaseVat: number,
    retailPrice: number,
    deviceId: string
}