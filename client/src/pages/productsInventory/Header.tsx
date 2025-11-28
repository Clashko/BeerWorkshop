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
  return (
    <div className="flex flex-row gap-4 items-center justify-between">
      <Typography type="h5" className="whitespace-nowrap">
        Склад продуктов
      </Typography>

      <DataGridQuickFilter api={gridRef.current?.api ?? null} />

      <div className="flex flex-row gap-2">
        <AddForm products={products} />
        <Button variant="ghost" size="md" onClick={refreshProductsInventory}>
          <div className="flex flex-row gap-2 items-center text-foreground">
            <BiRefresh size={26} />
            Обновить
          </div>
        </Button>
      </div>
    </div>
  );
};
