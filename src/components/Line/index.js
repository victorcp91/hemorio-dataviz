import React, { useMemo } from "react";
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

import style from "./index.module.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  TimeScale
);


export default function Line({type}) {
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

    function get_dtInfo(info){
        let datestr = info.datestr
        return new Date((datestr+ '').slice(0, 4),(datestr+ '').slice(4, 6)-1,(datestr+ '').slice(6, 8))
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

    const dataSet = useMemo(() => {
      const formattedData = dataFile.map(x => ({date : get_dtInfo(x), value : x.total}))
      return {

        labels: formattedData?.map(b => b.date),
        datasets: [
          {
            data: formattedData?.map(b => b.value),
            borderColor: 'firebrick',
            background: 'none',
            borderWidth: 1.5
          }
        ]
      }
    }, [dataFile])
    
    if(!dataFile || !dataFile.length){
      return  null;
    }

    


    return (
        <section id="line" className={style.container}>
            {/* <div id="vis-container" ref={lineChartElement}></div> */}
            <LineChart options={options} data={dataSet} />
        </section>
        )
}