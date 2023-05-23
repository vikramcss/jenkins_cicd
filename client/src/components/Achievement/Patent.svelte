<script>
  import TextInput from "../../common/TextInput.svelte";
  import InputRadioGroup from "../../common/InputRadioGroup.svelte";

  export let patent = {
    patentStatus: "",
    title: "",
    author: "",
    patentType: "",
    yearOfSubmission: "",
    patentNumber: "",
  };
  let inputPatentStatus = {
    label: "Patent Status",
    value: "",
    options: ["Submitted", "Approved"],
    error: null,
    validator: {
      method: (value) => {
        inputPatentStatus.error = null;
        if (value == "Submitted" || value == "Approved") {
          return true;
        } else {
          inputPatentStatus.error = inputPatentStatus.validator.errormessage;
          return false;
        }
      },
      errormessage: "Patent status should be either submitted or approved",
    },
  };
  let inputTitle = {
    label: "Title Of Patent",
    value: "",
    validate: true,
    readonly: false,
    error: null,
    placeholderValue: "Title Of Patent",
    error_mt: false,
    paddingsize: 0,
    validator: {
      method: (value) => {
        inputTitle.error = null;
        if (!value || value.length <= 3) {
          inputTitle.error = "Title should be at least 3 chars long";
          return false;
        }
        return true;
      },
      errormessage: "Title should be at least 3 chars long",
    },
  };
  let inputAuthor = {
    label: "Authors",
    value: "",
    validate: true,
    readonly: false,
    error: null,
    placeholderValue: "Authors",
    error_mt: false,
    paddingsize: 0,
    validator: {
      method: (value) => {
        inputAuthor.error = null;
        if (value.length <= 3) {
          inputAuthor.error = "Author should be at least 3 chars long";
          return false;
        }
        return true;
      },
      errormessage: "Author should be at least 3 chars long",
    },
  };
  let inputPatentType = {
    label: "Patent Type",
    value: "",
    options: ["National", "International"],
    error: null,
    validator: {
      method: (value) => {
        inputPatentType.error = null;
        if (value == "National" || value == "International") {
          return true;
        } else {
          inputPatentType.error = inputPatentType.validator.errormessage;
          return false;
        }
      },
      errormessage: "Patent type should be either national or international",
    },
  };
  let inputYearOfSubmission = {
    label: "Year of Submission",
    value: "",
    validate: true,
    readonly: false,
    error: null,
    placeholderValue: "Year of submission",
    error_mt: false,
    paddingsize: 0,
    validator: {
      method: (value) => {
        inputYearOfSubmission.error = null;
        console.log("validator for yearOfSubmission called");
        if (isNaN(value) || value == "") {
          inputYearOfSubmission.error = "Year should be between 1975 and 2023";
          console.log("no error will return false 1");
          return false;
        }
        if (Number(value) < 1975 || Number(value) > 2023) {
          inputYearOfSubmission.error = "Year should be between 1975 and 2023";
          console.log("no error will return false 2");
          return false;
        }
        console.log("no error will return true");
        return true;
      },
      errormessage: "Year should be between 1975 and 2023",
    },
  };
  let inputPatentNumber = {
    label: "Patent Number",
    value: "",
    validate: true,
    readonly: false,
    error: null,
    placeholderValue: "Patent Number",
    error_mt: false,
    paddingsize: 0,
    validator: {
      method: (value) => {
        inputPatentNumber.error = null;
        if (value.length <= 3) {
          inputPatentNumber.error =
            "Patent number should be at least 3 chars long";
          return false;
        }
        return true;
      },
      errormessage: "Patent number should be at least 3 chars long",
    },
  };

  const validateInput = () => {
    let valid = true;
    if (!inputPatentStatus.validator.method(patent.patentStatus)) {
      valid = false;
    }
    if (!inputTitle.validator.method(patent.title)) {
      valid = false;
    }
    if (!inputAuthor.validator.method(patent.author)) {
      valid = false;
    }
    if (!inputPatentType.validator.method(patent.patentType)) {
      valid = false;
    }
    if (!inputYearOfSubmission.validator.method(patent.yearOfSubmission)) {
      valid = false;
    }
    if (!inputPatentNumber.validator.method(patent.patentNumber)) {
      valid = false;
    }
    if (!valid) return false;
    return true;
  };
  export let validate;
  validate = validateInput;
</script>

<InputRadioGroup
  label={inputPatentStatus.label}
  options={inputPatentStatus.options}
  bind:value={patent.patentStatus}
  bind:error={inputPatentStatus.error}
  bind:validator={inputPatentStatus.validator}
/>
<TextInput
  bind:label={inputTitle.label}
  bind:value={patent.title}
  validate={inputTitle.validate}
  readonly={inputTitle.readonly}
  bind:error={inputTitle.error}
  placeholderValue={inputTitle.placeholderValue}
  error_mt={inputTitle.error_mt}
  bind:paddingsize={inputTitle.paddingsize}
  validator={inputTitle.validator}
/>
<TextInput
  bind:label={inputAuthor.label}
  bind:value={patent.author}
  validate={inputAuthor.validate}
  readonly={inputAuthor.readonly}
  bind:error={inputAuthor.error}
  placeholderValue={inputAuthor.placeholderValue}
  error_mt={inputAuthor.error_mt}
  bind:paddingsize={inputAuthor.paddingsize}
  validator={inputAuthor.validator}
/>
<InputRadioGroup
  label={inputPatentType.label}
  options={inputPatentType.options}
  bind:value={patent.patentType}
  bind:error={inputPatentType.error}
  bind:validator={inputPatentType.validator}
/>
<TextInput
  bind:label={inputYearOfSubmission.label}
  bind:value={patent.yearOfSubmission}
  validate={inputYearOfSubmission.validate}
  readonly={inputYearOfSubmission.readonly}
  bind:error={inputYearOfSubmission.error}
  placeholderValue={inputYearOfSubmission.placeholderValue}
  error_mt={inputYearOfSubmission.error_mt}
  bind:paddingsize={inputYearOfSubmission.paddingsize}
  validator={inputYearOfSubmission.validator}
/>
<TextInput
  bind:label={inputPatentNumber.label}
  bind:value={patent.patentNumber}
  validate={inputPatentNumber.validate}
  readonly={inputPatentNumber.readonly}
  bind:error={inputPatentNumber.error}
  placeholderValue={inputPatentNumber.placeholderValue}
  error_mt={inputPatentNumber.error_mt}
  bind:paddingsize={inputPatentNumber.paddingsize}
  validator={inputPatentNumber.validator}
/>
