import { Input, InputProps, Typography } from "@material-tailwind/react";
import clsx from "clsx";
import { FieldError } from "react-hook-form";

interface Props extends InputProps {
  id: string;
  label: string;
  error?: FieldError;
}

export const FormInput = ({ id, label, error, className, ...props }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <Typography as="label" htmlFor={id} type="small">
        {label}
      </Typography>
      <Input
        id={id}
        isError={error != undefined}
        className={clsx(className, "py-1")}
        {...props}
      />
      <Typography color="error" type="small">
        {error?.message}
      </Typography>
    </div>
  );
};
