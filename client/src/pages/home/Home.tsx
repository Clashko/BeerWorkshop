import { Typography } from "@material-tailwind/react";
import clsx from "clsx";

export const Home = () => {
  return (
    <div className="flex flex-col gap-4 w-full h-full justify-center items-center">
      <img
        alt="logo"
        src={`${import.meta.env.BASE_URL}assets/logo.png`}
        className="w-60 h-60"
      />
      <div className="flex flex-col items-center">
        <Typography
          className={clsx(
            "text-transparent text-center font-extrabold",
            "text-8xl",
            "bg-clip-text bg-gradient-to-r from-[#F4A300] to-yellow-400"
          )}
        >
          ПИВНОЙ ЦЕХ
        </Typography>
        <Typography type="h4" className="text-[#0D3B66]">
          Магазин разливного пива
        </Typography>
      </div>
      <Typography type="lead">
        Сервис предназначен для учета прихода/ухода товаров
      </Typography>
    </div>
  );
};
