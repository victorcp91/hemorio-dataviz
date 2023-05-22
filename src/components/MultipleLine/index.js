import React, { useState, useMemo } from "react";
import { useSelector } from 'react-redux';
import 'chartjs-adapter-date-fns';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  TimeScale
} from 'chart.js';
import { Line as LineChart } from 'react-chartjs-2';

import { map_real_name } from '../../lib/map_real_name';

import style from "./index.module.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  TimeScale
);

export default function MultipleLine({type}) {
  const {filteredFile, filteredModel1File, filteredModel2File} = useSelector(state => state.dataFile);

  const {forecastModel} = useSelector(state => state.filters);

  const dataFile = useMemo(() => {
    if(filteredFile && type === 'history'){
      return filteredFile;
    }
    if(filteredModel1File && forecastModel === "1"){
      return filteredModel1File;
    } 
    if(filteredModel2File && forecastModel === "2"){
      return filteredModel2File;
    }
    return [];
  }, [forecastModel, type, filteredFile, filteredModel1File, filteredModel2File]);
  console.log(dataFile)

  const getGraphColor = (color) => {
    switch(color){
      case 'A_minus':
        return 'rgb(178,34,34,1)';
      case 'A_plus':
        return 'rgb(112, 5, 14)';
      case 'AB_minus':
        return 'rgb(233, 43, 59)';
      case 'AB_plus':
        return 'rgb(51, 1, 5)';
      case 'B_minus':
        return 'rgb(179, 52, 63)';
      case 'B_plus':
        return 'rgb(70, 26, 30)';
      case 'O_minus':
        return 'rgb(24, 9, 10)';
      case 'O_plus':
        return 'rgb(236, 127, 134)';
      default:
        return '';
    }
  } 

  const [bloodTypeFilters, setBloodTypeFilters] = useState({
    A_minus : true,
    A_plus : true,
    AB_minus : true,
    AB_plus : true,
    B_minus : true,
    B_plus : true,
    O_minus : true,
    O_plus : true,
  });

  function get_dtInfo(datestr){
    return new Date((datestr+ '').slice(0, 4),(datestr+ '').slice(4, 6)-1,(datestr+ '').slice(6, 8))
  }
  
  const filters = useMemo(() => {
    return Object.keys(bloodTypeFilters);
  }, [bloodTypeFilters]);

  const activeFilters = useMemo(() => {
    let updatedFilters = { ...bloodTypeFilters };
    Object.keys(updatedFilters).forEach((key) => {
      if(!updatedFilters[key]){
        delete updatedFilters[key];
      }
    });
    updatedFilters = Object.keys(updatedFilters).toString();
    if(updatedFilters){
      return updatedFilters.replace(/,/g," ");
    } return '';
  }, [bloodTypeFilters]);

  const toggleBloodType = (filter) => {
    const updatedFilters = { ...bloodTypeFilters };
    updatedFilters[filter] = !updatedFilters[filter];
    setBloodTypeFilters(updatedFilters);
  };

  const dataSet = useMemo(() => {
    const currentData = dataFile.map(({datestr, total, A_minus,A_plus,AB_minus,AB_plus,B_minus,B_plus,O_minus,O_plus}) => ({
      date: get_dtInfo(datestr),
      value: total,
      A_minus : A_minus,
      A_plus : A_plus,
      AB_minus : AB_minus,
      AB_plus : AB_plus,
      B_minus : B_minus,
      B_plus : B_plus,
      O_minus : O_minus,
      O_plus : O_plus,
    }));

    const types = ['A_minus','A_plus','AB_minus','AB_plus','B_minus','B_plus','O_minus','O_plus'];

    const series = types.filter(t => bloodTypeFilters[t]).map((type) => ({
      id: type, 
      values: currentData.map((d) => ({date: d.date, value: d[type]}))
    }));
    if(type === 'forecast'){
      return {
        labels: dataFile.map(d => get_dtInfo(d.datestr)),
        datasets: [
          ...series.map(s => ({
            data: s.values.map(v => v.value),
            borderColor: getGraphColor(s.id),
            background: 'none',
            borderWidth: 1.5
          })),
          ...series.map(s => ({
            data: s.values.map(v => v.value * 1.1),
            borderColor: getGraphColor(s.id),
            background: 'none',
            borderWidth: 1,
            borderDash: [5,2],
          })),
          ...series.map(s => ({
            data: s.values.map(v => v.value * 0.9),
            borderColor: getGraphColor(s.id),
            background: 'none',
            borderWidth: 1,
            borderDash: [2,2],
          }))
        ]
      }
    } 
    return {
      labels: dataFile.map(d => get_dtInfo(d.datestr)),
      datasets: series.map(s => ({
        data: s.values.map(v => v.value),
        borderColor: getGraphColor(s.id),
        background: 'none',
        borderWidth: 1.5
      }))
  }
}, [dataFile, bloodTypeFilters])

  if(!dataFile || !dataFile.length){
    return null;
  }

  const options = {
    responsive: true,
    elements: {
      point: {
        radius: 0
      },
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'month',
        }
      }
    }
  };

  return (
    <section id="multiline" className={style.container}>
      <LineChart options={options} data={dataSet}/>
      <div className={`filters ${style.filters}`}>
        {filters.map((filter) => (
          <button
            key={map_real_name(filter)}
            className={bloodTypeFilters[filter] ? `${style.active} active` : ''}
            onClick={() => toggleBloodType(filter)}>
            <div className={`${style.lineColor} ${bloodTypeFilters[filter] ? filter : ''}`} />  <span className={style.name}>{map_real_name(filter)}</span>
          </button>
        ))}
      </div>
    </section>
    )
}