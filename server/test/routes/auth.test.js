'use strict'

const { test } = require('tap')
const { build } = require('../helper')

// Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

test('auth root', async (t) => {
  const app = build(t)

  const res = await app.inject({
    method: 'GET',
    url : "/auth",
  })

  t.equal(res.payload, 'this is auth')
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
