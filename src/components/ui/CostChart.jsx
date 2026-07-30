import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function CostChart({ calls, sortBy, order }) {

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

  data.sort((a, b) => {
    if (sortBy === "city") {
      const comparison = a.city.localeCompare(b.city);
      return order === "asc" ? comparison : -comparison;
    }

    const comparison = a.cost - b.cost;
    return order === "asc" ? comparison : -comparison;
  });

  const averageCost =
    calls.length === 0
      ? 0
      : calls.reduce(
          (sum, call) =>
            sum + Number(call.callCost),
          0
        ) / calls.length;

  return (

    <div className="bg-slate-800/50 rounded-xl shadow p-6 h-full border-l-4 border-l-cyan-500">

      <h2 className="text-2xl font-bold mb-4 text-white">
  Call Cost Analytics
</h2>

      <p className="text-cyan-400 mt-2 mb-6 font-medium">

        Average Cost per Call:

        <strong className="text-cyan-300">

          ${averageCost.toFixed(2)}

        </strong>

      </p>

      <ResponsiveContainer
        width="100%"
        height={350}
      >

        <BarChart data={data}>

          <CartesianGrid strokeDasharray="3 3" stroke="#334155"/>

          <XAxis dataKey="city" stroke="#cbd5e1" />

          <YAxis stroke="#cbd5e1" />

          <Tooltip/>

          <Bar
            dataKey="cost"
            fill="#00d4ff"
            radius={[8,8,0,0]}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>

  );

}