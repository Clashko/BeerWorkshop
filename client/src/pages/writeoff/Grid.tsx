/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card } from "@material-tailwind/react";
import { ColDef } from "ag-grid-community";
import { ProductResponseDto } from "../../redux/dtos/responses/producs";
import {
  ExpirationCountingDateType,
  ExpirationCountingDateTypeDisplay,
  ExpirationMeasureType,
  ExpirationMeasureTypeTableDisplay,
  ProductType,
  ProductTypeDisplay,
  UnitOfMeasureTableDisplay,
  UnitOfMeasureType,
} from "../../redux/enums";
import { ConfirmationDialog, DataGrid, DataGridRef } from "../../components";
import { RefObject } from "react";
import {
  ExpiringProductInventoryItemResponseDto,
  ExpiringProductResponseDto,
} from "../../redux/dtos/responses/writeOff";
import { useDeleteExpiredProductsMutation } from "../../redux/api/writeOffApi";
import { toast } from "react-toastify";
import saveAs from "file-saver";

export interface ExpiredInventoryRow {
  product: ProductResponseDto;
  item: ExpiringProductInventoryItemResponseDto;
}

interface Props {
  gridRef: RefObject<DataGridRef<ExpiredInventoryRow> | null>;
  data: ExpiringProductResponseDto[];
  isLoading?: boolean;
}

export const Grid = ({ gridRef, data, isLoading }: Props) => {
  const [deleteExpiredProduct] = useDeleteExpiredProductsMutation();

  const rows: ExpiredInventoryRow[] = data.flatMap((dto) =>
    dto.expiringItems.map((item) => ({
      product: dto.product,
      item: item,
    }))
  );

  const columns: ColDef<ExpiredInventoryRow>[] = [
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
      headerName: "Дата производства",
      valueGetter: (params) => params.data?.item.manufactureDate,
      cellDataType: "date",
      minWidth: 190,
      sortable: true,
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
      headerName: "Дата вскрытия",
      valueGetter: (params) => params.data?.item.openingDate,
      cellDataType: "date",
      minWidth: 200,
      sortable: true,
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
        if (params.value === null || params.value === undefined) {
          return "";
        }

        const date = new Date(params.value);
        return date.toLocaleTimeString("ru-RU"); // ✅ формат dd.MM.yyyy
      },
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
      minWidth: 140,
      filter: "agTextColumnFilter",
    },
    {
      headerName: "Срок годности",
      valueGetter: (params: any) => {
        const unit =
          ExpirationMeasureTypeTableDisplay[
            params.data.item.expirationMeasure as ExpirationMeasureType
          ];
        return `${params.data.item.expirationTime} ${unit}`;
      },
      sortable: true,
      minWidth: 160,
      filter: "agTextColumnFilter",
    },
    {
      headerName: "Тип отсчета срока годности",
      valueGetter: (params: any) =>
        ExpirationCountingDateTypeDisplay[
          params.data.item
            .expirationCountingDateType as ExpirationCountingDateType
        ],
      sortable: true,
      minWidth: 260,
      filter: "agTextColumnFilter",
    },
    {
      colId: "actions",
      headerName: "",
      cellRenderer: (params: any) => {
        return (
          <div className="h-full flex gap-2 justify-center items-center">
            <ConfirmationDialog
              id={params.data.item.id}
              type="продукт со склада"
              deleteAction={handleDeleteExpiredProduct}
            />
          </div>
        );
      },
      flex: 0,
      sortable: false,
      filter: false,
    },
  ];

  const handleDeleteExpiredProduct = (id: string) => {
    deleteExpiredProduct([id])
      .unwrap()
      .then((result) => {
        toast.info(result.message);
        handleSaveCheck(result.data.checkContent);
      })
      .catch((error) => toast.error(error.data));
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
    <Card className="bg-surface h-full ag-theme-material text-sm">
      <DataGrid
        ref={gridRef}
        data={rows}
        columns={columns}
        isLoading={isLoading}
      />
    </Card>
  );
};
