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
import { BiAddToQueue } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import {
  FormDatePicker,
  FormInput,
  FormNumberSelect,
  FormStringSelect,
} from "../../components";
import { toast } from "react-toastify";
import { CreateProductInventoryItemRequestDto } from "../../redux/dtos/requests/productsInventory";
import { useCreateProductsInventoryItemMutation } from "../../redux/api/productsInventoryApi";
import { ProductResponseDto } from "../../redux/dtos/responses/producs";
import { SelectOption } from "../../interfaces/SelectOption";

const schema: yup.ObjectSchema<CreateProductInventoryItemRequestDto> =
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
      .required("Выберите тип срока годности") as yup.Schema<ExpirationMeasureType>,
    productId: yup.string().required("Не выбран исходный продукт"),
    openingDate: yup.date().optional().nullable(),
    expirationCountingDateType: yup
      .mixed<ExpirationCountingDateType>()
      .oneOf([0, 1], "Неверный тип отсчета срока годности")
      .required(
        "Выберите тип отсчета срока годности"
      ) as yup.Schema<ExpirationCountingDateType>,
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
  } = useForm<CreateProductInventoryItemRequestDto>({
    resolver: yupResolver(schema),
    defaultValues: {
      productId: "",
      quantity: 0,
      manufactureDate: undefined,
      incomingDate: undefined,
      purchasePrice: undefined,
      retailPrice: undefined,
      expirationTime: undefined,
      expirationMeasure: undefined,
      openingDate: undefined,
      expirationCountingDateType: undefined
    },
  });

  const onSubmit: SubmitHandler<CreateProductInventoryItemRequestDto> = (
    data,
    event
  ) => {
    event?.preventDefault();
    const product = products.find((p) => p.id === data.productId);

    if (product) {
      createProductInventoryItem({ product: product, body: data })
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
            <Typography type="h6">Добавление продукта на склад</Typography>
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
              id="productId"
              label="Продукт"
              control={control}
              name="productId"
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
              withTime
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
              Добавить
            </Button>
          </form>
        </Drawer.Panel>
      </Drawer.Overlay>
    </Drawer>
  );
};
