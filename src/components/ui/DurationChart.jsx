import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function DurationChart({ analytics }) {

  const data = [
    {
      name: "Longest",
      duration: analytics.longestCall,
    },
    {
      name: "Average",
      duration: analytics.averageDuration,
    },
    {
      name: "Shortest",
      duration: analytics.shortestCall,
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow p-6 h-full">

      <h2 className="text-2xl font-bold mb-6">
        Call Duration Analytics
      </h2>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="duration"
            radius={[8, 8, 0, 0]}
            fill="#2563eb"
          />

        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}