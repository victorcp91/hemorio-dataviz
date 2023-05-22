import React, { useMemo } from "react";
import { useSelector } from 'react-redux';
import { map_real_name } from "../../lib/map_real_name";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from 'chart.js';
import { Bar as BarChart } from 'react-chartjs-2';

import style from "./index.module.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
);

export default function Bar({type}) {

  const { forecastModel } = useSelector(state => state.filters);
  
  const {file, model1File, model2File} = useSelector(state => state.dataFile);

  const dataFile = useMemo(() => {
    if(file && type === 'history'){
      return file;
    }
    if(model1File && forecastModel === "1"){
      return model1File;
    } 
    if(model2File && forecastModel === "2"){
      return model2File;
    }
    return null;
  }, [forecastModel, type, file, model1File, model2File]);


  function get_dtInfo(datestr){
    return new Date((datestr+ '').slice(0, 4),(datestr+ '').slice(4, 6)-1,(datestr+ '').slice(6, 8))
  }

  const filteredData = useMemo(() => {
    if(!dataFile) return null;
    let convertedDateData = dataFile.map(item => ({...item, date: get_dtInfo(item.datestr)}));

    return convertedDateData;
   
  }, [dataFile]);

  const barData = useMemo(() => {
    if(!filteredData) return null;

    let formattedData = []
    for (let blood of ["A_minus","A_plus","AB_minus", "AB_plus","B_minus", "B_plus" ,"O_minus", "O_plus" ]){
      let sum = filteredData.reduce(function (accumulator, currentValue) {
          return accumulator + currentValue[blood]
      }, 0)
      formattedData.push({type: map_real_name(blood), value : sum})
    }  
    return formattedData;
  }, [filteredData]);

  if(!dataFile || !dataFile.length){
    return null;
  }

  const options = {
    responsive: true,
  }

  const data = {
    labels: barData.map(b => b.type),
    datasets: [
      {
        data: barData.map(b => b.value),
        backgroundColor: 'firebrick',
      }
    ]
  }

  return (
    <section id="bar" className={style.container}>
      <BarChart options={options} data={data} />
    </section>
  );
}
