/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card } from "@material-tailwind/react";
import { ColDef } from "ag-grid-community";
import { ConfirmationDialog, DataGrid, DataGridRef } from "../../components";
import { EditForm } from "./EditForm";
import { toast } from "react-toastify";
import { RefObject } from "react";
import { DeviceResponseDto } from "../../redux/dtos/responses/devices";
import { useDeleteDeviceMutation } from "../../redux/api/devicesApi";

interface Props {
  gridRef: RefObject<DataGridRef<DeviceResponseDto> | null>;
  data: DeviceResponseDto[];
  isLoading?: boolean;
}

export const Grid = ({ gridRef, data, isLoading }: Props) => {
  const [deleteDevice] = useDeleteDeviceMutation();

  const columns: ColDef<DeviceResponseDto>[] = [
    {
      colId: "name",
      headerName: "Наименование",
      field: "name",
      sortable: true,
      filter: "agTextColumnFilter",
      minWidth: 160
    },
    {
      colId: "shortName",
      headerName: "Короткое наименование",
      field: "shortName",
      sortable: true,
      filter: "agTextColumnFilter",
      minWidth: 230
    },
    {
      colId: "actions",
      headerName: "",
      cellRenderer: (params: any) => {
        return (
          <div className="h-full flex gap-2 justify-center items-center">
            <EditForm device={params.data} />
            <ConfirmationDialog
              id={params.data.id}
              type="расходник"
              deleteAction={handleDeleteDevice}
            />
          </div>
        );
      },
      flex: 0,
      sortable: false,
      filter: false,
    },
  ];

  const handleDeleteDevice = (id: string) => {
    deleteDevice(id)
      .unwrap()
      .then((result) => toast.info(result.message))
      .catch((error) => toast.error(error.message));
  };

  return (
    <Card className="bg-surface h-full ag-theme-material text-sm">
      <DataGrid
        ref={gridRef}
        data={data}
        columns={columns}
        isLoading={isLoading}
      />
    </Card>
  );
};
