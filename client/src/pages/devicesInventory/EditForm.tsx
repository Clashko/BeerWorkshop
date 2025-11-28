import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Drawer,
  IconButton,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import { BiEdit } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import { FormDatePicker, FormInput } from "../../components";
import { toast } from "react-toastify";
import { UpdateDeviceInventoryItemRequestDto } from "../../redux/dtos/requests/devicesInventory";
import { DeviceInventoryItemResponseDto } from "../../redux/dtos/responses/devicesInventory";
import { useUpdateDevicesInventoryItemMutation } from "../../redux/api/devicesInventoryApi";

const schema: yup.ObjectSchema<UpdateDeviceInventoryItemRequestDto> =
  yup.object({
    quantity: yup.number().required("Задайте количество"),
    incomingDate: yup.date().required("Задайте дату поступления"),
    purchasePrice: yup.number().required("Задайте закупочную цену"),
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
    <Drawer>
      <Drawer.Trigger as={Button} variant="ghost" color="warning" size="sm">
        <BiEdit size={20} />
      </Drawer.Trigger>
      <Drawer.Overlay className="bg-surface-dark/70">
        <Drawer.Panel className="max-h-screen h-screen text-foreground">
          <div className="flex flex-row justify-between items-center gap-4 mb-4">
            <Typography type="h6">Изменение расходника на складе</Typography>
            <Drawer.DismissTrigger
              as={IconButton}
              size="sm"
              variant="ghost"
              isCircular
            >
              <CgClose size={16} />
            </Drawer.DismissTrigger>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="h-full flex flex-col gap-4"
          >
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
              {...register("purchasePrice")}
              error={errors.purchasePrice}
            />

            <FormInput
              id="retailPrice"
              label="Розничная цена"
              type="number"
              {...register("retailPrice")}
              error={errors.retailPrice}
            />

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
        </Drawer.Panel>
      </Drawer.Overlay>
    </Drawer>
  );
};
