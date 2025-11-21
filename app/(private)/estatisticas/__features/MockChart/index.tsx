type MockItem = {
  label: string;
  value: number;
};

type MockChartProps = {
  title: string;
  trendData: MockItem[];
};

const MockChart = ({ title, trendData }: MockChartProps) => {
  const max = Math.max(...trendData.map((d) => d.value));

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
      <h3 className="mb-4 text-lg font-semibold text-gray-800">{title}</h3>
      <div className="flex h-48 items-end justify-between space-x-2 p-1">
        {trendData.map((data, index) => (
          <div key={index} className="flex h-full flex-1 flex-col items-center">
            <div
              className="w-full cursor-pointer rounded-t-md bg-indigo-500 transition-colors duration-200 hover:bg-indigo-600"
              style={{ height: `${(data.value / max) * 90}%` }} // Altura relativa ao máximo
              title={`Mês ${index + 1}: ${data.value}`}
            />
            <span className="mt-1 text-xs text-gray-400">{data.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MockChart;
