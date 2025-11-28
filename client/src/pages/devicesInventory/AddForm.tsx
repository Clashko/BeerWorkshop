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
import { BiAddToQueue } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import { FormDatePicker, FormInput, FormStringSelect } from "../../components";
import { toast } from "react-toastify";
import { SelectOption } from "../../interfaces/SelectOption";
import { CreateDeviceInventoryItemRequestDto } from "../../redux/dtos/requests/devicesInventory";
import { DeviceResponseDto } from "../../redux/dtos/responses/devices";
import { useCreateDevicesInventoryItemMutation } from "../../redux/api/devicesInventoryApi";

const schema: yup.ObjectSchema<CreateDeviceInventoryItemRequestDto> =
  yup.object({
    quantity: yup.number().required("Задайте количество"),
    incomingDate: yup.date().required("Задайте дату поступления"),
    purchasePrice: yup.number().required("Задайте закупочную цену"),
    retailPrice: yup.number().required("Задайте розничную цену"),
    deviceId: yup.string().required("Не выбран исходный продукт"),
  });

interface Props {
  devices: DeviceResponseDto[];
}

export const AddForm = ({ devices }: Props) => {
  const productOptions: SelectOption<string>[] = devices.map((device) => ({
    label: device.name,
    value: device.id,
  }));

  const [createDeviceInventoryItem, { isLoading }] =
    useCreateDevicesInventoryItemMutation();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm<CreateDeviceInventoryItemRequestDto>({
    resolver: yupResolver(schema),
    defaultValues: {
      deviceId: "",
      quantity: 0,
      incomingDate: undefined,
      purchasePrice: undefined,
      retailPrice: undefined,
    },
  });

  const onSubmit: SubmitHandler<CreateDeviceInventoryItemRequestDto> = (
    data,
    event
  ) => {
    event?.preventDefault();
    const device = devices.find((p) => p.id === data.deviceId);

    if (device) {
      createDeviceInventoryItem({ device: device, body: data })
        .unwrap()
        .then((result) => {
          toast.info(result.message);
          reset();
        })
        .catch((error) => toast.error(error.data));
    }
  };

  return (
    <Drawer>
      <Drawer.Trigger
        as={Button}
        variant="ghost"
        size="md"
        className="flex flex-row gap-2 items-center text-foreground"
      >
        <BiAddToQueue size={26} />
        Добавить
      </Drawer.Trigger>
      <Drawer.Overlay className="bg-surface-dark/70">
        <Drawer.Panel className="max-h-screen h-screen text-foreground">
          <div className="flex flex-row justify-between items-center gap-4 mb-4">
            <Typography type="h6">Добавление расходника на склад</Typography>
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
            <FormStringSelect
              id="deviceId"
              label="Расходник"
              control={control}
              name="deviceId"
              type="string"
              options={productOptions}
            />

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
              Добавить
            </Button>
          </form>
        </Drawer.Panel>
      </Drawer.Overlay>
    </Drawer>
  );
};
