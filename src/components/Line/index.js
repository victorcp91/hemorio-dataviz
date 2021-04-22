import React, { useState, useRef, useEffect } from "react";
import LineChart from "../../charts/LineChart";

import temperatureData from "../../data/temperature.json";
import { csv, autoType } from "d3";
import style from "./index.module.css";

let vis = null;


function get_dtInfo(info){
  let datestr = info.datestr
  return new Date((datestr+ '').slice(0, 4),(datestr+ '').slice(4, 6)-1,(datestr+ '').slice(6, 8))
}

export default function Line() {
  const lineChartElement = useRef(null);

  const [data, setData] = useState(null);
  const [width, setWidth] = useState(1000);
  const [height, setHeight] = useState(600);

  function initVis() {
    if (data && data.length) {
      const dataFields = ["date", "value"];
      const d3Props = {
        data,
        dataFields,
        width,
        height,
      };
      vis = new LineChart(lineChartElement.current, d3Props);
    }
  }

  async function fetchData() {
    let data = await csv('data/blood_donors.csv', autoType)
    data = data.map(x => ({date : get_dtInfo(x), value : x.total}))
    setData([data]);
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
