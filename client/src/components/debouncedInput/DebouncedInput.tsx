import { Input, InputProps } from "@material-tailwind/react";
import clsx from "clsx";
import { useEffect, useState } from "react";

export const DebouncedInput = ({
  initialValue,
  onChange,
  debounce = 500,
  className,
  ...props
}: {
  initialValue: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<InputProps, "onChange">) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearInterval(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <Input
      className={clsx(className, "py-1 px-2")}
      value={value}
      onChange={(e: {
        target: {
          value: React.SetStateAction<
            | string
            | number
            | (string & readonly string[])
            | (number & readonly string[])
          >;
        };
      }) => setValue(e.target.value)}
      {...props}
    />
  );
};
