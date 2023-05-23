'use strict'

const path = require('path')
const AutoLoad = require('fastify-autoload')
const fastifyStatic = require('fastify-static')

module.exports = async function (fastify, opts) {
  // Place here your custom code!

  // Do not touch the following lines
  fastify.register(fastifyStatic, {
    root: path.join(__dirname, 'public'),
    prefix: '/public/', // optional: default '/'
  })
  // second plugin
fastify.register(fastifyStatic, {
  root: path.join(__dirname, 'uploads_new'),
  prefix: '/uploads/',
  index: false,
  list: true,
  decorateReply: false // the reply decorator has been added by the first plugin registration
})
  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })


}
