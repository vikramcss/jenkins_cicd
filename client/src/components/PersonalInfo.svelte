<script>
  import TextInput from "../common/TextInput.svelte";
  import InputRadioGroup from "../common/InputRadioGroup.svelte";
  import DateInput from "../common/DateInput.svelte";
  import { DateTime } from "luxon";
  import { createEventDispatcher, onMount } from "svelte";
  import { postHandicapped } from "../data/postIdMap";
  import { page } from "$app/stores";
  let applicationEndDate = DateTime.fromISO("2023-04-04");
  const getAge = (ldob) => {
    if (ldob) {
      let dob = DateTime.fromFormat(ldob, "dd-MM-yyyy");
      const diff = applicationEndDate.diff(dob, ["years", "months", "days"]);
      return `age: ${diff.values.years} years ${diff.values.months} months ${diff.values.days} days`;
    }
    return "";
  };
  $: currentAge = getAge(personalInfo.dob);
  const dispatch = createEventDispatcher();

  export let validateComponent = null;
  export let personalInfo = {
    name: "",
    presentName: "",
    fathersName: "",
    dob: "",
    nationality: "",
    religion: "",
    category: "",
    gender: "",
    widowOrDivorced: "",
    email: "",
    mobile: "",
    pwd: "",
    PWDType: "",
    // scribe: "",
    Married_Status: "",
    exceptionalCandidate: "",
    exceptionalCandidateJustification: "",
    exserviceman: "",
    govemployee: "",
    meityemployee: "",
    periodofservice: "",
    Kcbperiodofservice: "",
    KCBrelatedEmployee: "",
    annualincomeEWS: "",
    alternativeMobileNo: "",
    kcbRelatedName: "",
    kcbRelatedDesignation: "",
  };
  console.log("personalInfo is:", personalInfo);
  export let errorsPersonalInfo = {
    name: null,
    presentName: null,
    fathersName: null,
    dob: null,
    nationality: null,
    religion: null,
    category: null,
    email: null,
    mobile: null,
    pwd: null,
    PWDType: null,
    // scribe: null,
    Married_Status: null,
    exceptionalCandidate: null,
    exceptionalCandidateJustification: null,
    periodofservice: null,
    exserviceman: null,
    govemployee: null,
    meityemployee: null,
    gender: null,
    widowOrDivorced: null,
    Kcbperiodofservice: null,
    KCBrelatedEmployee: null,
    annualincomeEWS: null,
    alternativeMobileNo: null,
    kcbRelatedName: null,
    kcbRelatedDesignation: null,
  };
  export let login;
  export let mobile;
  console.log("mobile in ", mobile);
  personalInfo.email = login;
  personalInfo.mobile = mobile;

  let inputName = {
    label: "Full Name",
    validate: true,
    readonly: false,
    error: null,
    placeholderValue: "Full Name",
    error_mt: false,
    paddingsize: 0,
    validator: {
      method: (value) => {
        return value.length >= 3;
      },
      errormessage: "length can not be less than 3",
    },
  };

  let inputKCBrelatedName = {
    label: "PCB Employee Name",
    validate: true,
    value: personalInfo.kcbRelatedName,
    readonly: false,
    error: null,
    placeholderValue: "PCB Employee Name",
    error_mt: false,
    paddingsize: 0,
    validator: {
      method: (value) => {
        return value.length >= 3;
      },
      errormessage: "pcb related employee name can not be empty",
    },
  };

  let inputDesignation = {
    label: "Designation",
    value: personalInfo.kcbRelatedDesignation,
    validate: true,
    readonly: false,
    error: null,
    placeholderValue: "Designation",
    error_mt: false,
    paddingsize: 0,
    validator: {
      method: (value) => {
        return value.length >= 3;
      },
      errormessage: "PCB related employee Designation can not be empty",
    },
  };

  // let inputpresentName = {
  //   label: "legal Name(if diff than 10th cert. )",
  //   validate: true,
  //   readonly: false,
  //   error: null,
  //   placeholderValue: "Present Name",
  //   error_mt: false,
  //   paddingsize: 0,
  //   validator: {
  //     method: (value) => {
  //       return true;
  //     },
  //     errormessage: "length can not be less than 3",
  //   },
  // };
  let inputFathersName = {
    label: "Father's/Husband's Name",
    validate: true,
    readonly: false,
    error: null,
    placeholderValue: "Father's/Husband's Name",
    error_mt: false,
    paddingsize: 0,
    validator: {
      method: (value) => {
        return value.length >= 1;
      },
      errormessage: "length can not be less than 1",
    },
  };

  let inputPeriodofservice = {
    label: "Period Of Service in years",
    validate: true,
    readonly: false,
    error: null,
    placeholderValue: "Period of service",
    error_mt: false,
    paddingsize: 0,
    validator: {
      method: (value) => {
        let lval = Number(value);
        if (isNaN(value)) return false;
        if (personalInfo.dob) {
          errorsPersonalInfo.dob = inputDOB.validator.method(inputDOB.getDOB())
            ? null
            : inputDOB.validator.errormessage;
        }
        if (value < 0 || value > 40) return false;
        return true;
      },
      errormessage: "length of service must be  between 0 and 40",
    },
  };

  let inputKcbperiodofservice = {
    label: "PCB Period Of Service in years",
    validate: true,
    readonly: false,
    error: null,
    placeholderValue: "PCB Period of service",
    error_mt: false,
    paddingsize: 0,
    validator: {
      method: (value) => {
        let lval = Number(value);
        if (isNaN(value)) return false;
        if (personalInfo.dob) {
          errorsPersonalInfo.dob = inputDOB.validator.method(inputDOB.getDOB())
            ? null
            : inputDOB.validator.errormessage;
        }
        if (lval < 3 || lval > 40) return false;
        return true;
      },
      errormessage: "length of service must be  between 3 and 40",
    },
  };

  let inputDOB = {
    label: "Date Of Birth",
    error: null,
    validator: {
      method: (value) => {
        inputDOB.validator.errormessage = "";
        return true;
        inputDOB.validator.errormessage = null;
        let ageLimit;
        switch (personalInfo.category) {
          // case "SC":
          case "ST":
            ageLimit = 35;
            break;
          case "OBC":
            ageLimit = 33;
            break;
          default:
            ageLimit = 30;
            break;
        }
        switch (personalInfo.pwd) {
          case "Yes":
            ageLimit += 10;
            break;
        }
        if (personalInfo.exserviceman == "Yes") {
          if (
            personalInfo.periodofservice != "" &&
            personalInfo.periodofservice
          ) {
            ageLimit += Number(personalInfo.periodofservice) + 3;
          }
        }
        if (personalInfo.widowOrDivorced == "Yes") {
          if (ageLimit < 35) {
            ageLimit = 35;
          }
        }
        if (
          personalInfo.widowOrDivorced == "Yes" &&
          personalInfo.category == "ST"
        ) {
          if (ageLimit < 40) {
            ageLimit = 40;
          }
        }
        if (
          personalInfo.widowOrDivorced == "Yes" &&
          personalInfo.category == "OBC"
        ) {
          if (ageLimit < 38) {
            ageLimit = 38;
          }
        }

        if (personalInfo.meityemployee == "Yes") {
          if (ageLimit < 40) {
            ageLimit = 40;
          }
        } else if (personalInfo.govemployee == "Yes") {
          ageLimit += 5;
        }
        if (personalInfo.govemployee == "Yes") {
          ageLimit += 10;
        }
        if (ageLimit > 60) {
          ageLimit = 60;
        }
        personalInfo.dob = value;
        console.log("value in inputDOB is: ", value);
        console.log("date value is: ", personalInfo.dob);
        // let dob = DateTime.fromISO(personalInfo.dob)
        let dob = DateTime.fromFormat(personalInfo.dob, "dd-MM-yyyy");
        console.log("date value is: ", personalInfo.dob);
        // let dob = DateTime.fromFormat(value, "dd-MM-yyyy");
        const diff = applicationEndDate.diff(dob, ["years"]);
        console.log("age difference is :", diff);
        if (diff.values.years <= ageLimit && diff.values.years > 21) {
          return true;
        }
        // inputDOB.validator.errormessage = `your age is: ${diff.values.years.toFixed(4)} years, age limit is: 18 to ${ageLimit} `;
        inputDOB.validator.errormessage = `age limit is: 21 to ${ageLimit} `;
        return false;
      },
      errormessage: "age should be upto 40/43/45 for Open/OBC/(SC/ST)",
    },
    getDOB: (_) => {
      console.log("personalInfo.dob:", personalInfo.dob);
      if (personalInfo.dob) {
        let dob = DateTime.fromFormat(personalInfo.dob, "dd-MM-yyyy");
        console.log("dob in DateTime Format is:", dob);
        let day = dob.get("day").toString().padStart(2, "0");
        let month = dob.get("month").toString().padStart(2, "0");
        let year = dob.get("year");
        return `${day}-${month}-${year}`;
      } else {
        return null;
      }
    },
  };

  let inputNationality = {
    label: "Nationality",
    options: ["Indian"],
    error: null,
    validator: {
      method: (value) => {
        return value !== "Indian" ? false : true;
      },
      errormessage: "Only Indian citizens can apply for this position",
    },
  };

  // let inputReligion = {
  //   label: "Religion",
  //   options: [
  //     "Hindu",
  //     "Muslim",
  //     "Christian",
  //     "Sikh",
  //     "Buddha",
  //     "Jain",
  //     "Other",
  //   ],
  //   error: null,
  //   validator: {
  //     method: (value) => {
  //       if (!inputReligion.options.find((v) => v === value)) {
  //         return false;
  //       }
  //       return true;
  //     },
  //     errormessage: "Religion must be selected",
  //   },
  // };

  let inputCategory = {
    label: "Category",
    options: ["SC", "ST", "OBC", "Gen", "EWS"],
    error: null,
    validator: {
      method: (value) => {
        console.log("personalInfo.dob: ", personalInfo.dob);
        if (personalInfo.dob) {
          errorsPersonalInfo.dob = inputDOB.validator.method(inputDOB.getDOB())
            ? null
            : inputDOB.validator.errormessage;
        }
        if (!inputCategory.options.find((v) => v === value)) {
          return false;
        }
        return true;
      },
      errormessage: "category must be selected",
    },
  };

  let inputGender = {
    label: "Gender",
    options: ["Male", "Female", "Transgender"],
    error: null,
    validator: {
      method: (value) => {
        if (value != "Female") {
          personalInfo.widowOrDivorced = "No";
        }
        if (personalInfo.dob) {
          errorsPersonalInfo.dob = inputDOB.validator.method(inputDOB.getDOB())
            ? null
            : inputDOB.validator.errormessage;
        }

        personalInfo.gender = value;
        if (!inputGender.options.find((v) => v === value)) {
          inputGender.error = inputGender.validator.errormessage;
          return false;
        }
        return true;
      },
      errormessage: "Gender must be selected",
    },
  };

  // let inputScribe = {
  //   label: "Do You Need Scribe?",
  //   options: ["Yes", "No"],
  //   value: personalInfo.scribe,
  //   error: null,
  //   validator: {
  //     method: (value) => {
  //       personalInfo.scribe = value;
  //       if (!inputScribe.options.find((v) => v === value)) {
  //         inputScribe.error = inputScribe.validator.errormessage;
  //         return false;
  //       }
  //       return true;
  //     },
  //     errormessage: "Scribe must be selected",
  //   },
  // };

  let inputPWD = {
    label: "PwBD",
    options: ["Yes", "No"],
    value: personalInfo.pwd,
    error: null,
    validator: {
      method: (value) => {
        personalInfo.pwd = value;
        if (personalInfo.dob) {
          errorsPersonalInfo.dob = inputDOB.validator.method(inputDOB.getDOB())
            ? null
            : inputDOB.validator.errormessage;
        }
        if (!inputPWD.options.find((v) => v === value)) {
          inputPWD.error = inputPWD.validator.errormessage;
          return false;
        }
        return true;
      },
      errormessage: "PwBD must be selected",
    },
  };

  let inputPWDType = {
    label: "PwBD Type",
    options: ["LV","OA","OL","LC","DWF","AAV","HH"],
    error: null,
    validator: {
      method: (value) => {
        personalInfo.PWDType = value;
        if (!inputPWDType.options.find((v) => v === value)) {
          inputPWDType.error = inputPWDType.validator.errormessage;
          return false;
        }
        return true;
      },
      errormessage: "PwBDType must be selected",
    },
  };

  let inputMarriedStatus = {
    label: "Marital Status",
    options: ["Married", "Unmarried"],
    value: personalInfo.Married_Status,
    error: null,
    validator: {
      method: (value) => {
        personalInfo.Married_Status = value;
        if (personalInfo.dob) {
          errorsPersonalInfo.dob = inputDOB.validator.method(inputDOB.getDOB())
            ? null
            : inputDOB.validator.errormessage;
        }
        if (!inputMarriedStatus.options.find((v) => v === value)) {
          inputMarriedStatus.error = inputMarriedStatus.validator.errormessage;
          return false;
        }
        return true;
      },
      errormessage: "Marital Status must be selected",
    },
  };

  let inputKCBrelatedEmployee = {
    label: "Whether related to any Member/Employee of PCB ?",
    options: ["Yes", "No"],
    value: personalInfo.KCBrelatedEmployee,
    error: null,
    validator: {
      method: (value) => {
        personalInfo.KCBrelatedEmployee = value;
        if (!inputKCBrelatedEmployee.options.find((v) => v === value)) {
          inputPWD.error = inputKCBrelatedEmployee.validator.errormessage;
          return false;
        }
        return true;
      },
      errormessage: "Please Select Yes Or NO",
    },
  };

  let inputExServiceman = {
    label: "Ex-Serviceman",
    options: ["Yes", "No"],
    value: personalInfo.pwd,
    error: null,
    validator: {
      method: (value) => {
        personalInfo.exserviceman = value;
        if (personalInfo.dob) {
          errorsPersonalInfo.dob = inputDOB.validator.method(inputDOB.getDOB())
            ? null
            : inputDOB.validator.errormessage;
        }
        if (!inputExServiceman.options.find((v) => v === value)) {
          inputExServiceman.error = inputExServiceman.validator.errormessage;
          return false;
        }
        return true;
      },
      errormessage: "Ex-Serviceman must be selected",
    },
  };

  let inputWidowOrDivorced = {
    label: "Women",
    options: ["Yes", "No"],
    value: personalInfo.widowOrDivorced,
    error: null,
    validator: {
      method: (value) => {
        personalInfo.widowOrDivorced = value;
        if (personalInfo.dob) {
          errorsPersonalInfo.dob = inputDOB.validator.method(inputDOB.getDOB())
            ? null
            : inputDOB.validator.errormessage;
        }
        if (!inputWidowOrDivorced.options.find((v) => v === value)) {
          inputWidowOrDivorced.error =
            inputWidowOrDivorced.validator.errormessage;
          return false;
        }
        return true;
      },
      errormessage: "Ex-Serviceman must be selected",
    },
  };

  let inputEWSincomeCertificate = {
    label: "Is Your Family Annual income less than 8 lack ?",
    options: ["Yes", "No"],
    value: personalInfo.annualincomeEWS,
    error: null,
    validator: {
      method: (value) => {
        personalInfo.annualincomeEWS = value;
        // if (personalInfo.annualincomeEWS) {
        //   errorsPersonalInfo.annualincomeEWS = inputEWSincomeCertificate.validator.method(inputEWSincomeCertificate.value)
        //     ? null
        //     : inputEWSincomeCertificate.validator.errormessage;
        // }
        if (!inputEWSincomeCertificate.options.find((v) => v === value)) {
          inputEWSincomeCertificate.error =
            inputEWSincomeCertificate.validator.errormessage;
          return false;
        }
        return true;
      },
      errormessage: "Annual income must be selected",
    },
  };

  let inputGovEmployee = {
    label: "Pune Cantonment Board Employee",
    options: ["Yes", "No"],
    value: personalInfo.pwd,
    error: null,
    validator: {
      method: (value) => {
        personalInfo.govemployee = value;
        if (personalInfo.dob) {
          errorsPersonalInfo.dob = inputDOB.validator.method(inputDOB.getDOB())
            ? null
            : inputDOB.validator.errormessage;
        }
        if (!inputGovEmployee.options.find((v) => v === value)) {
          inputGovEmployee.error = inputGovEmployee.validator.errormessage;
          return false;
        }
        return true;
      },
      errormessage: "GovEmployee must be selected",
    },
  };
  // let inputMeityEmployee = {
  //   label: "CMET/MeitY Employee",
  //   options: ["Yes", "No"],
  //   value: personalInfo.pwd,
  //   error: null,
  //   validator: {
  //     method: (value) => {
  //       personalInfo.meityemployee = value;
  //       if (personalInfo.dob) {
  //         errorsPersonalInfo.dob = inputDOB.validator.method(inputDOB.getDOB())
  //           ? null
  //           : inputDOB.validator.errormessage;
  //       }
  //       if (!inputMeityEmployee.options.find((v) => v === value)) {
  //         inputMeityEmployee.error = inputMeityEmployee.validator.errormessage;
  //         return false;
  //       }
  //       return true;
  //     },
  //     errormessage: "GovEmployee must be selected",
  //   },
  // };

  let inputEmail = {
    label: "Email",
    value: login,
    validate: false,
    readonly: true,
    error: null,
    placeholderValue: "Email",
    error_mt: false,
    paddingsize: 0,
    validator: {
      method: (value) => {},
      errormessage: "",
    },
  };

  let inputMobile = {
    label: "Mobile",
    value: mobile,
    validate: true,
    readonly: true,
    error: null,
    placeholderValue: "Mobile",
    error_mt: false,
    paddingsize: 0,
    validator: {
      method: (value) => {
        let regex = /^[6789]{1}[0-9]{9}$/;
        return regex.test(value);
      },
      errormessage: "Please enter valid 10 digit mobile number",
    },
  };

  let inputAlternativeMobile = {
    label: "Alternate Mobile No",
    value: personalInfo.alternativeMobileNo,
    validate: true,
    error: null,
    placeholderValue: "Mobile No",
    error_mt: false,
    paddingsize: 0,
    validator: {
      method: (value) => {
        value = value ? value.trim() : value;
        let regex = /^[6789]{1}[0-9]{9}$/;
        return value ? regex.test(value) : true;
      },
      errormessage: "Please enter valid 10 digit mobile number",
    },
  };

  let inputExceptionalClaim = {
    label: "Exceptional Candidate",
    options: ["Yes", "No"],
    value: personalInfo.exceptionalCandidate,
    error: null,
    validator: {
      method: (value) => {
        personalInfo.exceptionalCandidate = value;
        if (personalInfo.dob) {
          errorsPersonalInfo.dob = inputDOB.validator.method(inputDOB.getDOB())
            ? null
            : inputDOB.validator.errormessage;
        }
        if (!inputExceptionalClaim.options.find((v) => v === value)) {
          inputExceptionalClaim.error =
            inputExceptionalClaim.validator.errormessage;
          return false;
        }
        return true;
      },
      errormessage:
        "Must select if you want to claim exceptional candidate claim for age relaxation",
    },
  };

  let inputExceptionalJustification = {
    label: "Justificaiton for Exceptional",
    validate: true,
    readonly: false,
    error: null,
    placeholderValue: "Justificaiton for Exceptional Candidate",
    error_mt: false,
    paddingsize: 0,
    validator: {
      method: (value) => {
        if (value.length <= 3) {
          inputExceptionalJustification.error =
            inputExceptionalJustification.validator.errormessage;
          return false;
        }
        return true;
      },
      errormessage: "Justification has to be more than 3 chars long",
    },
  };

  export const validatePersonalInfo = () => {
    try {
      console.log("validatePersonalInfo from the componetes called");
      let inputValid = true;
      if (!inputName.validator.method(personalInfo.name)) {
        errorsPersonalInfo.name = inputName.validator.errormessage;
        inputValid = false;
      }
      if (personalInfo.KCBrelatedEmployee == "Yes") {
        if (
          personalInfo.kcbRelatedName == null ||
          personalInfo.kcbRelatedName == ""
        ) {
          errorsPersonalInfo.kcbRelatedName =
            inputKCBrelatedName.validator.errormessage;
          inputValid = false;
        }
      } else {
        errorsPersonalInfo.kcbRelatedName = null;
        personalInfo.kcbRelatedName = null;
      }

      if (personalInfo.KCBrelatedEmployee == "Yes") {
        if (
          personalInfo.kcbRelatedDesignation == null ||
          personalInfo.kcbRelatedDesignation == ""
        ) {
          errorsPersonalInfo.kcbRelatedDesignation =
            inputDesignation.validator.errormessage;
          inputValid = false;
        }
      } else {
        errorsPersonalInfo.kcbRelatedDesignation = null;
        personalInfo.kcbRelatedDesignation = null;
      }

      console.log("validatePersonalInfo from the componetes called##0.1");

      // if (!inputpresentName.validator.method(personalInfo.presentName)) {
      //   errorsPersonalInfo.presentName =
      //     inputpresentName.validator.errormessage;
      //   inputValid = false;
      // }
      console.log("validatePersonalInfo from the componetes called##0.2");

      if (!inputFathersName.validator.method(personalInfo.fathersName)) {
        errorsPersonalInfo.fathersName =
          inputFathersName.validator.errormessage;
        inputValid = false;
      }
      console.log("validatePersonalInfo from the componetes called##0.3");

      if (!inputMobile.validator.method(personalInfo.mobile)) {
        errorsPersonalInfo.mobile = inputMobile.validator.errormessage;
        inputValid = false;
      }
      if (
        !inputAlternativeMobile.validator.method(
          personalInfo.alternativeMobileNo
        )
      ) {
        console.log("alternative mobile no...");
        errorsPersonalInfo.alternativeMobileNo =
          inputAlternativeMobile.validator.errormessage;
        inputValid = false;
      }

      console.log("validatePersonalInfo from the componetes called##0.4");

      console.log("validatePersonalInfo from the componetes called##1");

      // if (!inputReligion.validator.method(personalInfo.religion)) {
      //   errorsPersonalInfo.religion = inputReligion.validator.errormessage;
      //   inputValid = false;
      // }
      if (!inputNationality.validator.method(personalInfo.nationality)) {
        errorsPersonalInfo.nationality =
          inputNationality.validator.errormessage;
        inputValid = false;
      }
      if (!inputCategory.validator.method(personalInfo.category)) {
        errorsPersonalInfo.category = inputCategory.validator.errormessage;
        inputValid = false;
      }
      if (inputDOB.getDOB() === null) {
        errorsPersonalInfo.dob = "date of birth is mandatory";
        inputValid = false;
      }
      console.log("validatePersonalInfo from the componetes called##2");
      if (!inputGender.validator.method(personalInfo.gender)) {
        errorsPersonalInfo.gender = `invalid gender input`;
        inputValid = false;
      }

      if (!inputPWD.validator.method(personalInfo.pwd)) {
        errorsPersonalInfo.pwd = "pwd input is required";
        inputValid = false;
      }
      if (!inputMarriedStatus.validator.method(personalInfo.Married_Status)) {
        errorsPersonalInfo.Married_Status =
          inputMarriedStatus.validator.errormessage;
        inputValid = false;
      }

      if (
        !inputKCBrelatedEmployee.validator.method(
          personalInfo.KCBrelatedEmployee
        )
      ) {
        errorsPersonalInfo.KCBrelatedEmployee =
          inputKCBrelatedEmployee.validator.errormessage;

        inputValid = false;
      }

      console.log("validatePersonalInfo from the componetes called##3");

      console.log("personalInfo.pwd: ", personalInfo.pwd);
      console.log("personalInfo.pwdType: ", personalInfo.pwdType);
      // console.log("personalInfo Scrib", personalInfo.scribe);

      // if (personalInfo.pwd == "Yes") {
      //   if (!inputScribe.validator.method(personalInfo.scribe)) {
      //     errorsPersonalInfo.scribe = "Please select Yes or No";
      //     inputValid = false;
      //   }
      //   if (personalInfo.PWDType == null || personalInfo.PWDType == "") {
      //     errorsPersonalInfo.PWDType = "You must select one of the pwbd type";
      //     inputValid = false;
      //   }
      // } else {
      //   errorsPersonalInfo.PWDType = null;
      //   personalInfo.PWDType = null;
      //   personalInfo.scribe = "No";
      //   errorsPersonalInfo.scribe = null;
      // }
      if (!inputExServiceman.validator.method(personalInfo.exserviceman)) {
        errorsPersonalInfo.exserviceman = "Exserviceman input is required";
        inputValid = false;
      }

      if (personalInfo.exserviceman == "Yes") {
        if (
          personalInfo.periodofservice == null ||
          personalInfo.periodofservice == ""
        ) {
          errorsPersonalInfo.periodofservice =
            "You must enter complete number of years";
          inputValid = false;
        }
      } else {
        errorsPersonalInfo.periodofservice = null;
        personalInfo.periodofservice = null;
      }

      if (
        !inputWidowOrDivorced.validator.method(personalInfo.widowOrDivorced)
      ) {
        errorsPersonalInfo.widowOrDivorced = " input is required";
        inputValid = false;
      }
      if (
        personalInfo.gender == "Female" &&
        !inputWidowOrDivorced.validator.method(personalInfo.widowOrDivorced)
      ) {
        errorsPersonalInfo.widowOrDivorced = " input is required";
        inputValid = false;
      } else {
        errorsPersonalInfo.widowOrDivorced = null;
      }

      if (!inputGovEmployee.validator.method(personalInfo.govemployee)) {
        errorsPersonalInfo.govemployee = " input is required";
        inputValid = false;
      }

      if (!inputGovEmployee.validator.method(personalInfo.govemployee)) {
        errorsPersonalInfo.govemployee = " input is required";
        inputValid = false;
      }

      if (personalInfo.category == "EWS") {
        if (personalInfo.annualincomeEWS == "No") {
          errorsPersonalInfo.annualincomeEWS =
            "Annual income is greater than 8 lack ,please select Gen category";
          inputValid = false;
        } else {
          errorsPersonalInfo.annualincomeEWS = null;
        }

        if (
          !inputEWSincomeCertificate.validator.method(
            personalInfo.annualincomeEWS
          )
        ) {
          errorsPersonalInfo.annualincomeEWS = "Please select yes or No";
          inputValid = false;
        }
      }

      if (personalInfo.govemployee == "Yes") {
        if (
          personalInfo.Kcbperiodofservice == null ||
          personalInfo.Kcbperiodofservice == ""
        ) {
          errorsPersonalInfo.Kcbperiodofservice =
            "You must enter complete number of years";
          inputValid = false;
        }
      } else {
        errorsPersonalInfo.Kcbperiodofservice = null;
        personalInfo.Kcbperiodofservice = null;
      }

      // if (!inputMeityEmployee.validator.method(personalInfo.meityemployee)) {
      //   errorsPersonalInfo.meityemployee = " input is required";
      //   inputValid = false;
      // }
      console.log("inputValid is:", inputValid);

      if (!inputValid) return false;
      personalInfo.dob = inputDOB.getDOB();
      console.log("personalInfo.dob", personalInfo.dob);

      return true;
    } catch (e) {
      console.log("exception in validating errors PersionalInfo:", e);
    }
  };
  onMount(() => {
    if (validateComponent == null) validateComponent = validatePersonalInfo;
  });
</script>

<div class="p-3 mt-5 lg:ml-40 lg:mr-40 mb-3 rounded-lg shadow-lg">
  <div class="text-xs lg:text-base xl:text-base 2xl:text-base ">
    <div class="flex flex-col bg-orange- h-auto ml-4 mr-4 mt-3 rounded-lg ">
      <div
        class="flex flex-row bg-orange-400 text-white text-2xl font-bold p-2 rounded-t-lg capitalize"
      >
        Personal Information
      </div>
      <div class=" ">
        <div
          class="grid grid-cols-3  mx-4 bg-orange- rounded px-4 pb-4 shadow-lg justify-between"
        >
          <div class="col-span-3 md:col-span-1 md:p-1">
            <TextInput
              bind:label={inputName.label}
              bind:value={personalInfo.name}
              validate={inputName.validate}
              readonly={inputName.readonly}
              bind:error={errorsPersonalInfo.name}
              placeholderValue={inputName.placeholderValue}
              error_mt={inputName.error_mt}
              bind:paddingsize={inputName.paddingsize}
              validator={inputName.validator}
            />
          </div>
          <!-- <div class="col-span-3 md:col-span-1 md:p-1">
            <TextInput
              bind:label={inputpresentName.label}
              bind:value={personalInfo.presentName}
              validate={inputpresentName.validate}
              readonly={inputpresentName.readonly}
              bind:error={errorsPersonalInfo.presentName}
              placeholderValue={inputpresentName.placeholderValue}
              error_mt={inputpresentName.error_mt}
              bind:paddingsize={inputpresentName.paddingsize}
              validator={inputpresentName.validator}
            />
          </div> -->
          <div class="col-span-3 md:col-span-1 md:p-1">
            <TextInput
              bind:label={inputFathersName.label}
              bind:value={personalInfo.fathersName}
              validate={inputFathersName.validate}
              readonly={inputFathersName.readonly}
              bind:error={errorsPersonalInfo.fathersName}
              placeholderValue={inputFathersName.placeholderValue}
              error_mt={inputFathersName.error_mt}
              bind:paddingsize={inputFathersName.paddingsize}
              validator={inputFathersName.validator}
            />
          </div>
          <div class="col-span-3 md:col-span-1 md:mt-1 md:p-1">
            <DateInput
              label={inputDOB.label}
              bind:value={personalInfo.dob}
              bind:error={errorsPersonalInfo.dob}
              validator={inputDOB.validator}
            />
            <div class="text-xs px-2">{currentAge}</div>
          </div>
        </div>
        <div class="m-3  rounded-lg p-2 shadow-lg">
          <div class=" grid grid-cols-6 justify-between px-2">
            <div class="col-span-6 md:col-span-1 p-1">
              <InputRadioGroup
                label={inputNationality.label}
                options={inputNationality.options}
                bind:value={personalInfo.nationality}
                bind:error={errorsPersonalInfo.nationality}
                bind:validator={inputNationality.validator}
              />
            </div>
            <!-- <div class="col-span-6 md:col-span-3 justify-between p-1">
              <InputRadioGroup
                label={inputReligion.label}
                options={inputReligion.options}
                bind:value={personalInfo.religion}
                bind:error={errorsPersonalInfo.religion}
                bind:validator={inputReligion.validator}
              />
            </div> -->
            <div class="col-span-6 md:col-span-2 p-1">
              <InputRadioGroup
                label={inputCategory.label}
                options={inputCategory.options}
                bind:value={personalInfo.category}
                bind:error={errorsPersonalInfo.category}
                bind:validator={inputCategory.validator}
              />
            </div>
            {#if personalInfo.category === "EWS"}
              <div class="col-span-6 md:col-span-2 p-1">
                <InputRadioGroup
                  label={inputEWSincomeCertificate.label}
                  options={inputEWSincomeCertificate.options}
                  bind:value={personalInfo.annualincomeEWS}
                  bind:error={errorsPersonalInfo.annualincomeEWS}
                  bind:validator={inputEWSincomeCertificate.validator}
                />
              </div>
            {/if}

            <div class="col-span-6 md:col-span-2 p-1">
              <InputRadioGroup
                label={inputGender.label}
                options={inputGender.options}
                bind:value={personalInfo.gender}
                bind:error={errorsPersonalInfo.gender}
                bind:validator={inputGender.validator}
              />
            </div>

            {#if personalInfo.gender === "Female"}
              <div class="col-span-6 md:col-span-2 p-1">
                <InputRadioGroup
                  moreinfo={"Widowed/Divorced/Judicially Seperated"}
                  label={inputWidowOrDivorced.label}
                  options={inputWidowOrDivorced.options}
                  bind:value={personalInfo.widowOrDivorced}
                  bind:error={errorsPersonalInfo.widowOrDivorced}
                  bind:validator={inputWidowOrDivorced.validator}
                />
              </div>
            {/if}

            <div class="col-span-6 md:col-span-2 p-1">
              <InputRadioGroup
                label={inputPWD.label}
                options={inputPWD.options}
                bind:value={personalInfo.pwd}
                bind:error={errorsPersonalInfo.pwd}
                bind:validator={inputPWD.validator}
              />
            </div>
            {#if personalInfo.pwd === "Yes"}
              <div class="col-span-6 md:col-span-2 p-1 ">
                <InputRadioGroup
                  label={inputPWDType.label}
                  options={inputPWDType.options}
                  bind:value={personalInfo.PWDType}
                  bind:error={errorsPersonalInfo.PWDType}
                  bind:validator={inputPWDType.validator}
                />
              </div>

              <!-- <div class="col-span-6 md:col-span-2 p-1">
                <InputRadioGroup
                  label={inputScribe.label}
                  options={inputScribe.options}
                  bind:value={personalInfo.scribe}
                  bind:error={errorsPersonalInfo.scribe}
                  bind:validator={inputScribe.validator}
                />
              </div> -->
            {/if}

            <div class="col-span-6 md:col-span-2 p-1">
              <InputRadioGroup
                label={inputMarriedStatus.label}
                options={inputMarriedStatus.options}
                bind:value={personalInfo.Married_Status}
                bind:error={errorsPersonalInfo.Married_Status}
                bind:validator={inputMarriedStatus.validator}
              />
            </div>

            <div class="col-span-6 md:col-span-2 p-1">
              <InputRadioGroup
                label={inputExServiceman.label}
                options={inputExServiceman.options}
                bind:value={personalInfo.exserviceman}
                bind:error={errorsPersonalInfo.exserviceman}
                bind:validator={inputExServiceman.validator}
              />
            </div>
            {#if personalInfo.exserviceman === "Yes"}
              <div class="col-span-6 md:col-span-2 p-1 ">
                <TextInput
                  bind:label={inputPeriodofservice.label}
                  validate={inputPeriodofservice.validate}
                  readonly={inputPeriodofservice.readonly}
                  placeholderValue={inputPeriodofservice.placeholderValue}
                  error_mt={inputPeriodofservice.error_mt}
                  bind:value={personalInfo.periodofservice}
                  bind:paddingsize={inputPeriodofservice.paddingsize}
                  bind:error={errorsPersonalInfo.periodofservice}
                  bind:validator={inputPeriodofservice.validator}
                />
                <!-- <div class="text-xs">*Other category covers Autism, intellectual disability, specific learning disability and mental illness</div> -->
              </div>
            {/if}

            <!-- goverment Employee -->
            <div class="col-span-6 md:col-span-2 p-1">
              <InputRadioGroup
                label={inputGovEmployee.label}
                options={inputGovEmployee.options}
                bind:value={personalInfo.govemployee}
                bind:error={errorsPersonalInfo.govemployee}
                bind:validator={inputGovEmployee.validator}
              />
            </div>

            {#if personalInfo.govemployee === "Yes"}
              <div class="col-span-6 md:col-span-2 p-1 ">
                <TextInput
                  bind:label={inputKcbperiodofservice.label}
                  validate={inputKcbperiodofservice.validate}
                  readonly={inputKcbperiodofservice.readonly}
                  placeholderValue={inputKcbperiodofservice.placeholderValue}
                  error_mt={inputKcbperiodofservice.error_mt}
                  bind:value={personalInfo.Kcbperiodofservice}
                  bind:paddingsize={inputPeriodofservice.paddingsize}
                  bind:error={errorsPersonalInfo.Kcbperiodofservice}
                  bind:validator={inputKcbperiodofservice.validator}
                />
                <!-- <div class="text-xs">*Other category covers Autism, intellectual disability, specific learning disability and mental illness</div> -->
              </div>
            {/if}

            <div class=" col-span-6 md:col-span-4 p-1  ">
              <InputRadioGroup
                label={inputKCBrelatedEmployee.label}
                options={inputKCBrelatedEmployee.options}
                bind:value={personalInfo.KCBrelatedEmployee}
                bind:error={errorsPersonalInfo.KCBrelatedEmployee}
                bind:validator={inputKCBrelatedEmployee.validator}
              />
            </div>

            {#if personalInfo.KCBrelatedEmployee === "Yes"}
              <div class="col-span-6 md:col-span-2 md:p-1 ">
                <TextInput
                  bind:label={inputKCBrelatedName.label}
                  bind:value={personalInfo.kcbRelatedName}
                  validate={inputKCBrelatedName.validate}
                  bind:error={errorsPersonalInfo.kcbRelatedName}
                  placeholderValue={inputKCBrelatedName.placeholderValue}
                  error_mt={inputKCBrelatedName.error_mt}
                  bind:paddingsize={inputKCBrelatedName.paddingsize}
                  validator={inputKCBrelatedName.validator}
                />
              </div>

              <div class="col-span-6 md:col-span-2 md:p-1">
                <TextInput
                  bind:label={inputDesignation.label}
                  bind:value={personalInfo.kcbRelatedDesignation}
                  validate={inputDesignation.validate}
                  readonly={inputDesignation.readonly}
                  bind:error={errorsPersonalInfo.kcbRelatedDesignation}
                  placeholderValue={inputDesignation.placeholderValue}
                  error_mt={inputDesignation.error_mt}
                  bind:paddingsize={inputDesignation.paddingsize}
                  validator={inputDesignation.validator}
                />
              </div>
            {/if}

            <!-- <div class="col-span-6 md:col-span-2 p-1">
              <InputRadioGroup
                moreinfo={"CMET/ MeitY Employee From Last 3 Years"}
                label={inputMeityEmployee.label}
                options={inputMeityEmployee.options}
                bind:value={personalInfo.meityemployee}
                bind:error={errorsPersonalInfo.meityemployee}
                bind:validator={inputMeityEmployee.validator}
              />
            </div> -->
          </div>
        </div>
        <div class="text-xs font-semibold">
          Note: OA: <span class="font-normal">One Arm</span>; LC:
          <span class="font-normal">Leprosy Cured</span>
          AAV: <span class="font-normal">Acid Attack Victim</span>, HH:
          <span class="font-normal">Hard of Hearing</span>, OL:<span
            class="font-normal">One Leg</span
          >
          , LV: <span class="font-normal">Low Vision</span>
          ,DWF: <span class="font-normal">Dwarfism</span>
        </div>
        <div
          class="m-4  rounded p-2 shadow-lg grid grid-cols-1 lg:grid-cols-4 "
        >
          <div class="col-span-2  px-2">
            <TextInput
              bind:label={inputEmail.label}
              bind:value={personalInfo.email}
              validate={inputEmail.validate}
              readonly={inputEmail.readonly}
              bind:error={errorsPersonalInfo.email}
              placeholderValue={inputEmail.placeholderValue}
              error_mt={inputEmail.error_mt}
              bind:paddingsize={inputEmail.paddingsize}
            />
          </div>
          <div class="col-span-2 px-2">
            <TextInput
              bind:label={inputMobile.label}
              bind:value={inputMobile.value}
              validate={inputMobile.validate}
              readonly={inputMobile.readonly}
              bind:error={errorsPersonalInfo.mobile}
              placeholderValue={inputMobile.placeholderValue}
              error_mt={inputMobile.error_mt}
              bind:paddingsize={inputMobile.paddingsize}
              validator={inputMobile.validator}
            />
          </div>

          <div class="col-span-2 px-2">
            <TextInput
              bind:label={inputAlternativeMobile.label}
              bind:value={personalInfo.alternativeMobileNo}
              validate={inputAlternativeMobile.validate}
              bind:error={errorsPersonalInfo.alternativeMobileNo}
              placeholderValue={inputAlternativeMobile.placeholderValue}
              error_mt={inputAlternativeMobile.error_mt}
              bind:paddingsize={inputAlternativeMobile.paddingsize}
              validator={inputAlternativeMobile.validator}
            />
          </div>
          <!-- <div class="col-span-6 md:col-span-1 p-1">
            <InputRadioGroup
              label={inputExceptionalClaim.label}
              options={inputExceptionalClaim.options}
              bind:value={personalInfo.exceptionalCandidate}
              bind:error={errorsPersonalInfo.exceptionalCandidate}
              bind:validator={inputExceptionalClaim.validator}
            />
            <div class="text-xs">
              If you want to claim exceptional candidate cliam for age
              relaxation click "yes"
            </div>
          </div> -->
          {#if personalInfo.exceptionalCandidate == "Yes"}
            <div class="col-span-1 px-2">
              <TextInput
                bind:label={inputExceptionalJustification.label}
                bind:value={personalInfo.exceptionalCandidateJustification}
                validate={inputExceptionalJustification.validate}
                readonly={inputExceptionalJustification.readonly}
                bind:error={errorsPersonalInfo.exceptionalCandidateJustification}
                placeholderValue={inputExceptionalJustification.placeholderValue}
                error_mt={inputExceptionalJustification.error_mt}
                bind:paddingsize={inputExceptionalJustification.paddingsize}
                validator={inputExceptionalJustification.validator}
              />
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>
