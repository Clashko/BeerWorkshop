/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card } from "@material-tailwind/react";
import { ColDef } from "ag-grid-community";
import { ProductResponseDto } from "../../redux/dtos/responses/producs";
import {
  ProductInventoryItemResponseDto,
  ProductInventoryResponseDto,
} from "../../redux/dtos/responses/productsInventory";
import {
  ProductType,
  ProductTypeDisplay,
  UnitOfMeasureTableDisplay,
  UnitOfMeasureType,
} from "../../redux/enums";
import { DataGrid, DataGridRef } from "../../components";
import { EditForm } from "./EditForm";
import { RefObject } from "react";

export interface InventoryRow {
  product: ProductResponseDto;
  item: ProductInventoryItemResponseDto;
}

interface Props {
  gridRef: RefObject<DataGridRef<InventoryRow> | null>;
  data: ProductInventoryResponseDto[];
  isLoading?: boolean;
}

export const Grid = ({ gridRef, data, isLoading }: Props) => {
  const rows: InventoryRow[] = data.flatMap((dto) =>
    dto.inventoryItems.map((item) => ({
      product: dto.product,
      item: item,
    }))
  );

  const columns: ColDef<InventoryRow>[] = [
    {
      headerName: "Тип продукта",
      valueGetter: (params: any) =>
        ProductTypeDisplay[params.data.product.productType as ProductType],
      cellStyle: {
        display: "flex",
        alignItems: "center",
        justifyContent: "start",
      },
      spanRows: true,
      minWidth: 150,
    },
    {
      headerName: "Наименование",
      valueGetter: (params) => params.data?.product.name,
      cellStyle: {
        display: "flex",
        alignItems: "center",
        justifyContent: "start",
      },
      spanRows: true,
      minWidth: 160,
    },
    {
      headerName: "Дата поступления",
      valueGetter: (params) => params.data?.item.incomingDate,
      cellDataType: "date",
      sortable: true,
      minWidth: 190,
      filterParams: {
        browserDatePicker: true,
        comparator: (filterLocalDateAtMidnight: any, cellValue: any) => {
          const dateCellValue = cellValue
            ? new Date(cellValue).getTime()
            : null;
          const filterDateValue = filterLocalDateAtMidnight.getTime();

          if (dateCellValue === null) {
            return 0; // Treat null values as matching
          }

          if (dateCellValue < filterDateValue) {
            return -1;
          } else if (dateCellValue > filterDateValue) {
            return 1;
          }
          return 0;
        },
      },
      valueFormatter: (params) => {
        const date = new Date(params.value);
        return date.toLocaleDateString("ru-RU"); // ✅ формат dd.MM.yyyy
      },
    },
    {
      headerName: "Закупочная цена",
      valueGetter: (params) => params.data?.item.purchasePrice,
      sortable: true,
      filter: "agNumberColumnFilter",
      minWidth: 180,
    },
    {
      headerName: "Розничная цена",
      valueGetter: (params) => params.data?.item.retailPrice,
      sortable: true,
      filter: "agNumberColumnFilter",
      minWidth: 170,
    },
    {
      headerName: "Цена за количество",
      valueGetter: (params) => {
        const unit =
          UnitOfMeasureTableDisplay[
            params.data?.product.unitOfMeasure as UnitOfMeasureType
          ];
        return `${params.data?.item.pricePerQuantity} ${unit}`;
      },
      sortable: true,
      filter: "agTextColumnFilter",
      minWidth: 200,
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
      minWidth: 140,
    },
    {
      colId: "actions",
      headerName: "",
      cellRenderer: (params: any) => {
        return (
          <EditForm
            productInventoryItem={params.data.item}
            productId={params.data.product.id}
          />
        );
      },
      flex: 0,
      sortable: false,
      filter: false,
    },
  ];

  return (
    <Card className="bg-surface h-full ag-theme-material text-sm">
      <DataGrid
        data={rows}
        columns={columns}
        isLoading={isLoading}
        ref={gridRef}
      />
    </Card>
  );
};
