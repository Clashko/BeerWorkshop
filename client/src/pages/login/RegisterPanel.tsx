import { Typography, Button } from "@material-tailwind/react";
interface Props {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}
export const RegisterPanel = ({ setIsLogin }: Props) => {
  return (
    <div className="flex flex-col gap-2 items-center justify-center">
      <div className="dark:bg-[#DEDEDE]">
        <img
          alt="logo"
          src={`${import.meta.env.BASE_URL}assets/logo.png`}
          className="w-14 h-14"
        />
      </div>
      <Typography type="h4">С возвращением!</Typography>
      <Typography type="p">Уже есть аккаунт? Войди!</Typography>
      <Button
        size="md"
        color="secondary"
        variant="outline"
        className="mt-2 text-secondary hover:text-white"
        isFullWidth
        onClick={() => setIsLogin(true)}
      >
        Вход
      </Button>
    </div>
  );
};
