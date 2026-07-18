import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

export default function CityChart({ calls }) {

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

  return (

    <div className="bg-white rounded-xl shadow p-6 h-full">

      <h2 className="text-2xl font-bold mb-6">

        Calls by City

      </h2>

      <ResponsiveContainer width="100%" height={350}>

        <BarChart data={data} layout="vertical" margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis type="number" />

          <YAxis type="category" dataKey="city" width={120} />

          <Tooltip />

          <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 8, 8]} />

        </BarChart>

      </ResponsiveContainer>

    </div>

  );

}