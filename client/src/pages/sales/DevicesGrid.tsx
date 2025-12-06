/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card } from "@material-tailwind/react";
import { ColDef } from "ag-grid-community";
import { useAppSelector } from "../../redux/store/store";
import { toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";
import { DataGrid, DataGridQuickFilter, DataGridRef } from "../../components";
import { BiRefresh } from "react-icons/bi";
import { DeviceInventoryRow } from "../devicesInventory/Grid";
import { useReadDevicesInventoryMutation } from "../../redux/api/devicesInventoryApi";
import { selectDevicesInventory } from "../../redux/features/devicesInventorySlice";
import { AddDeviceDialog } from "./AddDeviceDialog";
import { BasketRow } from "./Sales";
import { GridApi } from "ag-grid-community";

interface Props {
  basketDevices: BasketRow[];
  setBasketDevices: React.Dispatch<React.SetStateAction<BasketRow[]>>;
}

export const DevicesGrid = ({ basketDevices, setBasketDevices }: Props) => {
  const gridRef = useRef<DataGridRef<DeviceInventoryRow>>(null);

  const [api, setApi] = useState<GridApi<DeviceInventoryRow> | null>(null);

  useEffect(() => {
    if (gridRef.current?.api) {
      setApi(gridRef.current.api);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gridRef.current]);

  const [read, { isLoading }] = useReadDevicesInventoryMutation();

  const devices = useAppSelector(selectDevicesInventory);

  const rows: DeviceInventoryRow[] = devices.flatMap((dto) =>
    dto.inventoryItems.map((item) => ({
      device: dto.device,
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

  const columns: ColDef<DeviceInventoryRow>[] = [
    {
      colId: "actions",
      headerName: "",
      cellRenderer: (params: any) => {
        return (
          <AddDeviceDialog device={params.data} addDevice={handleAddDevice} />
        );
      },
      flex: 0,
      sortable: false,
      filter: false,
    },
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
      filter: "agTextColumnFilter",
      minWidth: 160,
    },
    {
      headerName: "Стоимость",
      valueGetter: (params) => params.data?.item.retailPrice,
      sortable: true,
      filter: "agNumberColumnFilter",
      minWidth: 130,
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
  ];

  const handleAddDevice = (row: BasketRow) => {
    setBasketDevices([...basketDevices, row]);
  };

  return (
    <div className="bg-surface flex flex-col gap-2 h-full w-full">
      <div className="w-full flex flex-row gap-4 items-center justify-between">
        <DataGridQuickFilter api={api} className="border-primary px-2 py-1" />
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
