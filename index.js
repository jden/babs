#! /usr/local/bin/node

const request = require('pr-request')

const stationsWeCareAbout = [
  57, // 5th at Howard
  69, // 330 Townsend
  70  // Townsend at 4th
]

function babs () {

  request({
    url: 'http://bayareabikeshare.com/stations/json',
    json: true
  })
  .then(function (res) {
    //console.log('As of ' + res.body.executionTime)

    const stations = res.body.stationBeanList.filter(function (station) {
      return stationsWeCareAbout.indexOf(station.id) !== -1
    })

    const inService = 1
    stations.forEach(function (station) {
      const serviceWarning = station.statusKey === inService ? '' : ' ' + station.statusValue
      console.log(station.stationName + serviceWarning)
      console.log(station.availableBikes + '/' + station.availableDocks + ' \t' + repeat(station.availableBikes, '●') + repeat(station.availableDocks, '○'))
    })

  })


}

function repeat(times, str) {
  var o = ''
  for (var i = 0; i < times; i++) {
    o+=str
  }
  return o
}


module.exports = babs

babs()