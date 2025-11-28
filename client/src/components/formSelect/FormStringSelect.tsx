/* eslint-disable @typescript-eslint/no-explicit-any */
import { Select, SelectProps, Typography } from "@material-tailwind/react";
import { Control, Controller } from "react-hook-form";
import { SelectOption } from "../../interfaces/SelectOption";

interface Props extends SelectProps {
  id: string;
  label: string;
  control: Control<any>;
  name: string;
  options: SelectOption<string>[];
}

export const FormStringSelect = ({
  id,
  label,
  control,
  name,
  options,
  ...props
}: Props) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className="flex flex-col gap-2">
          <Typography as="label" htmlFor={id} type="small">
            {label}
          </Typography>
          <Select
            id={id}
            value={String(field.value)}
            onValueChange={(val) => field.onChange(String(val))}
            isError={!!fieldState.error}
            {...props}
          >
            <Select.Trigger />
            <Select.List>
              {options.map(({ label, value }) => (
                <Select.Option key={value} value={String(value)}>
                  {label}
                </Select.Option>
              ))}
            </Select.List>
          </Select>
          <Typography color="error" type="small">
            {fieldState.error?.message}
          </Typography>
        </div>
      )}
    />
  );
};
