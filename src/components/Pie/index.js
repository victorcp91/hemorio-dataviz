import React, { useState, useRef, useEffect } from "react";
import PieChart from "../../charts/PieChart";

import pieData from "../../data/pie.json";

import style from "./index.module.css";

let vis = null;

export default function Pie() {
  const pieChartElement = useRef(null);

  const [data, setData] = useState(null);
  const [width, setWidth] = useState(1000);
  const [height, setHeight] = useState(600);

  function initVis() {
    if (data && data.length) {
      const dataFields = ["number", "name"];
      const d3Props = {
        data,
        dataFields,
        width,
        height,
      };
      vis = new PieChart(pieChartElement.current, d3Props);
    }
  }

  function fetchData() {
    Promise.resolve().then(() => {
      setData(pieData);
    });
  }

  useEffect(fetchData, []);

  useEffect(() => {
    if (data) {
      initVis();
    }
  }, [data]);

  return (
    <section id="pie" className={style.container}>
      <h2>Pie Chart</h2>
      <div id="vis-container" ref={pieChartElement}></div>
    </section>
  );
}
