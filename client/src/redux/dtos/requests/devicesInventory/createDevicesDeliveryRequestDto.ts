import { CreateDeviceInventoryItemRequestDto } from "./createDeviceInventoryItemRequestDto";

export interface CreateDevicesDeliveryRequestDto {
  deviceId: string;
  items: CreateDeviceInventoryItemRequestDto[];
}
