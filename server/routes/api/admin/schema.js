module.exports = schemas = {
  getPersonalInfo: {
    response: {
      200: {
        type: 'object',
        properties: {
          error: { type: 'number' },
          errorMsg: { type: 'string' },
          login: { type: 'string' },
          personalInfo: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              fathersName: { type: 'string' },
              dob: { type: 'string' },
              nationality: { type: 'string' },
              religion: { type: 'string' },
              category: { type: 'string' },
              gender: { type: 'string' },
              email: { type: 'string' },
              mobile: { type: 'string' },
            }
          },
        },
      }
    }
  },
  getApplication: {
    response: {
      200: {
        type: 'object',
        properties: {
          error: { type: 'number' },
          errorMsg: { type: 'string' },
          login: { type: 'string' },
          application: {
            type: 'object',
            properties: {
              personalInfo: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  fathersName: { type: 'string' },
                  dob: { type: 'string' },
                  nationality: { type: 'string' },
                  religion: { type: 'string' },
                  category: { type: 'string' },
                  gender: { type: 'string' },
                  email: { type: 'string' },
                  mobile: { type: 'string' },
                  pwd: { type: 'string' },
                  PWDType: { type: 'string' },
                  exceptionalCandidate: { type: 'string' },
                  exceptionalCandidateJustification: { type: 'string' },
                }
              },
              correspondenceAddress: {
                type: 'object',
                properties: {
                  withinIndia: {
                    type: 'object',
                    properties: {
                      addressLine1: { type: 'string' },
                      addressLine2: { type: 'string' },
                      state: { type: 'string' },
                      district: { type: 'string' },
                      pin: { type: 'string' },
                    }
                  },
                  outOfIndia: {
                    type: 'object',
                    properties: {
                      addressLine: { type: 'string' },
                      country: { type: 'string' },
                      state: { type: 'string' },
                      zip: { type: 'string' },
                    }
                  }
                },
              },
              permanentAddress: {
                type: 'object',
                properties: {
                  addressLine1: { type: 'string' },
                  addressLine2: { type: 'string' },
                  state: { type: 'string' },
                  district: { type: 'string' },
                  pin: { type: 'string' },
                },
              }

            }
          },
        },
      }
    }
  },
  saveApplication: {
    body: {
      type: 'object',
      properties: {
        personalInfo: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            fathersName: { type: 'string' },
            dob: { type: 'string' },
            nationality: { type: 'string' },
            religion: { type: 'string' },
            category: { type: 'string' },
            gender: { type: 'string' },
            email: { type: 'string' },
            mobile: { type: 'string' },
          }
        },
        correspondenceAddress: {
          type: 'object',
          properties: {
            addressLine1: { type: 'string' },
            addressLine2: { type: 'string' },
            state: { type: 'string' },
            district: { type: 'string' },
            pin: { type: 'string' },
          },
        },
        permanentAddress: {
          type: 'object',
          properties: {
            addressLine1: { type: 'string' },
            addressLine2: { type: 'string' },
            state: { type: 'string' },
            district: { type: 'string' },
            pin: { type: 'string' },
          },
        }
      },
    }
  }
};