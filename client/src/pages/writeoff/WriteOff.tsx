import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useAppSelector } from "../../redux/store/store";
import { Grid, ExpiredInventoryRow } from "./Grid";
import { Header } from "./Header";
import { DataGridRef } from "../../components";
import { useReadExpiredProductsMutation } from "../../redux/api/writeOffApi";
import { selectExpiredProducts } from "../../redux/features/writeOffSlice";

export const WriteOff = () => {
  const gridRef = useRef<DataGridRef<ExpiredInventoryRow>>(null);

  const [readExpiredInventory, { isLoading: isInventoryLoading }] =
    useReadExpiredProductsMutation();

  const inventory = useAppSelector(selectExpiredProducts);

  useEffect(() => {
    refreshExpiredInventory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshExpiredInventory = () => {
    readExpiredInventory()
      .unwrap()
      .then((result) => toast.info(result.message))
      .catch((error) => toast.error(error.data));
  };

  return (
    <div className="w-full h-full max-h-full flex flex-col gap-2">
      <Header
        gridRef={gridRef}
        data={inventory}
        refreshExpiredInventory={refreshExpiredInventory}
      />

      <Grid gridRef={gridRef} data={inventory} isLoading={isInventoryLoading} />
    </div>
  );
};
