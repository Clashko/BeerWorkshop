/* eslint-disable react-hooks/refs */
import { Button, Typography } from "@material-tailwind/react";
import { DataGridQuickFilter, DataGridRef } from "../../components";
import { BiRefresh } from "react-icons/bi";
import { AddForm } from "./AddForm";
import { ProductResponseDto } from "../../redux/dtos/responses/producs";
import { RefObject } from "react";
import { InventoryRow } from "./Grid";

interface Props {
  gridRef: RefObject<DataGridRef<InventoryRow> | null>;
  refreshProductsInventory: () => void;
  products: ProductResponseDto[];
}

export const Header = ({
  gridRef,
  refreshProductsInventory,
  products,
}: Props) => {
  const renderButtons = () => {
    return (
      <>
        <AddForm products={products} />
        <Button
          variant="ghost"
          onClick={refreshProductsInventory}
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
          Склад продуктов
        </Typography>
        <div className="flex sm:hidden flex-row gap-2">{renderButtons()}</div>
      </div>
      <DataGridQuickFilter api={gridRef.current?.api ?? null} />
      <div className="hidden sm:flex flex-row gap-2">{renderButtons()}</div>
    </div>
  );
};
