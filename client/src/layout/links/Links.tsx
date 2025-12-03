import { FaBoxes, FaInbox, FaMoneyCheck } from "react-icons/fa";
import { routes } from "../../constants/routes";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { PiScribbleBold } from "react-icons/pi";
import { IoBeer } from "react-icons/io5";
import { TbTruckLoading } from "react-icons/tb";
import { BsGraphUp } from "react-icons/bs";

export const LINKS = [
  {
    icon: <IoBeer className="w-5 h-5 lg:w-6 lg:h-6" />,
    title: "Продукты",
    href: routes.products,
  },
  {
    icon: <TbTruckLoading className="w-5 h-5 lg:w-6 lg:h-6" />,
    title: "Склад продуктов",
    href: routes.productsInventory,
  },
  {
    icon: <FaInbox className="w-5 h-5 lg:w-6 lg:h-6" />,
    title: "Расходники",
    href: routes.devices,
  },
  {
    icon: <FaBoxes className="w-5 h-5 lg:w-6 lg:h-6" />,
    title: "Склад расходников",
    href: routes.devicesInventory,
  },
  {
    icon: <PiScribbleBold className="w-5 h-5 lg:w-6 lg:h-6" />,
    title: "Списание",
    href: routes.writeoff,
  },
  {
    icon: <FaMoneyCheck className="w-5 h-5 lg:w-6 lg:h-6" />,
    title: "Чеки",
    href: routes.checks,
  },
  {
    icon: <BsGraphUp className="w-5 h-5 lg:w-6 lg:h-6" />,
    title: "Статистика",
    href: routes.statistic,
  },
];

export const BOTTOM_LINKS = [
  {
    icon: <MdOutlineLocalGroceryStore className="w-5 h-5 lg:w-6 lg:h-6" />,
    title: "Корзина",
    href: routes.sales,
  },
];
