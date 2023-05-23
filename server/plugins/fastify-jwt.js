const fp = require("fastify-plugin")

module.exports = fp(async function(fastify, opts) {
  fastify.register(require("fastify-jwt"), {
    secret: process.env.JWT_TOKEN_SECRET
  })

  fastify.decorate("authenticate", async function(request, reply) {
    try {
      console.log('will verify jwt')
      await request.jwtVerify()
    } catch (err) {
      console.log('error in jwt')
      reply.send(err)
    }
  })
})