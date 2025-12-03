/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card } from "@material-tailwind/react";
import { ColDef } from "ag-grid-community";
import { DataGrid, DataGridRef } from "../../components";
import { EditForm } from "./EditForm";
import { RefObject } from "react";
import { DeviceResponseDto } from "../../redux/dtos/responses/devices";
import {
  DeviceInventoryItemResponseDto,
  DeviceInventoryResponseDto,
} from "../../redux/dtos/responses/devicesInventory";

export interface DeviceInventoryRow {
  device: DeviceResponseDto;
  item: DeviceInventoryItemResponseDto;
}

interface Props {
  gridRef: RefObject<DataGridRef<DeviceInventoryRow> | null>;
  data: DeviceInventoryResponseDto[];
  isLoading?: boolean;
}

export const Grid = ({ gridRef, data, isLoading }: Props) => {
  const rows: DeviceInventoryRow[] = data.flatMap((dto) =>
    dto.inventoryItems.map((item) => ({
      device: dto.device,
      item: item,
    }))
  );

  const columns: ColDef<DeviceInventoryRow>[] = [
    {
      colId: "name",
      headerName: "Наименование",
      valueGetter: (params) => params.data?.device.name,
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
      headerName: "Процент НДС",
      valueGetter: (params) => params.data?.item.purchaseVat,
      sortable: true,
      filter: "agNumberColumnFilter",
      minWidth: 160,
    },
    {
      headerName: "Розничная цена",
      valueGetter: (params) => params.data?.item.retailPrice,
      sortable: true,
      filter: "agNumberColumnFilter",
      minWidth: 170,
    },
    {
      headerName: "Количество",
      valueGetter: (params: any) => {
        return `${params.data.item.quantity} шт.`;
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
            deviceInventoryItem={params.data.item}
            deviceId={params.data.device.id}
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
