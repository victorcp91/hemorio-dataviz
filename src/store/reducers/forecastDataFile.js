const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type){
    case '@forecastDataFile/SETFILE':
      return action.dataFile;
    default: 
      return state;
  }
}

export default reducer;