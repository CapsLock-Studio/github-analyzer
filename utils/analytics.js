const config = require('../config')
const google = require('googleapis')
const key = require(config.ga.key)
const jwtClient = new google.auth.JWT(
  key.client_email,
  null,
  key.private_key,
  ['https://www.googleapis.com/auth/analytics'],
  null
)

module.exports = (metrics, filters, cb) => {
  jwtClient.authorize(function (err, tokens) {
    if (err) {
      return;
    }

    const analytics = google.analytics({version: 'v3', auth: jwtClient})

    return analytics.data.ga.get({
      'ids': `ga:${config.ga.ids}`,
      'start-date': '30daysAgo',
      'end-date': 'yesterday',
      'metrics': metrics,
      'filters': filters
    }, cb)
  })
};
