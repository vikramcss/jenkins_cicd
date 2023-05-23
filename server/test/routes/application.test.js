'use strict'

const { test } = require('tap')
const { validateGstLastFour } = require('../../routes/exciserecords/schema')
const { build } = require('../helper')

// Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6InNtYmFyZ2VAZ21haWwuY29tIiwiaWF0IjoxNjQwNDI4MTY0fQ.A_6bj0BCTCahAgk-2hsW7KiJqELX3D38gLdZquSTr4I';
test('save application', async (t) => {
  const app = build(t)
  let personalInfo = {
    name: 'Sangram ',
    fathersName: 'Bargfe',
    dob: '2002-12-09T18:30:00.000Z',
    nationality: 'Indian',
    religion: 'Hindu',
    category: 'ST',
    email: 'smbarge@gmail.com',
    mobile: '',
    gender: 'Male'
  };
  let correspondenceAddress = {
    addressLine1: 'baner',
    addressLine2: 'baner',
    state: 'Madhya Pradesh',
    district: 'dkd',
    pin: '99999'
  };
  let permanentAddress = {
    addressLine1: 'baner',
    addressLine2: 'baner',
    state: 'Madhya Pradesh',
    district: 'dkd',
    pin: '99999'
  }

  let params = {
    personalInfo,
    correspondenceAddress,
    permanentAddress,
  }

  const res = await app.inject({
    method: 'POST',
    url: "/applicaiton/saveApplication",
    body: params,
    headers: {
      'Authorization': "Bearer " + token,
    },
  })
  console.log({
    method: 'POST',
    url: "/applicaiton/saveApplication",
    body: params,
  })
  const result = JSON.parse(res.payload)

  t.equal(result.licenseNo, params.licenseNo)
  t.equal(result.licenseType, params.licenseType)
  t.equal(result.district, params.district)
})

