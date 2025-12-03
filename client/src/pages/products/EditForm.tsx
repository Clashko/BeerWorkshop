import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { UpdateProductRequestDto } from "../../redux/dtos/requests/products";
import {
  ProductType,
  ProductTypeOptions,
  UnitOfMeasureOptions,
  UnitOfMeasureType,
} from "../../redux/enums";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Spinner } from "@material-tailwind/react";
import { FormInput, FormNumberSelect, SideBar } from "../../components";
import { useUpdateProductMutation } from "../../redux/api/productsApi";
import { toast } from "react-toastify";
import { ProductResponseDto } from "../../redux/dtos/responses/producs";
import { BiEdit } from "react-icons/bi";

const schema: yup.ObjectSchema<UpdateProductRequestDto> = yup.object({
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

interface Props {
  product: ProductResponseDto;
}

export const EditForm = ({ product }: Props) => {
  const [updateProduct, { isLoading }] = useUpdateProductMutation();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<UpdateProductRequestDto>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: product.name,
      shortName: product.shortName,
      productType: product.productType,
      unitOfMeasure: product.unitOfMeasure,
    },
  });

  const onSubmit: SubmitHandler<UpdateProductRequestDto> = (data, event) => {
    event?.preventDefault();

    updateProduct({ id: product.id, body: data })
      .unwrap()
      .then((result) => toast.info(result.message))
      .catch((error) => toast.error(error.data));
  };

  return (
    <SideBar
      triggerConent={<BiEdit size={20} />}
      title="Изменение продукта"
      color="warning"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="h-full max-h-full flex flex-col gap-4 justify-between"
      >
        <div className="h-full max-h-full flex flex-col gap-4 overflow-y-auto">
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
