type ChartData = {
  name: string;
  total: number;
};

type SimpleAreaChartProps = {
  data: ChartData[];
};

const SimpleAreaChart = ({ data }: SimpleAreaChartProps) => {
  return (
    <div className="bg-muted/20 text-muted-foreground flex h-full w-full items-center justify-center rounded-lg border border-dashed">
      {/* // TODO: Usar gráfico */}
      <p>Área para Gráfico (Buscas/Mês)</p>
      <div className="hidden">
        {data.map((item) => (
          <span key={item.name} data-name={item.name} data-total={item.total} />
        ))}
      </div>
    </div>
  );
};

export default SimpleAreaChart;
