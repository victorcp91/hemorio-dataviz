import React, { useState, useRef, useEffect } from "react";
import PieChart from "../../charts/PieChart";
import { csv, autoType } from "d3";

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

  async function fetchData() {
    let data = await csv('data/blood_donors.csv', autoType)
    let pieData2 = []
    //"A_plus","AB_minus", "AB_plus","B_minus", "B_plus" ,"O_minus", "O_plus", 
    for (let blood of ["A_minus","total" ]){
      let sum = data.reduce(function (accumulator, currentValue) {
          return accumulator + currentValue[blood]
      }, 0)
      if (blood == "total"){
        sum -= pieData2[0].number
        blood = "outros"
      }
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
