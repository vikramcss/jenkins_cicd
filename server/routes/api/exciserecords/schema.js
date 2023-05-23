module.exports = schemas = {
  findCompany: {
    querystring: {
      licenseNo: { type: 'string' },
      licenseType: { type: 'string' },
      district: { type: 'string' }
    },
    response: {
      200: {
        type: 'object',
        properties: {
          error: { type: 'string' },
          errorMsg: { type: 'string' },
          exciserecord: {
            type: 'object',
            properties: {
              unitname: { type: 'string' },
              district: { type: 'string' },
              licenseNo: { type: 'string' },
              licenseType: { type: 'string' },
              address: {
                type: 'object',
                properties: {
                  lane: { type: 'string' },
                  area: { type: 'string' },
                  city: { type: 'string' },
                  tal: { type: 'string' },
                  district: { type: 'string' },
                  pin: { type: 'string' },
                }
              }
            }
          },
        }
      }
    }
  },
  validateGstLastFour: {
    querystring: {
      licenseNo: { type: 'string' },
      licenseType: { type: 'string' },
      district: { type: 'string' },
      gstLastFour: { type: 'string' }
    },
    response: {
      200: {
        type: 'object',
        properties: {
          gstLastFour: { type: 'string' },
          matched: { type: 'boolean' },
        }
      }
    }
  }
};