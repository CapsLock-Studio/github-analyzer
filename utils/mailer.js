const nodemailer = require('nodemailer')
const config     = require('../config')
const pug        = require('pug')
const debug      = require('./debug')

var transporter = nodemailer.createTransport(config.smtp)

transporter.verify((error, success) => {
  if (error) {
    debug(error)
  } else {
    debug(success)
  }
})

module.exports = (email, params, subject, template) => {
  const html = pug.renderFile(__dirname + `/../views/${template}.pug`, params)
  const options = {to: email, html: html, subject: subject, from: `${config.email.name} <${config.smtp.auth.user}>`}
  transporter.sendMail(options, (err) => {
    debug(err)
  })
}
