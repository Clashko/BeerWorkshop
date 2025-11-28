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
import { FormInput } from "../../components";
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
            <Typography type="h6">Добавление расходника</Typography>
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
