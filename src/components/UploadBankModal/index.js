import React, { useState, useEffect, useMemo } from 'react';
import style from "./index.module.css";
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';
import { format } from 'date-fns';
import Select from 'react-select'

import api from '../../services/api';

export default function UploadBankModal({close}) {

  const [name, setName] = useState('');
  const [datesRange, setDatesRange] = useState({
    startDate: null,
    endDate: null,
    key: 'selection',
  });
  const [donationCampaignDatesRange, setDonationCampaignDatesRange] = useState({
    startDate: null,
    endDate: null,
    key: 'selection',
  });

  const [donationCampaignRanges, setDonationCampaignRanges] = useState([]);

  const [showDatesIntervalPicker, setShowDatesIntervalPicker] = useState(false);
  const [showDonationCampaignDatesIntervalPicker, setShowDonationCampaignDatesIntervalPicker] = useState(false);

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(null);

  const [location, setLocation] = useState('');

  const [csvFile, setCsvFile] = useState(null);

  const [validationRequest, setValidationRequest] = useState(false);
  const [loadData, setLoadData] = useState(false);

  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    api.getCountries().then(res => {
      const formattedCountries = res.map(country => ({
        label: country.name,
        value: country.alpha3Code,
      }));
      setCountries(formattedCountries);
    })
   
  }, [])

  const handleSelect = (ranges) => {
    setDatesRange(ranges.selection);
  }

  const handleSelectDonationCampaign = (ranges) => {
    setDonationCampaignDatesRange(ranges.selection);
  }

  const saveDonationCampaignDate = () => {
    const updatedDonationCampaignRanges = [...donationCampaignRanges];
    updatedDonationCampaignRanges.push({...donationCampaignDatesRange});
    setDonationCampaignRanges(updatedDonationCampaignRanges);
    setDonationCampaignDatesRange({
      startDate: null,
      endDate: null,
      key: 'selection',
    });
    setShowDonationCampaignDatesIntervalPicker(false);
  }

  const removeDonationCampaignInterval = (index) => {
    let updatedDonationCampaignRanges = [...donationCampaignRanges];
    updatedDonationCampaignRanges.splice(index,1);
    setDonationCampaignRanges(updatedDonationCampaignRanges);
  };

  function validEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const disableSend = useMemo(() => {
    if(!name || !country || !location || !csvFile || !datesRange.startDate || !datesRange.endDate) {
      return true;
    }
    if(validationRequest && (!userName || !validEmail(userEmail))){
      return true;
    }
    if(!validationRequest && !loadData){
      return true;
    }

    return false;
  }, [userName, userEmail, validationRequest, loadData]);

  async function sendFile(){
    try{
      const doc = await api.sendBloodBankFile(csvFile);
      if(doc?.file_url){
        
        const createdBloodBank = await api.createBloodBank({
          file_url: doc.file_url,
          name,
          country: country.label,
          location,
          first_date: new Date(datesRange.startDate),
          last_date: new Date(datesRange.endDate),
          donation_campaign: donationCampaignRanges.map(dc => ({
            first_date: format(dc.startDate, 'yyyy-MM-dd'),
            last_date: format(dc.endDate , 'yyyy-MM-dd'),
          })),
          email_author: userEmail,
          name_author: userName,
          official_request: validationRequest,
          approved: false
        });
      }
      
    } catch(err) {
      console.log(err);
    }
  }
  
  return (
    <div className={style.modalBackground}>
      <div className={style.modalContainer}>
        <button className={style.close} onClick={close}>x</button>
        <h3>New Blood Bank</h3>
        <div>
          <label>Bank name:</label>
          <input type="text" value={name} onChange={e => setName(e.currentTarget.value)}/>
        </div>
       <div>
          <label>Dates interval:</label>
          <button className={style.datesButton} onClick={() => setShowDatesIntervalPicker(current => !current)}>
            <span>{!!datesRange.startDate ? format(datesRange.startDate, 'yy/MM/dd'): 'YY/MM/DD'}</span>{' - '}
            <span>{!!datesRange.endDate ? format(datesRange.endDate, 'yy/MM/dd'): 'YY/MM/DD'}</span>
          </button>
          {showDatesIntervalPicker && (
            <div className={style.datePicker}>
              <button className={style.close} onClick={() => setShowDatesIntervalPicker(false)}>X</button>
              <DateRangePicker
                ranges={[datesRange]}
                onChange={handleSelect}
              />
              <button className={style.save} onClick={() => setShowDatesIntervalPicker(false)}>Save</button>
            </div>
          )}
       </div>
       <div>
          <label>Donation Campaign intervals:</label>
          <button className={style.datesButton} onClick={() => setShowDonationCampaignDatesIntervalPicker(current => !current)}>
            <span>{!!donationCampaignDatesRange.startDate ? format(donationCampaignDatesRange.startDate, 'yy/MM/dd'): 'YY/MM/DD'}</span>{' - '}
            <span>{!!donationCampaignDatesRange.endDate ? format(donationCampaignDatesRange.endDate, 'yy/MM/dd'): 'YY/MM/DD'}</span>
          </button>
          {donationCampaignRanges.map((range, index) => (
            <div className={style.datesRange} key={index}>
              <span>{format(range.startDate, 'yy/MM/dd')}</span>{' - '}<span>{format(range.endDate, 'yy/MM/dd')}</span>
              <button onClick={() => removeDonationCampaignInterval(index)}>Remove</button>
            </div>
          ))}
          {showDonationCampaignDatesIntervalPicker && (
            <div className={style.datePicker}>
              <button className={style.close} onClick={() => setShowDonationCampaignDatesIntervalPicker(false)}>X</button>
              <DateRangePicker
                ranges={[donationCampaignDatesRange]}
                onChange={handleSelectDonationCampaign}
              />
              <button className={style.save} onClick={saveDonationCampaignDate}>Save</button>
            </div>
          )}
          {!!donationCampaignRanges.length &&
            <button onClick={() => setShowDonationCampaignDatesIntervalPicker(true)}>Add more</button>
          }
       </div>
       <div>
          <label>Country:</label>
          <Select 
            options={countries}
            value={country}
            onChange={setCountry}
            placeholder="Choose blood bank country"
          />
       </div>
       <div>
          <label>Location:</label>
          <input type="text" value={location} onChange={e => setLocation(e.currentTarget.value)}/>
       </div>
       <div>
          <label className={style.csvButton} htmlFor="csvfile"l>Upload CSV file</label>
          <input id="csvfile" type="file" onChange={e => setCsvFile(e.currentTarget.files[0])}/>
       </div>
       <div className={style.checkContainer}>
        <input type="checkbox" id="validation" value={validationRequest} onChange={() => setValidationRequest(!validationRequest)}/>
        <label for="validation">Send data to validation</label>
       </div>
       {validationRequest && (
         <>
          <div>
            <label>Your name:</label>
            <input type="text" value={userName} onChange={e => setUserName(e.currentTarget.value)}/>
          </div>
          <div>
            <label>Your email:</label>
            <input type="text" value={userEmail} onChange={e => setUserEmail(e.currentTarget.value)}/>
          </div>
        </>
        
       )}
       <div className={style.checkContainer}>
        <input type="checkbox" id="load" value={loadData} onChange={() => setLoadData(!loadData)}/>
        <label for="load">Load data in this section </label>
       </div>
       <div className={style.sendContainer}>
        <button onClick={sendFile} disabled={disableSend}  className={style.sendBloodBank}>Send</button>
       </div>
      </div>  
    </div>
    
  )
}
