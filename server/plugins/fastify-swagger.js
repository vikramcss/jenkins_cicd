'use strict'
const fp = require('fastify-plugin')
const config = require('../config/swagger_options')
/**
 * This plugins adds some utilities to handle http errors
 *
 * @see https://www.npmjs.com/package/fastify-swagger
 */
module.exports = fp(async function (fastify, opts) {
  fastify.register(require('fastify-swagger'), config.options)
})
