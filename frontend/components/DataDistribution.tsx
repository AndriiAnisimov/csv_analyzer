
"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function DataDistribution({ data }: any) {
  return (
    <div>
      <h3>Data Distribution</h3>
      <LineChart width={600} height={300} data={data}>
        <CartesianGrid />
        <XAxis dataKey="test_id" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="result" />
      </LineChart>
    </div>
  );
}
