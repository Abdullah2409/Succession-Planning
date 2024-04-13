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

const getRandomColor = () => {
  // Generate a random color
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const CustomBarChart = ({ current, required, name }) => {
  // Prepare the data
  const data = [
    {
      name: name,
      Current: current,
      Required: required,
    },
  ];

  const currentColor = getRandomColor();
  const requiredColor = getRandomColor();

  return (
    <ResponsiveContainer width="40%" height={400}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Required" fill={requiredColor} />
        <Bar dataKey="Current" fill={currentColor} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CustomBarChart;
