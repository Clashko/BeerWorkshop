import { Typography } from "@material-tailwind/react";

export const Footer = () => {
  return (
    <div className="hidden md:flex w-full h-[60px] justify-center items-center">
      <Typography type="small">&copy; {new Date().getFullYear()} EliasTrade. Все права защищены.</Typography>
    </div>
  );
};
