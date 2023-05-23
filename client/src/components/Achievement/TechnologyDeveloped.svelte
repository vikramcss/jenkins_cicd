<script>
  import TextInput from "../../common/TextInput.svelte";
  import MonthYearInput from "../../common/MonthYearInput.svelte";
  import InputRadioGroup from "../../common/InputRadioGroup.svelte";

  
  export let technologyDeveloped = {
    nameofTechnologyDeveloped: null,
    patentPublished: null,
    trl:null,
  }

  let inputNameofTechnologyDeveloped = {
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
        inputNameofTechnologyDeveloped.error = null;
        if (value.length < 3) {
          inputNameofTechnologyDeveloped.error = "Title should be at least 3 chars long";
          return false;
        }
        return true;
      },
      errormessage: "Title should be at least 3 chars long",
    },
  };

  let inputPatentPublished = {
    label: "Patent Published ?",
    value: "",
    options: ["Yes", "No"],
    error: null,
    validator: {
      method: (value) => {
         inputPatentPublished.error = null; 
        if(value == "Yes" || value == "No") {
          return true;
        }else {
         inputPatentPublished.error = inputPatentPublished.validator.errormessage; 
          return false;
        }
      },
      errormessage: "Patent published should be either Yes or No",
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

  const validateInput = () => {
    let valid = true;
    if (!inputNameofTechnologyDeveloped.validator.method(technologyDeveloped.nameofTechnologyDeveloped)) {
      valid = false;
    }
    if (!inputPatentPublished.validator.method(technologyDeveloped.patentPublished)) {
      valid = false;
    }
    if (!inputTRL.validator.method(technologyDeveloped.trl)) {
      valid = false;
    }
    if (!valid) return false;
    return true;
  };
  export let validate;
  validate = validateInput;
</script>

<TextInput
  bind:label={inputNameofTechnologyDeveloped.label}
  bind:value={technologyDeveloped.nameofTechnologyDeveloped}
  validate={inputNameofTechnologyDeveloped.validate}
  readonly={inputNameofTechnologyDeveloped.readonly}
  bind:error={inputNameofTechnologyDeveloped.error}
  placeholderValue={inputNameofTechnologyDeveloped.placeholderValue}
  error_mt={inputNameofTechnologyDeveloped.error_mt}
  bind:paddingsize={inputNameofTechnologyDeveloped.paddingsize}
  validator={inputNameofTechnologyDeveloped.validator}
/>

<InputRadioGroup
  label={inputPatentPublished.label}
  options={inputPatentPublished.options}
  bind:value={technologyDeveloped.patentPublished}
  bind:error={inputPatentPublished.error}
  bind:validator={inputPatentPublished.validator}
/>

<TextInput
  bind:label={inputTRL.label}
  bind:value={technologyDeveloped.trl}
  validate={inputTRL.validate}
  readonly={inputTRL.readonly}
  bind:error={inputTRL.error}
  placeholderValue={inputTRL.placeholderValue}
  error_mt={inputTRL.error_mt}
  bind:paddingsize={inputTRL.paddingsize}
  validator={inputTRL.validator}
/>