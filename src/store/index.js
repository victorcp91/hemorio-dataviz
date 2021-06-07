import { createStore, combineReducers } from "redux";

import filters from './reducers/filters';

class Store{
  constructor(){
    this.rootReducer = combineReducers({
      filters,
    });
    this.store = createStore(this.rootReducer);
  }

  getStore(){
    return this.store;
  }
}

export default new Store();