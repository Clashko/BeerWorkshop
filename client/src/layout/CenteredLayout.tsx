import { Outlet } from "react-router-dom";

export const CenteredLayout = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-surface-light via-surface to-surface-dark text-foreground">
      <Outlet />
    </div>
  );
};
