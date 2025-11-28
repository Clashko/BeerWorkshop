import { DeviceResponseDto } from "../devices";
import { DeviceInventoryItemResponseDto } from "./deviceInventoryItemResponseDto";

export interface DeviceInventoryResponseDto {
  device: DeviceResponseDto;
  inventoryItems: DeviceInventoryItemResponseDto[];
}
