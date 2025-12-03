import {
  Drawer,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { CgClose } from "react-icons/cg";
import { BOTTOM_LINKS, LINKS } from "../links/Links";
import clsx from "clsx";
import { NavLink } from "react-router-dom";

const NavList = () => {
  return (
    <ul className="h-full flex flex-col gap-4 p-4 justify-between">
      <div className="flex flex-col gap-4">
        {LINKS.map(({ icon, title, href }) => (
          <li key={title}>
            <NavLink to={href}>
              {({ isActive }) => (
                <Drawer.DismissTrigger
                  as={Button}
                  variant="ghost"
                  className={clsx("flex flex-row gap-4 items-center", {
                    "text-foreground": !isActive,
                    "text-secondary": isActive,
                  })}
                >
                  {icon}
                  <Typography>{title}</Typography>
                </Drawer.DismissTrigger>
              )}
            </NavLink>
          </li>
        ))}
      </div>
      <div className="flex flex-col gap-4 mb-4">
        {BOTTOM_LINKS.map(({ icon, title, href }) => (
          <li key={title}>
            <NavLink to={href}>
              {({ isActive }) => (
                <Drawer.DismissTrigger
                  as={Button}
                  variant="ghost"
                  className={clsx("flex flex-row gap-4 items-center", {
                    "text-foreground": !isActive,
                    "text-secondary": isActive,
                  })}
                >
                  {icon}
                  <Typography>{title}</Typography>
                </Drawer.DismissTrigger>
              )}
            </NavLink>
          </li>
        ))}
      </div>
    </ul>
  );
};

export const Menu = () => {
  return (
    <div className="block md:hidden">
      <Drawer>
        <Drawer.Trigger as={Button} variant="ghost" className="p-0">
          <div className="dark:bg-[#DEDEDE] lg:mr-0.5">
            <img
              alt="logo"
              src={`${import.meta.env.BASE_URL}assets/logo.png`}
              className="w-9 h-9 lg:w-10 lg:h-10"
            />
          </div>
        </Drawer.Trigger>
        <Drawer.Overlay>
          <Drawer.Panel className="w-screen h-screen bg-surface flex flex-col p-0 text-foreground">
            <div className="flex flex-row justify-between items-center border-b border-primary/30 p-2">
              <Typography>Меню</Typography>
              <Drawer.DismissTrigger
                as={IconButton}
                size="sm"
                variant="ghost"
                className="text-inherit"
                isCircular
              >
                <CgClose size={16} />
              </Drawer.DismissTrigger>
            </div>
            <NavList />
            <div className="flex w-full h-[60px] justify-center items-center border-t border-primary/30">
              <Typography type="small">
                &copy; {new Date().getFullYear()} EliasTrade. Все права
                защищены.
              </Typography>
            </div>
          </Drawer.Panel>
        </Drawer.Overlay>
      </Drawer>
    </div>
  );
};
