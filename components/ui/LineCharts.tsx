"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export type LineChartPoint = {
  label: string;
  value: number;
};

const LineCharts = ({ data }: { data: LineChartPoint[] }) => {
  return (
    <div>
      <ResponsiveContainer width="95%" height={300}>
        <LineChart data={data}>
          <Line type="monotone" dataKey="value" stroke="#D0B301" strokeWidth={2} />
          <CartesianGrid stroke="#eee" />
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineCharts;