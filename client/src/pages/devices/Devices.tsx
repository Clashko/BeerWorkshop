import { useEffect, useRef } from "react";
import { useAppSelector } from "../../redux/store/store";
import { toast } from "react-toastify";
import { DataGridRef } from "../../components";
import { Header } from "./Header";
import { Grid } from "./Grid";
import { DeviceResponseDto } from "../../redux/dtos/responses/devices";
import { useReadDevicesMutation } from "../../redux/api/devicesApi";
import { selectDevices } from "../../redux/features/devicesSlice";

export const Devices = () => {
  const gridRef = useRef<DataGridRef<DeviceResponseDto>>(null);

  const [readDevices, { isLoading: isReadDevicesLoading }] =
    useReadDevicesMutation();

  const data = useAppSelector(selectDevices);

  useEffect(() => {
    refreshProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshProducts = () => {
    readDevices()
      .unwrap()
      .then((result) => toast.info(result.message))
      .catch((error) => toast.error(error.data));
  };

  return (
    <div className="h-full flex flex-col gap-2">
      <Header gridRef={gridRef} refreshProducts={refreshProducts} />

      <Grid gridRef={gridRef} data={data} isLoading={isReadDevicesLoading} />
    </div>
  );
};
