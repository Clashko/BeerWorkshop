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
import { CgClose } from "react-icons/cg";
import { FormInput } from "../../components";
import { toast } from "react-toastify";
import { BiEdit } from "react-icons/bi";
import { UpdateDeviceRequestDto } from "../../redux/dtos/requests/devices";
import { DeviceResponseDto } from "../../redux/dtos/responses/devices";
import { useUpdateDeviceMutation } from "../../redux/api/devicesApi";

const schema: yup.ObjectSchema<UpdateDeviceRequestDto> = yup.object({
  name: yup.string().required("Заполните наименование"),
  shortName: yup.string().required("Заполните короткое наименование"),
});

interface Props {
  device: DeviceResponseDto;
}

export const EditForm = ({ device }: Props) => {
  const [updateDevice, { isLoading }] = useUpdateDeviceMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<UpdateDeviceRequestDto>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: device.name,
      shortName: device.shortName,
    },
  });

  const onSubmit: SubmitHandler<UpdateDeviceRequestDto> = (data, event) => {
    event?.preventDefault();

    updateDevice({ id: device.id, body: data })
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
            <Typography type="h6">Изменение расходника</Typography>
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
              Изменить
            </Button>
          </form>
        </Drawer.Panel>
      </Drawer.Overlay>
    </Drawer>
  );
};
