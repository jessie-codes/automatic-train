const search = require('youtube-search')
const stringify = require('safe-json-stringify')
const argv = require('yargs').argv

const video = require('./video')

const { key } = argv

const doSearch = (keyword, sort, pageToken) => {
  return new Promise((resolve, reject) => {
    const opts = {
      key: key,
      order: sort,
      pageToken: pageToken,
      maxResults: 5
    }

    search(keyword, opts, (err, results, pageInfo) => {
      if (err) {
        reject(err)
        return
      }
      const ids = results.map((item) => {
        return item.id
      })

      video(ids.join(','), opts, (err, stats) => {
        if (err) {
          reject(err)
          return
        }

        for (const s in stats) {
          for (const r in results) {
            if (stats[s].id === results[r].id) {
              results[r].statistics = stats[s].statistics
            }
          }
        }
        resolve({ pageInfo: pageInfo, results: results })
      })
    })
  })
}

const searchRoute = async (ctx, next) => {
  try {
    const result = await doSearch(ctx.query.keyword, ctx.query.sort, ctx.query.pageToken)
    ctx.type = 'json'
    ctx.status = 200
    ctx.body = stringify(result)
  } catch (err) {
    ctx.body = stringify(err)
    ctx.status = 500
  }
  await next()
}

module.exports = {
  searchRoute: searchRoute
}
