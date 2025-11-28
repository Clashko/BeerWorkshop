/* eslint-disable react-hooks/refs */
import { Button, Typography } from "@material-tailwind/react";
import { DataGridQuickFilter, DataGridRef } from "../../components";
import { BiRefresh } from "react-icons/bi";
import { AddForm } from "./AddForm";
import { RefObject } from "react";
import { DeviceInventoryRow } from "./Grid";
import { DeviceResponseDto } from "../../redux/dtos/responses/devices";

interface Props {
  gridRef: RefObject<DataGridRef<DeviceInventoryRow> | null>;
  refreshDevicesInventory: () => void;
  devices: DeviceResponseDto[];
}

export const Header = ({
  gridRef,
  refreshDevicesInventory,
  devices,
}: Props) => {
  return (
    <div className="flex flex-row gap-4 items-center justify-between">
      <Typography type="h5" className="whitespace-nowrap">
        Склад расходников
      </Typography>

      <DataGridQuickFilter api={gridRef.current?.api ?? null} />

      <div className="flex flex-row gap-2">
        <AddForm devices={devices} />
        <Button variant="ghost" size="md" onClick={refreshDevicesInventory}>
          <div className="flex flex-row gap-2 items-center text-foreground">
            <BiRefresh size={26} />
            Обновить
          </div>
        </Button>
      </div>
    </div>
  );
};
