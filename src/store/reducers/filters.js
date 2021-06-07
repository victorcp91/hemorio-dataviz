const initialState = {
  initialTimeWindow: '',
  finalTimeWindow: ''
}

const reducer = (state = initialState, action) => {
  switch (action.type){
    case '@filters/SETINITIALTIMEWINDOW':
      return {...state,initialTimeWindow: action.date }
    case '@filters/SETFINALTIMEWINDOW':
      return {...state,finalTimeWindow: action.date }
    default: 
      return state;
  }
}

export default reducer;