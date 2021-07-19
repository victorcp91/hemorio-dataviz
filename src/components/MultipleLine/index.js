import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { csv, autoType } from "d3";
import MultipleLineChart from "../../charts/MultipleLineChart";

import { map_real_name } from '../../lib/map_real_name';

import style from "./index.module.css";

let vis = null;

export default function MultipleLine() {
  const multipleLineChartElement = useRef(null);
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
      vis = new MultipleLineChart(multipleLineChartElement.current, d3Props);
    }
  }

  function get_dtInfo(datestr){
    return new Date((datestr+ '').slice(0, 4),(datestr+ '').slice(4, 6)-1,(datestr+ '').slice(6, 8))
  }

  async function fetchData() {
    let data = await csv('data/blood_donors_complete.csv', autoType);
    data = data.map(({datestr, total, A_minus,A_plus,AB_minus,AB_plus,B_minus,B_plus,O_minus,O_plus}) => ({
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
      values: data.map((d) => ({date: d.date, value: d[type]}))
    }));

    setData(series);
  }

  useEffect(fetchData, []);

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

  return (
    <section id="multiline" className={style.container}>
      <div id="vis-container" ref={multipleLineChartElement} className={`multilineChart ${activeFilters}`}></div>
      <div className={`filters ${style.filters}`}>
        {filters.map(filter => (
          <button
            className={bloodTypeFilters[filter] ? `${style.active} active` : ''}
            onClick={() => toogleBloodType(filter)}>
            <div className={`${style.lineColor} ${bloodTypeFilters[filter] ? filter : ''}`} />  <span className={style.name}>{map_real_name(filter)}</span>
          </button>
        ))}
      </div>
      {/* <div>
        <button type="button">Show Model A</button>
        <button type="button">Show Model B</button>
      </div>
      <div>
        <button type="button">Download all data</button>
        <button type="button">Download current data</button>
      </div> */}
    </section>
    )
}