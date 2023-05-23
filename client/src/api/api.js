// let apiServer = 'http://excise.ap-south-1.elasticbeanstalk.com';
//let apiServer = 'https://kcb.parikshaworld.com/api';
//let apiServer = "http://localhost:5000/api";
// let apiServer = 'https://be.parikshaworld.com';
// let apiServer = 'http://13.235.50.129:500kk0' // test server
let apiServer = import.meta.env.VITE_APISERVER + "/api";
import { DateTime } from "luxon";

const findCompany = async ({ district, licenseType, licenseNo }) => {
  let params = { district, licenseNo, licenseType };
  let url = new URL(`${apiServer}/exciserecords/findCompany`);
  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, params[key])
  );

  try {
    let reply = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (reply.status != 200) throw Error("Company not found");

    const result = await reply.json();
    const { error, errorMsg, exciserecord } = result;
    return { error, errorMsg, company: exciserecord };
  } catch (e) {
    console.log("api.findCompany failed with error :", e);
    return { error: -1, errorMsg: e };
  }
};

const validateGstLastFour = async ({ company, gstLastFour }) => {
  let url = new URL(`${apiServer}/exciserecords/validateGstLastFour`);
  let params = {
    licenseNo: company.licenseNo,
    licenseType: company.licenseType,
    district: company.district,
    gstLastFour,
  };
  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, params[key])
  );

  try {
    let reply = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (reply.status != 200) throw Error("Not found");

    const { matched, gstLastFour } = await reply.json();
    if (!matched) {
      return {
        error: -1,
        errorMsg: "GST last for did not match",
        matched,
        gstLastFour,
      };
    } else {
      return { error: 0, errorMsg: "", matched, gstLastFour };
    }
  } catch (e) {
    console.log("api.registerLicensee failed with error :", e);
    return { error: -1, errorMsg: e };
  }
};

const registerLicensee = async ({ name, email, mobileno, licenseInfo }) => {
  let url = new URL(`${apiServer}/auth/registerLicensee`);
  let params = {
    name,
    email,
    mobileno,
    licenseInfo,
  };

  try {
    let reply = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    if (reply.status != 200) throw Error("Not found");

    const result = await reply.json();
    return { error: 0, errorMsg: "", registrionResult: result };
  } catch (e) {
    console.log("api.registerLicensee failed with error :", e);
    return { error: -1, errorMsg: e };
  }
};

const validateVerificationCode = async ({
  licenseNo,
  verificationId,
  verificationCode,
}) => {
  let url = new URL(`${apiServer}/auth/validateVerificationCode`);
  let params = {
    licenseNo,
    verificationId,
    verificationCode,
  };
  try {
    let reply = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    if (reply.status != 200) throw Error("Not found");

    const { matched, login, errorMsg } = await reply.json();
    if (!matched) {
      return {
        error: -1,
        errorMsg,
        matched,
      };
    } else {
      return {
        error: 0,
        errorMsg,
        matched,
        login,
      };
    }
  } catch (e) {
    console.log("api.registerLicensee failed with error :", e);
    return { error: -1, errorMsg: e };
  }
};

const createLogin = async ({ login, password, verificationId, mobile }) => {
  let url = new URL(`${apiServer}/auth/createLogin`);
  let params = {
    login,
    password,
    verificationId,
    mobile,
  };
  try {
    let reply = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    if (reply.status != 200) throw Error("Not found");

    const { success, error, errorMsg } = await reply.json();
    return { success, error, errorMsg };
  } catch (e) {
    console.log("api.createLogin failed with error :", e);
    return { error: -1, errorMsg: e, success: false };
  }
};

const login = async ({ login, password, captcha }) => {
  let url = new URL(`${apiServer}/auth/login`);
  let params = {
    login,
    password,
    captcha,
  };
  try {
    let reply = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    if (reply.status != 200) throw Error("Not found");

    const { success, error, errorMsg, token, user } = await reply.json();
    return { success, error, errorMsg, token };
  } catch (e) {
    console.log("api.login failed with error :", e);
    return { error: -1, errorMsg: e, success: false };
  }
};

const forgotPassword = async ({ login }) => {
  let url = new URL(`${apiServer}/auth/forgotPassword`);
  let params = {
    login,
  };
  try {
    let reply = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    if (reply.status != 200) throw Error("Not found");

    const { success, error, errorMsg } = await reply.json();
    return { success, error, errorMsg };
  } catch (e) {
    console.log("api.forgotPassword failed with error :", e);
    return { error: -1, errorMsg: e, success: false };
  }
};

const verifyResetPasswordId = async ({ resetId }) => {
  let url = new URL(`${apiServer}/auth/verifyResetPasswordId`);
  let params = {
    resetId,
  };
  try {
    let reply = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    if (reply.status != 200) throw Error("Not found");

    const { valid, error, errorMsg, login } = await reply.json();
    return { valid, error, errorMsg, login };
  } catch (e) {
    console.log("api.verifyResetPasswordId failed with error :", e);
    return { valid: false, error: -1, errorMsg: e };
  }
};

const getcaptcha = async () => {
  let url = new URL(`${apiServer}/auth/getcaptcha`);
  try {
    let reply = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (reply.status != 200) throw Error("Not found");

    const { error, errorMsg, captcha, id } = await reply.json();
    return { error, errorMsg, captcha, id };
  } catch (e) {
    console.log("api.verifyResetPasswordId failed with error :", e);
    return { error: -1, errorMsg: "exception in getting captcha" };
  }
};

const getCurrentDate = async () => {
  let url = new URL(`${apiServer}/application/getCurrentDate`);
  try {
    let reply = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (reply.status != 200) throw Error("Not found");

    const { error, errorMsg, currentDate } = await reply.json();
    return { error, errorMsg, currentDate };
  } catch (e) {
    console.log("api.getCurrentDate failed with error :", e);
    return { error: -1, errorMsg: "exception in getting current date" };
  }
};
const getFormSchedule = async () => {
  let url = new URL(`${apiServer}/application/getFormSchedule`);
  try {
    let reply = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (reply.status != 200) throw Error("Not found");

    const { error, errorMsg, startDatetime, endDatetime } = await reply.json();
    return { error, errorMsg, endDatetime, startDatetime };
  } catch (e) {
    console.log("api.getFormSchedule failed with error :", e);
    return { error: -1, errorMsg: "exception in getting getFormSchedule" };
  }
};

const resetPassword = async ({ resetId, login, password }) => {
  let url = new URL(`${apiServer}/auth/resetPassword`);
  let params = {
    resetId,
    login,
    password,
  };
  try {
    let reply = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    if (reply.status != 200) throw Error("Not found");

    const { error, errorMsg } = await reply.json();
    return { error, errorMsg };
  } catch (e) {
    console.log("api.resetPassword failed with error :", e);
    return { error: -1, errorMsg: e };
  }
};

const sendVerificationCode = async ({ email }) => {
  let url = new URL(`${apiServer}/auth/sendVerificationCode`);
  let params = {
    email,
  };
  try {
    let reply = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    if (reply.status != 200) throw Error("Not found");

    const { error, errorMsg, email, verificationId } = await reply.json();
    return { error, errorMsg, email, verificationId };
  } catch (e) {
    console.log("api.sendVerificationCode failed with error :", e);
    return { error: -1, errorMsg: e };
  }
};

const validateOTP = async ({ email, verificationId, otp }) => {
  let url = new URL(`${apiServer}/auth/validateOTP`);
  let params = {
    email,
    verificationId,
    otp,
  };
  try {
    let reply = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    if (reply.status != 200) throw Error("Not found");

    const { error, errorMsg } = await reply.json();
    return { error, errorMsg };
  } catch (e) {
    console.log("api.validateOTP failed with error :", e);
    return { error: -1, errorMsg: e };
  }
};

const sendMobileVerificationCode = async ({ mobile }) => {
  let url = new URL(`${apiServer}/auth/sendMobileVerificationCode`);
  let params = {
    mobile,
  };
  try {
    let reply = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    if (reply.status != 200) throw Error("Not found");

    const { error, errorMsg, mobile, mobileVerificationId } =
      await reply.json();
    return { error, errorMsg, mobile, mobileVerificationId };
  } catch (e) {
    console.log("api.sendMobileVerification failed with error :", e);
    return { error: -1, errorMsg: e };
  }
};

const validateMobileOTP = async ({ mobile, mobileVerificationId, otp }) => {
  let url = new URL(`${apiServer}/auth/validateMobileOTP`);
  let params = {
    mobile,
    mobileVerificationId,
    otp,
  };
  try {
    let reply = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    if (reply.status != 200) throw Error("Not found");

    const { error, errorMsg } = await reply.json();
    return { error, errorMsg };
  } catch (e) {
    console.log("api.validateMobileOTP failed with error :", e);
    return { error: -1, errorMsg: e };
  }
};
const getPersonalInfo = async ({ token }) => {
  let url = new URL(`${apiServer}/application/getPersonalInfo`);
  try {
    let reply = await fetch(url.toString(), {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });

    if (reply.status != 200) throw Error("Not found");

    // const { error, errorMsg, login, personalInfo } = await reply.json();
    const resp = await reply.json();
    console.log("resp is: ", resp);
    const { error, errorMsg, login, personalInfo } = resp;
    console.log(
      "return value from getPersonalInfo is: ",
      error,
      errorMsg,
      login,
      personalInfo
    );
    return { error, errorMsg, login, personalInfo };
  } catch (e) {
    console.log("api.getPersonalInfo failed with error :", e);
    return { error: -1, errorMsg: e };
  }
};

const getApplication = async ({ token }) => {
  let url = new URL(`${apiServer}/application/getApplication`);
  console.log("token is: ", token);
  try {
    let reply = await fetch(url.toString(), {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });

    if (reply.status != 200) throw Error("Not found");

    // const { error, errorMsg, login, personalInfo } = await reply.json();
    const resp = await reply.json();
    console.log("resp is: ", resp);
    const { error, errorMsg, login, mobile, application } = resp;
    console.log(
      "return value from getApplication is: ",
      error,
      errorMsg,
      login,
      mobile,
      application
    );
    return { error, errorMsg, login, mobile, application };
  } catch (e) {
    console.log("api.getApplication failed with error :", e);
    return { error: -1, errorMsg: e };
  }
};

const saveApplication = async ({ params, token }) => {
  console.log("api.saveApplication called token is: ", token);
  let url = new URL(`${apiServer}/application/saveApplication`);

  try {
    let reply = await fetch(url.toString(), {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
    console.log("params is", params);
    if (reply.status != 200) throw Error("Not found");

    const { error, errorMsg, application } = await reply.json();
    console.log(
      "return value from saveApplication is: ",
      error,
      errorMsg,
      application
    );
    return { error, errorMsg, application };
  } catch (e) {
    console.log("api.saveApplication failed with error :", e);
    return { error: -1, errorMsg: e };
  }
};
const savePostApplication = async ({ postRecord, params, token }) => {
  console.log("api.saveApplication called token is: ", token);
  let url = new URL(
    `${apiServer}/application/savePostApplication/${postRecord}`
  );

  try {
    let reply = await fetch(url.toString(), {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
    console.log("params is", params);
    if (reply.status != 200) throw Error("Not found");

    const { error, errorMsg, application } = await reply.json();
    console.log(
      "return value from saveApplication is: ",
      error,
      errorMsg,
      application
    );
    return { error, errorMsg, application };
  } catch (e) {
    console.log("api.saveApplication failed with error :", e);
    return { error: -1, errorMsg: e };
  }
};

const uploadFile = async ({ tag, formData, token }) => {
  console.log("api.uploadFile called token is: ", token, " tag is: ", tag);
  let url = new URL(`${apiServer}/upload/uploadFile/${tag}`);
  try {
    let reply = await fetch(url.toString(), {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: formData,
    });

    if (reply.status != 200) {
      let resp = await reply.json();
      let { error, message } = resp;
      console.log("response on error is: ", resp);
      throw Error(message);
    }

    const { filename } = await reply.json();
    return { error: 0, errorMsg: "", filename };
  } catch (e) {
    console.log("api.uploadFile failed with error :", e);
    return { error: -1, errorMsg: e };
  }
};
const getPaymentId = async ({ postRecord, amount, token }) => {
  console.log("api.getPaymentId called token is: ", token);
  let url = new URL(`${apiServer}/razorpay/getPaymentId/${postRecord}`);
  let params = { amount: amount.toString() };
  try {
    let reply = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(params),
    });

    if (reply.status != 200) {
      let resp = await reply.json();
      let { error, message } = resp;
      console.log("response on error is: ", resp);
      throw Error(message);
    }

    const { error, errorMsg, orderid, order, applicantInfo } =
      await reply.json();
    console.log("api.getPaymentId successful order:", order);
    console.log("api.getPaymentId successful applicantInfo:", applicantInfo);
    return { error: 0, errorMsg: "", orderid, order, applicantInfo };
  } catch (e) {
    console.log("api.getPaymentId failed with error :", e);
    return { error: -1, errorMsg: e, orderid: -1 };
  }
};

const getPaymentIdAdditional = async ({ postRecord, amount, token }) => {
  console.log("api.getPaymentId called token is: ", token);
  let url = new URL(
    `${apiServer}/razorpay/getPaymentIdAdditional/${postRecord}`
  );
  let params = { amount: amount.toString() };
  try {
    let reply = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(params),
    });

    if (reply.status != 200) {
      let resp = await reply.json();
      let { error, message } = resp;
      console.log("response on error is: ", resp);
      throw Error(message);
    }

    const { error, errorMsg, orderid, order, applicantInfo } =
      await reply.json();
    console.log("api.getPaymentId successful order:", order);
    console.log("api.getPaymentId successful applicantInfo:", applicantInfo);
    return { error: 0, errorMsg: "", orderid, order, applicantInfo };
  } catch (e) {
    console.log("api.getPaymentId failed with error :", e);
    return { error: -1, errorMsg: e, orderid: -1 };
  }
};
const recordPaymentResponse = async ({ response, token }) => {
  console.log("api.recordPaymentResponse called token is: ", token);
  let url = new URL(`${apiServer}/razorpay/recordPaymentResponse`);
  let params = { response };
  try {
    let reply = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(params),
    });

    if (reply.status != 200) {
      let resp = await reply.json();
      let { error, message } = resp;
      console.log("response on error is: ", resp);
      throw Error(message);
    }

    const { error, errorMsg, confirmation_client } = await reply.json();
    console.log(
      "api.recordPaymentResponse successful order:",
      confirmation_client
    );
    return { error: 0, errorMsg: "", confirmation_client };
  } catch (e) {
    console.log("api.recordPaymentResponse failed with error :", e);
    return { error: -1, errorMsg: e };
  }
};

const deleteFile = async ({ uploadedFile, token }) => {
  console.log("api.deleteFile called token is: ", token);
  let url = new URL(`${apiServer}/upload/deleteFile`);
  let params = { uploadedFile };
  try {
    let reply = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(params),
    });

    if (reply.status != 200) {
      let resp = await reply.json();
      let { error, message } = resp;
      console.log("response on error is: ", resp);
      throw Error(message);
    }

    const { error, errorMsg } = await reply.json();
    console.log("api.deleteFile successful : ");
    return { error: 0, errorMsg: "" };
  } catch (e) {
    console.log("api.deleteFile failed with error :", e);
    return { error: -1, errorMsg: e };
  }
};

const deleteFileForPost = async ({ postRecord, uploadedFile, token }) => {
  console.log("api.deleteFileForPost called token is: ", token);
  let url = new URL(`${apiServer}/postUpload/deleteFile`);
  let params = { uploadedFile, postRecord };
  try {
    let reply = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(params),
    });

    if (reply.status != 200) {
      let resp = await reply.json();
      let { error, message } = resp;
      console.log("response on error is: ", resp);
      throw Error(message);
    }

    const { error, errorMsg } = await reply.json();
    console.log("api.deleteFileForPost successful : ");
    return { error: 0, errorMsg: "" };
  } catch (e) {
    console.log("api.deleteFileForPost failed with error :", e);
    return { error: -1, errorMsg: e };
  }
};

const loginAdmin = async ({ login, password, captcha }) => {
  let url = new URL(`${apiServer}/auth/loginAdmin`);
  let params = {
    login,
    password,
    captcha,
  };
  console.log("captch is:", captcha);
  try {
    let reply = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    if (reply.status != 200) throw Error("Not found");

    const { success, error, errorMsg, token, user } = await reply.json();
    return { success, error, errorMsg, token };
  } catch (e) {
    console.log("api.loginAdmin failed with error :", e);
    return { error: -1, errorMsg: e, success: false };
  }
};

const adminSummary = async ({ token }) => {
  console.log("adminSummary");
  let url = new URL(`${apiServer}/admin/adminSummary`);
  try {
    let reply = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    if (reply.status != 200) throw Error("Not found");

    const { error, errorMsg, countSummary, registeredCount } =
      await reply.json();
    console.log("countSummary is: ", countSummary);
    return { error, errorMsg, countSummary, registeredCount };
  } catch (e) {
    return { error: -1, errorMsg: e, success: false };
  }
};

const printApplication = async ({ postId, postRecord, postName, token }) => {
  console.log("printApplication ....", postId);
  let url = new URL(
    `${apiServer}/application/printApplication/${postId}/${postRecord}/${postName}`
  );
  try {
    let reply = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    if (reply.status != 200) throw Error("Not found");

    const { error, errorMsg, filename, application } = await reply.json();

    return { error, errorMsg, filename, application };
  } catch (e) {
    console.log("api.printApplication failed with error :", e);
    return { error: -1, errorMsg: e };
  }
};

const validPeriod = async () => {
  try {
    let message = "";
    console.log("onMount fired");
    let { error, errorMsg, endDatetime, startDatetime } =
      await getFormSchedule();
    if (error) {
      return { error, message: errorMsg };
    }
    let { currentDate: cd } = await getCurrentDate();
    let currentDate = cd;

    let lstartDatetime = DateTime.fromISO(startDatetime);
    let lendDatetime = DateTime.fromISO(endDatetime);
    let lcurrentDatetime = DateTime.fromISO(currentDate);

    console.log("current Date is:", lcurrentDatetime);
    console.log("end Date is:", lendDatetime);
    console.log("start Date is:", lstartDatetime);
    if (lcurrentDatetime > lendDatetime) {
      error = -1;
      message = `Application form reception has ended on ${lendDatetime.toLocaleString(
        DateTime.DATETIME_FULL
      )}`;
    } else if (lcurrentDatetime < lstartDatetime) {
      error = -1;
      message = `Application form reception has not started yet, it will commence on ${lstartDatetime.toLocaleString(
        DateTime.DATETIME_FULL
      )}`;
    } else {
      error = 0;
    }
    return { error, message };
  } catch (e) {
    console.log("exception thrown in onMount", e);
    return { error: -1, message: "Exception in processing validPeriod " + e };
  }
};

const addCenter = async ({ token, center }) => {
  console.log("addCenter token is: ", token);
  let url = new URL(`${apiServer}/center/add`);
  let params = {
    center,
  };
  try {
    let reply = await fetch(url.toString(), {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    if (reply.status != 200) throw Error("Not found");

    const { error, message } = await reply.json();
    return { error, message };
  } catch (e) {
    console.log("api.addCenter failed with error :", e);
    return { error: -1, message: e };
  }
};
const editCenter = async ({ token, center }) => {
  console.log("editCenter token is: ", token);
  let url = new URL(`${apiServer}/center/edit`);
  let params = {
    center,
  };
  try {
    let reply = await fetch(url.toString(), {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    if (reply.status != 200) throw Error("Not found");

    const { error, message } = await reply.json();
    return { error, message };
  } catch (e) {
    console.log("api.editCenter failed with error :", e);
    return { error: -1, message: e };
  }
};
const deleteCenter = async ({ token, _id }) => {
  console.log("deleteCenter token is: ", token);
  let url = new URL(`${apiServer}/center/delete`);
  let params = {
    _id,
  };
  try {
    let reply = await fetch(url.toString(), {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    if (reply.status != 200) throw Error("Not found");

    const { error, message } = await reply.json();
    return { error, message };
  } catch (e) {
    console.log("api.deleteCenter failed with error :", e);
    return { error: -1, message: e };
  }
};
const getAllCenters = async ({ token }) => {
  console.log("api.getAllCentes token is: ", token);
  let url = new URL(`${apiServer}/center/getAll`);
  try {
    let reply = await fetch(url.toString(), {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });

    if (reply.status != 200) throw Error("Not found");

    const { error, message, centers } = await reply.json();
    return { error, message, centers };
  } catch (e) {
    console.log("api.getAllCentes editCenter failed with error :", e);
    return { error: -1, message: e };
  }
};
// review api
const loginReview = async ({ login, password, captcha }) => {
  let url = new URL(`${apiServer}/auth/loginReview`);
  let params = {
    login,
    password,
    captcha,
  };
  console.log("captch is:", captcha);
  try {
    let reply = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    if (reply.status != 200) throw Error("Not found");

    const { success, error, errorMsg, token, user } = await reply.json();
    return { success, error, errorMsg, token };
  } catch (e) {
    console.log("api.loginAdmin failed with error :", e);
    return { error: -1, errorMsg: e, success: false };
  }
};

const getSCApplication = async ({ category, token }) => {
  let url = new URL(`${apiServer}/review/getSCApplication`);
  let params = {
    category,
  };

  try {
    let reply = await fetch(url.toString(), {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    if (reply.status != 200) throw Error("Not found");

    const { error, errorMsg, application } = await reply.json();
    return { error, errorMsg, application };
  } catch (e) {
    console.log("api.getAcapplication failed with error :", e);
    return { error: -1, errorMsg: e, success: false };
  }
};

const getAvailablePosts = async ({ token }) => {
  let url = new URL(`${apiServer}/posts/getAvailablePosts`);

  try {
    let reply = await fetch(url.toString(), {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });

    if (reply.status != 200) throw Error("Not found");

    const { error, errorMsg, availablePosts } = await reply.json();
    return { error, errorMsg, availablePosts };
  } catch (e) {
    console.log("api.getAvailablePosts failed with error :", e);
    return { error: -1, errorMsg: e, success: false };
  }
};

const uploadFileForPost = async ({ tag, postRecord, formData, token }) => {
  console.log(
    "api.uploadFileForPost called token is: ",
    token,
    " tag is: ",
    tag,
    " postRecord is: ",
    postRecord
  );
  let url = new URL(`${apiServer}/postUpload/uploadFile/${postRecord}/${tag}`);
  try {
    let reply = await fetch(url.toString(), {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: formData,
    });

    if (reply.status != 200) {
      let resp = await reply.json();
      let { error, message } = resp;
      console.log("response on error is: ", resp);
      throw Error(message);
    }

    const { filename } = await reply.json();
    return { error: 0, errorMsg: "", filename };
  } catch (e) {
    console.log("api.uploadFileForPost failed with error :", e);
    return { error: -1, errorMsg: e };
  }
};
const feeImpacted = async ({ token }) => {
  let url = new URL(`${apiServer}/feeImpacted`);

  try {
    let reply = await fetch(url.toString(), {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });

    if (reply.status != 200) throw Error("Not found");

    const { error, errorMsg, isFeeImpacted, impactedRecord } =
      await reply.json();
    return { error, errorMsg, isFeeImpacted, impactedRecord };
  } catch (e) {
    console.log("api.feeImpacted failed with error :", e);
    return { error: -1, errorMsg: e, success: false };
  }
};
const makeRazorpayPayment = async ({
  amount,
  order_id,
  postId,
  name,
  email,
  contact,
  cb,
  token,
}) => {
  console.log("initialize Rozorpay called");

  var options = {
    key: "rzp_live_EbVltehQZxUqlF", // Enter the Key ID generated from the Dashboard
    amount: amount.toString(), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: "INR",
    name: "Scitech Park, Pune, on behalf of PCB, Pune",
    description: "Processing Fee, PCB",
    image: `${window.location.origin}/PCBlogo.png`,
    order_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    handler: async function (response) {
      console.log("handler function called :", response);
      let { error, errorMsg, confirmation_client } =
        await recordPaymentResponse({ response, token });

      if (!error) {
        // goto(`/paymentSuccess/${postId}`);
        cb(error, postId);
      } else {
        // goto(`/paymentFailure/${postId}`);
        cb(error, postId);
        console.log("error in recording payment status", error);
      }
    },

    prefill: {
      name,
      email,
      contact,
    },
    notes: {
      address: "Pune Univeristy campus, Maharashtra",
    },
    theme: {
      //   color: "#3399cc",
      color: "#f18813",
    },
  };
  let rzp1 = null;
  rzp1 = new window.Razorpay(options);
  rzp1.open();
};

export let api = {
  findCompany,
  validateGstLastFour,
  registerLicensee,
  validateVerificationCode,
  createLogin,
  login,
  forgotPassword,
  verifyResetPasswordId,
  getcaptcha,
  resetPassword,
  sendVerificationCode,
  validateOTP,
  getPersonalInfo,
  saveApplication,
  getApplication,
  getPaymentId,
  recordPaymentResponse,
  deleteFile,
  loginAdmin,
  adminSummary,
  printApplication,
  getCurrentDate,
  getFormSchedule,
  validPeriod,
  uploadFile,
  addCenter,
  editCenter,
  deleteCenter,
  getAllCenters,
  sendMobileVerificationCode,
  validateMobileOTP,
  loginReview,
  getSCApplication,
  getAvailablePosts,
  uploadFileForPost,
  savePostApplication,
  deleteFileForPost,
  feeImpacted,
  getPaymentIdAdditional,
  makeRazorpayPayment,
};
