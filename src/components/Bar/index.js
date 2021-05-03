import React, { useState, useRef, useEffect } from "react";
import BarChart from "../../charts/BarChart";
import { map_real_name } from "../../lib/map_real_name"
import { csv, autoType } from "d3";

import style from "./index.module.css";

let vis = null;

export default function Bar() {
  const barChartElement = useRef(null);

  const [data, setData] = useState(null);
  const [width, setWidth] = useState(() =>{
    if (typeof window !== 'undefined') {
      if(window.innerWidth > 1200){
          return 1200
      }
      return window.innerWidth - 20
    }
    return null
  });
  const [height, setHeight] = useState(600);

  function initVis() {
    if (data && data.length) {
      const dataFields = ["type", "value"];
      const d3Props = {
        data,
        dataFields,
        width,
        height,
      };
      vis = new BarChart(barChartElement.current, d3Props);
    }
  }

  async function fetchData() {
    let data = await csv('data/blood_donors.csv', autoType)
    let barData = []
    for (let blood of ["A_minus","A_plus","AB_minus", "AB_plus","B_minus", "B_plus" ,"O_minus", "O_plus" ]){
      let sum = data.reduce(function (accumulator, currentValue) {
          return accumulator + currentValue[blood]
      }, 0)
      barData.push({type: map_real_name(blood), value : sum})
    }
      setData(barData);
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
