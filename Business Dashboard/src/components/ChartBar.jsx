import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["status", "Canda", "USA", "Saudi Aribia", "China"], 
  ["new", 20, 30,  80, 30],
  ["ongoing", 45, 50, 45, 50],
  ["completed", 90, 60, 45, 50 ]
  
];

export const options = {
  chart: {
    title: "chatbox status",
    subtitle: "2023-2024",
  },
         //  1st bar      2nd      3rd        4th
  colors: ["#201658", "#00008B", "#89CFF0", "#6082B6"] 
  
};

export function ChartBar() {
  return (
    <Chart
      chartType="Bar"
      width="100%"
      height="450px"
      data={data}
      options={options}
    />
  );
}
