import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { CreateProductRequestDto } from "../../redux/dtos/requests/products";
import {
  ProductType,
  ProductTypeOptions,
  UnitOfMeasureOptions,
  UnitOfMeasureType,
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
import { FormInput, FormNumberSelect } from "../../components";
import { useCreateProductMutation } from "../../redux/api/productsApi";
import { toast } from "react-toastify";

const schema: yup.ObjectSchema<CreateProductRequestDto> = yup.object({
  name: yup.string().required("Заполните наименование"),
  shortName: yup.string().required("Заполните короткое наименование"),
  productType: yup
    .mixed<ProductType>()
    .oneOf([0, 1], "Неверный тип продукта")
    .required("Выберите тип продукта") as yup.Schema<ProductType>,
  unitOfMeasure: yup
    .mixed<UnitOfMeasureType>()
    .oneOf([0, 1, 2, 3], "Неверная единица измерения")
    .required("Выберите еденицу измерения") as yup.Schema<UnitOfMeasureType>,
});

export const AddForm = () => {
  const [createProduct, { isLoading }] = useCreateProductMutation();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm<CreateProductRequestDto>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      shortName: "",
      productType: undefined,
      unitOfMeasure: undefined,
    },
  });

  const onSubmit: SubmitHandler<CreateProductRequestDto> = (data, event) => {
    event?.preventDefault();

    createProduct(data)
      .unwrap()
      .then((result) => {
        toast.info(result.message);
        reset();
      })
      .catch((error) => toast.error(error.data));
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
            <Typography type="h6">Добавление продукта</Typography>
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
              id="name"
              label="Наименование"
              type="text"
              {...register("name")}
              error={errors.name}
            />

            <FormInput
              id="shortName"
              label="Короткое наименование"
              type="text"
              {...register("shortName")}
              error={errors.shortName}
            />

            <FormNumberSelect
              id="productType"
              label="Тип продукта"
              control={control}
              name="productType"
              type="number"
              options={ProductTypeOptions}
            />

            <FormNumberSelect
              id="unitOfMeasure"
              label="Еденицы измерения"
              control={control}
              name="unitOfMeasure"
              type="number"
              options={UnitOfMeasureOptions}
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
