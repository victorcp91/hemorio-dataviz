export function setForecastDataFile(dataFile){
  return {
    type: '@forecastDataFile/SETFILE',
    dataFile
  }
}