import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Spinner } from "@material-tailwind/react";
import { BiEdit } from "react-icons/bi";
import { FormDatePicker, FormInput, SideBar } from "../../components";
import { toast } from "react-toastify";
import { UpdateDeviceInventoryItemRequestDto } from "../../redux/dtos/requests/devicesInventory";
import { DeviceInventoryItemResponseDto } from "../../redux/dtos/responses/devicesInventory";
import { useUpdateDevicesInventoryItemMutation } from "../../redux/api/devicesInventoryApi";

const schema: yup.ObjectSchema<UpdateDeviceInventoryItemRequestDto> =
  yup.object({
    quantity: yup.number().required("Задайте количество"),
    incomingDate: yup.date().required("Задайте дату поступления"),
    purchasePrice: yup.number().required("Задайте закупочную цену"),
    purchaseVat: yup.number().required("Задайте процент НДС"),
    retailPrice: yup.number().required("Задайте розничную цену"),
  });

interface Props {
  deviceInventoryItem: DeviceInventoryItemResponseDto;
  deviceId: string;
}

export const EditForm = ({ deviceInventoryItem, deviceId }: Props) => {
  const [updateDeviceInventoryItem, { isLoading }] =
    useUpdateDevicesInventoryItemMutation();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<UpdateDeviceInventoryItemRequestDto>({
    resolver: yupResolver(schema),
    defaultValues: {
      quantity: deviceInventoryItem.quantity,
      incomingDate: deviceInventoryItem.incomingDate,
      purchasePrice: deviceInventoryItem.purchasePrice,
      retailPrice: deviceInventoryItem.retailPrice,
    },
  });

  const onSubmit: SubmitHandler<UpdateDeviceInventoryItemRequestDto> = (
    data,
    event
  ) => {
    event?.preventDefault();

    updateDeviceInventoryItem({
      deviceId: deviceId,
      deviceItemId: deviceInventoryItem.id,
      body: data,
    })
      .unwrap()
      .then((result) => toast.info(result.message))
      .catch((error) => toast.error(error.data));
  };

  return (
    <SideBar
      triggerConent={<BiEdit size={20} />}
      title="Изменение расходника на складе"
      color="warning"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="h-full max-h-full flex flex-col gap-4 justify-between"
      >
        <div className="h-full max-h-full flex flex-col gap-4 overflow-y-auto">
          <FormInput
            id="quantity"
            label="Количество"
            type="number"
            {...register("quantity")}
            error={errors.quantity}
          />

          <FormDatePicker
            id="incomingDate"
            name="incomingDate"
            label="Дата поступления"
            control={control}
          />

          <FormInput
            id="purchasePrice"
            label="Закупочная цена"
            type="number"
            step="any"
            {...register("purchasePrice")}
            error={errors.purchasePrice}
          />

          <FormInput
            id="purchaseVat"
            label="Процент НДС"
            type="number"
            step="any"
            {...register("purchaseVat")}
            error={errors.purchaseVat}
          />

          <FormInput
            id="retailPrice"
            label="Розничная цена"
            type="number"
            step="any"
            {...register("retailPrice")}
            error={errors.retailPrice}
          />
        </div>

        <Button
          variant="outline"
          isFullWidth
          className="text-foreground"
          onClick={() => clearErrors()}
        >
          {isLoading && <Spinner size="sm" />}
          Изменить
        </Button>
      </form>
    </SideBar>
  );
};
