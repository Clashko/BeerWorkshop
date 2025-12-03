import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Spinner,
} from "@material-tailwind/react";
import { BiAddToQueue } from "react-icons/bi";
import { FormInput, SideBar } from "../../components";
import { toast } from "react-toastify";
import { CreateDeviceRequestDto } from "../../redux/dtos/requests/devices";
import { useCreateDeviceMutation } from "../../redux/api/devicesApi";

const schema: yup.ObjectSchema<CreateDeviceRequestDto> = yup.object({
  name: yup.string().required("Заполните наименование"),
  shortName: yup.string().required("Заполните короткое наименование"),
});

export const AddForm = () => {
  const [createDevice, { isLoading }] = useCreateDeviceMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm<CreateDeviceRequestDto>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      shortName: "",
    },
  });

  const onSubmit: SubmitHandler<CreateDeviceRequestDto> = (data, event) => {
    event?.preventDefault();

    createDevice(data)
      .unwrap()
      .then((result) => {
        toast.info(result.message);
        reset();
      })
      .catch((error) => toast.error(error.data));
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
      title="Добавление расходника"
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
        </div>

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
    </SideBar>
  );
};
