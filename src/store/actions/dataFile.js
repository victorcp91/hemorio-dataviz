export function setDataFile(file){
  return {
    type: '@dataFile/SETFILE',
    file
  }
}

export function setFilteredDataFile(file){
  return {
    type: '@dataFile/SETFILTEREDFILE',
    file
  }
}

export function setBank(bank){
  return {
    type: '@dataFile/SETBANK',
    bank
  }
}


export function setForecastModel1File(model1File){
  return {
    type: '@dataFile/SETFORECASTMODEL1FILE',
    model1File
  }
}

export function setForecastModel2File(model2File){
  return {
    type: '@dataFile/SETFORECASTMODEL2FILE',
    model2File
  }
}

export function setFilteredForecastModel1File(model1File){
  return {
    type: '@dataFile/SETFILTEREDFORECASTMODEL1FILE',
    model1File
  }
}

export function setFilteredForecastModel2File(model2File){
  return {
    type: '@dataFile/SETFILTEREDFORECASTMODEL2FILE',
    model2File
  }
}