import { DrinkBestSaleGraph } from "./DrinkBestSaleGraph";
import { FoodBestSaleGraph } from "./FoodBestSaleGraph";
import { Header } from "./Header";
import { LinearSaleGraph } from "./LinearSaleGraph";
import { ProductsSaleGrid } from "./ProductsSaleGrid";

export const Statistic = () => {
  return (
    <div className="h-full max-h-full flex flex-col gap-4 overflow-y-auto">
      <Header />
      <div className="flex gap-4">
        <DrinkBestSaleGraph />
        <FoodBestSaleGraph />
        <LinearSaleGraph />
      </div>
      <ProductsSaleGrid />
    </div>
  );
};
