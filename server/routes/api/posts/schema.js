module.exports = schemas = {
  postsMasterSchema: {
    response: {
      200: {
        type: "object",
        properties: {
          error: { type: "number" },
          errorMsg: { type: "string" },
          availablePosts: {
            type: "array",
            items: {
              type: "object",
              properties: {
                postName: { type: "string" },
                postId: { type: "string" },
                postClassification: { type: "string" },
                title: { type: "string" },
                sub_title: { type: "string" },
                qualification: { type: "string" },
              },
            },
          },
          application: {
            type: "object",
            properties: {
              personalInfo: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  fathersName: { type: "string" },
                  dob: { type: "string" },
                  nationality: { type: "string" },
                  religion: { type: "string" },
                  category: { type: "string" },
                  gender: { type: "string" },
                  email: { type: "string" },
                  mobile: { type: "string" },
                  pwd: { type: "string" },
                  PWDType: { type: "string" },
                  exceptionalCandidate: { type: "string" },
                  exceptionalCandidateJustification: { type: "string" },
                },
              },
              correspondenceAddress: {
                type: "object",
                properties: {
                  withinIndia: {
                    type: "object",
                    properties: {
                      addressLine1: { type: "string" },
                      addressLine2: { type: "string" },
                      state: { type: "string" },
                      district: { type: "string" },
                      pin: { type: "string" },
                    },
                  },
                  outOfIndia: {
                    type: "object",
                    properties: {
                      addressLine: { type: "string" },
                      country: { type: "string" },
                      state: { type: "string" },
                      zip: { type: "string" },
                    },
                  },
                },
              },
              permanentAddress: {
                type: "object",
                properties: {
                  addressLine1: { type: "string" },
                  addressLine2: { type: "string" },
                  state: { type: "string" },
                  district: { type: "string" },
                  pin: { type: "string" },
                },
              },
            },
          },
        },
      },
    },
  },
};
