const express = require('express')
const router  = express.Router()
const models  = require('../models')
const config  = require('../config')
const utils   = require('../utils')

router.get('/:id', async (req, res, next) => {
  const id          = req.params.id
  const referer     = req.header('Referer')
  const publicUser  = await models.User.findOne({where: {publicKey: id}})
  const privateUser = await models.User.findOne({where: {privateKey: id}})
  if (referer && publicUser) {
    req.visitor
      .set('key', id)
      .pageview(referer)
      .send()

    const imgdata = [
      0x47,0x49, 0x46,0x38, 0x39,0x61, 0x01,0x00, 0x01,0x00, 0x80,0x00, 0x00,0xFF, 0xFF,0xFF,
      0x00,0x00, 0x00,0x21, 0xf9,0x04, 0x04,0x00, 0x00,0x00, 0x00,0x2c, 0x00,0x00, 0x00,0x00,
      0x01,0x00, 0x01,0x00, 0x00,0x02, 0x02,0x44, 0x01,0x00, 0x3b
    ]

    res.set('Content-Length', imgdata.length)
    res.set('Content-Type', 'image/gif')
    res.send(new Buffer(imgdata))
  } else if (privateUser) {
    const metrics = req.query.metrics || 'ga:visits,ga:bounces'
    const filters = `ga:key==${id}`

    utils.analytics(metrics, filters, (err, data) => {
      res.json(data)
    })
  } else {
    res.status(400).json({status: 'failed'})
  }
})

module.exports = router
