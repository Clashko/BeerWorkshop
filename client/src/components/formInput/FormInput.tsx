import { Input, InputProps, Typography } from "@material-tailwind/react";
import { FieldError } from "react-hook-form";

interface Props extends InputProps {
  id: string;
  label: string;
  error?: FieldError;
}

export const FormInput = ({ id, label, error, ...props }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <Typography as="label" htmlFor={id} type="small">
        {label}
      </Typography>
      <Input
        id={id}
        isError={error != undefined}
        {...props}
      />
      <Typography color="error" type="small">
        {error?.message}
      </Typography>
    </div>
  );
};
