import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function CityChart({ calls, sortBy, order }) {

  const cityCounts = {};

  calls.forEach((call) => {

    if (!cityCounts[call.city]) {
      cityCounts[call.city] = 0;
    }

    cityCounts[call.city]++;

  });

  const data = Object.entries(cityCounts).map(
    ([city, count]) => ({
      city,
      count,
    })
  );

  data.sort((a, b) => {
    if (sortBy === "city") {
      const comparison = a.city.localeCompare(b.city);
      return order === "asc" ? comparison : -comparison;
    }

    const comparison = a.count - b.count;
    return order === "asc" ? comparison : -comparison;
  });

  return (

    <div className="bg-slate-800/50 rounded-xl shadow p-6 h-full border-l-4 border-l-cyan-500">

      <h2 className="text-2xl font-bold mb-6 text-white">

        Calls by City

      </h2>

      <ResponsiveContainer width="100%" height={350}>

        <BarChart data={data} layout="vertical" margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>

          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />

          <XAxis type="number" stroke="#cbd5e1" />

          <YAxis type="category" dataKey="city" width={120} stroke="#cbd5e1" />

          <Tooltip />

          <Bar dataKey="count" fill="#00d4ff" radius={[8, 8, 8, 8]} />

        </BarChart>

      </ResponsiveContainer>

    </div>

  );

}