import { useEffect, useRef } from "react";
import { useReadProductsMutation } from "../../redux/api/productsApi";
import { useAppSelector } from "../../redux/store/store";
import { selectProducts } from "../../redux/features/productsSlice";
import { toast } from "react-toastify";
import { DataGridRef } from "../../components";
import { Header } from "./Header";
import { Grid } from "./Grid";
import { ProductResponseDto } from "../../redux/dtos/responses/producs";

export const Products = () => {
  const gridRef = useRef<DataGridRef<ProductResponseDto>>(null);

  const [readProducts, { isLoading: isReadProductsLoading }] =
    useReadProductsMutation();

  const data = useAppSelector(selectProducts);

  useEffect(() => {
    refreshProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshProducts = () => {
    readProducts()
      .unwrap()
      .then((result) => toast.info(result.message))
      .catch((error) => toast.error(error.data));
  };

  return (
    <div className="w-full h-full max-h-full flex flex-col gap-2">
      <Header gridRef={gridRef} refreshProducts={refreshProducts} />

      <Grid gridRef={gridRef} data={data} isLoading={isReadProductsLoading} />
    </div>
  );
};
