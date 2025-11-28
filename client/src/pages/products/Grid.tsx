/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card } from "@material-tailwind/react";
import { ColDef } from "ag-grid-community";
import { ProductResponseDto } from "../../redux/dtos/responses/producs";
import {
  ProductType,
  ProductTypeDisplay,
  UnitOfMeasureDisplay,
  UnitOfMeasureType,
} from "../../redux/enums";
import { ConfirmationDialog, DataGrid, DataGridRef } from "../../components";
import { EditForm } from "./EditForm";
import { useDeleteProductMutation } from "../../redux/api/productsApi";
import { toast } from "react-toastify";
import { RefObject } from "react";

interface Props {
  gridRef: RefObject<DataGridRef<ProductResponseDto> | null>;
  data: ProductResponseDto[];
  isLoading?: boolean;
}

export const Grid = ({ gridRef, data, isLoading }: Props) => {
  const [deleteProduct] = useDeleteProductMutation();

  const columns: ColDef<ProductResponseDto>[] = [
    {
      headerName: "Наименование",
      field: "name",
      sortable: true,
      filter: "agTextColumnFilter",
    },
    {
      headerName: "Короткое наименование",
      field: "shortName",
      sortable: true,
      filter: "agTextColumnFilter",
    },
    {
      headerName: "Тип продукта",
      valueGetter: (params: any) =>
        ProductTypeDisplay[params.data.productType as ProductType],
      sortable: true,
      filter: "agTextColumnFilter",
    },
    {
      headerName: "Еденицы измерения",
      valueGetter: (params: any) =>
        UnitOfMeasureDisplay[params.data.unitOfMeasure as UnitOfMeasureType],
      sortable: true,
      filter: "agTextColumnFilter",
    },
    {
      colId: "actions",
      headerName: "",
      cellRenderer: (params: any) => {
        return (
          <div className="h-full flex gap-2 justify-center items-center">
            <EditForm product={params.data} />
            <ConfirmationDialog
              id={params.data.id}
              type="продукт"
              deleteAction={handleDeleteProduct}
            />
          </div>
        );
      },
      flex: 0,
      sortable: false,
      filter: false,
    },
  ];

  const handleDeleteProduct = (id: string) => {
    deleteProduct(id)
      .unwrap()
      .then((result) => toast.info(result.message))
      .catch((error) => toast.error(error.message));
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
