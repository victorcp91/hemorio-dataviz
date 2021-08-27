export function setDataFile(file){
  return {
    type: '@dataFile/SETFILE',
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