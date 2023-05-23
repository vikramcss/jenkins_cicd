'use strict'
let schemas = require('./schema');

module.exports = async function (fastify, opts) {
  let exciserecorsSchema = fastify.mongo.db.collection('exciserecords')
  let userSchema = fastify.mongo.db.collection('users')

  fastify.get('/findCompany', { schema: schemas.findCompany }, async function (request, reply) {
    let { licenseNo, licenseType, district } = request.query;

    let exciserecord = await exciserecorsSchema.findOne({ licenseNo, district, licenseType })
    if (!exciserecord) return reply.code(404).send({ error: 'Not Found' })
    let user = await userSchema.findOne({ login: exciserecord.login });
    console.log('found exciserecord is:', JSON.stringify(exciserecord));
    console.log('found login is:', JSON.stringify(exciserecord.login));
    console.log('found user:', JSON.stringify(user));
    if (user) {
      console.log('since user is found, we will return error')
      return { error: -1, errorMsg: 'user for this company is already registered', exciserecord }
    }
    return { error: 0, errorMsg: '', exciserecord }
  })

  fastify.get('/validateGstLastFour', { schema: schemas.validateGstLastFour }, async function (request, reply) {
    console.log('/validateGstLastFour')
    let { licenseNo, licenseType, district, gstLastFour } = request.query;

    let exciserecord = await exciserecorsSchema.findOne({ licenseNo, district, licenseType })
    if (!exciserecord) return reply.code(404).send({ error: 'Not Found' })

    if (exciserecord.gstno.slice(-4) !== gstLastFour) {
      console.log('will return failure')
      return { matched: false, gstLastFour: '' };
    }

    console.log('will return success')
    return { matched: true, gstLastFour }
  })

}








