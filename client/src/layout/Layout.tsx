import { Navigate, useLocation } from "react-router-dom";
import { selectToken } from "../redux/features/authSlice";
import { useAppSelector } from "../redux/store/store";
import { Content } from "./content/Content";
import { Header } from "./header/Header";
import { routes } from "../constants/routes";

export const Layout = () => {
  const location = useLocation();
  const token = useAppSelector(selectToken);

  if (token == null)
    return <Navigate to={routes.login} state={{ from: location }} replace />;

  return (
    <div className="h-screen max-h-screen flex flex-col bg-background text-foreground duration-200">
      <Header />
      <Content />
    </div>
  );
};
