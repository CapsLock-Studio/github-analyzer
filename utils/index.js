const path    = require('path')
const fs      = require('fs-extra')
const utils   = {}

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js') && (file.slice(-3) === '.js')
  })
  .forEach(function(file) {
    const jsFilePath = path.join(__dirname, file)
    const base = path.basename(jsFilePath).slice(0, -3)
    utils[base] = require(jsFilePath)
  })

module.exports = utils
