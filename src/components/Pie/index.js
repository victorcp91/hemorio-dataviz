import React, { useState, useRef, useEffect, useMemo } from "react";
import PieChart from "../../charts/PieChart";
import { csv, autoType } from "d3";

import style from "./index.module.css";

let vis = null;


export default function Pie({data}) {
  const pieChartElement = useRef(null);

  const [width, setWidth] = useState(() => {
    if (window.innerWidth < 600){
      return 100
    } 
    return 200
  }
  );
  const [height, setHeight] = useState(() => {
    if (window.innerWidth < 600){
      return 100
    } 
    return 200
  });

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

  useEffect(() => {
    if (data) {
      initVis();
    }
  }, [data]);
  
  const percent = useMemo(()=>{
    return (data[0].number / (data[0].number + data[1].number)) * 100
  }, [data])

  return (
      <div className={style.container}>
        <div id="vis-container" ref={pieChartElement}></div>
        <div className={style.percent}> {percent.toFixed(2)} %</div>
      </div>
  );
}
