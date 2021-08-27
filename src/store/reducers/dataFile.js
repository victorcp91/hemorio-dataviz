const initialState = {
  file: [],
  bank: null,
  model1File: [],
  model2File: []
};

const reducer = (state = initialState, action) => {
  switch (action.type){
    case '@dataFile/SETFILE':
      return {...state, file: action.file};
    case '@dataFile/SETBANK':
      return {...state, bank: action.bank};
    case '@dataFile/SETFORECASTMODEL1FILE':
      return {...state, model1File: action.model1File };
    case '@dataFile/SETFORECASTMODEL1FILE':
      return {...state, model2File: action.model2File }
    default: 
      return state;
  }
}

export default reducer;