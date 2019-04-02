const Koa = require('koa')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const search = require('youtube-search')
const Router = require('koa2-router')
const argv = require('yargs').argv
const stringify = require('safe-json-stringify')

const config = require('../nuxt.config.js')
const video = require('./video')

const router = new Router()
const app = new Koa()

config.dev = !(app.env === 'production')

const key = argv.key

async function start () {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

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
        }
        const ids = results.map((item) => {
          return item.id
        })

        video(ids.join(','), opts, (err, stats) => {
          if (err) {
            reject(err)
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

  router.get('/api/search', async (ctx, next) => {
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
  })

  app.use(router)

  app.use(async (ctx, next) => {
    if (ctx.path.startsWith('/api') === false) {
      ctx.status = 200
      ctx.respond = false // Bypass Koa's built-in response handling
      ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
      nuxt.render(ctx.req, ctx.res)
    }
    await next()
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
