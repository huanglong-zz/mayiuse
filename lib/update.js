var fs = require('fs')
var exec = require('child_process').exec
var data = null

function updateData(callback) {
  var cmd = 'curl https://raw.github.com/Fyrd/caniuse/master/data.json > ' + __dirname + '/../data/data.json'

  exec(cmd, function(err, stderr, stdout) {
    if (err) {
      callback(err)

      return
    }
    try {
      data = JSON.parse(fs.readFileSync(__dirname + '/../data/data.json', 'utf-8'))
      callback(null)
    }
    catch (e) {
      data = null
      callback(e)
    }
  })
}

module.exports = updateData