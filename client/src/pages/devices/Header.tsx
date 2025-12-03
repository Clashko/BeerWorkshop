/* eslint-disable react-hooks/refs */
import { Button, Typography } from "@material-tailwind/react";
import { BiRefresh } from "react-icons/bi";
import { AddForm } from "./AddForm";
import { DataGridQuickFilter, DataGridRef } from "../../components";
import { RefObject } from "react";
import { DeviceResponseDto } from "../../redux/dtos/responses/devices";

interface Props {
  gridRef: RefObject<DataGridRef<DeviceResponseDto> | null>;
  refreshDevices: () => void;
}

export const Header = ({ gridRef, refreshDevices }: Props) => {
  const renderButtons = () => {
    return (
      <>
        <AddForm />
        <Button variant="ghost" onClick={refreshDevices} className="p-2 sm:p-1">
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
        <Typography type="h5">Расходники</Typography>
        <div className="flex sm:hidden flex-row gap-2">{renderButtons()}</div>
      </div>
      <DataGridQuickFilter api={gridRef.current?.api ?? null} />
      <div className="hidden sm:flex flex-row gap-2">{renderButtons()}</div>
    </div>
  );
};
