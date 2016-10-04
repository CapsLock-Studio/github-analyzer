const express = require('express')
const router = express.Router()
const models = require('../models')

/* GET home page. */
router.get('/', async (req, res, next) => {
  await models.User.findAll()
  
  res.render('index', { title: 'Express' })
  // res.sendFile('../public/images/dummy_image.png')
});

module.exports = router
