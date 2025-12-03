/* eslint-disable @typescript-eslint/no-explicit-any */
import { Typography, Input, Button, Spinner } from "@material-tailwind/react";
import clsx from "clsx";
import { useLoginMutation, useRegisterMutation } from "../../redux/api/authApi";
import { RegisterRequestDto } from "../../redux/dtos/requests/users";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

const schema: yup.ObjectSchema<RegisterRequestDto> = yup.object({
  login: yup.string().required("Заполните логин"),
  password: yup.string().required("Заполните пароль"),
  firstName: yup.string().required("Заполните фамилию"),
  lastName: yup.string().required("Заполните имя"),
  surName: yup.string().required("Заполните отчество"),
});

interface Props {
  isLogin: boolean;
}

export const RegisterForm = ({ isLogin }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || "/";

  const [registerRequest, { isLoading: isRegisterLoading }] =
    useRegisterMutation();
  const [loginRequest, { isLoading: isLoginLoading }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm<RegisterRequestDto>({
    resolver: yupResolver(schema),
    defaultValues: {
      login: undefined,
      password: undefined,
      firstName: undefined,
      lastName: undefined,
      surName: undefined,
    },
  });

  const onSubmit: SubmitHandler<RegisterRequestDto> = (data, event) => {
    event?.preventDefault();

    registerRequest(data)
      .unwrap()
      .then((result) => {
        toast.info(result.message);

        loginRequest({ login: data.login, password: data.password })
          .unwrap()
          .then(() => {
            navigate(from, { replace: true });
          })
          .catch((error) => toast.error(error.data));

        reset();
      })
      .catch((error) => toast.error(error.data));
  };

  return (
    <div className="w-full h-1/2 md:w-1/2 md:h-full flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={clsx(
          "flex flex-col gap-2 lg:gap-4 md:w-4/5 transition-opacity duration-700",
          {
            "opacity-0": isLogin,
            "opacity-100": !isLogin,
          }
        )}
      >
        <Typography type="h4" className="text-center">
          Регистрация
        </Typography>
        <div className="flex flex-col gap-2">
          <Input
            id="loginRegister"
            placeholder="Логин"
            type="text"
            className="border-primary-dark"
            {...register("login")}
            isError={errors.login != undefined}
          />

          {errors.login && (
            <Typography color="error" type="small">
              {errors.login.message}
            </Typography>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Input
            id="passwordRegister"
            placeholder="Пароль"
            type="password"
            className="border-primary-dark"
            {...register("password")}
            isError={errors.password != undefined}
          />

          {errors.password && (
            <Typography color="error" type="small">
              {errors.password.message}
            </Typography>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Input
            id="lastNameRegister"
            placeholder="Фамилия"
            type="text"
            className="border-primary-dark"
            {...register("lastName")}
            isError={errors.lastName != undefined}
          />

          {errors.lastName && (
            <Typography color="error" type="small">
              {errors.lastName.message}
            </Typography>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Input
            id="firstNameRegister"
            placeholder="Имя"
            type="text"
            className="border-primary-dark"
            {...register("firstName")}
            isError={errors.firstName != undefined}
          />

          {errors.firstName && (
            <Typography color="error" type="small">
              {errors.firstName.message}
            </Typography>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Input
            id="surNameRegister"
            placeholder="Отчество"
            type="text"
            className="border-primary-dark"
            {...register("surName")}
            isError={errors.surName != undefined}
          />

          {errors.surName && (
            <Typography color="error" type="small">
              {errors.surName.message}
            </Typography>
          )}
        </div>
        <Button
          variant="outline"
          color="primary"
          className="text-foreground flex flex-row gap-2 items-center"
          onClick={() => clearErrors()}
        >
          {(isRegisterLoading || isLoginLoading) && <Spinner size="sm" />}
          Зарегестрироваться
        </Button>
      </form>
    </div>
  );
};
