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
  const renderButtons = () => {
    return (
      <>
        <AddForm devices={devices} />
        <Button
          variant="ghost"
          onClick={refreshDevicesInventory}
          className="p-2 sm:p-1"
        >
          <div className="flex flex-row gap-2 items-center text-foreground">
            <BiRefresh size={20} />
            <span className="hidden sm:block">Обновить</span>
          </div>
        </Button>
      </>
    );
  };

  return (
    <div className="w-full flex flex-col sm:flex-row gap-2 items-center">
      <div className="w-full sm:w-auto flex flex-row gap-2 justify-between">
        <Typography type="h5" className="whitespace-nowrap">
          Склад расходников
        </Typography>
        <div className="flex sm:hidden flex-row gap-2">{renderButtons()}</div>
      </div>
      <DataGridQuickFilter api={gridRef.current?.api ?? null} />
      <div className="hidden sm:flex flex-row gap-2">{renderButtons()}</div>
    </div>
  );
};
