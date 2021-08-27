import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {compareAsc, parseISO } from 'date-fns';


import {setInitialForecastTimeWindow, setFinalForecastTimeWindow, setForecastModel} from '../../store/actions/filters';
import { setForecastModel1File, setForecastModel2File } from '../../store/actions/dataFile';

import style from './index.module.css';

export default function HistoryTimeWindow() {

  const dispatch = useDispatch();
  const {minForecastDate,maxForecastDate, forecastInitialTimeWindow, forecastFinalTimeWindow, forecastModel} = useSelector(state => state.filters);
  const { bank, model1File, model2File } = useSelector(state => state.dataFile);

  function get_dtInfo(datestr){
    return new Date((datestr+ '').slice(0, 4),(datestr+ '').slice(4, 6)-1,(datestr+ '').slice(6, 8))
  }

  function setForecastInitialDate(date){
    dispatch(setInitialForecastTimeWindow(date));
    
    const filteredForecastModel1 = model1File.filter(item => {
      return compareAsc(parseISO(date), get_dtInfo(item.date)) !== 1;
    });
    dispatch(setForecastModel1File(filteredForecastModel1));

    const filteredForecastModel2 = model2File.filter(item => {
      return compareAsc(parseISO(date), get_dtInfo(item.date)) !== 1;
    });
    dispatch(setForecastModel2File(filteredForecastModel2));
  }

  function setForecastFinalDate(date){
    dispatch(setFinalForecastTimeWindow(date));

    const filteredForecastModel1 = model1File.filter(item => {
      return compareAsc(parseISO(date), get_dtInfo(item.date)) !== -1;
    });
    dispatch(setForecastModel1File(filteredForecastModel1));

    const filteredForecastModel2 = model2File.filter(item => {
      return compareAsc(parseISO(date), get_dtInfo(item.date)) !== -1;
    });
    dispatch(setForecastModel2File(filteredForecastModel2));

  }

  function changeForecastModel(e){
    dispatch(setForecastModel(e.currentTarget.value));
  }

  const currentForecastBankFile = useMemo(() => {
    if(!bank) return '';
    
    const forecastFile = bank.forecast_files[parseInt(forecastModel,10) - 1];
    if(forecastFile){
      return forecastFile.file_url;
    } return '';
  },[forecastModel, bank]);

  if(!bank){
    return null;
  }

  return (
    <div className={style.history}>
      <label>
        Forecast Time Window
      </label>
      <div className={style.timeRange}>
        <input type="date" min={minForecastDate} max={forecastFinalTimeWindow || maxForecastDate} value={forecastInitialTimeWindow} onChange={e => setForecastInitialDate(e.currentTarget.value)}/> 
        <input type="date" min={forecastInitialTimeWindow || minForecastDate} max={maxForecastDate} value={forecastFinalTimeWindow} onChange={e => setForecastFinalDate(e.currentTarget.value)}/>
        <select value={forecastModel} onChange={changeForecastModel}>
          <option value={1}>Model 1</option>
          <option value={2}>Model 2</option>
        </select>
        {!!currentForecastBankFile && <a href={currentForecastBankFile} target="_blank">Download Data</a>}
      </div>
    </div>
  )
}
