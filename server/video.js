// Highly inspired by https://github.com/MaxGfeller/youtube-search

const querystring = require('querystring')
const axios = require('axios')

const allowedProperties = [
  'key'
]

module.exports = function search (ids, opts, cb) {
  if (typeof opts === 'function') {
    cb = opts
    opts = {}
  }

  if (!opts) opts = {}

  if (!cb) {
    return new Promise(function (resolve, reject) {
      search(ids, opts, function (err, results, pageInfo) {
        if (err) return reject(err)
        resolve({ results: results, pageInfo: pageInfo })
      })
    })
  }

  const params = {
    id: ids,
    part: opts.part || 'statistics'
  }

  Object.keys(opts).map(function (k) {
    if (allowedProperties.indexOf(k) > -1) params[k] = opts[k]
  })

  axios.get('https://www.googleapis.com/youtube/v3/videos?' + querystring.stringify(params))
    .then(function (response) {
      const result = response.data

      const findings = result.items.map(function (item) {
        return {
          id: item.id,
          statistics: item.statistics
        }
      })

      return cb(null, findings)
    })
    .catch(function (err) {
      return cb(err)
    })
}
