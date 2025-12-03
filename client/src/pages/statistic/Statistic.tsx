import { DrinkBestSaleGraph } from "./DrinkBestSaleGraph";
import { FoodBestSaleGraph } from "./FoodBestSaleGraph";
import { Header } from "./Header";
import { LinearSaleGraph } from "./LinearSaleGraph";
import { ProductsSaleGrid } from "./ProductsSaleGrid";

export const Statistic = () => {
  return (
    <div className="w-full h-full max-w-full max-h-full overflow-hidden flex flex-col gap-2">
      <Header />
      <div className="w-full h-full max-w-full max-h-full flex flex-wrap gap-2 overflow-y-auto">
        <LinearSaleGraph />
        <DrinkBestSaleGraph />
        <FoodBestSaleGraph />
        <ProductsSaleGrid />
      </div>
    </div>
  );
};
