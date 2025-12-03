import { DeviceInventoryResponseDto } from "./deviceInventoryResponseDto";

export interface CreateDevicesDeliveryResponseDto {
  inventory: DeviceInventoryResponseDto[];
  checkContent: string;
  totalAmount: number;
}
