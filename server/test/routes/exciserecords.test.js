'use strict'

const { test } = require('tap')
const { validateGstLastFour } = require('../../routes/exciserecords/schema')
const { build } = require('../helper')

// Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

test('auth findComapy with query params', async (t) => {
  const app = build(t)

  let params = {
    district: 'Pune',
    licenseNo : '123',
    licenseType : 'M-I'
  }

  const res = await app.inject({
    method: 'GET',
    url : "/exciserecords/findCompany",
    query: params
  })

  const result = JSON.parse(res.payload)

  t.equal(result.licenseNo, params.licenseNo)
  t.equal(result.licenseType, params.licenseType)
  t.equal(result.district, params.district)
})

test('exciserecords validate last four digits/characters of GST no', async (t) => {
  const app = build(t)

  let params = {
    district: 'Pune',
    licenseNo : '123',
    licenseType : 'M-I',
    gstLastFour : 'A1Z5'
  }

  const res = await app.inject({
    method: 'GET',
    url : "/exciserecords/validateGstLastFour",
    query: params
  })

  console.log('response:',res) 
  const result = JSON.parse(res.payload)

  t.equal(result.matched, true)
})

// inject callback style:
//
// test('example is loaded', (t) => {
//   t.plan(2)
//   const app = build(t)
//
//   app.inject({
//     url: '/example'
//   }, (err, res) => {
//     t.error(err)
//     t.equal(res.payload, 'this is an example')
//   })
// })
