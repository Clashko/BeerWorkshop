import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./layout/Layout";
import { routes } from "./constants/routes";
import {
  Checks,
  Devices,
  DevicesInventory,
  Home,
  Login,
  Products,
  ProductsInventory,
  Sales,
  Statistic,
  WriteOff,
} from "./pages";
import { CenteredLayout } from "./layout/CenteredLayout";

export const Router = createBrowserRouter([
  {
    element: <CenteredLayout />,
    children: [
      {
        path: routes.login,
        element: <Login />,
      },
    ],
  },
  {
    element: <Layout />,
    children: [
      {
        path: routes.home,
        element: <Home />,
      },
      {
        path: routes.products,
        element: <Products />,
      },
      {
        path: routes.productsInventory,
        element: <ProductsInventory />,
      },
      {
        path: routes.devices,
        element: <Devices />,
      },
      {
        path: routes.devicesInventory,
        element: <DevicesInventory />,
      },
      {
        path: routes.sales,
        element: <Sales />,
      },
      {
        path: routes.writeoff,
        element: <WriteOff />,
      },
      {
        path: routes.checks,
        element: <Checks />,
      },
      {
        path: routes.statistic,
        element: <Statistic />,
      },
    ],
  },
]);
