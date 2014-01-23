var query = require('..').Query
var color = require('cli-color')
var features = ['css-grid', 'transforms2d', 'svg', 'border-radius']

features.forEach(function(feature) {
  var results = query(feature)

  console.log('---> Querying ' + feature)
  console.log(color.redBright('redBright     ') + 'NOT supported')
  console.log(color.red('red           ') + 'NOT supported, but has polyfill available')
  console.log(color.white('white         ') + 'unknown')
  console.log(color.yellowBright('yellowBright  ') + 'partially supported, and vendor prefixed')
  console.log(color.yellow('yellow        ') + 'partially supported')
  console.log(color.greenBright('greenBright   ') + 'supported, and vendor prefixed')
  console.log(color.green('green         ') + 'supported')
  console.log(results)
})