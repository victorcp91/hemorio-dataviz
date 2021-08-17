import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {setInitialForecastTimeWindow, setFinalForecastTimeWindow} from '../../store/actions/filters';

import style from './index.module.css';

export default function HistoryTimeWindow() {

  const dispatch = useDispatch();
  const {initialForecastTimeWindow, finalForecastTimeWindow} = useSelector(state => state.filters);

  function setForecastInitialDate(date){
    dispatch(setInitialForecastTimeWindow(date));
  }

  function setForecastFinalDate(date){
    dispatch(setFinalForecastTimeWindow(date));
  }

  return (
    <div className={style.history}>
      <label>
        Forecast Time Window
      </label>
      <div className={style.timeRange}>
        <input type="date" min="2013-01-01" max="2013-12-31" value={initialForecastTimeWindow} onChange={e => setForecastInitialDate(e.currentTarget.value)}/> 
        <input type="date" min="2013-01-01" max="2013-12-31" value={finalForecastTimeWindow} onChange={e => setForecastFinalDate(e.currentTarget.value)}/>
      </div>
    </div>
  )
}
