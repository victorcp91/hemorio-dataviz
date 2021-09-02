import React, { useState, useRef, useEffect, useMemo } from "react";
import { useSelector } from 'react-redux';
import MultipleLineChart from "../../charts/MultipleLineChart";

import { map_real_name } from '../../lib/map_real_name';

import style from "./index.module.css";

export default function ForecastMultipleLine({type}) {
  const multipleLineChartElement = useRef(null);
  const vis = useRef(null);

  const {file, model1File, model2File} = useSelector(state => state.dataFile);
  const {forecastModel} = useSelector(state => state.filters);

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
    return [];
  }, [forecastModel, type, file, model1File, model2File]);
  
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

  const [bloodTypeFilters, setBloodTypeFilters] = useState({
    A_minus : true,
    A_plus : false,
    AB_minus : false,
    AB_plus : false,
    B_minus : false,
    B_plus : false,
    O_minus : false,
    O_plus : false,
  });

  function initVis() {
    if (data && data.length) {
      const d3Props = {
        data,
        width,
        height,
      };
      if(vis.current){
        vis.current.destroy();
      }
      vis.current = new MultipleLineChart(multipleLineChartElement.current, d3Props);
    }
  }

  function get_dtInfo(datestr){
    return new Date((datestr+ '').slice(0, 4),(datestr+ '').slice(4, 6)-1,(datestr+ '').slice(6, 8))
  }

  async function fetchData() {
    if(dataFile.length){
      console.log(dataFile);
      const currentData = dataFile.map(({
        datestr,
        total,
        A_minus,
        A_minus_max,
        A_minus_mean,
        A_plus,
        A_plus_max,
        A_plus_mean,
        AB_minus,
        AB_minus_max,
        AB_minus_mean,
        AB_plus,
        AB_plus_max,
        AB_plus_mean,
        B_minus,
        B_minus_max,
        B_minus_mean,
        B_plus,
        B_plus_max,
        B_plus_mean,
        O_minus,
        O_minus_max,
        O_minus_mean,
        O_plus,
        O_plus_max,
        O_plus_mean
      }) => ({
        date: get_dtInfo(datestr),
        value: total,
        A_minus,
        A_minus_max,
        A_minus_mean,
        A_plus,
        A_plus_max,
        A_plus_mean,
        AB_minus,
        AB_minus_max,
        AB_minus_mean,
        AB_plus,
        AB_plus_max,
        AB_plus_mean,
        B_minus,
        B_minus_max,
        B_minus_mean,
        B_plus,
        B_plus_max,
        B_plus_mean,
        O_minus,
        O_minus_max,
        O_minus_mean,
        O_plus,
        O_plus_max,
        O_plus_mean
      }));
  
      const types = [
        'A_minus',
        'A_minus_max',
        'A_minus_mean',
        'A_plus',
        'A_plus_max',
        'A_plus_mean',
        'AB_minus',
        'AB_minus_max',
        'AB_minus_mean',
        'AB_plus',
        'AB_plus_max',
        'AB_plus_mean',
        'B_minus',
        'B_minus_max',
        'B_minus_mean',
        'B_plus',
        'B_plus_max',
        'B_plus_mean',
        'O_minus',
        'O_minus_max',
        'O_minus_mean',
        'O_plus',
        'O_plus_max',
        'O_plus_mean'];
  
      const series = types.map((type) => ({
        id: type, 
        values: currentData.map((d) => ({date: d.date, value: d[type]}))
      }));
  
      setData(series);
    }
  }

  useEffect(fetchData, [dataFile]);

  useEffect(() => {
    if (data && width) {
      initVis();
    }
  }, [data, width]);


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

  const toogleBloodType = (filter) => {
    const updatedFilters = {
      A_minus : false,
      A_plus : false,
      AB_minus : false,
      AB_plus : false,
      B_minus : false,
      B_plus : false,
      O_minus : false,
      O_plus : false,
    };
    updatedFilters[filter] = true;
    setBloodTypeFilters(updatedFilters);
  };

  if(!dataFile || !dataFile.length){
    return null;
  }

  return (
    <section id="multiline" className={style.container}>
      <div id="vis-container" ref={multipleLineChartElement} className={`forecastMultilineChart ${activeFilters}`}></div>
      <div className={`filters ${style.filters}`}>
        {filters.map((filter, index) => (
          <button
            key={map_real_name(filter)}
            className={bloodTypeFilters[filter] ? `${style.active} active` : ''}
            onClick={() => toogleBloodType(filter)}>
            <div className={`${style.lineColor} ${bloodTypeFilters[filter] ? filter : ''}`} />  <span className={style.name}>{map_real_name(filter)}</span>
          </button>
        ))}
      </div>
    </section>
    )
}