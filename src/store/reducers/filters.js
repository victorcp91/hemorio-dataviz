const initialState = {
  initialTimeWindow: '',
  finalTimeWindow: '',
  minInitialTimeWindow: '',
  maxFinalTimeWindow: ''
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
      return {...state,initialTimeWindow: action.date }
    case '@filters/SETFINALFORECASTTIMEWINDOW':
      return {...state,finalTimeWindow: action.date }
    default: 
      return state;
  }
}

export default reducer;