import { createStore, combineReducers } from "redux";

import filters from './reducers/filters';
import dataFile from './reducers/dataFile';
import forecastDataFile from './reducers/forecastDataFile';
import bloodBanks from './reducers/bloodBanks';

class Store{
  constructor(){
    this.rootReducer = combineReducers({
      filters,
      dataFile,
      forecastDataFile,
      bloodBanks
    });
    this.store = createStore(this.rootReducer);
  }

  getStore(){
    return this.store;
  }
}

export default new Store();