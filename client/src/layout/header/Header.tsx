import { Button, Popover, Spinner, Typography } from "@material-tailwind/react";
import { useThemeMode } from "../../utils/ThemeMode";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../redux/store/store";
import { selectUser } from "../../redux/features/userSlice";
import { FaLightbulb, FaRegLightbulb } from "react-icons/fa";
import { useRevokeTokenMutation } from "../../redux/api/authApi";
import { toast } from "react-toastify";
import Avvvatars from "avvvatars-react";
import { Menu } from "./Menu";

export const Header = () => {
  const { themeMode, setThemeMode } = useThemeMode();
  const user = useAppSelector(selectUser);

  const initials = `${user?.firstName[0]}${user?.lastName[0]}`.toUpperCase();

  const [revokeToken, { isLoading }] = useRevokeTokenMutation();

  const handleLogOut = () => {
    revokeToken()
      .unwrap()
      .then((result) => toast.info(result.message))
      .catch((error) => toast.error(error.data));
  };

  return (
    <div className="w-full max-w-screen py-1 px-2.5 lg:py-2 lg:px-4 flex justify-between border-b border-surface-dark shadow-b-md duration-200">
      <div className="flex flex-row gap-2 lg:gap-4 items-center">
        <div className="dark:bg-[#DEDEDE] lg:mr-0.5 hidden md:block">
          <NavLink to="/">
            <img
              alt="logo"
              src={`${import.meta.env.BASE_URL}assets/logo.png`}
              className="w-9 h-9 lg:w-10 lg:h-10"
            />
          </NavLink>
        </div>
        <Menu />
        <hr className="h-full w-px border-l border-t-0 border-surface-dark duration-200" />
        <div className="flex flex-row items-baseline gap-2 lg:flex-col lg:items-start lg:gap-0">
          <Typography type="lead">Пивной цех</Typography>
          <Typography type="small" className="hidden md:block">
            Разливные напитки
          </Typography>
        </div>
      </div>
      <div className="flex flex-row gap-2">
        <Button
          variant="ghost"
          onClick={() => setThemeMode(themeMode === "dark" ? "light" : "dark")}
          className="text-foreground"
        >
          {themeMode === "dark" ? (
            <FaLightbulb size={20} />
          ) : (
            <FaRegLightbulb size={20} />
          )}
        </Button>

        <Popover>
          <Popover.Trigger as={Button} variant="ghost">
            <Avvvatars style="character" value={initials} />
          </Popover.Trigger>
          <Popover.Content className="max-w-sm p-4 z-[9999] bg-surface border border-dashed border-secondary">
            <div className="flex flex-col gap-4">
              <div className="flex flex-row gap-2 items-center">
                <Typography type="p" className="text-foreground">
                  Фамилия:
                </Typography>
                <Typography type="small" className="text-foreground">
                  {user?.lastName}
                </Typography>
              </div>
              <div className="flex flex-row gap-2 items-center">
                <Typography type="p" className="text-foreground">
                  Имя:
                </Typography>
                <Typography type="small" className="text-foreground">
                  {user?.firstName}
                </Typography>
              </div>
              <div className="flex flex-row gap-2 items-center">
                <Typography type="p" className="text-foreground">
                  Отчество:
                </Typography>
                <Typography type="small" className="text-foreground">
                  {user?.surName}
                </Typography>
              </div>
              <Button
                variant="outline"
                color="secondary"
                onClick={handleLogOut}
                className="text-foreground hover:text-white mt-2"
              >
                {isLoading && <Spinner size="sm" />}
                Выйти
              </Button>
            </div>
            <Popover.Arrow />
          </Popover.Content>
        </Popover>
      </div>
    </div>
  );
};
