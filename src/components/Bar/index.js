import React, { useState, useRef, useMemo, useEffect } from "react";
import { useSelector } from 'react-redux';
import BarChart from "../../charts/BarChart";
import { map_real_name } from "../../lib/map_real_name"
import { csv, autoType } from "d3";
import {compareAsc, parseISO } from 'date-fns';

import style from "./index.module.css";

let vis = null;

export default function Bar() {

  const {initialTimeWindow, finalTimeWindow} = useSelector(state => state.filters);

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

  async function fetchData() {
    let csvContent = await csv('data/blood_donors.csv', autoType)
    setData(csvContent);
  }

  useEffect(fetchData, []);


  function get_dtInfo(datestr){
    return new Date((datestr+ '').slice(0, 4),(datestr+ '').slice(4, 6)-1,(datestr+ '').slice(6, 8))
  }

  const filteredData = useMemo(() => {
    if(!data) return null;
    let convertedDateData = data.map(item => ({...item, date: get_dtInfo(item.datestr)}));

    if(initialTimeWindow){
      convertedDateData = convertedDateData.filter(item => {
        return compareAsc(parseISO(initialTimeWindow),item.date) !== 1;
      });
    } 
    if(finalTimeWindow){
      convertedDateData = convertedDateData.filter(item => compareAsc(parseISO(finalTimeWindow), item.date) !== -1);
    }   
    return convertedDateData;
   
  }, [data, initialTimeWindow, finalTimeWindow]);


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


  useEffect(() => {
    if (barData) {
      initVis();
    }
  }, [barData]);

  return (
    <section id="bar" className={style.container}>
      <div id="vis-container" ref={barChartElement}></div>
    </section>
  );
}
