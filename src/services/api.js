import axios from 'axios';

class Api {
  constructor(){
    this.api = axios.create({
      baseURL: 'https://hemorio-api.herokuapp.com'
    });
  }

  getCountries = () => {
    return axios
      .get('https://restcountries.eu/rest/v2/all').then(res => {
        return res.data;
      }).catch(err => {
        console.error(err);
      });
  }

  getBloodBanks(){
    return this.api.get('/blood_bank').then(res => {
      return res.data;
    }).catch(err => {
      console.error(err);
      return err;
    });
  }

  sendBloodBankFile = (file) => {
    const bloodBankFile = new FormData();
    bloodBankFile.append('doc', file);
    return axios({
      method: "post",
      url: "https://hemorio-api.herokuapp.com/upload",
      data: bloodBankFile,
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then(function (res) {
      return res.data;
    })
    .catch(function (err) {
      console.log(err);
    });
  }

  createBloodBank = (info) => {
    return this.api.post('/blood_bank', info).then(res => {
      return res.data;
    }).catch(err => {
      console.error(err);
      return err;
    });
  }

}

export default new Api();