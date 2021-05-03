import React, { useState, useRef, useEffect } from "react";
import { csv, autoType } from "d3";
import LineChart from "../../charts/LineChart";

import style from "./index.module.css";

let vis = null;

export default function Line() {
  const lineChartElement = useRef(null);
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
      vis = new LineChart(lineChartElement.current, d3Props);
    }
  }

    function get_dtInfo(info){
        let datestr = info.datestr
        return new Date((datestr+ '').slice(0, 4),(datestr+ '').slice(4, 6)-1,(datestr+ '').slice(6, 8))
    }
    
    async function fetchData() {
        let data = await csv('data/blood_donors.csv', autoType)
        data = data.map(x => ({date : get_dtInfo(x), value : x.total}))
        setData([data]);
    }

    useEffect(fetchData, []);

    useEffect(() => {
        if (data && width) {
          initVis();
        }
      }, [data, width]);
    

    return (
        <section id="line" className={style.container}>
            <h2>Line</h2>
            <div id="vis-container" ref={lineChartElement}></div>
        </section>
        )
}