const express = require('express')
const router  = express.Router()
const models  = require('../models')
const utils   = require('../utils')
const md5     = require('md5')

router.post('/', async (req, res, next) => {
  const email = req.body.email
  const user = await models.User.findOne({email: email})
  if (user) {
    res.status(400).json({status: 'failed'})
  } else {
    const timestamp = new Date / 1
    const _private = md5(email)
    const _public = md5(timestamp)
    await models.User.create({
      email: email,
      privateKey: _private,
      publicKey: _public
    })

    utils.mailer(
      email,
      {
        private: _private,
        public: _public
      },
      'Thank you for you registering CapsLock, Studio service!',
      'notification'
    )

    res.json({status: 'ok'})
  }
})

module.exports = router
