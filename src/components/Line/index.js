import React, { useState, useRef, useEffect } from "react";
import LineChart from "../../charts/LineChart";

import temperatureData from "../../data/temperature.json";

import style from "./index.module.css";

let vis = null;

export default function Line() {
  const lineChartElement = useRef(null);

  const [data, setData] = useState(null);
  const [width, setWidth] = useState(1000);
  const [height, setHeight] = useState(600);

  function initVis() {
    if (data && data.length) {
      const dataFields = ["timestamp", "temperature"];
      const d3Props = {
        data,
        dataFields,
        width,
        height,
      };
      vis = new LineChart(lineChartElement.current, d3Props);
    }
  }

  function fetchData() {
    Promise.resolve().then(() => {
      const formattedTemperatureData = temperatureData.map((td) => ({
        temperature: parseFloat(td.temperature),
        timestamp: new Date(td.timestamp),
      }));

      const anotherFormattedTemperatureData = formattedTemperatureData.map(
        (td) => ({
          temperature: td.temperature - 10,
          timestamp: td.timestamp,
        })
      );
      setData([formattedTemperatureData, anotherFormattedTemperatureData]);
    });
  }

  useEffect(fetchData, []);

  useEffect(() => {
    if (data) {
      initVis();
    }
  }, [data]);

  return (
    <section id="line" className={style.container}>
      <h2>Line Chart</h2>
      <div id="vis-container" ref={lineChartElement}></div>
    </section>
  );
}
