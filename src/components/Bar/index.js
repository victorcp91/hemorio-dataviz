import React, { useState, useRef, useEffect } from "react";
import BarChart from "../../charts/BarChart";

import populationData from "../../data/populations";

import style from "./index.module.css";

let vis = null;

export default function Bar() {
  const barChartElement = useRef(null);

  const [data, setData] = useState(null);
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);

  function initVis() {
    if (data && data.length) {
      const dataFields = ["country", "population"];
      const d3Props = {
        data,
        dataFields,
        width,
        height,
      };
      vis = new BarChart(barChartElement.current, d3Props);
    }
  }

  function fetchData() {
    Promise.resolve().then(() => setData(populationData));
  }

  useEffect(fetchData, []);

  useEffect(() => {
    if (data) {
      initVis();
    }
  }, [data]);

  return (
    <section id="bar" className={style.container}>
      <h2>Bar Chart</h2>
      <div id="vis-container" ref={barChartElement}></div>
    </section>
  );
}
