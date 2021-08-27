const initialState = {
  initialTimeWindow: '',
  finalTimeWindow: '',
  minInitialTimeWindow: '',
  maxFinalTimeWindow: '',
  forecastModel: 1,
  forecastInitialTimeWindow: '',
  forecastFinalTimeWindow: '',
  minForecastDate: '',
  maxForecastDate: ''
}

const reducer = (state = initialState, action) => {
  switch (action.type){
    case '@filters/SETINITIALTIMEWINDOW':
      return {...state,initialTimeWindow: action.date }
    case '@filters/SETFINALTIMEWINDOW':
      return {...state,finalTimeWindow: action.date }
    case '@filters/SETMININITIALTIMEWINDOW':
      return {...state,minInitialTimeWindow: action.date }
    case '@filters/SETMAXFINALTIMEWINDOW':
        return {...state,maxFinalTimeWindow: action.date }
    case '@filters/SETINITIALFORECASTTIMEWINDOW':
      return {...state,forecastInitialTimeWindow: action.date }
    case '@filters/SETFINALFORECASTTIMEWINDOW':
      return {...state,forecastFinalTimeWindow: action.date }
    case '@filters/SETFORECASTMODEL':
      return {...state, forecastModel: action.forecastModel }
    case '@filters/SETMAXFORECASTDATE':
      return {...state, maxForecastDate: action.date }
    case '@filters/SETMINFORECASTDATE':
      return {...state, minForecastDate: action.date }
    default: 
      return state;
  }
}

export default reducer;