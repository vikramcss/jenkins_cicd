module.exports = schemas = {
  registerLicensee: {
    body: {
      type: "object",
      required: ["name", "email", "mobileno", "licenseInfo"],
      properties: {
        name: { type: "string" },
        email: { type: "string" },
        mobileno: { type: "string" },
        licenseInfo: {
          type: "object",
          required: ["licenseType", "licenseNo", "district"],
          properties: {
            licenseType: { type: "string" },
            licenseNo: { type: "string" },
            district: { type: "string" },
          },
        },
      },
    },
    response: {
      200: {
        type: "object",
        properties: {
          name: { type: "string" },
          email: { type: "string" },
          mobileno: { type: "string" },
          verificationId: { type: "string" },
          validTill: { type: "string" },
          licenseInfo: {
            type: "object",
            properties: {
              licenseType: { type: "string" },
              licenseNo: { type: "string" },
              district: { type: "string" },
            },
          },
        },
      },
    },
  },
  validateVerificationCode: {
    description:
      "This api is called after verification code is sent to email id of licensee",
    body: {
      type: "object",
      required: ["licenseNo", "verificationId", "verificationCode"],
      properties: {
        licenseNo: { type: "string" },
        verificationId: { type: "string" },
        verificationCode: { type: "string" },
      },
    },
    response: {
      200: {
        type: "object",
        properties: {
          matched: { type: "boolean" },
          login: { type: "string" },
        },
      },
    },
  },
  createLogin: {
    description:
      "This api is called after user has created valid password, login Id will be created after successful return of this api",
    body: {
      type: "object",
      required: ["login", "password", "verificationId"],
      properties: {
        login: { type: "string" },
        password: { type: "string" },
        verificationId: { type: "string" },
      },
    },
    response: {
      200: {
        type: "object",
        properties: {
          success: { type: "boolean" },
          error: { type: "integer" },
          errorMsg: { type: "string" },
        },
      },
    },
  },
  login: {
    description:
      "This api is used by registered users with login, password and captch",
    body: {
      type: "object",
      required: ["login", "password", "captcha"],
      properties: {
        login: { type: "string" },
        password: { type: "string" },
        captcha: { type: "string" },
      },
    },
    response: {
      200: {
        type: "object",
        properties: {
          success: { type: "boolean" },
          error: { type: "integer" },
          errorMsg: { type: "string" },
          token: { type: "string" },
        },
      },
    },
  },
  forgotPassword: {
    description: "This api is used by registered user to reset password",
    body: {
      type: "object",
      required: ["login"],
      properties: {
        login: { type: "string" },
      },
    },
    response: {
      200: {
        type: "object",
        properties: {
          success: { type: "boolean" },
          error: { type: "integer" },
          errorMsg: { type: "string" },
        },
      },
    },
  },
  verifyResetPasswordId: {
    description:
      "This api is used by registered user to verify reset password Id",
    body: {
      type: "object",
      required: ["resetId"],
      properties: {
        resetId: { type: "string" },
      },
    },
    response: {
      200: {
        type: "object",
        properties: {
          valid: { type: "boolean" },
          error: { type: "integer" },
          errorMsg: { type: "string" },
          login: { type: "string" },
        },
      },
    },
  },
  getcaptcha: {
    description: "This api is used get captcha by the clients",
    response: {
      200: {
        type: "object",
        properties: {
          error: { type: "integer" },
          errorMsg: { type: "string" },
          captcha: { type: "string" },
          id: { type: "string" },
        },
      },
    },
  },
  login: {
    description: "This api is used get login",
    body: {
      type: "object",
      required: ["login", "password", "captcha"],
      properties: {
        login: { type: "string" },
        password: { type: "string" },
        captcha: {
          type: "object",
          required: ["id", "text"],
          properties: {
            id: { type: "string" },
            text: { type: "string" },
          },
        },
      },
    },
    response: {
      200: {
        type: "object",
        properties: {
          error: { type: "integer" },
          errorMsg: { type: "string" },
          success: { type: "boolean" },
          token: { type: "string" },
          user: {
            type: "object",
            properties: {
              login: { type: "string" },
              licenseType: { type: "string" },
              licenseNo: { type: "string" },
              email: { type: "string" },
            },
          },
        },
      },
    },
  },
  resetPassword: {
    description: "This api is used get resetPassword",
    body: {
      type: "object",
      required: ["login", "password", "resetId"],
      properties: {
        login: { type: "string" },
        password: { type: "string" },
        resetId: { type: "string" },
      },
    },
    response: {
      200: {
        type: "object",
        properties: {
          error: { type: "integer" },
          errorMsg: { type: "string" },
        },
      },
    },
  },
  sendVerificationCode: {
    description: "This api is used send verificationCode",
    body: {
      type: "object",
      required: ["email"],
      properties: {
        email: { type: "string" },
      },
    },
    response: {
      200: {
        type: "object",
        properties: {
          error: { type: "integer" },
          errorMsg: { type: "string" },
          email: { type: "string" },
          verificationId: { type: "string" },
        },
      },
    },
  },
  validateOTP: {
    description: "This api is used verify OTP",
    body: {
      type: "object",
      required: ["email", "verificationId", "otp"],
      properties: {
        email: { type: "string" },
        verificationId: { type: "string" },
        otp: { type: "string" },
      },
    },
    response: {
      200: {
        type: "object",
        properties: {
          error: { type: "integer" },
          errorMsg: { type: "string" },
        },
      },
    },
  },
  loginAdmin: {
    description:
      "This api is used by registered users with login, password and captcha",
    body: {
      type: "object",
      required: ["login", "password", "captcha"],
      properties: {
        login: { type: "string" },
        password: { type: "string" },
        captcha: {
          type: "object",
          required: ["id", "text"],
          properties: {
            id: { type: "string" },
            text: { type: "string" },
          },
        },
      },
    },
    response: {
      200: {
        type: "object",
        properties: {
          success: { type: "boolean" },
          error: { type: "integer" },
          errorMsg: { type: "string" },
          token: { type: "string" },
        },
      },
    },
  },
  loginCenterUser: {
    description:
      "This api is used by registered users with login and password ",
    body: {
      type: "object",
      required: ["login", "password"],
      properties: {
        login: { type: "string" },
        password: { type: "string" },
      },
    },
    response: {
      200: {
        type: "object",
        properties: {
          success: { type: "boolean" },
          error: { type: "integer" },
          errorMsg: { type: "string" },
          token: { type: "string" },
        },
      },
    },
  },

  mobileVerificationCode: {
    description: "This api is used mobile verificationCode",
    body: {
      type: "object",
      required: ["mobile"],
      properties: {
        mobile: { type: "integer" },
      },
    },
    response: {
      200: {
        type: "object",
        properties: {
          error: { type: "integer" },
          errorMsg: { type: "string" },
          mobile: { type: "integer" },
          mobileVerificationId: { type: "string" },
        },
      },
    },
  },
  validateMobileOTP: {
    description: "This api is used verify OTP",
    body: {
      type: "object",
      required: ["mobile", "mobileVerificationId", "otp"],
      properties: {
        mobile: { type: "integer" },
        mobileVerificationId: { type: "string" },
        otp: { type: "string" },
      },
    },
    response: {
      200: {
        type: "object",
        properties: {
          error: { type: "integer" },
          errorMsg: { type: "string" },
        },
      },
    },
  },
};
