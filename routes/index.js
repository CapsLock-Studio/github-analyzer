const express = require('express')
const app     = express()
const path    = require('path')
const fs      = require('fs-extra')
const router  = express.Router()

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js') && (file.slice(-3) === '.js')
  })
  .forEach(function(file) {
    const jsFilePath = path.join(__dirname, file)
    const base = path.basename(jsFilePath).slice(0, -3)
    app.use(`/${base}`, require(jsFilePath))
  })

router.get('/', async (req, res, next) => {
  res.status(404).send('API Test')
})

app.use('/', router)

module.exports = app
