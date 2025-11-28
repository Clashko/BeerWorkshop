/* eslint-disable react-hooks/refs */
import { Button, Typography } from "@material-tailwind/react";
import { BiRefresh } from "react-icons/bi";
import { AddForm } from "./AddForm";
import { DataGridQuickFilter, DataGridRef } from "../../components";
import { RefObject } from "react";
import { DeviceResponseDto } from "../../redux/dtos/responses/devices";

interface Props {
  gridRef: RefObject<DataGridRef<DeviceResponseDto> | null>;
  refreshProducts: () => void;
}

export const Header = ({ gridRef, refreshProducts }: Props) => {
  return (
    <div className="flex flex-row gap-4 items-center justify-between">
      <Typography type="h5">Расходники</Typography>

      <DataGridQuickFilter api={gridRef.current?.api ?? null} />

      <div className="flex flex-row gap-2">
        <AddForm />
        <Button variant="ghost" size="md" onClick={refreshProducts}>
          <div className="flex flex-row gap-2 items-center text-foreground">
            <BiRefresh size={26} />
            Обновить
          </div>
        </Button>
      </div>
    </div>
  );
};
