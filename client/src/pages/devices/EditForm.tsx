import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Spinner } from "@material-tailwind/react";
import { FormInput, SideBar } from "../../components";
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
    <SideBar
      triggerConent={<BiEdit size={20} />}
      title="Изменение расходника"
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
