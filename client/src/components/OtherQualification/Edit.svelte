<script>
  import Fa from "svelte-fa";
  import InputRadioGroup from "../../common/InputRadioGroup.svelte";
  import { faEdit } from "@fortawesome/free-solid-svg-icons";
  import TextInput from "../../common/TextInput.svelte";
  import { createEventDispatcher } from "svelte";
  import DropDown from "../../common/TwoDDropdown.svelte";
  import Alert from "../../common/Alert.svelte";
  const dispatch = createEventDispatcher();
  export let otherQualification = {};
  export let showModal;
  export let index;
  const qualificationOptions = {
    Qualifications: [
      "10th",
      "12th",
      "Diploma",
      "Graduation",
      "Post Graduation",
      "PhD",
      "Other",
    ],
  };
  const specialization12th = {
    Qualifications: ["Arts", "Commerce", "Science", "Other"],
  };

  const graduationStreamOptions = {
    Qualifications: ["B.A.", "B.Sc", "B.Com", "B.Ed", "B.E", "Other"],
  };

  let input12thSpecialization = {
    specialization12th,
    selected: otherQualification.twelthSpecialization,
    error: null,
    validator: {
      method: () => {
        input12thSpecialization.error =
          input12thSpecialization.selected.length === 0
            ? input12thSpecialization.validator.errormessage
            : null;
        return input12thSpecialization.error ? false : true;
      },
      errormessage: "12th Specialization is mandatory",
    },
  };

  let inputMarksTypeOther = {
    label: "Marks Type",
    value: otherQualification.marksType,
    options: ["Percentage", "CGPA/Grade"],
    error: null,
    validator: {
      method: (value) => {
        return inputMarksTypeOther.options.find((o) => o == value);
      },
      errormessage: "Enter marks must",
    },
  };

  let inputMarksOther = {
    label: "Marks Obtained",
    value: otherQualification.marks,
    validate: true,
    readonly: false,
    error: null,
    placeholderValue: "Marks Obtained",
    error_mt: false,
    paddingsize: 0,
    validator: {
      method: (value) => {
        inputMarksOther.error = null;
        let val = Number(value);
        if (isNaN(val) || value === null || value === "") {
          inputMarksOther.error = inputMarksOther.validator.errormessage;
          return false;
        }
        return true;
      },
      errormessage: "marks should be number",
    },
  };

  let inputPercentageOther = {
    label: "Percentage",
    value: otherQualification.percentage,
    validate: true,
    readonly: false,
    error: null,
    placeholderValue: "Percentage",
    error_mt: false,
    paddingsize: 0,
    validator: {
      method: (value) => {
        inputPercentageOther.error = null;
        let val = Number(value);
        if (isNaN(val) || value === null || value === "") {
          inputPercentageOther.error =
            inputPercentageOther.validator.errormessage;
          return false;
        }
        if (val > 100 || val < 0) {
          inputPercentageOther.error = "percentage should be between 0 and 100";
          return false;
        }
        return true;
      },
      errormessage: "percentage should be between 0 and 100",
    },
  };

  let inputCGPAOther = {
    label: "CGPA/Grade",
    value: otherQualification.cgpa,
    validate: true,
    readonly: false,
    error: null,
    placeholderValue: "CGPA/Grade",
    error_mt: false,
    paddingsize: 0,
    validator: {
      method: (value) => {
        inputCGPAOther.error = null;
        let val = Number(value);
        if (value === null || value === "") {
          inputCGPAOther.error = inputCGPAOther.validator.errormessage;
          return false;
        }
        if (val > 100 || val < 0) {
          inputCGPAOther.error = "CGPA Number should be a Less Than 100";
          return false;
        }
        return true;
      },  
      errormessage: "CGPA/Grade Can not be empty",
    },
  };

  let inputQualification = {
    qualificationOptions,
    selected: otherQualification.qualification,
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
  let inputSubject = {
    label: "Subject/Specialization",
    value: otherQualification.subject,
    validate: true,
    readonly: false,
    error: null,
    placeholderValue: "Subject/Specialization",
    error_mt: false,
    paddingsize: 0,
    validator: {
      method: (value) => {
        inputSubject.error = null;
        if (value.length < 1) {
          inputSubject.error = "Subject/Specialization can not be empty";
          return false;
        }
        return true;
      },
      errormessage: "Subject/Specialization can not be empty",
    },
  };
  let inputDegree = {
    label: "Degree",
    value: otherQualification.degree,
    validate: true,
    readonly: false,
    error: null,
    placeholderValue: "Degree",
    error_mt: false,
    paddingsize: 0,
    validator: {
      method: (value) => {
        inputDegree.error = null;
        if (value.length < 1) {
          inputDegree.error = "Degree can not be empty";
          return false;
        }
        return true;
      },
      errormessage: "Degree can not be empty",
    },
  };

  let inputUniversity = {
    label: "University/Board",
    value: otherQualification.university,
    validate: true,
    readonly: false,
    error: null,
    placeholderValue: "University/Board",
    error_mt: false,
    paddingsize: 0,
    validator: {
      method: (value) => {
        inputUniversity.error = null;
        if (value.length < 3) {
          inputUniversity.error = "University/Board can not be empty";
          return false;
        }
        return true;
      },
      errormessage: "University/Board can not be empty",
    },
  };

  let inputDateOfAward = {
    label: "Date of Award",
    value: otherQualification.dateOfAward,
    validate: true,
    readonly: false,
    error: null,
    placeholderValue: "Date of Award",
    error_mt: false,
    paddingsize: 0,
    validator: {
      method: (value) => {
        inputDateOfAward.error = null;
        if (value.length < 3) {
          inputDateOfAward.error = "Date of Award can not be empty";
          return false;
        }
        return true;
      },
      errormessage: "Date of Award can not be empty",
    },
  };
  let inputYearOfPassing = {
    label: "Year of Passing",
    value: otherQualification.yearOfPassing,
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
  let inputMarks = {
    label: "Marks Obtained",
    value: otherQualification.marks,
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
    value: otherQualification.percentage,
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
  const validate = () => {
    let valid = true;
    if (!inputQualification.validator.method()) {
      console.log("validate false ##1");
      valid = false;
    }
    if (
      inputQualification.selected == "Diploma" &&
      !inputSubject.validator.method(inputSubject.value)
    ) {
      console.log("validate false ##3");
      valid = false;
    }

    if (
      inputQualification.selected == "12th" &&
      !input12thSpecialization.validator.method()
    ) {
      console.log("validate false ##3");
      valid = false;
    }
    if (!inputUniversity.validator.method(inputUniversity.value)) {
      console.log("validate false ##4");
      valid = false;
    }
    if (inputQualification.selected != "PhD") {
      if (!inputYearOfPassing.validator.method(inputYearOfPassing.value)) {
        console.log("validate false ##5");
        valid = false;
      }
      if (inputMarksTypeOther.value == "Percentage") {
        if (!inputMarks.validator.method(inputMarks.value)) {
          console.log("validate false ##6");
          valid = false;
        }
        if (!inputPercentage.validator.method(inputPercentage.value)) {
          console.log("validate false ##7");
          valid = false;
        }
      } else {
        if (!inputCGPAOther.validator.method(inputCGPAOther.value)) {
          console.log("validate false ##8");
          valid = false;
        }
      }
    }
    if (
      inputQualification.selected == "PhD" &&
      !inputDateOfAward.validator.method(inputDateOfAward.value)
    ) {
      console.log("validate false ##3");
      valid = false;
    }

    if (
      inputQualification.selected !== "10th" &&
      inputQualification.selected != "12th" &&
      !inputSubject.validator.method(inputSubject.value)
    ) {
      console.log("validate false ##3");
      valid = false;
    }
    if (!valid) return false;
    return true;
  };

  let alertMessage = null;
  const save = () => {
    alertMessage = null;
    if (!validate()) {
      if (inputQualification.selected == "") {
        alertMessage = "Please Pelect Qualificaiton";
        return false;
      }
      if (inputQualification.selected == "12th") {
        if (input12thSpecialization.selected == "") {
          alertMessage = alertMessage
            ? `${alertMessage} Please Select Subject/Specialization`
            : "Please Select Subject/Specialization";
          return false;
        }
      }

      return false;
    }
    return true;
  };

  function toggleModal({ op }) {
    console.log("toggeModal in Add #1");
    if (op === "save" && !save()) {
      return false;
    }
    console.log("toggeModal in Add #2");
    showModal = !showModal;
    console.log("toggleModal called: ", op);
    if (op === "cancel") {
      console.log("toggleModal called op: ", op, "showModal:", showModal);
      return true;
    }

    let otherQualification = {
      qualification: inputQualification.selected,
      university: inputUniversity.value,
      yearOfPassing:
        inputQualification.selected != "PhD"
          ? inputYearOfPassing.value
          : undefined,
      dateOfAward:
        inputQualification.selected == "PhD"
          ? inputDateOfAward.value
          : undefined,
      marksType: inputMarksTypeOther.value,
      marks:
        inputQualification.selected != "PhD" &&
        inputMarksTypeOther.value == "Percentage"
          ? inputMarks.value
          : undefined,
      cgpa:
        inputQualification.selected != "PhD" &&
        inputMarksTypeOther.value == "Percentage"
          ? undefined
          : inputCGPAOther.value,
      percentage:
        inputQualification.selected != "PhD" &&
        inputMarksTypeOther.value == "Percentage"
          ? inputPercentage.value
          : undefined,
      twelthSpecialization:
        inputQualification.selected == "12th"
          ? input12thSpecialization.selected
          : undefined,
      subject:
        inputQualification.selected !== "10th" &&
        inputQualification.selected != "12th"
          ? inputSubject.value
          : undefined,
      degree:
        inputQualification.selected != "10th" &&
        inputQualification.selected != "12th" &&
        inputQualification.selected != "Diploma" &&
        inputQualification.selected != "PhD"
          ? inputDegree.value
          : undefined,
    };
    dispatch("edit", { otherQualification, index });
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
          <h3 class="text-3xl font-semibold">Edit Other Qualification</h3>
          <div class=" text-gray-600">
            <Fa icon={faEdit} size="2x" />
          </div>
        </div>
        <!--body-->
        <div class="relative p-6 flex-auto">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3  ">
            <DropDown
              lable="Qualification"
              dropdownOptions={inputQualification.qualificationOptions}
              bind:selected={inputQualification.selected}
            />

            {#if inputQualification.selected === "12th"}
              <DropDown
                lable="Subject/Specialization"
                dropdownOptions={input12thSpecialization.specialization12th}
                bind:selected={input12thSpecialization.selected}
              />
            {/if}
            {#if inputQualification.selected === "Graduation"}
              <TextInput
                bind:label={inputDegree.label}
                bind:value={inputDegree.value}
                validate={inputDegree.validate}
                readonly={inputDegree.readonly}
                bind:error={inputDegree.error}
                placeholderValue={inputDegree.placeholderValue}
                error_mt={inputDegree.error_mt}
                bind:paddingsize={inputDegree.paddingsize}
                validator={inputDegree.validator}
              />
            {:else if inputQualification.selected === "Post Graduation"}
              <TextInput
                bind:label={inputDegree.label}
                bind:value={inputDegree.value}
                validate={inputDegree.validate}
                readonly={inputDegree.readonly}
                bind:error={inputDegree.error}
                placeholderValue={inputDegree.placeholderValue}
                error_mt={inputDegree.error_mt}
                bind:paddingsize={inputDegree.paddingsize}
                validator={inputDegree.validator}
              />
            {:else if inputQualification.selected === "Other"}
              <TextInput
                bind:label={inputDegree.label}
                bind:value={inputDegree.value}
                validate={inputDegree.validate}
                readonly={inputDegree.readonly}
                bind:error={inputDegree.error}
                placeholderValue={inputDegree.placeholderValue}
                error_mt={inputDegree.error_mt}
                bind:paddingsize={inputDegree.paddingsize}
                validator={inputDegree.validator}
              />
            {/if}
            {#if inputQualification.selected != "10th" && inputQualification.selected != "12th"}
              <TextInput
                bind:label={inputSubject.label}
                bind:value={inputSubject.value}
                validate={inputSubject.validate}
                readonly={inputSubject.readonly}
                bind:error={inputSubject.error}
                placeholderValue={inputSubject.placeholderValue}
                error_mt={inputSubject.error_mt}
                bind:paddingsize={inputSubject.paddingsize}
                validator={inputSubject.validator}
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
            {#if inputQualification.selected == "PhD"}
              <TextInput
                bind:label={inputDateOfAward.label}
                bind:value={inputDateOfAward.value}
                validate={inputDateOfAward.validate}
                readonly={inputDateOfAward.readonly}
                bind:error={inputDateOfAward.error}
                placeholderValue={inputDateOfAward.placeholderValue}
                error_mt={inputDateOfAward.error_mt}
                bind:paddingsize={inputDateOfAward.paddingsize}
                validator={inputDateOfAward.validator}
              />
            {/if}

            <div class="gap-2 col-span-1 md:col-span-2 ">
              {#if inputQualification.selected != "PhD"}
                <div class="col-span-1 md:col-span-2 flex justify-center">
                  <InputRadioGroup
                    label={inputMarksTypeOther.label}
                    options={inputMarksTypeOther.options}
                    bind:value={inputMarksTypeOther.value}
                    bind:validator={inputMarksTypeOther.validator}
                    error={null}
                  />
                </div>

                {#if inputMarksTypeOther.value == "Percentage"}
                  <div class=" md:flex justify-between  md:gap-2">
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
                  <div>
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
                  </div>
                {:else if inputQualification.selected != "PhD"}
                  <div class="grid grid-cols-2 md:gap-2">
                    <div class=" col-span-2 md:col-span-2">
                      <TextInput
                        bind:label={inputCGPAOther.label}
                        bind:value={inputCGPAOther.value}
                        validate={inputCGPAOther.validate}
                        readonly={inputCGPAOther.readonly}
                        bind:error={inputCGPAOther.error}
                        placeholderValue={inputCGPAOther.placeholderValue}
                        error_mt={inputCGPAOther.error_mt}
                        bind:paddingsize={inputCGPAOther.paddingsize}
                        validator={inputCGPAOther.validator}
                      />
                    </div>
                    <div class=" col-span-2 md:col-span-2">
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
                    </div>
                  </div>
                {/if}
              {/if}
            </div>
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
