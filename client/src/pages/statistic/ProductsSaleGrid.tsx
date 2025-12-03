import { useMemo } from "react";
import { selectProductsStatistic } from "../../redux/features/statisticSlice";
import { useAppSelector } from "../../redux/store/store";
import { ProductType, ProductTypeDisplay } from "../../redux/enums";
import { Card } from "@material-tailwind/react";
import { DataGrid } from "../../components";
import { ColDef } from "ag-grid-community";

export const ProductsSaleGrid = () => {
  const productStatistic = useAppSelector(selectProductsStatistic);

  const rowData = useMemo(() => {
    const grouped: Record<
      string,
      { productType: ProductType; totalQuantity: number; totalAmount: number }
    > = {};

    productStatistic.forEach((p) => {
      if (!grouped[p.name]) {
        grouped[p.name] = {
          productType: p.productType,
          totalQuantity: 0,
          totalAmount: 0,
        };
      }
      grouped[p.name].totalQuantity += p.quantity;
      grouped[p.name].totalAmount += p.totalAmount;
    });

    return Object.entries(grouped).map(([name, g]) => ({
      name,
      productType: g.productType,
      totalQuantity: g.totalQuantity,
      totalAmount: g.totalAmount,
    }));
  }, [productStatistic]);

  const columns: ColDef<{
    name: string;
    productType: ProductType;
    totalQuantity: number;
    totalAmount: number;
  }>[] = [
    {
      headerName: "Тип продукта",
      valueGetter: ({ data }) =>
        ProductTypeDisplay[data!.productType as ProductType],
      sortable: true,
      filter: "agTextColumnFilter",
      spanRows: true,
    },
    {
      headerName: "Наименование",
      valueGetter: ({ data }) => data!.name,
      sortable: true,
      filter: "agTextColumnFilter",
    },
    {
      headerName: "Общее количество",
      valueGetter: ({ data }) => data!.totalQuantity,
      sortable: true,
      filter: "agNumberColumnFilter",
    },
    {
      headerName: "Общая сумма",
      valueGetter: ({ data }) => data!.totalAmount,
      sortable: true,
      filter: "agNumberColumnFilter",
    },
  ];

  return (
    <Card className="flex-2 bg-surface min-h-[400px] ag-theme-material">
      <DataGrid data={rowData} columns={columns} />
    </Card>
  );
};
