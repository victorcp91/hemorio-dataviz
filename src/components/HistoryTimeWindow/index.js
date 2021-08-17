import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {setInitialHistoryTimeWindow, setFinalHistoryTimeWindow} from '../../store/actions/filters';

import style from './index.module.css';

export default function HistoryTimeWindow() {

  const dispatch = useDispatch();
  const {initialTimeWindow, finalTimeWindow, minInitialTimeWindow, maxFinalTimeWindow} = useSelector(state => state.filters);
  console.log(initialTimeWindow, finalTimeWindow)

  function setHistoryInitialDate(date){
    dispatch(setInitialHistoryTimeWindow(date));
  }

  function setHistoryFinalDate(date){
    dispatch(setFinalHistoryTimeWindow(date));
  }


  return (
    <div className={style.history}>
      <label>
        History Time Window
      </label>
      <div className={style.timeRange}>
        <input type="date" min={minInitialTimeWindow} max={maxFinalTimeWindow} value={initialTimeWindow} onChange={e => setHistoryInitialDate(e.currentTarget.value)}/> 
        <input type="date" min={minInitialTimeWindow} max={maxFinalTimeWindow} value={finalTimeWindow} onChange={e => setHistoryFinalDate(e.currentTarget.value)}/>
      </div>
    </div>
  )
}
