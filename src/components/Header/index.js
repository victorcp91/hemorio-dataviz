import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import { csv, autoType } from "d3";
import { add } from 'date-fns';

import UploadIcon from '../../assets/upload.svg';
import api from '../../services/api';

import { setDataFile,setFilteredDataFile, setForecastModel1File,setFilteredForecastModel1File, setForecastModel2File,setFilteredForecastModel2File, setBank  } from "../../store/actions/dataFile";
import { setBloodBanks} from "../../store/actions/bloodBanks";
import style from "./index.module.css";
import UploadBankModal from "../UploadBankModal";
import {
    setFinalHistoryTimeWindow,
    setInitialHistoryTimeWindow,
    setMinInitialHistoryTimeWindow,
    setMaxFinalHistoryTimeWindow,
    setMinForecastDate,
    setMaxForecastDate,
    setInitialForecastTimeWindow,
    setFinalForecastTimeWindow
   } from "../../store/actions/filters";

export default function Header() {

  const dispatch = useDispatch();

  const bloodBanks  = useSelector(state => state.bloodBanks);

  const [selectedBloodBank, setSelectedBloodBank] = useState("");

  const [uploadModal, setUploadModal] = useState(false);


  useEffect(() => {
    api.getBloodBanks().then(res => {
      const uploadedBloodBank = localStorage.getItem('uploadedBloodBank');

      if(uploadedBloodBank){
        dispatch(setBloodBanks([...res, JSON.parse(uploadedBloodBank)]));
      } else {
        dispatch(setBloodBanks(res));
      }
    });
  }, []);

  async function loadCsv(bank){
    let csvContent = await csv(bank.file_url, autoType);
    dispatch(setDataFile(csvContent));
    dispatch(setFilteredDataFile(csvContent));
    if(bank.forecast_files.length){
      if(bank.forecast_files[0]){
        let model1CsvContent = await csv(bank.forecast_files[0].file_url, autoType);
        dispatch(setForecastModel1File(model1CsvContent));
        dispatch(setFilteredForecastModel1File(model1CsvContent));
      }
      if(bank.forecast_files[1]){
        let model2CsvContent = await csv(bank.forecast_files[1].file_url, autoType);
        dispatch(setForecastModel2File(model2CsvContent));
        dispatch(setFilteredForecastModel2File(model2CsvContent));
      }
    }
  }

  function parseISODate(date){
    const isoDate = new Date(date);
    return `${isoDate.getFullYear()}-${isoDate.getMonth()+1 < 10 ? `0${isoDate.getMonth()+1}` : isoDate.getMonth()+1 }-${isoDate.getDate() < 10 ? `0${isoDate.getDate()}` : isoDate.getDate()}`;
  }

  useEffect(() => {
    if(selectedBloodBank){
      const currentBank = bloodBanks.find(bank => bank._id === selectedBloodBank);
      if(currentBank?.file_url){
        loadCsv(currentBank);
        dispatch(setInitialHistoryTimeWindow(parseISODate(currentBank.first_date)));
        dispatch(setFinalHistoryTimeWindow(parseISODate(currentBank.last_date)));
        dispatch(setMinInitialHistoryTimeWindow(parseISODate(currentBank.first_date)));
        dispatch(setMaxFinalHistoryTimeWindow(parseISODate(currentBank.last_date)));
        dispatch(setMinForecastDate(parseISODate(currentBank.last_date)));
        dispatch(setMaxForecastDate(parseISODate(add(new Date(currentBank.last_date),{months: 3}))));
        dispatch(setInitialForecastTimeWindow(parseISODate(currentBank.last_date)));
        dispatch(setFinalForecastTimeWindow(parseISODate(add(new Date(currentBank.last_date),{months: 3}))));
        dispatch(setBank(currentBank));
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
              <Image alt="upload" src={UploadIcon} width={30} height={30}/> Upload .csv file
            </button>
          </div>
        </div>
      </div>
      {uploadModal && <UploadBankModal close={() => setUploadModal(false)}/>}
    </header>
  );
}
