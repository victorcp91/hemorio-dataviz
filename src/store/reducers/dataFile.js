const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type){
    case '@dataFile/SETFILE':
      return action.dataFile;
    default: 
      return state;
  }
}

export default reducer;