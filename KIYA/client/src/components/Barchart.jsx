import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { colorPalette } from "../utils/colors.js";

const CustomBarChart = ({ current, intermediate, advance, name, width }) => {
  const data = [
    {
      name: name,
      Current: Number(current),
      Intermediate: Number(intermediate),
      Advance: Number(advance),
    },
  ];

  return (
    <ResponsiveContainer width={width || "40%"} height={400}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend wrapperStyle={{ fontSize: "12px" }} />
        <Bar dataKey="Advance" fill="#8884d8" stackId="a" />
        <Bar dataKey="Intermediate" fill="#82ca9d" stackId="a" />
        <Bar
          dataKey="Current"
          fill={colorPalette[Math.floor(Math.random() * colorPalette.length)]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CustomBarChart;
