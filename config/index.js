const fs     = require('fs-extra')
const path   = __dirname + '/config.json'
const sample = __dirname + '/../config-sample.json'

if (!fs.existsSync(path)) {
  fs.copySync(sample, path)
}

const config = require(path)

module.exports = config
