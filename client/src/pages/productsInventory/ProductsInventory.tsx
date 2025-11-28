import { useEffect, useRef } from "react";
import { useReadProductsInventoryMutation } from "../../redux/api/productsInventoryApi";
import { toast } from "react-toastify";
import { selectProductsInventory } from "../../redux/features/productsInventorySlice";
import { useAppSelector } from "../../redux/store/store";
import { Grid, InventoryRow } from "./Grid";
import { useReadProductsMutation } from "../../redux/api/productsApi";
import { Header } from "./Header";
import { selectProducts } from "../../redux/features/productsSlice";
import { DataGridRef } from "../../components";

export const ProductsInventory = () => {
  const gridRef = useRef<DataGridRef<InventoryRow>>(null);

  const [readProductsInventory, { isLoading: isInventoryLoading }] =
    useReadProductsInventoryMutation();

  const [readProducts, { isLoading: isProductsLoading }] =
    useReadProductsMutation();

  const products = useAppSelector(selectProducts);
  const inventory = useAppSelector(selectProductsInventory);

  useEffect(() => {
    refreshProducts();
    refreshProductsInventory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshProducts = () => {
    readProducts()
      .unwrap()
      .catch((error) => toast.error(error.message));
  };

  const refreshProductsInventory = () => {
    readProductsInventory()
      .unwrap()
      .then((result) => toast.info(result.message))
      .catch((error) => toast.error(error.data));
  };

  return (
    <div className="h-full flex flex-col gap-2">
      <Header
        gridRef={gridRef}
        refreshProductsInventory={refreshProductsInventory}
        products={products}
      />

      <Grid
        gridRef={gridRef}
        data={inventory}
        isLoading={isProductsLoading || isInventoryLoading}
      />
    </div>
  );
};
