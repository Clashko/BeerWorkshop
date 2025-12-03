/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card } from "@material-tailwind/react";
import { ColDef } from "ag-grid-community";
import { InventoryRow } from "../productsInventory/Grid";
import {
  UnitOfMeasureTableDisplay,
  UnitOfMeasureType,
} from "../../redux/enums";
import { useReadProductsInventoryMutation } from "../../redux/api/productsInventoryApi";
import { useAppSelector } from "../../redux/store/store";
import { selectProductsInventory } from "../../redux/features/productsInventorySlice";
import { toast } from "react-toastify";
import { useEffect, useRef } from "react";
import { DataGrid, DataGridQuickFilter, DataGridRef } from "../../components";
import { BiRefresh } from "react-icons/bi";
import { AddProductDialog } from "./AddProductDialog";
import { BasketRow } from "./Sales";

interface Props {
  basketProducts: BasketRow[];
  setBasketProducts: React.Dispatch<React.SetStateAction<BasketRow[]>>;
}

export const ProductsGrid = ({ basketProducts, setBasketProducts }: Props) => {
  const gridRef = useRef<DataGridRef<InventoryRow>>(null);

  const [read, { isLoading }] = useReadProductsInventoryMutation();

  const inventory = useAppSelector(selectProductsInventory);

  const rows: InventoryRow[] = inventory.flatMap((dto) =>
    dto.inventoryItems.map((item) => ({
      product: dto.product,
      item: item,
    }))
  );

  useEffect(() => {
    refreshInventory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshInventory = () => {
    read()
      .unwrap()
      .catch((error) => toast.error(error.data));
  };

  const columns: ColDef<InventoryRow>[] = [
    {
      colId: "name",
      headerName: "Наименование",
      valueGetter: ({ data }) => data!.product.name,
      cellStyle: {
        display: "flex",
        alignItems: "center",
        justifyContent: "start",
      },
      spanRows: true,
      filter: "agTextColumnFilter",
      minWidth: 160,
    },
    {
      headerName: "Стоимость",
      valueGetter: ({ data }) => data!.item.retailPrice,
      sortable: true,
      filter: "agNumberColumnFilter",
      minWidth: 130,
    },
    {
      headerName: "Стоимость за",
      valueGetter: ({ data }) => {
        const unit =
          UnitOfMeasureTableDisplay[
            data!.product.unitOfMeasure as UnitOfMeasureType
          ];
        return `${data!.item.pricePerQuantity} ${unit}`;
      },
      sortable: true,
      filter: "agTextColumnFilter",
      minWidth: 150,
    },
    {
      headerName: "Количество",
      valueGetter: (params: any) => {
        const unit =
          UnitOfMeasureTableDisplay[
            params.data.product.unitOfMeasure as UnitOfMeasureType
          ];
        return `${params.data.item.quantity} ${unit}`;
      },
      sortable: true,
      filter: "agTextColumnFilter",
      minWidth: 150,
    },
    {
      colId: "actions",
      headerName: "",
      cellRenderer: (params: any) => {
        return (
          <AddProductDialog
            product={params.data}
            addProduct={handleAddProduct}
          />
        );
      },
      flex: 0,
      sortable: false,
      filter: false,
    },
  ];

  const handleAddProduct = (row: BasketRow) => {
    setBasketProducts([...basketProducts, row]);
  };

  return (
    <div className="bg-surface flex flex-col gap-2 h-full w-full">
      <div className="w-full flex flex-row gap-4 items-center justify-between">
        <DataGridQuickFilter
          api={gridRef.current?.api ?? null}
          className="border-primary px-2 py-1"
        />
        <Button
          variant="ghost"
          onClick={refreshInventory}
          className="p-2 sm:p-1"
        >
          <div className="flex flex-row gap-2 items-center text-foreground">
            <BiRefresh size={20} />
            <span className="hidden sm:block">Обновить</span>
          </div>
        </Button>
      </div>
      <Card className="w-full h-full border border-surface-light text-sm ag-theme-material">
        <DataGrid
          data={rows}
          columns={columns}
          isLoading={isLoading}
          ref={gridRef}
        />
      </Card>
    </div>
  );
};
