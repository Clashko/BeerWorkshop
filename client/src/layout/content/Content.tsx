import { NavLink, Outlet } from "react-router-dom";
import { BOTTOM_LINKS, LINKS } from "../links/Links";
import { Button, Tooltip, Typography } from "@material-tailwind/react";
import { Footer } from "../footer/Footer";
import clsx from "clsx";

const NavList = () => {
  return (
    <ul className="h-full flex flex-col gap-4 lg:p-2 justify-between">
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
      <div className="flex flex-col gap-4 mb-2">
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
    <main className="flex flex-row w-full h-full max-w-full max-h-full overflow-hidden">
      <div className="hidden md:flex h-full py-2">
        <div className="border-r border-surface-dark duration-200">
          <NavList />
        </div>
      </div>
      <div className="flex flex-col w-full h-full max-w-full max-h-full overflow-hidden">
        <div className="flex-1 w-full h-full max-w-full max-h-full overflow-hidden p-4 md:pb-0">
          <Outlet />
        </div>
        <Footer />
      </div>
    </main>
  );
};
