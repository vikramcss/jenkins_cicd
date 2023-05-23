'use strict'
const fp = require('fastify-plugin')
/**
 * This plugins adds some utilities to handle http errors
 *
 * @see https://github.com/fastify/fastify-mongodb
 */
module.exports = fp(async function (fastify, opts) {
    fastify.register(require('@fastify/mongodb'), {
        // force to close the mongodb connection when app stopped
        // the default value is false
        forceClose: true,
//        url: 'mongodb://mongo/mydb'
        url:process.env.DB_URI 
    })
})





// module.exports = fp(async function (fastify, opts) {
// const mongodb = require('mongodb')
// let url = process.env.DB_URI 
// mongodb.MongoClient.connect(url)
//   .then((client) => {
//     const fastify = require('fastify')()

//     fastify.register(require('@fastify/mongodb'), { client: client })
//       .register(function (fastify, opts, next) {
//         // const db = fastify.mongo.client.db('mydb')
//         const db = fastify.mongo.client.db('cb-01-2022')
//         // ...
//         // ...
//         // ...
//         next()
//       })
//   })
//   .catch((err) => {
//     throw err
//   })
// })