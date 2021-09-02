import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {compareAsc, parseISO } from 'date-fns';

import {setInitialHistoryTimeWindow, setFinalHistoryTimeWindow} from '../../store/actions/filters';
import { setDataFile } from '../../store/actions/dataFile';

import style from './index.module.css';

export default function HistoryTimeWindow() {

  const dispatch = useDispatch();
  const {initialTimeWindow, finalTimeWindow, minInitialTimeWindow, maxFinalTimeWindow} = useSelector(state => state.filters);
  const { file, bank } = useSelector(state => state.dataFile);

  function get_dtInfo(datestr){
    return new Date((datestr+ '').slice(0, 4),(datestr+ '').slice(4, 6)-1,(datestr+ '').slice(6, 8))
  }

  function setHistoryInitialDate(date){
    dispatch(setInitialHistoryTimeWindow(date));

    const convertedDateData = file.filter(item => {
      return compareAsc(parseISO(date), get_dtInfo(item.datestr)) !== 1;
    });
    dispatch(setDataFile(convertedDateData));

  }

  function setHistoryFinalDate(date){
    dispatch(setFinalHistoryTimeWindow(date));

    const convertedDateData = file.filter(item => {
      return compareAsc(parseISO(date), get_dtInfo(item.datestr)) !== -1;
    });

    dispatch(setDataFile(convertedDateData));
  }

  if(!bank){
    return null;
  }
  return (
    <div className={style.history}>
      <label>
        History Time Window
      </label>
      <div className={style.timeRange}>
        <input type="date" min={minInitialTimeWindow} max={maxFinalTimeWindow} value={initialTimeWindow} onChange={e => setHistoryInitialDate(e.currentTarget.value)}/> 
        <input type="date" min={minInitialTimeWindow} max={maxFinalTimeWindow} value={finalTimeWindow} onChange={e => setHistoryFinalDate(e.currentTarget.value)}/>
        <a href={bank.file_url} target="_blank">Download Data</a>
      </div>
      
    </div>
  )
}
