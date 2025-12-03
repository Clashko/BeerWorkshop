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
    <Card className="relative w-full h-full md:w-[600px] md:h-[400px] lg:w-[800px] lg:h-[500px] bg-surface shadow-all-lg overflow-hidden">
      <div className="absolute w-full h-full flex flex-col md:flex-row">
        <LoginForm isLogin={isLogin} />
        <RegisterForm isLogin={isLogin} />
      </div>

      <div
        className={clsx(
          "w-full h-1/2 md:w-1/2 md:h-full bg-surface-light flex items-center justify-center transition-transform duration-700",
          {
            "translate-y-full top-1/2 md:translate-x-full md:left-1/2 md:top-0 md:translate-y-0":
              isLogin,
            "translate-y-0 top-0 md:translate-x-0 md:left-0": !isLogin,
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
