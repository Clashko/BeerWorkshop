import { FaBoxes, FaInbox, FaMoneyCheck } from "react-icons/fa";
import { routes } from "../../constants/routes";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { PiScribbleBold } from "react-icons/pi";
import { IoBeer } from "react-icons/io5";
import { TbTruckLoading } from "react-icons/tb";
import { BsGraphUp } from "react-icons/bs";

export const LINKS = [
  {
    icon: <IoBeer size={22} />,
    title: "Продукты",
    href: routes.products,
  },
  {
    icon: <TbTruckLoading size={22} />,
    title: "Склад продуктов",
    href: routes.productsInventory,
  },
  {
    icon: <FaInbox size={22} />,
    title: "Расходники",
    href: routes.devices,
  },
  {
    icon: <FaBoxes size={22} />,
    title: "Склад расходников",
    href: routes.devicesInventory,
  },
  {
    icon: <PiScribbleBold size={22} />,
    title: "Списание",
    href: routes.writeoff,
  },
  {
    icon: <FaMoneyCheck size={22} />,
    title: "Чеки",
    href: routes.checks,
  },
  {
    icon: <BsGraphUp size={22} />,
    title: "Статистика",
    href: routes.statistic,
  },
];

export const BOTTOM_LINKS = [
  {
    icon: <MdOutlineLocalGroceryStore size={22} />,
    title: "Корзина",
    href: routes.sales,
  },
];
