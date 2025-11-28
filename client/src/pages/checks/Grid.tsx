/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card } from "@material-tailwind/react";
import { ColDef } from "ag-grid-community";
import { TransactionType, TransactionTypeDisplay } from "../../redux/enums";
import { DataGrid, DataGridRef } from "../../components";
import { RefObject } from "react";
import { CheckResponseDto } from "../../redux/dtos/responses/checks/checkResponseDto";
import { ViewCheckInfo } from "./ViewCheckInfo";
import { FaDownload } from "react-icons/fa";
import { useGetCheckContentMutation } from "../../redux/api/checksApi";
import { toast } from "react-toastify";
import saveAs from "file-saver";

interface Props {
  gridRef: RefObject<DataGridRef<CheckResponseDto> | null>;
  data: CheckResponseDto[];
  isLoading?: boolean;
}

export const Grid = ({ gridRef, data, isLoading }: Props) => {
  const [downloadCheck] = useGetCheckContentMutation();

  const columns: ColDef<CheckResponseDto>[] = [
    {
      headerName: "Номер транзакции",
      valueGetter: (params: any) => params.data.orderNumber,
      minWidth: 230,
      sortable: true,
      filter: "agNumberColumnFilter",
    },
    {
      headerName: "Тип транзакции",
      valueGetter: (params: any) =>
        TransactionTypeDisplay[params.data.transactionType as TransactionType],
      sortable: true,
      minWidth: 200,
      filter: "agTextColumnFilter",
    },
    {
      headerName: "Дата транзакции",
      valueGetter: (params: any) => params.data.transactionDate,
      cellDataType: "date",
      sortable: true,
      minWidth: 220,
      filterParams: {
        browserDatePicker: true,
        comparator: (filterLocalDateAtMidnight: any, cellValue: any) => {
          const dateCellValue = cellValue
            ? new Date(cellValue).getTime()
            : null;
          const filterDateValue = filterLocalDateAtMidnight.getTime();

          if (dateCellValue === null) {
            return 0;
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
        return date.toLocaleDateString("ru-RU");
      },
    },
    {
      headerName: "Общая сумма",
      valueGetter: (params: any) => params.data.totalAmount,
      minWidth: 190,
      sortable: true,
      filter: "agNumberColumnFilter",
    },
    {
      colId: "actions",
      headerName: "",
      cellRenderer: (params: any) => {
        return (
          <div className="h-full flex gap-2 justify-center items-center">
            <ViewCheckInfo check={params.data} />
            <Button
              variant="ghost"
              color="success"
              onClick={() => handleDownloadCheck(params.data.id)}
            >
              <FaDownload />
            </Button>
          </div>
        );
      },
      flex: 0,
      sortable: false,
      filter: false,
    },
  ];

  const handleDownloadCheck = (id: string) => {
    downloadCheck(id)
      .unwrap()
      .then((result) => {
        toast.success(result.message);
        handleSaveCheck(result.data);
      })
      .catch((error) => {
        toast.error(error.data);
      });
  };

  const handleSaveCheck = (content: string) => {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const lines = content.split("\n");
    const typeLine = lines[5].trim();
    const numberLine = lines[6].trim();
    const match = numberLine.match(/№\s*(\d+)/);
    let name = "";
    if (typeLine === "Списание") name = "WriteOff";
    else if (typeLine === "Приход") name = "Arrival";
    else name = "Sale";
    let number = 1;
    if (match) number = Number(match[1]);
    saveAs(blob, `${name} №${number}.txt`);
  };

  return (
    <Card className="bg-surface h-full ag-theme-material">
      <DataGrid
        ref={gridRef}
        data={data}
        columns={columns}
        isLoading={isLoading}
      />
    </Card>
  );
};
