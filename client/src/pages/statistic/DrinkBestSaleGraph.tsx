import { ProductTypeEnum } from "../../redux/enums";
import { selectProductsStatistic } from "../../redux/features/statisticSlice";
import { useAppSelector } from "../../redux/store/store";
import { Chart } from "../../components";

export const DrinkBestSaleGraph = () => {
  const productStatistic = useAppSelector(selectProductsStatistic);

  const drinksStatistic = productStatistic.filter(
    (r) => r.productType === ProductTypeEnum.Drink
  );

  const groupedDrinksStatistic = drinksStatistic.reduce<Record<string, number>>(
    (acc, row) => {
      acc[row.name] = (acc[row.name] || 0) + row.quantity;
      return acc;
    },
    {}
  );

  const data = Object.entries(groupedDrinksStatistic)
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
      title="Продажи напитков"
      className="w-1/4"
    />
  );
};
