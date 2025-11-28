import { NavLink, Outlet } from "react-router-dom";
import { BOTTOM_LINKS, LINKS } from "./links";
import { Button, Tooltip, Typography } from "@material-tailwind/react";
import { Footer } from "../footer/Footer";
import clsx from "clsx";

const NavList = () => {
  return (
    <ul className="h-full flex flex-col gap-4 p-2 pb-6 justify-between">
      <div className="flex flex-col gap-4">
        {LINKS.map(({ icon, title, href }) => (
          <li key={title}>
            <NavLink to={href}>
              {({ isActive }) => (
                <Tooltip placement="right">
                  <Tooltip.Trigger
                    as={Button}
                    variant="ghost"
                    className={clsx({
                      "text-foreground": !isActive,
                      "text-secondary": isActive,
                    })}
                  >
                    {icon}
                  </Tooltip.Trigger>
                  <Tooltip.Content className="z-[9999]">
                    <Typography className="font-semibold mx-4 my-2" type="p">
                      {title}
                    </Typography>
                    <Tooltip.Arrow />
                  </Tooltip.Content>
                </Tooltip>
              )}
            </NavLink>
          </li>
        ))}
      </div>
      <div className="flex flex-col gap-4">
        {BOTTOM_LINKS.map(({ icon, title, href }) => (
          <li key={title}>
            <NavLink to={href}>
              {({ isActive }) => (
                <Tooltip placement="right">
                  <Tooltip.Trigger
                    as={Button}
                    variant="ghost"
                    className={clsx({
                      "text-foreground": !isActive,
                      "text-secondary": isActive,
                    })}
                  >
                    {icon}
                  </Tooltip.Trigger>
                  <Tooltip.Content className="z-[9999]">
                    <Typography className="font-semibold mx-4 my-2" type="p">
                      {title}
                    </Typography>
                    <Tooltip.Arrow />
                  </Tooltip.Content>
                </Tooltip>
              )}
            </NavLink>
          </li>
        ))}
      </div>
    </ul>
  );
};

export const Content = () => {
  return (
    <main className="flex flex-row h-full w-full overflow-hidden">
      <div className="h-full my-2 border-r border-surface-dark duration-200">
        <NavList />
      </div>
      <div className="w-full h-full flex flex-col">
        <div className="w-full h-full p-4 pb-0">
          <Outlet />
        </div>
        <Footer />
      </div>
    </main>
  );
};
