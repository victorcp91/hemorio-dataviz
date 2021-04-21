import React, { useState, useRef, useEffect } from "react";
import PieChart from "../../charts/PieChart";
import { csv, autoType } from "d3";

import pieData from "../../data/pie.json";

import style from "./index.module.css";

let vis = null;

function get_dtInfo(datestr){
  return new Date((datestr+ '').slice(0, 4),(datestr+ '').slice(4, 6)-1,(datestr+ '').slice(6, 8))
}

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

  async function fetchData() {
    let data = await csv('data/blood_donors.csv', autoType)
    let pieData2 = []
    for (let blood of ["A_minus","A_plus","AB_minus", "AB_plus","B_minus", "B_plus" ,"O_minus", "O_plus" ]){
      let sum = data.reduce(function (accumulator, currentValue) {
          return accumulator + currentValue[blood]
      }, 0)
      pieData2.push({name: blood, number : sum})
    }
      setData(pieData2);
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
