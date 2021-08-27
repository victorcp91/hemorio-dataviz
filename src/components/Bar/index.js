import React, { useState, useRef, useMemo, useEffect } from "react";
import { useSelector } from 'react-redux';
import BarChart from "../../charts/BarChart";
import { map_real_name } from "../../lib/map_real_name";
import {compareAsc, parseISO, format } from 'date-fns';

import style from "./index.module.css";

let vis = null;

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


  const barChartElement = useRef(null);

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
    console.log('update');
    if (dataFile && dataFile.length) {
      const dataFields = ["type", "value"];
      const d3Props = {
        data: barData,
        dataFields,
        width,
        height,
      };
      if(vis){
        vis.destroy();
      }
      vis = new BarChart(barChartElement.current, d3Props);
    }
  }


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

  console.log(forecastModel);

  useEffect(() => {
    if (barData) {
      initVis();
    }
  }, [barData, forecastModel]);

  if(!dataFile || !dataFile.length){
    return null;
  }

  return (
    <section id="bar" className={style.container}>
      <div id="vis-container" ref={barChartElement}></div>
    </section>
  );
}
