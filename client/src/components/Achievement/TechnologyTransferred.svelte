<script>
  import TextInput from "../../common/TextInput.svelte";


  export let technologyTransferred = {
    nameofTechnology: "",
    projectName: "",
    investigatorName: "",
    transferredToOrg: "",
    transferredYear: "",
    trl: "",
    costOfTechnology:"",
  }

  let inputNameofTechnology= {
    label: "Name of Technology",
    value: "",
    validate: true,
    readonly: false,
    error: null,
    placeholderValue: "Name of Technology",
    error_mt: false,
    paddingsize: 0,
    validator: {
      method: (value) => {
        inputNameofTechnology.error = null;
        if (value.length < 3) {
          inputNameofTechnology.error = "Name of Technology should be at least 3 chars long";
          return false;
        }
        return true;
      },
      errormessage: "Name of Technology should be at least 3 chars long",
    },
  };
  let inputProjectName= {
    label: "Project Name",
    value: "",
    validate: true,
    readonly: false,
    error: null,
    placeholderValue: "Project Name",
    error_mt: false,
    paddingsize: 0,
    validator: {
      method: (value) => {
        inputProjectName.error = null;
        if (value.length < 3) {
          inputProjectName.error = "Project Name should be at least 3 chars long";
          return false;
        }
        return true;
      },
      errormessage: "Project Name should be at least 3 chars long",
    },
  };

  let inputInvestigatorName= {
    label: "Investigator Name",
    value: "",
    validate: true,
    readonly: false,
    error: null,
    placeholderValue: "Investigator Name",
    error_mt: false,
    paddingsize: 0,
    validator: {
      method: (value) => {
        inputInvestigatorName.error = null;
        if (value.length < 3) {
          inputInvestigatorName.error = "Investigator Name should be at least 3 chars long";
          return false;
        }
        return true;
      },
      errormessage: "Investigator Name should be at least 3 chars long",
    },
  };

  let inputTransferredToOrg= {
    label: "Transferred to Org Name",
    value: "",
    validate: true,
    readonly: false,
    error: null,
    placeholderValue: "Transferred to Org Name",
    error_mt: false,
    paddingsize: 0,
    validator: {
      method: (value) => {
        inputTransferredToOrg.error = null;
        if (value.length < 3) {
          inputTransferredToOrg.error = "Transferred to Org Name should be at least 3 chars long";
          return false;
        }
        return true;
      },
      errormessage: "Transferred to Org Name should be at least 3 chars long",
    },
  };

  let inputTransferredYear = {
    label: "Transferred Year",
    value: "",
    validate: true,
    readonly: false,
    error: null,
    placeholderValue: "Transferred Year",
    error_mt: false,
    paddingsize: 0,
    validator: {
      method: (value) => {
        inputTransferredYear.error = null;
        if (isNaN(value)) {
          inputTransferredYear.error = 
          inputTransferredYear.validator.errormessage 
          return false;
        }
        if (Number(value) < 1975 || Number(value) >= 2023) {
          inputTransferredYear.error = 
          inputTransferredYear.validator.errormessage 
          return false;
        }
        return true;
      },
      errormessage: "Transferred year should be between 1975 and 2023"
    },
  };

  let inputTRL = {
    label: "TRL",
    value: "",
    validate: true,
    readonly: false,
    error: null,
    placeholderValue: "TRL",
    error_mt: false,
    paddingsize: 0,
    validator: {
      method: (value) => {
        inputTRL.error = null;
        let regex = /^[1-9]$/
        if (!regex.test(value)) {
          inputTRL.error = inputTRL.validator.errormessage
          return false;
        }
        return true;
      },
      errormessage: "Enter trl between 1 to 9"
    },
  };

  let inputCostOfTechnology = {
    label: "Cost of Technology in laks(Rs)",
    value: "",
    validate: true,
    readonly: false,
    error: null,
    placeholderValue: "Cost of Technology",
    error_mt: false,
    paddingsize: 0,
    validator: {
      method: (value) => {
        inputCostOfTechnology.error = null;
        if (isNaN(value)) {
          inputCostOfTechnology.error = inputCostOfTechnology.validator.errormessage
          return false;
        }
        return true;
      },
      errormessage: "number in lakhs"
    },
  };

  const validateInput = () => {
    let valid = true;
    if (!inputNameofTechnology.validator.method(technologyTransferred.nameofTechnology)) {
      valid = false;
    }
    if (!inputProjectName.validator.method(technologyTransferred.projectName)) {
      valid = false;
    }
    if (!inputInvestigatorName.validator.method(technologyTransferred.investigatorName)) {
      valid = false;
    }
    if (!inputTransferredToOrg.validator.method(technologyTransferred.transferredToOrg)) {
      valid = false;
    }
    if (!inputTransferredYear.validator.method(technologyTransferred.transferredYear)) {
      valid = false;
    }
    if (!inputTRL.validator.method(technologyTransferred.trl)) {
      valid = false;
    }
    if (!inputCostOfTechnology.validator.method(technologyTransferred.costOfTechnology)) {
      valid = false;
    }
    if (!valid) return false;
    return true;
  };
  export let validate;
  validate = validateInput;
</script>

<TextInput
  bind:label={inputNameofTechnology.label}
  bind:value={technologyTransferred.nameofTechnology}
  validate={inputNameofTechnology.validate}
  readonly={inputNameofTechnology.readonly}
  bind:error={inputNameofTechnology.error}
  placeholderValue={inputNameofTechnology.placeholderValue}
  error_mt={inputNameofTechnology.error_mt}
  bind:paddingsize={inputNameofTechnology.paddingsize}
  validator={inputNameofTechnology.validator}
/>
<TextInput
  bind:label={inputProjectName.label}
  bind:value={technologyTransferred.projectName}
  validate={inputProjectName.validate}
  readonly={inputProjectName.readonly}
  bind:error={inputProjectName.error}
  placeholderValue={inputProjectName.placeholderValue}
  error_mt={inputProjectName.error_mt}
  bind:paddingsize={inputProjectName.paddingsize}
  validator={inputProjectName.validator}
/>
<TextInput
  bind:label={inputInvestigatorName.label}
  bind:value={technologyTransferred.investigatorName}
  validate={inputInvestigatorName.validate}
  readonly={inputInvestigatorName.readonly}
  bind:error={inputInvestigatorName.error}
  placeholderValue={inputInvestigatorName.placeholderValue}
  error_mt={inputInvestigatorName.error_mt}
  bind:paddingsize={inputInvestigatorName.paddingsize}
  validator={inputInvestigatorName.validator}
/>
<TextInput
  bind:label={inputTransferredToOrg.label}
  bind:value={technologyTransferred.transferredToOrg}
  validate={inputTransferredToOrg.validate}
  readonly={inputTransferredToOrg.readonly}
  bind:error={inputTransferredToOrg.error}
  placeholderValue={inputTransferredToOrg.placeholderValue}
  error_mt={inputTransferredToOrg.error_mt}
  bind:paddingsize={inputTransferredToOrg.paddingsize}
  validator={inputTransferredToOrg.validator}
/>
<TextInput
  bind:label={inputTransferredYear.label}
  bind:value={technologyTransferred.transferredYear}
  validate={inputTransferredYear.validate}
  readonly={inputTransferredYear.readonly}
  bind:error={inputTransferredYear.error}
  placeholderValue={inputTransferredYear.placeholderValue}
  error_mt={inputTransferredToOrg.error_mt}
  bind:paddingsize={inputTransferredYear.paddingsize}
  validator={inputTransferredYear.validator}
/>
<TextInput
  bind:label={inputTRL.label}
  bind:value={technologyTransferred.trl}
  validate={inputTRL.validate}
  readonly={inputTRL.readonly}
  bind:error={inputTRL.error}
  placeholderValue={inputTRL.placeholderValue}
  error_mt={inputTRL.error_mt}
  bind:paddingsize={inputTRL.paddingsize}
  validator={inputTRL.validator}
/>
<TextInput
  bind:label={inputCostOfTechnology.label}
  bind:value={technologyTransferred.costOfTechnology}
  validate={inputCostOfTechnology.validate}
  readonly={inputCostOfTechnology.readonly}
  bind:error={inputCostOfTechnology.error}
  placeholderValue={inputCostOfTechnology.placeholderValue}
  error_mt={inputCostOfTechnology.error_mt}
  bind:paddingsize={inputCostOfTechnology.paddingsize}
  validator={inputCostOfTechnology.validator}
/>