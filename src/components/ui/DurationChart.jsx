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
    <div className="bg-slate-800/50 rounded-xl shadow p-6 h-full border-l-4 border-l-cyan-500">

      <h2 className="text-2xl font-bold mb-6 text-white">
        Call Duration Analytics
      </h2>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>

          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />

          <XAxis dataKey="name" stroke="#cbd5e1" />

          <YAxis stroke="#cbd5e1" />

          <Tooltip />

          <Bar
            dataKey="duration"
            radius={[8, 8, 0, 0]}
            fill="#00d4ff"
          />

        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}