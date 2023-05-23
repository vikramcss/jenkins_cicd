<script>
  import TextInput from "../../common/TextInput.svelte";
  import MonthYearInput from "../../common/MonthYearInput.svelte";

  export let project = {
    title: "",
    principalInvestigator: "",
    copi: "",
    fundingAgency: "",
    projectDurationFrom: "",
    projectDurationTo: "",
    projectOutlay: "",
  }

  let inputTitle = {
    label: "Title Of Project",
    value: "",
    validate: true,
    readonly: false,
    error: null,
    placeholderValue: "Title Of Project",
    error_mt: false,
    paddingsize: 0,
    validator: {
      method: (value) => {
        inputTitle.error = null;
        if (value.length < 3) {
          inputTitle.error = "Title should be at least 3 chars long";
          return false;
        }
        return true;
      },
      errormessage: "Title should be at least 3 chars long",
    },
  };
  let inputPrincipalInvestigator = {
    label: "Name of Principal Invistigator",
    value: "",
    validate: true,
    readonly: false,
    error: null,
    placeholderValue: "Name of Principal Invistigator",
    error_mt: false,
    paddingsize: 0,
    validator: {
      method: (value) => {
        inputPrincipalInvestigator.error = null;
        if (value.length < 3) {
          inputPrincipalInvestigator.error =
            "Principal investigator name should be at least 3 chars long";
          return false;
        }
        return true;
      },
      errormessage:
        "Principal investigator name should be at least 3 chars long",
    },
  };

  let inputCopi= {
    label: "Co-P.I.",
    value: "",
    validate: true,
    readonly: false,
    error: null,
    placeholderValue: "Co-P.I.",
    error_mt: false,
    paddingsize: 0,
    validator: {
      method: (value) => {
        inputCopi.error = null;
        if (value.length < 3) {
          inputCopi.error =
          inputCopi.validator.errormessage;
          return false;
        }
        return true;
      },
      errormessage:
        "Co-P.I should be atleast 3 charactors long",
    },
  };
  let inputFundingAgency = {
    label: "Funding Agency",
    value: "",
    validate: true,
    readonly: false,
    error: null,
    placeholderValue: "Funding Agency",
    error_mt: false,
    paddingsize: 0,
    validator: {
      method: (value) => {
        inputFundingAgency.error = null;
        if (value.length < 3) {
          inputFundingAgency.error =
          inputFundingAgency.validator.errormessage;
          return false;
        }
        return true;
      },
      errormessage:
        "Funding Agency should be atleast 3 charactors long",
    },
  };
  let inputProjectDurationFrom =
  {
    label: "Date Of Commencement",
    value: "",
    validate: true,
    readonly: false,
    error: null,
    placeholderValue: "Date Of Commencement",
    error_mt: false,
    paddingsize: 0,
    validator: {
      method: (value) => {
        inputProjectDurationFrom.error = null;
        if (value.length < 3) {
          inputProjectDurationFrom.error =
            inputProjectDurationFrom.validator.errormessage;
          return false;
        }
        return true;
      },
      errormessage: "input duration in MM-YYYY format",
    },
  }

  let inputProjectDurationTo =
  {
    label: "Date Of Closure",
    value: "",
    validate: true,
    readonly: false,
    error: null,
    placeholderValue: "Date Of Closure",
    error_mt: false,
    paddingsize: 0,
    validator: {
      method: (value) => {
        inputProjectDurationTo.error = null;
        if (value.length < 3) {
          inputProjectDurationTo.error =
            inputProjectDurationTo.validator.errormessage;
          return false;
        }
        return true;
      },
      errormessage: "input duration in MM-YYYY format",
    },
  }

  let inputProjectOutlay = {
    label: "Outlay of the project(in Lakhs)",
    value: "",
    validate: true,
    readonly: false,
    error: null,
    placeholderValue: "Outlay of the project (in Lakhs)",
    error_mt: false,
    paddingsize: 0,
    validator: {
      method: (value) => {
        inputProjectOutlay.error = null;
        if (value.length < 1 || isNaN(value)) {
          inputProjectOutlay.error =
          inputProjectOutlay.validator.errormessage;
          return false;
        }
        return true;
      },
      errormessage: "Outlay of the project should be at least 1 digit",
    },
  };

  const validateInput = () => {
    let valid = true;
    if (!inputTitle.validator.method(project.title)) {
      valid = false;
    }
    if (!inputPrincipalInvestigator.validator.method(project.title)) {
      valid = false;
    }
    if (!inputCopi.validator.method(project.copi)) {
      valid = false;
    }
    if (!inputFundingAgency.validator.method(project.fundingAgency)) {
      valid = false;
    }
    if (!inputProjectDurationFrom.validator.method(project.projectDurationFrom)) {
      valid = false;
    }
    if (!inputProjectDurationTo.validator.method(project.projectDurationTo)) {
      valid = false;
    }
    if (!inputProjectOutlay.validator.method(project.projectOutlay)) {
      valid = false;
    }
    if (!valid) return false;
    return true;
  };
  export let validate;
  validate = validateInput;
</script>

<TextInput
  bind:label={inputTitle.label}
  bind:value={project.title}
  validate={inputTitle.validate}
  readonly={inputTitle.readonly}
  bind:error={inputTitle.error}
  placeholderValue={inputTitle.placeholderValue}
  error_mt={inputTitle.error_mt}
  bind:paddingsize={inputTitle.paddingsize}
  validator={inputTitle.validator}
/>
<TextInput
  bind:label={inputPrincipalInvestigator.label}
  bind:value={project.principalInvestigator}
  validate={inputPrincipalInvestigator.validate}
  readonly={inputPrincipalInvestigator.readonly}
  bind:error={inputPrincipalInvestigator.error}
  placeholderValue={inputPrincipalInvestigator.placeholderValue}
  error_mt={inputPrincipalInvestigator.error_mt}
  bind:paddingsize={inputPrincipalInvestigator.paddingsize}
  validator={inputPrincipalInvestigator.validator}
/>
<TextInput
  bind:label={inputCopi.label}
  bind:value={project.copi}
  validate={inputCopi.validate}
  readonly={inputCopi.readonly}
  bind:error={inputCopi.error}
  placeholderValue={inputCopi.placeholderValue}
  error_mt={inputCopi.error_mt}
  bind:paddingsize={inputCopi.paddingsize}
  validator={inputCopi.validator}
/>
<TextInput
  bind:label={inputFundingAgency.label}
  bind:value={project.fundingAgency}
  validate={inputFundingAgency.validate}
  readonly={inputFundingAgency.readonly}
  bind:error={inputFundingAgency.error}
  placeholderValue={inputFundingAgency.placeholderValue}
  error_mt={inputFundingAgency.error_mt}
  bind:paddingsize={inputFundingAgency.paddingsize}
  validator={inputFundingAgency.validator}
/>
<MonthYearInput
  bind:label={inputProjectDurationFrom.label}
  bind:value={project.projectDurationFrom}
  bind:error={inputProjectDurationFrom.error}
  readonly={inputProjectDurationFrom.readonly}
  placeholderValue={inputProjectDurationFrom.placeholderValue}
  validator={inputProjectDurationFrom.validator}
/>
<MonthYearInput
  bind:label={inputProjectDurationTo.label}
  bind:value={project.projectDurationTo}
  bind:error={inputProjectDurationTo.error}
  readonly={inputProjectDurationTo.readonly}
  placeholderValue={inputProjectDurationTo.placeholderValue}
  validator={inputProjectDurationTo.validator}
/>
<TextInput
  bind:label={inputProjectOutlay.label}
  bind:value={project.projectOutlay}
  validate={inputProjectOutlay.validate}
  readonly={inputProjectOutlay.readonly}
  bind:error={inputProjectOutlay.error}
  placeholderValue={inputProjectOutlay.placeholderValue}
  error_mt={inputProjectOutlay.error_mt}
  bind:paddingsize={inputProjectOutlay.paddingsize}
  validator={inputProjectOutlay.validator}
/>
