import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function ActivityTimeline({ calls, sortBy, order }) {

  const callsPerHour = {};

  calls.forEach((call) => {

    const hour = new Date(call.callStartTime)
      .getHours()
      .toString()
      .padStart(2, "0");

    if (!callsPerHour[hour]) {
      callsPerHour[hour] = 0;
    }

    callsPerHour[hour]++;

  });

  const data = Object.entries(callsPerHour).map(
    ([hour, calls]) => ({
      hour,
      calls,
    })
  );

  data.sort((a, b) => {
    const comparison = Number(a.hour) - Number(b.hour);

    if (sortBy === "timestamp") {
      return order === "asc" ? comparison : -comparison;
    }

    return comparison;
  });

  return (

    <div className="bg-slate-800/50 rounded-xl shadow p-6 h-full border-l-4 border-l-cyan-500">

      <h2 className="text-2xl font-bold mb-6 text-white">

        Call Activity Timeline

      </h2>

      <ResponsiveContainer
        width="100%"
        height={350}
      >

        <LineChart data={data}>

          <CartesianGrid strokeDasharray="3 3" stroke="#334155"/>

          <XAxis dataKey="hour" stroke="#cbd5e1" />

          <YAxis stroke="#cbd5e1" />

          <Tooltip/>

          <Line
            type="monotone"
            dataKey="calls"
            stroke="#00d4ff"
            strokeWidth={3}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>

  );

}