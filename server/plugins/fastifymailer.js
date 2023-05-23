'use strict'
const fp = require('fastify-plugin')
/**
 * This plugins adds some utilities to handle http errors
 *
 * @see https://www.npmjs.com/package/fastify-mailer
 */
module.exports = fp(async function (fastify, opts) {
  fastify.register(require('fastify-mailer'), {
    defaults: { from: 'donotreply<cmetpune2021@gmail.com>' },
    transport: {
      service: 'gmail',
      auth: {
        user: 'cmetpune2021@gmail.com',
        pass: 'cmet2021'
      }
    }
  })
})
