/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Typography } from "@material-tailwind/react";
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
      headerName: "Наименование",
      valueGetter: (params) => params.data?.product.name,
      cellStyle: {
        display: "flex",
        alignItems: "center",
        justifyContent: "start",
      },
      spanRows: true,
      filter: "agTextColumnFilter",
    },
    {
      headerName: "Стоимость",
      valueGetter: (params) => params.data?.item.retailPrice,
      sortable: true,
      filter: "agNumberColumnFilter",
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
    <Card className="bg-surface flex flex-col gap-2 h-1/2">
      <div className="flex flex-row gap-4 items-center justify-between p-4">
        <Typography type="lead">Продукты</Typography>
        <DataGridQuickFilter
          api={gridRef.current?.api ?? null}
          className="border-primary px-2 py-1"
        />
        <Button
          variant="ghost"
          size="md"
          onClick={refreshInventory}
          className="px-4 py-1"
        >
          <div className="flex flex-row gap-2 items-center text-foreground">
            <BiRefresh size={26} />
            Обновить
          </div>
        </Button>
      </div>
      <DataGrid
        data={rows}
        columns={columns}
        isLoading={isLoading}
        ref={gridRef}
      />
    </Card>
  );
};
