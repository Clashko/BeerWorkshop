import * as yup from "yup";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, IconButton, Spinner } from "@material-tailwind/react";
import { BiAddToQueue } from "react-icons/bi";
import {
  FormDatePicker,
  FormInput,
  FormStringSelect,
  SideBar,
} from "../../components";
import { toast } from "react-toastify";
import { SelectOption } from "../../interfaces/SelectOption";
import {
  CreateDeviceInventoryItemRequestDto,
  CreateDevicesDeliveryRequestDto,
} from "../../redux/dtos/requests/devicesInventory";
import { DeviceResponseDto } from "../../redux/dtos/responses/devices";
import { useCreateDevicesInventoryItemMutation } from "../../redux/api/devicesInventoryApi";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

const itemSchema: yup.ObjectSchema<CreateDeviceInventoryItemRequestDto> =
  yup.object({
    quantity: yup.number().required("Задайте количество"),
    incomingDate: yup.date().required("Задайте дату поступления"),
    purchasePrice: yup.number().required("Задайте закупочную цену"),
    retailPrice: yup.number().required("Задайте розничную цену"),
    deviceId: yup.string().required("Не выбран исходный продукт"),
  });

type FormValues = {
  items: CreateDeviceInventoryItemRequestDto[];
};

const schema: yup.ObjectSchema<FormValues> = yup.object({
  items: yup
    .array()
    .of(itemSchema)
    .min(1, "Добавьте хотя бы один расходник")
    .required(),
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
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: { items: [] },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const groupByProductId = (
    items: CreateDeviceInventoryItemRequestDto[]
  ): CreateDevicesDeliveryRequestDto[] => {
    const map = items.reduce((acc, item) => {
      if (!acc[item.deviceId]) {
        acc[item.deviceId] = [];
      }
      acc[item.deviceId].push(item);
      return acc;
    }, {} as Record<string, typeof items>);

    return Object.entries(map).map(([deviceId, items]) => ({
      deviceId,
      items,
    }));
  };

  const onSubmit: SubmitHandler<FormValues> = (data, event) => {
    event?.preventDefault();

    const grouped = groupByProductId(data.items);

    if (grouped) {
      createDeviceInventoryItem(grouped)
        .unwrap()
        .then((result) => {
          toast.info(result.message);
          reset();
        })
        .catch((error) => toast.error(error.data));
    }
  };

  const [collapsed, setCollapsed] = useState<boolean[]>([]);

  const toggleCollapse = (index: number) => {
    setCollapsed((prev) => {
      const copy = [...prev];
      copy[index] = !copy[index];
      return copy;
    });
  };

  return (
    <SideBar
      triggerConent={
        <>
          <BiAddToQueue size={20} />
          <span className="hidden sm:block">Добавить</span>
        </>
      }
      color="primary"
      title="Добавление продукта на склад"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="h-full max-h-full flex flex-col gap-4 justify-between"
      >
        <div className="h-full max-h-full pr-2 flex flex-col gap-2 overflow-y-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-transparent">
          {fields.map((_field, index) => (
            <div
              key={index}
              className="flex flex-col gap-2 p-2 shadow-all-md rounded-md bg-surface"
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold">Расходник {index + 1}</span>
                <div className="flex gap-2">
                  <IconButton
                    variant="ghost"
                    color="error"
                    type="button"
                    onClick={() => remove(index)}
                  >
                    <MdDelete size={20} />
                  </IconButton>
                  <IconButton
                    variant="ghost"
                    color="info"
                    type="button"
                    onClick={() => toggleCollapse(index)}
                  >
                    {collapsed[index] ? (
                      <FaArrowDown size={19} />
                    ) : (
                      <FaArrowUp size={19} />
                    )}
                  </IconButton>
                </div>
              </div>

              {!collapsed[index] && (
                <div className="flex flex-col gap-2">
                  <FormStringSelect
                    id={`${index}.deviceId`}
                    label="Расходник"
                    control={control}
                    name={`items.${index}.deviceId`}
                    type="string"
                    options={productOptions}
                  />

                  <FormInput
                    id={`${index}.quantity`}
                    label="Количество"
                    type="number"
                    step="any"
                    {...register(`items.${index}.quantity`)}
                    error={
                      errors.items !== undefined
                        ? errors.items[index]?.quantity
                        : undefined
                    }
                  />

                  <FormDatePicker
                    id={`${index}.incomingDate`}
                    name="incomingDate"
                    label="Дата поступления"
                    control={control}
                  />

                  <FormInput
                    id={`${index}.purchasePrice`}
                    label="Закупочная цена"
                    type="number"
                    step="any"
                    {...register(`items.${index}.purchasePrice`)}
                    error={
                      errors.items !== undefined
                        ? errors.items[index]?.purchasePrice
                        : undefined
                    }
                  />

                  <FormInput
                    id={`${index}.retailPrice`}
                    label="Розничная цена"
                    type="number"
                    step="any"
                    {...register(`items.${index}.retailPrice`)}
                    error={
                      errors.items !== undefined
                        ? errors.items[index]?.retailPrice
                        : undefined
                    }
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          {/* Ошибка массива */}
          {errors.items && typeof errors.items.message === "string" && (
            <p className="text-red-500 text-sm">{errors.items.message}</p>
          )}
          <Button
            variant="outline"
            color="warning"
            isFullWidth
            className="text-foreground"
            type="button"
            onClick={() =>
              append({
                deviceId: devices[0].id,
                quantity: 0,
                incomingDate: new Date(),
                purchasePrice: 0,
                retailPrice: 0,
              })
            }
          >
            Добавить еще расходник?
          </Button>

          <Button
            type="submit"
            variant="outline"
            isFullWidth
            className="text-foreground"
            onClick={() => clearErrors()}
          >
            {isLoading && <Spinner size="sm" />}
            Добавить
          </Button>
        </div>
      </form>
    </SideBar>
  );
};
