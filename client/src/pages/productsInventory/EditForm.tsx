import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  ExpirationCountingDateType,
  ExpirationCountingDateTypeOptions,
  ExpirationMeasureType,
  ExpirationMeasureTypeOptions,
} from "../../redux/enums";
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
import { FormDatePicker, FormInput, FormNumberSelect } from "../../components";
import { toast } from "react-toastify";
import { UpdateProductInventoryItemRequestDto } from "../../redux/dtos/requests/productsInventory";
import { useUpdateProductsInventoryItemMutation } from "../../redux/api/productsInventoryApi";
import { ProductInventoryItemResponseDto } from "../../redux/dtos/responses/productsInventory";

const schema: yup.ObjectSchema<UpdateProductInventoryItemRequestDto> =
  yup.object({
    quantity: yup.number().required("Задайте количество"),
    incomingDate: yup.date().required("Задайте дату поступления"),
    purchasePrice: yup.number().required("Задайте закупочную цену"),
    retailPrice: yup.number().required("Задайте розничную цену"),
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
    <Drawer>
      <Drawer.Trigger as={Button} variant="ghost" color="warning" size="sm">
        <BiEdit size={20} />
      </Drawer.Trigger>
      <Drawer.Overlay className="bg-surface-dark/70">
        <Drawer.Panel className="max-h-screen h-screen text-foreground">
          <div className="flex flex-row justify-between items-center gap-4 mb-4">
            <Typography type="h6">Изменение продукта на складе</Typography>
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

            <FormInput
              id="expirationTime"
              label="Срок годности"
              type="number"
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
