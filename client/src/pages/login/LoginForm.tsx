/* eslint-disable @typescript-eslint/no-explicit-any */
import { Typography, Input, Button, Spinner } from "@material-tailwind/react";
import clsx from "clsx";
import { useLoginMutation } from "../../redux/api/authApi";
import { LoginRequestDto } from "../../redux/dtos/requests/users";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

const schema: yup.ObjectSchema<LoginRequestDto> = yup.object({
  login: yup.string().required("Заполните логин"),
  password: yup.string().required("Заполните пароль"),
});

interface Props {
  isLogin: boolean;
}

export const LoginForm = ({ isLogin }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || "/";

  const [loginRequest, { isLoading: isLoginLoading }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm<LoginRequestDto>({
    resolver: yupResolver(schema),
    defaultValues: {
      login: undefined,
      password: undefined,
    },
  });

  const onSubmit: SubmitHandler<LoginRequestDto> = (data, event) => {
    event?.preventDefault();
    loginRequest({ login: data.login, password: data.password })
      .unwrap()
      .then((result) => {
        toast.info(result.message);
        navigate(from, { replace: true });
        reset();
      })
      .catch((error) => toast.error(error.data));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={clsx(
        "flex flex-col gap-4 w-4/5 transition-opacity duration-700",
        {
          "opacity-100": isLogin,
          "opacity-0": !isLogin,
        }
      )}
    >
      <Typography type="h4" className="text-center">
        Вход
      </Typography>
      <div className="flex flex-col gap-2">
        <Input
          id="login"
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
          id="password"
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

      <Button
        variant="outline"
        color="primary"
        className="text-foreground flex flex-row gap-2 items-center"
        onClick={() => clearErrors()}
      >
        {isLoginLoading && <Spinner size="sm" />}
        Войти
      </Button>
    </form>
  );
};
