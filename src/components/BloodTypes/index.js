import React, { useState, useEffect } from "react";
import { csv, autoType } from "d3";
import {map_real_name} from "../../lib/map_real_name";
import style from "./index.module.css";
import Pie from "../Pie"

export default function BloodTypes() {
  const [data, setData] = useState(null);
  const types = ["A_minus", "A_plus","AB_minus", "AB_plus","B_minus", "B_plus" ,"O_minus", "O_plus"]

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
    <section id="blood-type" className={style.container}>
      <h2>Pie Chart</h2>
      <div  className={style.pies}>
        {data && data.map((d) => <Pie data={d} key={d[0].name}/>) }
      </div>
    </section>
  );
}
