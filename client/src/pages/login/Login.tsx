import { Card } from "@material-tailwind/react";
import { useState } from "react";
import clsx from "clsx";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import { LoginPanel } from "./LoginPanel";
import { RegisterPanel } from "./RegisterPanel";

export const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Card className="relative w-[800px] h-[500px] bg-surface shadow-all-lg overflow-hidden">
      <div className="absolute w-full h-full flex flex-row">
        <div className="w-1/2 h-full flex items-center justify-center">
          <LoginForm isLogin={isLogin} />
        </div>
        <div className="w-1/2 h-full flex items-center justify-center">
          <RegisterForm isLogin={isLogin} />
        </div>
      </div>

      <div
        className={clsx(
          "w-1/2 h-full bg-surface-light flex items-center justify-center transition-transform duration-700",
          {
            "translate-x-full left-1/2": isLogin,
            "translate-x-0 left-0": !isLogin,
          }
        )}
      >
        {isLogin ? (
          <LoginPanel setIsLogin={setIsLogin} />
        ) : (
          <RegisterPanel setIsLogin={setIsLogin} />
        )}
      </div>
    </Card>
  );
};
