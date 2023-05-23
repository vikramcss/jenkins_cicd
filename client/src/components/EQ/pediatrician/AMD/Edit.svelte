<script>
  import Fa from "svelte-fa";
  import InputRadioGroup from "../../../../common/InputRadioGroup.svelte";
  import { faEdit } from "@fortawesome/free-solid-svg-icons";
  import TextInput from "../../../../common/TextInput.svelte";
  import { createEventDispatcher } from "svelte";
  import DropDown from "../../../../common/TwoDDropdown.svelte";
  import Alert from "../../../../common/Alert.svelte";

  const dispatch = createEventDispatcher();

  export let essentialQualification = {};
  export let showModal;
  export let index;

  let alertMessage = null;

  const qualificationOptions = {
    Qualifications: ["MBBS", "PG Degree Pediatrics", "PG Diploma Pediatrics"],
  };

  let inputQualification = {
    qualificationOptions,
    selected: essentialQualification.qualification.split("-")[0],
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

  let inputBoardName = {
    label: "University/Institute",
    value: essentialQualification.boardName,
    validate: true,
    readonly: false,
    error: null,
    placeholderValue: "Name Of Board",
    error_mt: false,
    paddingsize: 0,
    validator: {
      method: (value) => {
        inputBoardName.error = null;
        if (value.length < 2) {
          inputBoardName.error = "Name of Board can not be empty";
          return false;
        }
        return true;
      },
      errormessage: "Name of Board can not be empty",
    },
  };
  let inputMarksType = {
    label: "Marks Type",
    value: essentialQualification.marksType,
    options: ["Percentage", "CGPA/Grade"],
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
    value:
      essentialQualification.marksType == "Percentage"
        ? essentialQualification.marks
        : "",
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
    value:
      essentialQualification.marksType == "Percentage"
        ? essentialQualification.percentage
        : "",
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
  let inputCGPA = {
    label: "CGPA/Grade",
    value:
      essentialQualification.marksType == "Percentage"
        ? ""
        : essentialQualification.cgpa,
    validate: true,
    readonly: false,
    error: null,
    placeholderValue: "CGPA",
    error_mt: false,
    paddingsize: 0,
    validator: {
      method: (value) => {
        inputCGPA.error = null;
        if (value === null || value === "") {
          inputCGPA.error = inputCGPA.validator.errormessage;
          return false;
        }
        return true;
      },
      errormessage: "CGPA/Grade can not be blank",
    },
  };

  let inputYearOfPassing = {
    label: "Passing Year",
    value: essentialQualification.yearOfPassing,
    validate: true,
    readonly: false,
    error: null,
    placeholderValue: "Passing Year",
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

  const validateTextField = ({ field }) => {
    let { method: validatorMethod, errormessage } = field.validator;
    let { value } = field;
    if (!value || !validatorMethod(value)) {
      field.error = errormessage;
      return false;
    }
    return true;
  };

  const validateInput = () => {
    alertMessage = "";
    let valid = true;
    if (!inputQualification.selected) {
      alertMessage = "Please select qualification";
      return false;
    }

    if (!validateTextField({ field: inputBoardName }))
      (inputBoardName = { ...inputBoardName }), (valid = false);

    if (!validateTextField({ field: inputYearOfPassing }))
      (inputYearOfPassing = { ...inputYearOfPassing }), (valid = false);

    if (inputMarksType.value == "Percentage") {
      if (!validateTextField({ field: inputMarks }))
        (inputMarks = { ...inputMarks }), (valid = false);

      if (!validateTextField({ field: inputPercentage }))
        (inputPercentage = { ...inputPercentage }), (valid = false);
    } else {
      if (!validateTextField({ field: inputCGPA }))
        (inputCGPA = { ...inputCGPA }), (valid = false);
    }
    return valid;
  };

  const sendNotification = (essentialQualification) => {
    dispatch("edit", { essentialQualification, index });
  };

  function onEdit() {
    if (!validateInput()) {
      return false;
    }
    let essentialQualification = {
      qualification: inputQualification.selected,
      yearOfPassing: inputYearOfPassing.value,
      boardName: inputBoardName.value,
      marksType: inputMarksType.value,
    };
    if (inputMarksType.value === "Percentage") {
      essentialQualification.marks = inputMarks.value;
      essentialQualification.percentage = inputPercentage.value;
    } else {
      essentialQualification.cgpa = inputCGPA.value;
    }
    // dispatch("edit", { essentialQualification });
    sendNotification(essentialQualification);
    showModal = !showModal;
    return true;
  }

  function onCancel() {
    showModal = !showModal;
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
            <Fa icon={faEdit} size="2x" />
          </div>
        </div>
        <!--body-->
        <div class="relative p-6">
          <div class="grid grid-cols-1 md:grid-cols-2  md:gap-3  ">
            <DropDown
              lable="Qualification"
              dropdownOptions={inputQualification.qualificationOptions}
              bind:selected={inputQualification.selected}
            />
            {#if inputQualification.selected}
              <TextInput
                bind:label={inputBoardName.label}
                bind:value={inputBoardName.value}
                validate={inputBoardName.validate}
                readonly={inputBoardName.readonly}
                bind:error={inputBoardName.error}
                placeholderValue={inputBoardName.placeholderValue}
                error_mt={inputBoardName.error_mt}
                bind:paddingsize={inputBoardName.paddingsize}
                validator={inputBoardName.validator}
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
              <InputRadioGroup
                label={inputMarksType.label}
                options={inputMarksType.options}
                bind:value={inputMarksType.value}
                bind:validator={inputMarksType.validator}
                error={null}
              />
              {#if inputMarksType.value === "Percentage"}
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
              {:else if inputMarksType.value == "CGPA/Grade"}
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
              {/if}
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
            on:click={() => onCancel()}
            type="submit"
            class="w-48 text-center bg-indigo-50 hover:bg-white shadow-lg text-gray-500 font-bold py-2 px-4 rounded"
          >
            CANCEL
          </button>
          <button
            on:click={() => onEdit()}
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
