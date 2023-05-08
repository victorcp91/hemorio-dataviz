const initialState = {
  file: [],
  filteredFile: [],
  bank: null,
  model1File: [],
  model2File: [],
  filteredModel1File: [],
  filteredModel2File: []
};

const reducer = (state = initialState, action) => {
  switch (action.type){
    case '@dataFile/SETFILE':
      return {...state, file: action.file};
    case '@dataFile/SETFILTEREDFILE':
      return {...state, filteredFile: action.file};
    case '@dataFile/SETBANK':
      return {...state, bank: action.bank};
    case '@dataFile/SETFORECASTMODEL1FILE':
      return {...state, model1File: action.model1File };
    case '@dataFile/SETFORECASTMODEL2FILE':
      return {...state, model2File: action.model2File };
    case '@dataFile/SETFILTEREDFORECASTMODEL1FILE':
      return {...state, filteredModel1File: action.model1File };
    case '@dataFile/SETFILTEREDFORECASTMODEL2FILE':
      return {...state, filteredModel2File: action.model2File };
    default: 
      return state;
  }
}

export default reducer;