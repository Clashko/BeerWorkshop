import {
  Button,
  Drawer,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import clsx from "clsx";
import { CgClose } from "react-icons/cg";

interface Props {
  triggerConent: React.ReactElement;
  title: string;
  children: React.ReactNode;
  color: "primary" | "secondary" | "success" | "info" | "warning" | "error";
}

export const SideBar = ({ triggerConent, title, color, children }: Props) => {
  return (
    <Drawer>
      <Drawer.Trigger
        as={Button}
        variant="ghost"
        color={color}
        className={clsx("p-2 sm:p-1 flex flex-row gap-2 items-center", {
          "text-foreground": color === "primary",
        })}
      >
        {triggerConent}
      </Drawer.Trigger>
      <Drawer.Overlay className="max-h-screen h-screen bg-surface-dark/70">
        <Drawer.Panel className="w-auto max-h-screen h-screen text-foreground flex flex-col">
          <div className="flex flex-row justify-between items-center gap-4 mb-4">
            <Typography type="h6" className="">
              {title}
            </Typography>
            <Drawer.DismissTrigger
              as={IconButton}
              size="sm"
              variant="ghost"
              isCircular
              className="text-inherit"
            >
              <CgClose size={16} />
            </Drawer.DismissTrigger>
          </div>
          <div className="h-full max-h-full overflow-hidden">{children}</div>
        </Drawer.Panel>
      </Drawer.Overlay>
    </Drawer>
  );
};
