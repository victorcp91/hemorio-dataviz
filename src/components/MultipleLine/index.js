import React, { useState, useRef, useEffect, useMemo } from "react";
import { useSelector } from 'react-redux';
import MultipleLineChart from "../../charts/MultipleLineChart";

import { map_real_name } from '../../lib/map_real_name';

import style from "./index.module.css";

export default function MultipleLine({type}) {
  const multipleLineChartElement = useRef(null);
  const vis = useRef(null);

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
    A_plus : true,
    AB_minus : true,
    AB_plus : true,
    B_minus : true,
    B_plus : true,
    O_minus : true,
    O_plus : true,
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
  
      const series = types.map((type) => ({
        id: type, 
        values: currentData.map((d) => ({date: d.date, value: d[type]}))
      }));
  
      setData(series);
    }
  }

  useEffect(() => { fetchData() }, [dataFile]);

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
    const updatedFilters = { ...bloodTypeFilters };
    updatedFilters[filter] = !updatedFilters[filter];
    setBloodTypeFilters(updatedFilters);
  };

  if(!dataFile || !dataFile.length){
    return null;
  }

  return (
    <section id="multiline" className={style.container}>
      <div id="vis-container" ref={multipleLineChartElement} className={`multilineChart ${activeFilters}`}></div>
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