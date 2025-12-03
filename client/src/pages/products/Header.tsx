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
  const renderButtons = () => {
    return (
      <>
        <AddForm />
        <Button
          variant="ghost"
          onClick={refreshProducts}
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
        <Typography type="h5">Продукты</Typography>
        <div className="flex sm:hidden flex-row gap-2">
          {renderButtons()}
        </div>
      </div>
      <DataGridQuickFilter api={gridRef.current?.api ?? null} />
      <div className="hidden sm:flex flex-row gap-2">
        {renderButtons()}
      </div>
    </div>
  );
};
