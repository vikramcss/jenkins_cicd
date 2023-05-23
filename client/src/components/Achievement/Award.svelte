<script>
  import TextInput from "../../common/TextInput.svelte";
  import MonthYearInput from "../../common/MonthYearInput.svelte";
  import InputRadioGroup from "../../common/InputRadioGroup.svelte";

  export let award = {
    nameofAward: null,
    sponsoringAgency: null,
    awardYear: null,
  };

  let inputNameofAward = {
    label: "Name of Award",
    value: "",
    validate: true,
    readonly: false,
    error: null,
    placeholderValue: "Name of Award",
    error_mt: false,
    paddingsize: 0,
    validator: {
      method: (value) => {
        inputNameofAward.error = null;
        if (value.length < 3) {
          inputNameofAward.error = inputNameofAward.validator.errormessage;
          return false;
        }
        return true;
      },
      errormessage: "Name of Award should be at least 3 chars long",
    },
  };
  let inputSponsoringAgency = {
    label: "Sponsoring Agency Name",
    value: "",
    validate: true,
    readonly: false,
    error: null,
    placeholderValue: "Sponsoring Agency Name",
    error_mt: false,
    paddingsize: 0,
    validator: {
      method: (value) => {
        inputSponsoringAgency.error = null;
        if (value.length < 3) {
          inputSponsoringAgency.error =
          inputSponsoringAgency.error = inputSponsoringAgency.validator.errormessage;
          return false;
        }
        return true;
      },
      errormessage: "Sponsoring Agency Name should be at least 3 chars long",
    },
  };

  let inputAwardYear = {
    label: "Award Year",
    value: "",
    validate: true,
    readonly: false,
    error: null,
    placeholderValue: "Award Year",
    error_mt: false,
    paddingsize: 0,
    validator: {
      method: (value) => {
        inputAwardYear.error = null;
        if (isNaN(value)) {
          inputAwardYear.error = "Award year should be between 1975 and 2023";
          return false;
        }
        if (Number(value) < 1975 || Number(value) >= 2023) {
          inputAwardYear.error = inputAwardYear.validator.errormessage;
          return false;
        }
        return true;
      },
      errormessage: "Award year should be between 1975 and 2023",
    },
  };

  const validateInput = () => {
    let valid = true;
    if (!inputNameofAward.validator.method(award.nameofAward)) {
      valid = false;
    }
    if (!inputSponsoringAgency.validator.method(award.sponsoringAgency)) {
      valid = false;
    }
    if (!inputAwardYear.validator.method(award.awardYear)) {
      valid = false;
    }
    if (!valid) return false;
    return true;
  };
  export let validate;
  validate = validateInput;
</script>

<TextInput
  bind:label={inputNameofAward.label}
  bind:value={award.nameofAward}
  validate={inputNameofAward.validate}
  readonly={inputNameofAward.readonly}
  bind:error={inputNameofAward.error}
  placeholderValue={inputNameofAward.placeholderValue}
  error_mt={inputNameofAward.error_mt}
  bind:paddingsize={inputNameofAward.paddingsize}
  validator={inputNameofAward.validator}
/>
<TextInput
  bind:label={inputSponsoringAgency.label}
  bind:value={award.sponsoringAgency}
  validate={inputSponsoringAgency.validate}
  readonly={inputSponsoringAgency.readonly}
  bind:error={inputSponsoringAgency.error}
  placeholderValue={inputSponsoringAgency.placeholderValue}
  error_mt={inputSponsoringAgency.error_mt}
  bind:paddingsize={inputSponsoringAgency.paddingsize}
  validator={inputSponsoringAgency.validator}
/>
<TextInput
  bind:label={inputAwardYear.label}
  bind:value={award.awardYear}
  validate={inputAwardYear.validate}
  readonly={inputAwardYear.readonly}
  bind:error={inputAwardYear.error}
  placeholderValue={inputAwardYear.placeholderValue}
  error_mt={inputAwardYear.error_mt}
  bind:paddingsize={inputAwardYear.paddingsize}
  validator={inputAwardYear.validator}
/>
