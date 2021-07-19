import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Calendar from 'react-calendar';
import UploadIcon from '../../assets/upload.svg';

import {setInitialTimeWindow, setFinalTimeWindow} from '../../store/actions/filters';
import style from "./index.module.css";
import { stubFalse } from "lodash";

export default function Header() {

  const {initialTimeWindow, finalTimeWindow} = useSelector(state => state.filters);
  const dispatch = useDispatch();

  const [bloodBank, setBloodBank] = useState('hemorio');
  const [holidaysCalendar, setHolidaysCalendar] = useState(false);
  const [donationsCalendar, setDonationsCalendar] = useState(false);
  const [holidays, setHolidays] = useState([]);
  const [donationDates, setDonationDates] = useState([]);

  function setHistoryInitialDate(date){
    dispatch(setInitialTimeWindow(date));
  }

  function setHistoryFinalDate(date){
    dispatch(setFinalTimeWindow(date));
  }

  function changeBloodBank(e){
    console.log(e.currentTarget.value);
  }

  function addHoliday(date) {
    const updatedHolidays = [...holidays];
    updatedHolidays.push(date);
    setHolidays(updatedHolidays);
    setHolidaysCalendar(false);
  }

  function removeHoliday(index) {
    const updatedHolidays = [...holidays];
    updatedHolidays.splice(index,1);
    setHolidays(updatedHolidays);
    setHolidaysCalendar(false);
  }

  function addDonationDate(date) {
    const updatedDonations = [...donationDates];
    updatedDonations.push(date);
    setDonationDates(updatedDonations);
    setDonationsCalendar(false);
  }

  function removeDonationDate(index) {
    const updatedDonations = [...donationDates];
    updatedDonations.splice(index,1);
    setDonationDates(updatedDonations);
    setDonationsCalendar(false);
  }

  return (
    <header>
      <div className={style.container}>
        <h1 className={style.title}>Blood Bank Predictions</h1>
        {/* <ul className={style.sections}>
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
        </ul> */}
      </div>
      <div className={style.options}>
        <div className={style.bloodBank}>
          <label>
            Blood bank
          </label>
          <select value={bloodBank} onChange={changeBloodBank}>
            <option value="hemorio">Hemorio</option>
            <option value="example">Example 2</option>
          </select>
          <div>
            <div>
              Upload data for new blood bank
            </div>
            <div className={style.uploadArea}>
              <label for='file-input'> <UploadIcon /> Upload .csv file</label>
              <input id="file-input" type="file"/>
            </div>
          </div>
        </div>
        <div className={style.filtersContainer}>
          <ul className={style.filters}>
            <li>
              <label>
                Forecast Model
              </label>
              <select>
                <option value="hemorio">Model 1</option>
                <option value="hemorio">Model 2</option>
              </select>
            </li>
            <li>
              <label>
                History Time Window
              </label>
              <div className={style.timeRange}>
                <input type="date" min="2013-01-01" max="2013-12-31" value={initialTimeWindow} onChange={e => setHistoryInitialDate(e.currentTarget.value)}/> 
                <input type="date" min="2013-01-01" max="2013-12-31" value={finalTimeWindow} onChange={e => setHistoryFinalDate(e.currentTarget.value)}/>
              </div>
            </li>
            <li>
              <label>
                Forecast Time Window
              </label>
              <div className={style.timeRange}>
                <input type="date" min="2013-01-01" max="2013-12-31" value={initialTimeWindow} onChange={e => setHistoryInitialDate(e.currentTarget.value)}/> 
                <input type="date" min="2013-01-01" max="2013-12-31" value={finalTimeWindow} onChange={e => setHistoryFinalDate(e.currentTarget.value)}/>
              </div>
            </li>
            <li>
              <div className={style.datesContainer}>
                <button onClick={() => setHolidaysCalendar(true)} className={style.dates}>Choose holidays in the Forecast Models</button>
                {holidays.map((holiday, index) => (
                  <div className={style.holidayDate}>
                    {new Date(holiday).getMonth()}/{new Date(holiday).getDate()}
                    <button onClick={() => removeHoliday(index)}>x</button>
                  </div>))}
                {holidaysCalendar && (
                  <div className={style.calendarContainer}>
                    <button className={style.close} onClick={() => setHolidaysCalendar(false)}>X</button>
                    <label>Holiday</label>  
                    <Calendar onChange={addHoliday}/>
                  </div>
                )}
                
              </div>
              <div className={style.datesContainer}>
                <button onClick={() => setDonationsCalendar(true)}  className={style.dates}>Choose the dates of the donation campaigns for this data</button>
                {donationDates.map((donation, index) => (
                  <div className={style.holidayDate}>
                    {new Date(donation).getMonth()}/{new Date(donation).getDate()}
                    <button onClick={() => removeDonationDate(index)}>x</button>
                  </div>))}
                {donationsCalendar && (
                  <div className={style.calendarContainer}>
                    <button className={style.close} onClick={() => setDonationsCalendar(false)}>X</button>
                    <label>Donation campaign</label>
                    <Calendar onChange={addDonationDate}/>
                  </div> 
                )}
              </div>
            </li>
          </ul>
          <div className={style.actions}>
            <button className={style.outputs}>Show outputs</button>
            <button className={style.download}>Download Corresponding Data</button>
          </div>
        </div>
        
      </div>
    </header>
  );
}
