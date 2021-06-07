import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';

import {setInitialTimeWindow, setFinalTimeWindow} from '../../store/actions/filters';
import style from "./index.module.css";

export default function Header() {

  const {initialTimeWindow, finalTimeWindow} = useSelector(state => state.filters);
  const dispatch = useDispatch();

  function setHistoryInitialDate(date){
    dispatch(setInitialTimeWindow(date));
  }

  function setHistoryFinalDate(date){
    dispatch(setFinalTimeWindow(date));
  }

  return (
    <header>
      <div className={style.container}>
        <h1 className={style.title}>Hemorio</h1>
        <ul className={style.sections}>
          <li>
            <a href="#bar">Bar Chart</a>
          </li>
          <li>
            <a href="#line">Line Chart</a>
          </li>
          <li>
            <a href="#blood-type">Pie Chart</a>
          </li>
          <li>
            <a href="#multiline">Multiline Chart</a>
          </li>
        </ul>
      </div>
      <div className={style.bloodBank}>
        <label>
          Blood bank
          <select>
            <option value="hemorio">Hemorio</option>
          </select>
          <div>
            <div>
              Upload data for new blood bank
            </div>
              <input type="file"/>
          </div>
        </label>
      </div>
      <ul className={style.filters}>
        <li>
          <label>
            History Time Window
            </label>
          <input type="date" min="2013-01-01" max="2013-12-31" value={initialTimeWindow} onChange={e => setHistoryInitialDate(e.currentTarget.value)}/>
          <input type="date" min="2013-01-01" max="2013-12-31" value={finalTimeWindow} onChange={e => setHistoryFinalDate(e.currentTarget.value)}/>
          <button disabled="disabled">Download Corresponding Data</button>
        </li>
        <li>
          <label>
            Forecast Time Window
          </label>
          {/* <input type="date" min="2013-01-01" max="2013-12-31" value={historyInitialDate} onChange={e => setHistoryInitialDate(e.currentTarget.value)}/>
          <input type="date" min="2013-01-01" max="2013-12-31" value={historyFinalDate} onChange={e => setHistoryFinalDate(e.currentTarget.value)}/> */}
          <button disabled="disabled">Download Corresponding Data</button>
        </li>
        <li>
          <label>
            Forecast Model
            <select>
              <option value="hemorio">Model 1</option>
              <option value="hemorio">Model 2</option>
            </select>
          </label>
        </li>
        <li>
          <button>Choose holidays in the Forecast Models</button>
          <button>Choose the dates of the donation campaigns for this data</button>
        </li>
        <li>
          <button>Show outputs</button>
        </li>
      </ul>
    </header>
   
  );
}
