import { ProductTypeEnum } from "../../redux/enums";
import { selectProductsStatistic } from "../../redux/features/statisticSlice";
import { useAppSelector } from "../../redux/store/store";
import { Chart } from "../../components";

export const FoodBestSaleGraph = () => {
  const productStatistic = useAppSelector(selectProductsStatistic);

  const foodsStatistic = productStatistic.filter(
    (r) => r.productType === ProductTypeEnum.Food
  );

  const groupedFoodsStatistic = foodsStatistic.reduce<Record<string, number>>(
    (acc, row) => {
      acc[row.name] = (acc[row.name] || 0) + row.quantity;
      return acc;
    },
    {}
  );

  const data = Object.entries(groupedFoodsStatistic)
    .map(([name, totalQuantity]) => ({
      name,
      totalQuantity,
    }))
    .sort((a, b) => b.totalQuantity - a.totalQuantity)
    .slice(0, 10);

  return (
    <Chart
      data={data}
      type="pie"
      angleKey="totalQuantity"
      labelKey="name"
      title="Продажи еды"
      className="flex-2 sm:flex-1"
    />
  );
};
