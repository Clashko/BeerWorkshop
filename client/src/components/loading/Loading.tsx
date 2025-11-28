import { Typography } from "@material-tailwind/react";

interface Props {
  placeholder: string;
}

export const Loading = ({ placeholder }: Props) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
      <div className="relative flex justify-center items-center">
        <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-surface-foreground" />
        <img
          src={`${import.meta.env.BASE_URL}assets/logo.png`}
          className="rounded-full h-28 w-28"
          alt="logo"
        />
      </div>
      <Typography type="h6">{placeholder}</Typography>
    </div>
  );
};
