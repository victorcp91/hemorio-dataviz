import React, { useState, useRef, useEffect } from "react";
import { csv, autoType } from "d3";
import { useSelector } from 'react-redux';
import LineChart from "../../charts/LineChart";

import style from "./index.module.css";

export default function Line({type}) {
  const lineChartElement = useRef(null);
  const vis = useRef(null);
  
  const dataFile = type === 'history' ? useSelector(state => state.dataFile) : useSelector(state => state.forecastDataFile);

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
      const dataFields = ["date", "value"];
      const d3Props = {
        data,
        dataFields,
        width,
        height,
      };
      if(vis.current){
        vis.current.destroy();
      }
      vis.current = new LineChart(lineChartElement.current, d3Props);
    }
  }

    function get_dtInfo(info){
        let datestr = info.datestr
        return new Date((datestr+ '').slice(0, 4),(datestr+ '').slice(4, 6)-1,(datestr+ '').slice(6, 8))
    }
    
    async function fetchData() {
        const formattedData = dataFile.map(x => ({date : get_dtInfo(x), value : x.total}))
        setData([formattedData]);
    }

    useEffect(fetchData, [dataFile]);

    useEffect(() => {
        if (dataFile.length && width) {
          initVis();
        }
      }, [data, width]);
    
    if(!dataFile || !dataFile.length){
      return  null;
    }

    return (
        <section id="line" className={style.container}>
            <div id="vis-container" ref={lineChartElement}></div>
        </section>
        )
}