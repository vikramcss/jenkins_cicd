<script>
  import Fa from "svelte-fa";
  import InputRadioGroup from "../../common/InputRadioGroup.svelte";
  import { faEdit } from "@fortawesome/free-solid-svg-icons";
  import TextInput from "../../common/TextInput.svelte";
  import { createEventDispatcher } from "svelte";
  import DropDown from "../../common/TwoDDropdown.svelte";
  import DateInput from "../../common/DateInput.svelte";
  import Alert from "../../common/Alert.svelte";
  import { format, cardNumber } from "./inputmmyyyyFormat";
  const dispatch = createEventDispatcher();
  export let essentialQualification = {};
  export let showModal;
  export let index;
  
  console.log('essentialQualification: ', essentialQualification)
  const qualificationOptions = {
    Qualifications: ["Graduation", "English Typing 40", "Hindi Typing 30"],
  };

  const graduationStreamOptions = {
    Qualifications: ["B.A.", "B.Sc", "B.Com", "B.Ed", "B.E", "Other"],
  };
  const typingCertificateOptions = {
    Qualifications: [
      "Government Commercial Certificate",
      "Computer Typing Certificate",
    ],
  };
  const certifyingAuthrityOptions = {
    Qualifications: ["Maharshtra State Council of Examinations", "Other"],
  };

  let inputGraduationStream = {
    graduationStreamOptions,
    selected: essentialQualification.degree,
    error: null,
    validator: {
      method: () => {
        inputQualification.error =
          inputQualification.selected.length === 0
            ? inputQualification.validator.errormessage
            : null;
        return inputQualification.error ? false : true;
      },
      errormessage: "Graduation stream is mandatory",
    },
  };

  let inputCertifyingAuthority = {
    certifyingAuthrityOptions,
    selected: essentialQualification.certifyingAuthority,
    error: null,
    validator: {
      method: () => {
        inputQualification.error =
          inputQualification.selected.length === 0
            ? inputQualification.validator.errormessage
            : null;
        return inputQualification.error ? false : true;
      },
      errormessage: "Graduation stream is mandatory",
    },
  };
  let inputTypingCertificateType = {
    typingCertificateOptions,
    selected: essentialQualification.certificateType ,
    error: null,
    validator: {
      method: () => {
        inputQualification.error =
          inputQualification.selected.length === 0
            ? inputQualification.validator.errormessage
            : null;
        return inputQualification.error ? false : true;
      },
      errormessage: "Graduation stream is mandatory",
    },
  };

  let inputQualification = {
    qualificationOptions,
    selected: essentialQualification.qualification,
    error: null,
    validator: {
      method: () => {
        inputQualification.error =
          inputQualification.selected.length === 0
            ? inputQualification.validator.errormessage
            : null;
        return inputQualification.error ? false : true;
      },
      errormessage: "Qualification is required",
    },
  };
  let inputCertifyingAuthorityOther = {
    label: "Provide Typing Certifying Authority",
    value: essentialQualification.certifyingAuthorityOther,
    validate: true,
    readonly: false,
    error: null,
    placeholderValue: "Typing Certifying Authority",
    error_mt: false,
    paddingsize: 0,
    validator: {
      method: (value) => {
        inputCertifyingAuthorityOther.error = null;
        if (value.length <= 3) {
          inputCertifyingAuthorityOther.error =
            "Certifying Authority can not be empty";
          return false;
        }
        return true;
      },
      errormessage: "Certifying Authority can not be empty",
    },
  };
  // const qualificationChanged = (qualification) => {
  //   switch (qualification) {
  //     case "Graduation":
  //       inputSubject.subjectOptions = subjectOptionsBsc;
  //       inputSubject.selected = "";
  //       break;
  //     case "English Typing 40":
  //       inputSubject.subjectOptions = subjectOptionsMsc;
  //       inputSubject.selected = "";

  //       break;
  //     case "Diploma":
  //       inputSubject.subjectOptions = subjectOptionsDiploma;
  //       inputSubject.selected = "";

  //       break;
  //     case "Engginering":
  //       inputSubject.subjectOptions = subjectOptionsEngineering;
  //       inputSubject.selected = "";

  //       break;
  //   }
  // };
  // $: qualificationChanged(inputQualification.selected);
  const subjectOptions = {
    subjects: [
      // "B.A. (Bachelor of Arts)",
      // "B.Com. (Bachelor of Commerce)",
      // "B.Sc. (Bachelor of Science)",
      // "B.Ed. (Bachelor of Education)",
      // "B.A.-B.Ed. Integrated Course",
      // "B.Sc.-B.Ed. Integrated Course",
      // "Mechanical",
      // "Electrical Engg.",
      // "Electronics",
    ],
  };
  const subjectOptionsBsc = {
    subjects: ["BA", "BE", "B.COM", "BSC", "Other"],
  };
  const subjectOptionsMsc = {
    subjects: ["Government", "Other"],
  };
  const subjectOptionsDiploma = {
    subjects: [
      "Chemical Engg.",
      "Metallurgy",
      "Ceramics",
      "Mechanical",
      "Electrical Engg.",
      "Electronics",
    ],
  };
  const subjectOptionsEngineering = {
    subjects: [
      "Chemical Engg.",
      "Metallurgy",
      "Ceramics",
      "Mechanical",
      "Electrical Engg.",
      "Electronics",
    ],
  };

  // let inputSubject = {
  //   subjectOptions,
  //   selected: "",
  //   error: null,
  //   validator: {
  //     method: () => {
  //       console.log("subject length is: ", inputSubject.selected);
  //       inputSubject.error =
  //         inputSubject.selected.length === 0
  //           ? inputSubject.validator.errormessage
  //           : null;
  //       return inputSubject.error ? false : true;
  //     },
  //     errormessage: "Subject is required",
  //   },
  // };
  let inputUniversity = {
    label: "University/Institute",
    value: essentialQualification.university,
    validate: true,
    readonly: false,
    error: null,
    placeholderValue: "University/Institute",
    error_mt: false,
    paddingsize: 0,
    validator: {
      method: (value) => {
        inputUniversity.error = null;
        if (value.length <= 3) {
          inputUniversity.error = "University/institute can not be empty";
          return false;
        }
        return true;
      },
      errormessage: "University/institute can not be empty",
    },
  };
    // todo
  let inputOther = {
    label: "Name Of degree",
    value: essentialQualification.otherDegree,
    validate: true,
    readonly: false,
    error: null,
    placeholderValue: "Name Of degree",
    error_mt: false,
    paddingsize: 0,
    validator: {
      method: (value) => {
        inputOther.error = null;
        if (value.length < 2) {
          inputOther.error = "Name of Degree can not be empty";
          return false;
        }
        return true;
      },
      errormessage: "Name of Degree can not be empty",
    },
  };
  let inputTypingAthorityOther = {
    label: "Name of Certifying Authority",
    value: "",
    validate: true,
    readonly: false,
    error: null,
    placeholderValue: "Name Of degree",
    error_mt: false,
    paddingsize: 0,
    validator: {
      method: (value) => {
        inputUniversity.error = null;
        if (value.length <= 3) {
          inputUniversity.error = "Name of Degree can not be empty";
          return false;
        }
        return true;
      },
      errormessage: "Name of Degree can not be empty",
    },
  };
  let inputYearOfPassing = {
    label: "Year of Passing",
    value: essentialQualification.yearOfPassing,
    validate: true,
    readonly: false,
    error: null,
    placeholderValue: "Year of Passing",
    error_mt: false,
    paddingsize: 0,
    validator: {
      method: (value) => {
        inputYearOfPassing.error = null;
        let val = Number(value);
        if (isNaN(val)) {
          inputYearOfPassing.error = inputYearOfPassing.validator.errormessage;
          return false;
        }
        if (val > 2023 || val < 1980) {
          inputYearOfPassing.error =
            "Year of passing should be between 1980 and 2023";
          return false;
        }
        return true;
      },
      errormessage: "Year of passing should be between 1980 and 2023",
    },
  };
  // marks type
  let inputMarksType = {
    label: "Marks Type",
    value: essentialQualification.marksType,
    options: ["Percentage", "CGPA"],
    error: null,
    validator: {
      method: (value) => {
        return inputMarksType.options.find((o) => o == value);
      },
      errormessage: "Enter marks must",
    },
  };

  let inputMarks = {
    label: "Marks Obtained",
    value: essentialQualification.marksType == 'Percentage'? essentialQualification.evaluation?.percentage.marks: '',
    validate: true,
    readonly: false,
    error: null,
    placeholderValue: "Marks Obtained",
    error_mt: false,
    paddingsize: 0,
    validator: {
      method: (value) => {
        inputMarks.error = null;
        let val = Number(value);
        if (isNaN(val) || value === null || value === "") {
          inputMarks.error = inputMarks.validator.errormessage;
          return false;
        }
        return true;
      },
      errormessage: "marks should be number",
    },
  };
  let inputPercentage = {
    label: "Percentage",
    value: essentialQualification.marksType == 'Percentage'? essentialQualification.evaluation?.percentage.percentage: '',
    validate: true,
    readonly: false,
    error: null,
    placeholderValue: "Percentage",
    error_mt: false,
    paddingsize: 0,
    validator: {
      method: (value) => {
        inputPercentage.error = null;
        let val = Number(value);
        if (isNaN(val) || value === null || value === "") {
          inputPercentage.error = inputPercentage.validator.errormessage;
          return false;
        }
        if (val > 100 || val < 0) {
          inputPercentage.error = "percentage should be between 0 and 100";
          return false;
        }
        return true;
      },
      errormessage: "percentage should be between 0 and 100",
    },
  };

  let inputMonth = {
    label: "Passing Month",
    value: essentialQualification.examMonth,
    validate: true,
    readonly: false,
    error: null,
    placeholderValue: "Passing Month",
    error_mt: false,
    paddingsize: 0,
    validator: {
      method: (value) => {
        inputMonth.error = null;
        let val = Number(value);
        if (isNaN(val) || value === null || value === "") {
          inputMonth.error = inputMonth.validator.errormessage;
          return false;
        }
        if (val < 1 || val > 12) {
          return false;
        }
        return true;
      },
      errormessage: "Passing Month has to be between 01 and 12",
    },
  };

  let inputYear = {
    label: "Passing Year",
    value: essentialQualification.examYear,
    validate: true,
    readonly: false,
    error: null,
    placeholderValue: "Passing Year",
    error_mt: false,
    paddingsize: 0,
    validator: {
      method: (value) => {
        inputYear.error = null;
        let val = Number(value);
        if (isNaN(val) || value === null || value === "") {
          inputYear.error = inputYear.validator.errormessage;
          return false;
        }
        if (value.length > 4) {
          inputYear.error = "Enter Currect Year";
          return false;
        }
        if (val < 1980 || val > 2023) {
          return false;
        }
        return true;
      },
      errormessage:
        "Enter four digit year in YYYY format between 1980 and 2023",
    },
  };

  let inputGradeOrMarks = {
    label: "Grade or Marks",
    value: essentialQualification.gradeOrMarks,
    validate: true,
    readonly: false,
    error: null,
    placeholderValue: "Grade or Marks",
    error_mt: false,
    paddingsize: 0,
    validator: {
      method: (value) => {
        inputGradeOrMarks.error = null;
        let val = value;
        if (value === null || value === "") {
          inputGradeOrMarks.error = inputGradeOrMarks.validator.errormessage;
          return false;
        }
        if (val.length < 1) return false;
        return true;
      },
      errormessage: "Grade or Marks can not be Empty",
    },
  };

  let inputSeatNumber = {
    label: "Seat no./Roll No./Certificate No.",
    value: essentialQualification.seatNumber,
    validate: true,
    readonly: false,
    error: null,
    placeholderValue: "Seat no./Roll No./Certificate No.",
    error_mt: false,
    paddingsize: 0,
    validator: {
      method: (value) => {
        inputSeatNumber.error = null;
        let val = value;
        if (value === null || value === "") {
          inputSeatNumber.error = inputSeatNumber.validator.errormessage;
          return false;
        }
        if (val.length < 1) return false;
        return true;
      },
      errormessage: "Seat no./Roll No./Certificate No. can not be Empty",
    },
  };

  // cgpa
        // essentialQualification.evaluation = {
        //   percentage: {
        //     marks: inputMarks.value,
        //     percentage: inputPercentage.value,
        //   },
  let inputCGPA = {
    label: "CGPA",
    value: essentialQualification.marksType == 'Percentage'? '' : essentialQualification.evaluation?.cgpa.gpa,
    validate: true,
    readonly: false,
    error: null,
    placeholderValue: "CGPA",
    error_mt: false,
    paddingsize: 0,
    validator: {
      method: (value) => {
        inputCGPA.error = null;
        let val = Number(value);
        if (isNaN(val) || value === null || value === "") {
          inputCGPA.error = inputCGPA.validator.errormessage;
          return false;
        }
        if (val > 100 || val < 0) {
          inputCGPA.error = "CGPA should be a number";
          return false;
        }
        return true;
      },
      errormessage: "CGPA should be a number",
    },
  };
  let inputDateOfAward = {
    label: "Date of Award",
    value: "",
    validate: true,
    readonly: false,
    error: null,
    placeholderValue: "Date of Award",
    error_mt: false,
    paddingsize: 0,
    validator: {
      method: (value) => {
        inputDateOfAward.error = null;
        return true;
      },
      errormessage: "Please enter date of award in dd-mm-yyyy format",
    },
  };
  const validatePhD = () => {
    if (!inputDateOfAward.validator.method(inputDateOfAward.value)) {
      return false;
    }
    return true;
  };
  const validateMarks = () => {
    let valid = true;
    if (inputMarksType.value === "Percentage") {
      if (!inputMarks.validator.method(inputMarks.value)) {
        valid = false;
      }
      if (!inputPercentage.validator.method(inputPercentage.value)) {
        valid = false;
      }
      if (!valid) return false;
    } else {
      if (!inputCGPA.validator.method(inputCGPA.value)) {
        valid = false;
      }
    }
    if(inputGraduationStream.selected == "") return false
    return true;
  };

  const validate = () => {
    let valid = true;
    if (!inputQualification.validator.method()) {
      valid = false;
    }
    // if (!inputSubject.validator.method()) {
    //   valid = false;
    // }
    if (inputQualification.selected == "Graduation") {
      if (!inputUniversity.validator.method(inputUniversity.value)) {
        valid = false;
      }
      if (!inputYearOfPassing.validator.method(inputYearOfPassing.value)) {
        valid = false;
      }
      if(!validateMarks()) {
        valid = false;
      }
    } else if (
      inputQualification.selected == "English Typing 40" ||
      inputQualification.selected == "Hindi Typing 30"
      ) {
      // 1. certificate type
      if (
        inputTypingCertificateType.selected !=
          "Government Commercial Certificate" &&
        inputTypingCertificateType.selected != "Computer Typing Certificate"
      ) {
        valid = false;
      }
      if (
        inputCertifyingAuthority.selected !=
          "Maharshtra State Council of Examinations" &&
        inputCertifyingAuthority.selected != "Other"
      ) {
        valid = false;
      }
      if (inputCertifyingAuthority.selected == "Other") {
        if (
          !inputCertifyingAuthorityOther.validator.method(
            inputCertifyingAuthorityOther.value
          )
        ) {
          valid = false;
        }
      }
      if (!inputMonth.validator.method(inputMonth.value)) {
        valid = false;
      }
      if (!inputYear.validator.method(inputYear.value)) {
        valid = false;
      }
      if (!inputGradeOrMarks.validator.method(inputGradeOrMarks.value)) {
        valid = false;
      }
      if (!inputSeatNumber.validator.method(inputSeatNumber.value)) {
        valid = false;
      }

      return valid;
    }
    return valid;
  };
  let alertMessage = null;
  const save = () => {
    alertMessage = null;
    if (!validate()) {
      if (inputQualification.selected == "") {
        alertMessage = "please select qualificaiton";
        return false;
      }
      if (inputQualification.selected == "Graduation") {
        if(inputGraduationStream.selected == "") {
          alertMessage = alertMessage
            ? `${alertMessage} please select Graduation degree`
            : "please select Graduation degree";
        }
      }
      if (
      inputQualification.selected == "English Typing 40" ||
      inputQualification.selected == "Hindi Typing 30"
        ) {
        if (inputTypingCertificateType.selected == "") {
          alertMessage = alertMessage
            ? `${alertMessage} please select Typing certificate`
            : "please select Typing certificate";
        }
        if (inputCertifyingAuthority.selected == "") {
          alertMessage = alertMessage
            ? `${alertMessage} please select certifying authority`
            : "please select certifying authority";
        }
      }
      return false;
    }
    return true;
  };

  function toggleModal({ op }) {
    if (op === "save" && !save()) {
      return false;
    }
    console.log("toggleModal called: ", op);
    showModal = !showModal;
    console.log("toggleModal called op: ", op, "showModal:", showModal);
    if (op === "cancel") return true;
    if (inputQualification.selected == "Graduation") {
      let essentialQualification = {
        qualification: inputQualification.selected,
        degree : inputGraduationStream.selected,
        otherDegree: inputOther.value,
        university: inputUniversity.value,
        yearOfPassing: inputYearOfPassing.value,
        marksType: inputMarksType.value,
        evaluation: {},
      };
      if (inputMarksType.value === "Percentage") {
        essentialQualification.evaluation = {
          percentage: {
            marks: inputMarks.value,
            percentage: inputPercentage.value,
          },
        };
      } else {
        essentialQualification.evaluation = {
          cgpa: { gpa: inputCGPA.value },
        };
      }
      dispatch("edit", { essentialQualification, index });
    } else if (
      inputQualification.selected == "English Typing 40" ||
      inputQualification.selected == "Hindi Typing 30"
      ) {
      console.log('about dispatch :' )
      let essentialQualification = {
        qualification: inputQualification.selected,
        certificateType: inputTypingCertificateType.selected,
        certifyingAuthority: inputCertifyingAuthority.selected,
        certifyingAuthorityOther: inputCertifyingAuthorityOther.value,
        examMonth: inputMonth.value,
        examYear: inputYear.value,
        gradeOrMarks: inputGradeOrMarks.value,
        seatNumber: inputSeatNumber.value,
      };
      console.log("essentialQualification IS:.../",essentialQualification)
      dispatch("edit", { essentialQualification, index });
    }
    return true;
  }
</script>

{#if showModal}
  <div
    class="overflow-x-hidden  overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex"
  >
    <div class="relative w-auto my-6 mx-auto flex justify-center">
      <!--content-->
      <div
        class="border-0 rounded-lg shadow-lg relative flex flex-col w-8/12 md:w-full md:ml-0 mt-28 md:mt-1 bg-white outline-none focus:outline-none"
      >
        <!--header-->
        <div
          class="flex items-strat justify-between p-5 border-b border-solid border-orange-200 rounded-t"
        >
          <h3 class="text-3xl font-semibold">Edit Essential Qualification</h3>

          <div class=" text-gray-600">
            <Fa icon={faEdit} size="3x" />
          </div>
        </div>
        <!--body-->
        <div class="relative p-6">
          <div class="grid grid-cols-1 md:grid-cols-2  md:gap-3 ">
            <DropDown
              lable="Qualification"
              dropdownOptions={inputQualification.qualificationOptions}
              bind:selected={inputQualification.selected}
            />
            {#if inputQualification.selected === "Graduation"}
              <DropDown
                lable="Graduation Degree"
                dropdownOptions={inputGraduationStream.graduationStreamOptions}
                bind:selected={inputGraduationStream.selected}
              />
              {#if inputGraduationStream.selected == "Other"}
                <TextInput
                  bind:label={inputOther.label}
                  bind:value={inputOther.value}
                  validate={inputOther.validate}
                  readonly={inputOther.readonly}
                  bind:error={inputOther.error}
                  placeholderValue={inputOther.placeholderValue}
                  error_mt={inputOther.error_mt}
                  bind:paddingsize={inputOther.paddingsize}
                  validator={inputOther.validator}
                />
              {/if}
              <TextInput
                bind:label={inputUniversity.label}
                bind:value={inputUniversity.value}
                validate={inputUniversity.validate}
                readonly={inputUniversity.readonly}
                bind:error={inputUniversity.error}
                placeholderValue={inputUniversity.placeholderValue}
                error_mt={inputUniversity.error_mt}
                bind:paddingsize={inputUniversity.paddingsize}
                validator={inputUniversity.validator}
              />
              <TextInput
                bind:label={inputYearOfPassing.label}
                bind:value={inputYearOfPassing.value}
                validate={inputYearOfPassing.validate}
                readonly={inputYearOfPassing.readonly}
                bind:error={inputYearOfPassing.error}
                placeholderValue={inputYearOfPassing.placeholderValue}
                error_mt={inputYearOfPassing.error_mt}
                bind:paddingsize={inputYearOfPassing.paddingsize}
                validator={inputYearOfPassing.validator}
              />

              <div class="col-span-1 md:col-span-2 flex justify-center">
                <InputRadioGroup
                  label={inputMarksType.label}
                  options={inputMarksType.options}
                  bind:value={inputMarksType.value}
                  bind:validator={inputMarksType.validator}
                  error={null}
                />
              </div>
              <div class="gap-2 col-span-1 md:col-span-2 ">
                {#if inputMarksType.value === "Percentage"}
                <div class=" md:flex justify-between md:gap-2" >
                    <TextInput
                      bind:label={inputMarks.label}
                      bind:value={inputMarks.value}
                      validate={inputMarks.validate}
                      readonly={inputMarks.readonly}
                      bind:error={inputMarks.error}
                      placeholderValue={inputMarks.placeholderValue}
                      error_mt={inputMarks.error_mt}
                      bind:paddingsize={inputMarks.paddingsize}
                      validator={inputMarks.validator}
                    />
                    <TextInput
                      bind:label={inputPercentage.label}
                      bind:value={inputPercentage.value}
                      validate={inputPercentage.validate}
                      readonly={inputPercentage.readonly}
                      bind:error={inputPercentage.error}
                      placeholderValue={inputPercentage.placeholderValue}
                      error_mt={inputPercentage.error_mt}
                      bind:paddingsize={inputPercentage.paddingsize}
                      validator={inputPercentage.validator}
                    />
                  </div>
                {:else}
                <div class="flex justify-between w-full">
                  <div class=" col-span-1 md:col-span-2">
                      <TextInput
                        bind:label={inputCGPA.label}
                        bind:value={inputCGPA.value}
                        validate={inputCGPA.validate}
                        readonly={inputCGPA.readonly}
                        bind:error={inputCGPA.error}
                        placeholderValue={inputCGPA.placeholderValue}
                        error_mt={inputCGPA.error_mt}
                        bind:paddingsize={inputCGPA.paddingsize}
                        validator={inputCGPA.validator}
                      />
                    </div>
                  </div>
                {/if}
              </div>
            {:else if 
            inputQualification.selected == "English Typing 40" || 
            inputQualification.selected == "Hindi Typing 30"
            }
              <DropDown
                lable="Type of Typing Certificate"
                dropdownOptions={inputTypingCertificateType.typingCertificateOptions}
                bind:selected={inputTypingCertificateType.selected}
              />
              <DropDown
                lable="Certifying Authority for Typing Certificate"
                dropdownOptions={inputCertifyingAuthority.certifyingAuthrityOptions}
                bind:selected={inputCertifyingAuthority.selected}
              />
              {#if inputCertifyingAuthority.selected == "Other"}
                <TextInput
                  bind:label={inputCertifyingAuthorityOther.label}
                  bind:value={inputCertifyingAuthorityOther.value}
                  validate={inputCertifyingAuthorityOther.validate}
                  readonly={inputCertifyingAuthorityOther.readonly}
                  bind:error={inputCertifyingAuthorityOther.error}
                  placeholderValue={inputCertifyingAuthorityOther.placeholderValue}
                  error_mt={inputCertifyingAuthorityOther.error_mt}
                  bind:paddingsize={inputCertifyingAuthorityOther.paddingsize}
                  validator={inputCertifyingAuthorityOther.validator}
                />
              {/if}

              <TextInput
                bind:label={inputMonth.label}
                bind:value={inputMonth.value}
                validate={inputMonth.validate}
                readonly={inputMonth.readonly}
                bind:error={inputMonth.error}
                placeholderValue={inputMonth.placeholderValue}
                error_mt={inputMonth.error_mt}
                bind:paddingsize={inputMonth.paddingsize}
                validator={inputMonth.validator}
              />

              <TextInput
                bind:label={inputYear.label}
                bind:value={inputYear.value}
                validate={inputYear.validate}
                readonly={inputYear.readonly}
                bind:error={inputYear.error}
                placeholderValue={inputYear.placeholderValue}
                error_mt={inputYear.error_mt}
                bind:paddingsize={inputYear.paddingsize}
                validator={inputYear.validator}
              />
              <TextInput
                bind:label={inputGradeOrMarks.label}
                bind:value={inputGradeOrMarks.value}
                validate={inputGradeOrMarks.validate}
                readonly={inputGradeOrMarks.readonly}
                bind:error={inputGradeOrMarks.error}
                placeholderValue={inputGradeOrMarks.placeholderValue}
                error_mt={inputGradeOrMarks.error_mt}
                bind:paddingsize={inputGradeOrMarks.paddingsize}
                validator={inputGradeOrMarks.validator}
              />
              <TextInput
                bind:label={inputSeatNumber.label}
                bind:value={inputSeatNumber.value}
                validate={inputSeatNumber.validate}
                readonly={inputSeatNumber.readonly}
                bind:error={inputSeatNumber.error}
                placeholderValue={inputSeatNumber.placeholderValue}
                error_mt={inputSeatNumber.error_mt}
                bind:paddingsize={inputSeatNumber.paddingsize}
                validator={inputSeatNumber.validator}
              />
            {/if}
          </div>
        </div>
        <div class="mx-5">
          {#if alertMessage}
            <Alert
              message={alertMessage}
              on:alertClosed={() => (alertMessage = null)}
            />
          {/if}
        </div>
        <div class="flex flex-row justify-center mb-4 mx-4">
          <button
            on:click={() => toggleModal({ op: "cancel" })}
            type="submit"
            class="w-48 text-center bg-indigo-50 hover:bg-white shadow-lg text-gray-500 font-bold py-2 px-4 rounded"
          >
            CANCEL
          </button>
          <button
            on:click={() => toggleModal({ op: "save" })}
            type="submit"
            class="w-48  text-center bg-orange-400 hover:bg-orange-500  shadow-lg text-white font-bold py-2 px-4 rounded"
          >
            SAVE
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="opacity-25 fixed inset-0 z-40 bg-black" />
{/if}
