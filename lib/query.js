var fs = require('fs')
var exec = require('child_process').exec
var data = null
var color = require('cli-color')
var Table = require('cli-table')

var map = {
  'n': 'red', // NOT supported
  'p': 'redBright', // NOT supported, but has polyfill available
  'u': 'white', // unknown
  'a x': 'yellowBright', // partially supported, and vendor prefixed
  'a': 'yellow', // partially supported
  'y x': 'greenBright', // supported, and vendor prefixed
  'y': 'green' // supported
}

function query(keyword) {
  if (!data) {
    try {
      data = JSON.parse(fs.readFileSync(__dirname + '/../data/data.json', 'utf-8'))
    }
    catch (e) {
      throw 'read data error!'
    }
  }

  if (data.data[keyword]) {
    var resultsData = {
      hds: [],
      cols: []
    }

    Object.keys(data.data[keyword].stats).forEach(function(browser) {
      var maxVersion = '0.0'
      var results = []

      resultsData.hds.push(browser)
      Object.keys(data.data[keyword].stats[browser]).forEach(function(version) {
        var originalVersion = version

        if (version.indexOf('-') != -1) {
          version = version.split('-').pop()
        }
        if (parseFloat(version) > parseFloat(maxVersion)) {
          maxVersion = originalVersion
        }

        var result = map[data.data[keyword].stats[browser][maxVersion]]

        if (result) {
          results.push(color[result](maxVersion))
        }
      })

      resultsData.cols.push(results)
    })

    var num = 0
    var table = new Table({
      head: resultsData.hds
    })

    for (var i = 0, l = resultsData.cols.length; i < l; i++) {
      if (resultsData.cols[i].length > num) {
        num = resultsData.cols[i].length
      }
    }

    for (n = 0; n < num; n++) {
      var arr = []

      for (var j = 0, m = resultsData.cols.length; j < m; j++) {
        var result = resultsData.cols[j]

        if (result && result[n]) {
          arr.push(result[n])
        }
        else {
          arr.push('')
        }
      }

      table.push(arr)
    }

    return table.toString()
  }

  return 'Not css3'
}

module.exports = query