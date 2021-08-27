const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type){
    case '@bloodBanks/SETBLOODBANKS':
      return action.bloodBanks;
    default: 
      return state;
  }
}

export default reducer;