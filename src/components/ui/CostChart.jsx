import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function CostChart({ calls }) {

  const cityTotals = {};

  calls.forEach((call) => {

    if (!cityTotals[call.city]) {
      cityTotals[call.city] = 0;
    }

    cityTotals[call.city] += Number(call.callCost);

  });

  const data = Object.entries(cityTotals).map(
    ([city, cost]) => ({
      city,
      cost,
    })
  );

  const averageCost =
    calls.length === 0
      ? 0
      : calls.reduce(
          (sum, call) =>
            sum + Number(call.callCost),
          0
        ) / calls.length;

  return (

    <div className="bg-white rounded-xl shadow p-6 h-full">

      <h2 className="text-xl font-semibold mb-4 border-b pb-2">
  Call Cost Analytics
</h2>

      <p className="text-gray-500 mt-2 mb-6">

        Average Cost per Call:

        <strong>

          ${averageCost.toFixed(2)}

        </strong>

      </p>

      <ResponsiveContainer
        width="100%"
        height={350}
      >

        <BarChart data={data}>

          <CartesianGrid strokeDasharray="3 3"/>

          <XAxis dataKey="city"/>

          <YAxis/>

          <Tooltip/>

          <Bar
            dataKey="cost"
            fill="#22c55e"
            radius={[8,8,0,0]}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>

  );

}