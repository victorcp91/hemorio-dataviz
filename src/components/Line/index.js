import React, { useState, useRef, useEffect, useMemo } from "react";
import { useSelector } from 'react-redux';
import LineChart from "../../charts/LineChart";

import style from "./index.module.css";

export default function Line({type}) {
  const lineChartElement = useRef(null);
  const vis = useRef(null);

  const {file, model1File, model2File} = useSelector(state => state.dataFile);
  const {forecastModel} = useSelector(state => state.filters);

  const dataFile = useMemo(() => {
    if(file && type === 'history'){
      console.log('history');
      return file;
    }
    if(model1File && forecastModel === "1"){
      console.log('model1');

      return model1File;
    } 
    if(model2File && forecastModel === "2"){
      console.log('model2');

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

  function initVis() {
    if (dataFile && dataFile.length) {
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