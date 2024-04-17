import React from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import { colorPalette } from "../utils/colors.js";

const CustomPieChart = ({ data, width, height }) => {
  return (
    <PieChart width={width || 400} height={height || 400}>
      <Pie
        data={data}
        dataKey="percentage"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={75}
        fill="#8884d8"
        // label
      >
        {data.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={colorPalette[index % colorPalette.length]}
          />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default CustomPieChart;
