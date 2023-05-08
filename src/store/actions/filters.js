export function setInitialHistoryTimeWindow(date){
  return {
    type: '@filters/SETINITIALTIMEWINDOW',
    date
  }
}

export function setFinalHistoryTimeWindow(date){
  return {
    type: '@filters/SETFINALTIMEWINDOW',
    date
  }
}

export function setMinInitialHistoryTimeWindow(date){
  return {
    type: '@filters/SETMININITIALTIMEWINDOW',
    date
  }
}

export function setMaxFinalHistoryTimeWindow(date){
  return {
    type: '@filters/SETMAXFINALTIMEWINDOW',
    date
  }
}

export function setInitialForecastTimeWindow(date){
  return {
    type: '@filters/SETINITIALFORECASTTIMEWINDOW',
    date
  }
}

export function setFinalForecastTimeWindow(date){
  return {
    type: '@filters/SETFINALFORECASTTIMEWINDOW',
    date
  }
}

export function setForecastModel(forecastModel){
  return {
    type: '@filters/SETFORECASTMODEL',
    forecastModel
  }
}

export function setMaxForecastDate(date){
  return {
    type: '@filters/SETMAXFORECASTDATE',
    date
  }
}

export function setMinForecastDate(date){
  return {
    type: '@filters/SETMINFORECASTDATE',
    date
  }
}