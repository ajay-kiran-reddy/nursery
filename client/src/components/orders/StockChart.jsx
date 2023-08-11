import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Grid } from "@mui/material";

const StockChart = ({ data }) => {
  const date = new Date();
  const chartData = data.map((plant) => {
    return { name: plant.name, y: plant.quantity };
  });
  console.log(chartData, "[chartData]");
  const options = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
    },
    title: {
      text: `Current plants stocks available as of ${date
        .toString()
        .slice(0, 15)}`,
      align: "left",
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.y}%</b>",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.y} %",
        },
      },
    },
    series: [
      {
        name: "Plant Stocks",
        colorByPoint: true,
        data: chartData,
      },
    ],
  };
  return (
    <Grid container spacing={3}>
      <Grid item xs={2}></Grid>
      <Grid item xs={8}>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </Grid>
      <Grid item xs={2}></Grid>
    </Grid>
  );
};

export default StockChart;
