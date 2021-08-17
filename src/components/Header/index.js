import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { csv, autoType } from "d3";

import UploadIcon from '../../assets/upload.svg';
import api from '../../services/api';

import { setDataFile } from "../../store/actions/dataFile";
import style from "./index.module.css";
import UploadBankModal from "../UploadBankModal";
import { setFinalHistoryTimeWindow, setInitialHistoryTimeWindow, setMinInitialHistoryTimeWindow, setMaxFinalHistoryTimeWindow } from "../../store/actions/filters";

export default function Header() {

  const dispatch = useDispatch();

  const [bloodBanks, setBloodBanks] = useState([]);
  const [selectedBloodBank, setSelectedBloodBank] = useState("");

  const [uploadModal, setUploadModal] = useState(false);


  useEffect(() => {
    api.getBloodBanks().then(res => {
      setBloodBanks(res);
      console.log(res);
    })
  }, []);

  async function loadCsv(url){
    let csvContent = await csv(url, autoType);
    dispatch(setDataFile(csvContent));
    
  }

  function parseISODate(date){
    const isoDate = new Date(date);
    return `${isoDate.getFullYear()}-${isoDate.getMonth()+1 < 10 ? `0${isoDate.getMonth()+1}` : isoDate.getMonth()+1 }-${isoDate.getDate() < 10 ? `0${isoDate.getDate()}` : isoDate.getDate()}`;
  }

  useEffect(() => {
    if(selectedBloodBank){
      const currentBank = bloodBanks.find(bank => bank._id === selectedBloodBank);
      if(currentBank?.file_url){
        loadCsv(currentBank.file_url);
        dispatch(setInitialHistoryTimeWindow(parseISODate(currentBank.first_date)));
        dispatch(setFinalHistoryTimeWindow(parseISODate(currentBank.last_date)));
        dispatch(setMinInitialHistoryTimeWindow(parseISODate(currentBank.first_date)));
        dispatch(setMaxFinalHistoryTimeWindow(parseISODate(currentBank.last_date)));
      }
    } else {
      dispatch(setDataFile([]));
    }
  }, [selectedBloodBank]);

  function changeBloodBank(e){
    setSelectedBloodBank(e.currentTarget.value);
  }

  return (
    <header>
      <div className={style.container}>
        <h1 className={style.title}>Blood Bank Forecasts</h1>
      </div>
      <div className={style.options}>
        <div className={style.bloodBank}>
          <label>
            Blood bank
          </label>
          <select value={selectedBloodBank} onChange={changeBloodBank}>
            <option value="">Select blood bank</option>
            {bloodBanks.map((bank) => (
              <option key={bank._id} value={bank._id}>{bank.name}</option>
            ))}
          </select>
          <div>
            <div>
              Upload data for new blood bank
            </div>
            <button className={style.uploadArea} onClick={() => setUploadModal(true)}>
              <UploadIcon /> Upload .csv file
            </button>
          </div>
        </div>
      </div>
      {uploadModal && <UploadBankModal close={() => setUploadModal(false)}/>}
    </header>
  );
}
