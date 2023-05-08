import React, { useRef, useEffect, useMemo } from "react";
import PieChart from "../../charts/PieChart";

import style from "./index.module.css";

export default function Pie({data}) {
  const pieChartElement = useRef(null);
  const pieVis = useRef(null);

  function initVis() {
    if (data && data.length) {
      const dataFields = ["number", "name"];
      const d3Props = {
        data,
        dataFields,
      };
      if(pieVis.current){
        pieVis.current.destroy();
      }
      pieVis.current = new PieChart(pieChartElement.current, d3Props);
    }
  }

  useEffect(() => {
    if (data) {
      initVis();
    }
  }, [data]);
  
  const percent = useMemo(()=>{
    return (data[0].number / (data[0].number + data[1].number)) * 100
  }, [data]);

  return (
      <div className={style.container}>
        <div id="pie-vis-container" className={style.pieVis} ref={pieChartElement}></div>
        <div className={style.percent}> {percent.toFixed(2)} %</div>
      </div>
  );
}
