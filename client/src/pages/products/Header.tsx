/* eslint-disable react-hooks/refs */
import { Button, Typography } from "@material-tailwind/react";
import { BiRefresh } from "react-icons/bi";
import { AddForm } from "./AddForm";
import { DataGridQuickFilter, DataGridRef } from "../../components";
import { ProductResponseDto } from "../../redux/dtos/responses/producs";
import { RefObject } from "react";

interface Props {
  gridRef: RefObject<DataGridRef<ProductResponseDto> | null>;
  refreshProducts: () => void;
}

export const Header = ({ gridRef, refreshProducts }: Props) => {
  return (
    <div className="flex flex-row gap-4 items-center justify-between">
      <Typography type="h5">Продукты</Typography>

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
