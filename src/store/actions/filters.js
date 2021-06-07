export function setInitialTimeWindow(date){
  return {
    type: '@filters/SETINITIALTIMEWINDOW',
    date
  }
}

export function setFinalTimeWindow(date){
  return {
    type: '@filters/SETFINALTIMEWINDOW',
    date
  }
}