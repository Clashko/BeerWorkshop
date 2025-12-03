import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useAppSelector } from "../../redux/store/store";
import { Grid, DeviceInventoryRow } from "./Grid";
import { Header } from "./Header";
import { DataGridRef } from "../../components";
import { useReadDevicesInventoryMutation } from "../../redux/api/devicesInventoryApi";
import { useReadDevicesMutation } from "../../redux/api/devicesApi";
import { selectDevices } from "../../redux/features/devicesSlice";
import { selectDevicesInventory } from "../../redux/features/devicesInventorySlice";

export const DevicesInventory = () => {
  const gridRef = useRef<DataGridRef<DeviceInventoryRow>>(null);

  const [readDevicesInventory, { isLoading: isInventoryLoading }] =
    useReadDevicesInventoryMutation();

  const [readDevices, { isLoading: isDevicesLoading }] =
    useReadDevicesMutation();

  const devices = useAppSelector(selectDevices);
  const inventory = useAppSelector(selectDevicesInventory);

  useEffect(() => {
    refreshDevices();
    refreshDevicesInventory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshDevices = () => {
    readDevices()
      .unwrap()
      .catch((error) => toast.error(error.message));
  };

  const refreshDevicesInventory = () => {
    readDevicesInventory()
      .unwrap()
      .then((result) => toast.info(result.message))
      .catch((error) => toast.error(error.data));
  };

  return (
    <div className="w-full h-full max-h-full flex flex-col gap-2">
      <Header
        gridRef={gridRef}
        refreshDevicesInventory={refreshDevicesInventory}
        devices={devices}
      />

      <Grid
        gridRef={gridRef}
        data={inventory}
        isLoading={isDevicesLoading || isInventoryLoading}
      />
    </div>
  );
};
