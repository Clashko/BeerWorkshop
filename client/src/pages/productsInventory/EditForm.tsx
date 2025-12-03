import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  ExpirationCountingDateType,
  ExpirationCountingDateTypeOptions,
  ExpirationMeasureType,
  ExpirationMeasureTypeOptions,
} from "../../redux/enums";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Spinner } from "@material-tailwind/react";
import { BiEdit } from "react-icons/bi";
import {
  FormDatePicker,
  FormInput,
  FormNumberSelect,
  SideBar,
} from "../../components";
import { toast } from "react-toastify";
import { UpdateProductInventoryItemRequestDto } from "../../redux/dtos/requests/productsInventory";
import { useUpdateProductsInventoryItemMutation } from "../../redux/api/productsInventoryApi";
import { ProductInventoryItemResponseDto } from "../../redux/dtos/responses/productsInventory";

const schema: yup.ObjectSchema<UpdateProductInventoryItemRequestDto> =
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
    openingDate: yup.date().optional().nullable(),
    expirationCountingDateType: yup
      .mixed<ExpirationCountingDateType>()
      .oneOf([0, 1], "Неверный тип отсчета срока годности")
      .required(
        "Выберите тип отсчета срока годности"
      ) as yup.Schema<ExpirationCountingDateType>,
  });

interface Props {
  productInventoryItem: ProductInventoryItemResponseDto;
  productId: string;
}

export const EditForm = ({ productInventoryItem, productId }: Props) => {
  const [updateProductInventoryItem, { isLoading }] =
    useUpdateProductsInventoryItemMutation();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<UpdateProductInventoryItemRequestDto>({
    resolver: yupResolver(schema),
    defaultValues: {
      quantity: productInventoryItem.quantity,
      manufactureDate: productInventoryItem.manufactureDate,
      incomingDate: productInventoryItem.incomingDate,
      purchasePrice: productInventoryItem.purchasePrice,
      retailPrice: productInventoryItem.retailPrice,
      pricePerQuantity: productInventoryItem.pricePerQuantity,
      expirationTime: productInventoryItem.expirationTime,
      expirationMeasure: productInventoryItem.expirationMeasure,
      openingDate: productInventoryItem.openingDate,
      expirationCountingDateType:
        productInventoryItem.expirationCountingDateType,
    },
  });

  const onSubmit: SubmitHandler<UpdateProductInventoryItemRequestDto> = (
    data,
    event
  ) => {
    event?.preventDefault();

    updateProductInventoryItem({
      productId: productId,
      productItemId: productInventoryItem.id,
      body: data,
    })
      .unwrap()
      .then((result) => toast.info(result.message))
      .catch((error) => toast.error(error.data));
  };

  return (
    <SideBar
      triggerConent={<BiEdit size={20} />}
      title="Изменение продукта на складе"
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
            step="any"
            {...register("quantity")}
            error={errors.quantity}
          />

          <FormDatePicker
            id="manufactureDate"
            name="manufactureDate"
            label="Дата производства"
            control={control}
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

          <FormInput
            id="pricePerQuantity"
            step="any"
            label="Цена за количество"
            type="number"
            {...register("pricePerQuantity")}
            error={errors.pricePerQuantity}
          />

          <FormInput
            id="expirationTime"
            label="Срок годности"
            type="number"
            step="any"
            {...register("expirationTime")}
            error={errors.expirationTime}
          />

          <FormNumberSelect
            id="expirationMeasure"
            label="Тип срока годности"
            control={control}
            name="expirationMeasure"
            type="number"
            options={ExpirationMeasureTypeOptions}
          />

          <FormDatePicker
            id="openingDate"
            name="openingDate"
            label="Дата вскрытия"
            control={control}
          />

          <FormNumberSelect
            id="expirationCountingDateType"
            label="Тип отсчета срока годности"
            control={control}
            name="expirationCountingDateType"
            type="number"
            options={ExpirationCountingDateTypeOptions}
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
