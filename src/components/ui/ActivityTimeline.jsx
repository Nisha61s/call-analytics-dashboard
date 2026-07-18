import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function ActivityTimeline({ calls }) {

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

  data.sort(
    (a, b) => Number(a.hour) - Number(b.hour)
  );

  return (

    <div className="bg-white rounded-xl shadow p-6 h-full">

      <h2 className="text-2xl font-bold mb-6">

        Call Activity Timeline

      </h2>

      <ResponsiveContainer
        width="100%"
        height={350}
      >

        <LineChart data={data}>

          <CartesianGrid strokeDasharray="3 3"/>

          <XAxis dataKey="hour"/>

          <YAxis/>

          <Tooltip/>

          <Line
            type="monotone"
            dataKey="calls"
            stroke="#8b5cf6"
            strokeWidth={3}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>

  );

}