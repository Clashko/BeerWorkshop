import * as yup from "yup";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import {
  ExpirationCountingDateType,
  ExpirationCountingDateTypeOptions,
  ExpirationMeasureType,
  ExpirationMeasureTypeOptions,
} from "../../redux/enums";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, IconButton, Spinner } from "@material-tailwind/react";
import { BiAddToQueue } from "react-icons/bi";
import {
  FormDatePicker,
  FormInput,
  FormNumberSelect,
  FormStringSelect,
  SideBar,
} from "../../components";
import { toast } from "react-toastify";
import {
  CreateProductInventoryItemRequestDto,
  CreateProductsDeliveryRequestDto,
} from "../../redux/dtos/requests/productsInventory";
import { useCreateProductsInventoryItemMutation } from "../../redux/api/productsInventoryApi";
import { ProductResponseDto } from "../../redux/dtos/responses/producs";
import { SelectOption } from "../../interfaces/SelectOption";
import { useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import saveAs from "file-saver";

const itemSchema: yup.ObjectSchema<CreateProductInventoryItemRequestDto> =
  yup.object({
    quantity: yup.number().required("Задайте количество"),
    incomingDate: yup.date().required("Задайте дату поступления"),
    purchasePrice: yup.number().required("Задайте закупочную цену"),
    purchaseVat: yup.number().required("Задайте процент НДС"),
    retailPrice: yup.number().required("Задайте розничную цену"),
    pricePerQuantity: yup.number().required("Задайте цену за количество"),
    manufactureDate: yup.date().required("Задайте дату производства"),
    expirationTime: yup.number().required("Задайте срок годности"),
    expirationMeasure: yup
      .mixed<ExpirationMeasureType>()
      .oneOf([0, 1, 2], "Неверный тип срока годности")
      .required(
        "Выберите тип срока годности"
      ) as yup.Schema<ExpirationMeasureType>,
    productId: yup.string().required("Не выбран исходный продукт"),
    openingDate: yup.date().optional().nullable(),
    expirationCountingDateType: yup
      .mixed<ExpirationCountingDateType>()
      .oneOf([0, 1], "Неверный тип отсчета срока годности")
      .required(
        "Выберите тип отсчета срока годности"
      ) as yup.Schema<ExpirationCountingDateType>,
  });

type FormValues = {
  items: CreateProductInventoryItemRequestDto[];
};

const schema: yup.ObjectSchema<FormValues> = yup.object({
  items: yup
    .array()
    .of(itemSchema)
    .min(1, "Добавьте хотя бы один продукт")
    .required(),
});

interface Props {
  products: ProductResponseDto[];
}

export const AddForm = ({ products }: Props) => {
  const productOptions: SelectOption<string>[] = products.map((product) => ({
    label: product.name,
    value: product.id,
  }));

  const [createProductInventoryItem, { isLoading }] =
    useCreateProductsInventoryItemMutation();

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
    items: CreateProductInventoryItemRequestDto[]
  ): CreateProductsDeliveryRequestDto[] => {
    const map = items.reduce((acc, item) => {
      if (!acc[item.productId]) {
        acc[item.productId] = [];
      }
      acc[item.productId].push(item);
      return acc;
    }, {} as Record<string, typeof items>);

    return Object.entries(map).map(([productId, items]) => ({
      productId,
      items,
    }));
  };

  const onSubmit: SubmitHandler<FormValues> = (data, event) => {
    event?.preventDefault();

    const grouped = groupByProductId(data.items);

    if (grouped) {
      createProductInventoryItem(grouped)
        .unwrap()
        .then((result) => {
          toast.info(result.message);
          handleSaveCheck(result.data.checkContent);
          reset();
        })
        .catch((error) => toast.error(error.data));
    }
  };

  const handleSaveCheck = (content: string) => {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const lines = content.split("\n");
    const typeLine = lines[5].trim();
    const numberLine = lines[6].trim();
    const match = numberLine.match(/№\s*(\d+)/);
    let name = "";
    if (typeLine === "Списание") name = "WriteOff";
    else if (typeLine === "Приход") name = "Arrival";
    else name = "Sale";
    let number = 1;
    if (match) number = Number(match[1]);
    saveAs(blob, `${name} №${number}.txt`);
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
      title="Добавление продуктов на склад"
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
                <span className="font-semibold">Продукт {index + 1}</span>
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
                    id={`${index}.productId`}
                    label="Продукт"
                    control={control}
                    name={`items.${index}.productId`}
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
                    id={`${index}.manufactureDate`}
                    name={`items.${index}.manufactureDate`}
                    label="Дата производства"
                    control={control}
                  />

                  <FormDatePicker
                    id={`${index}.incomingDate`}
                    name={`items.${index}.incomingDate`}
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
                    id={`${index}.purchaseVat`}
                    label="Процент НДС"
                    type="number"
                    step="any"
                    {...register(`items.${index}.purchaseVat`)}
                    error={
                      errors.items !== undefined
                        ? errors.items[index]?.purchaseVat
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

                  <FormInput
                    id={`${index}.pricePerQuantity`}
                    label="Цена за количество"
                    type="number"
                    step="any"
                    {...register(`items.${index}.pricePerQuantity`)}
                    error={
                      errors.items !== undefined
                        ? errors.items[index]?.pricePerQuantity
                        : undefined
                    }
                  />

                  <FormInput
                    id={`${index}.expirationTime`}
                    label="Срок годности"
                    type="number"
                    step="any"
                    {...register(`items.${index}.expirationTime`)}
                    error={
                      errors.items !== undefined
                        ? errors.items[index]?.expirationTime
                        : undefined
                    }
                  />

                  <FormNumberSelect
                    id={`${index}.expirationMeasure`}
                    label="Тип срока годности"
                    control={control}
                    name={`items.${index}.expirationMeasure`}
                    type="number"
                    options={ExpirationMeasureTypeOptions}
                  />

                  <FormDatePicker
                    id={`${index}.openingDate`}
                    name={`items.${index}.openingDate`}
                    label="Дата вскрытия"
                    withTime
                    control={control}
                  />

                  <FormNumberSelect
                    id={`${index}.expirationCountingDateType`}
                    label="Тип отсчета срока годности"
                    control={control}
                    name={`items.${index}.expirationCountingDateType`}
                    type="number"
                    options={ExpirationCountingDateTypeOptions}
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
                quantity: 0,
                incomingDate: new Date(),
                purchasePrice: 0,
                purchaseVat: 0,
                retailPrice: 0,
                pricePerQuantity: 0,
                manufactureDate: new Date(),
                expirationTime: 0,
                expirationMeasure: 0,
                openingDate: null,
                expirationCountingDateType: 0,
                productId: products[0].id,
              })
            }
          >
            Добавить еще продукт?
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
