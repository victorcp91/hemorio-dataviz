import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import {map_real_name} from "../../lib/map_real_name";
import style from "./index.module.css";
import Pie from "../Pie"

export default function BloodTypes({type}) {
  
  const [data, setData] = useState(null);

  const types = ["A_minus", "A_plus","AB_minus", "AB_plus","B_minus", "B_plus" ,"O_minus", "O_plus"]

  const dataFile = type === 'history' ? useSelector(state => state.dataFile) : useSelector(state => state.forecastDataFile);

  async function fetchData() {
    
    let data = []
    for (let type of types){
      let pieData = []
      for (let blood of [type, "total"]){
        let sum = dataFile.reduce(function (accumulator, currentValue) {
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

  useEffect(fetchData, [dataFile]);

  if(!dataFile || !dataFile.length){
    return null;
  }

  return (
    <section id="blood-type" className={style.container}>
      <div  className={style.pies}>
        {data && data.map((d, index) => <Pie data={d} key={d[0].name+index}/>) }
      </div>
    </section>
  );
}
