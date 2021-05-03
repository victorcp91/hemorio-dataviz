import React, { useState, useEffect } from "react";
import { csv, autoType } from "d3";

import style from "./index.module.css";
import Pie from "../Pie"

export default function BloodTypes() {
  const [data, setData] = useState(null);
  const types = ["A_minus", "A_plus","AB_minus", "AB_plus","B_minus", "B_plus" ,"O_minus", "O_plus"]

  function map_real_name(name){
    if(name.includes("_minus")){
      return name.replace("_minus", "-")
    }
    if(name.includes("_plus")){
      return name.replace("_plus", "+")
    }
    return name
  }

  async function fetchData() {
    let csv_data = await csv('data/blood_donors.csv', autoType)
    let data = []
    for (let type of types){
      let pieData = []
      for (let blood of [type, "total"]){
        let sum = csv_data.reduce(function (accumulator, currentValue) {
            return accumulator + currentValue[blood]
        }, 0)
        if (blood == "total"){
          sum -= pieData[0].number
          blood = ""
        }
        pieData.push({name: map_real_name(blood), number : sum})
      }
      data.push(pieData)
    }
      setData(data);
  }

  useEffect(fetchData, []);

  return (
    <section id="blood-tye" className={style.container}>
      <h2>Pie Chart</h2>
      <div  className={style.pies}>
        {data && data.map((d) => <Pie data={d} key={d[0].name}/>) }
      </div>
    </section>
  );
}
