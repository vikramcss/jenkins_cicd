<script>
  import TextInput from "../common/TextInput.svelte";

  export let addressOutOfIndia = {
    addressLine: null,
    country: null,
    state: null,
    zip: null,
  };

  // export let inputZip = {
  //     addressLine: null,
  //     country: null,
  //     state: null,
  //     zip: null,
  // };

  export let errorsAddressOutOfIndia = {
    addressLine: null,
    country: null,
    state: null,
    zip: null,
  };

  let inputAddressLine = {
    label: "Address",
    validate: true,
    readonly: false,
    error: null,
    placeholderValue: "Address",
    error_mt: false,
    paddingsize: 0,
    validator: {
      method: (value) => {
        return value.length >= 3;
      },
      errormessage: "length can not be less than 3",
    },
  };
  let inputCountry = {
    label: "country",
    validate: true,
    readonly: false,
    error: null,
    placeholderValue: "country",
    error_mt: false,
    paddingsize: 0,
    validator: {
      method: (value) => {
        return value.length >= 3;
      },
      errormessage: "length can not be less than 3",
    },
  };

  let inputState = {
    label: "State",
    validate: true,
    readonly: false,
    error: null,
    placeholderValue: "state",
    error_mt: false,
    paddingsize: 0,
    validator: {
      method: (value) => {
        return value.length >= 3;
      },
      errormessage: "length can not be less than 3",
    },
  };
  let inputZip = {
    label: "Zip Code",
    validate: true,
    readonly: false,
    error: null,
    placeholderValue: "Zip Code",
    error_mt: false,
    paddingsize: 0,
    validator: {
      method: (value) => {
        return value.length >= 3;
      },
      errormessage: "length can not be less than 3",
    },
  };
</script>

      <div class="col-span-1 lg:col-span-4  px-2">
        <TextInput
          bind:label={inputAddressLine.label}
          bind:value={addressOutOfIndia.addressLine}
          bind:error={errorsAddressOutOfIndia.addressLine}
          validate={inputAddressLine.validate}
          readonly={inputAddressLine.readonly}
          placeholderValue={inputAddressLine.placeholderValue}
          error_mt={inputAddressLine.error_mt}
          bind:paddingsize={inputAddressLine.paddingsize}
          validator={inputAddressLine.validator}
        />
      </div>
      <div class="col-span-4">
        <div class="grid grid-cols-3">

      <div class="col-span-1 lg:col-span-1 px-2">
        <TextInput
          bind:label={inputState.label}
          bind:value={addressOutOfIndia.state}
          bind:error={errorsAddressOutOfIndia.state}
          validate={inputState.validate}
          readonly={inputState.readonly}
          placeholderValue={inputState.placeholderValue}
          error_mt={inputState.error_mt}
          bind:paddingsize={inputState.paddingsize}
          validator={inputState.validator}
        />
      </div>
      <div class="col-span-1 lg:col-span-1  px-2">
        <TextInput
          bind:label={inputCountry.label}
          bind:value={addressOutOfIndia.country}
          bind:error={errorsAddressOutOfIndia.country}
          validate={inputCountry.validate}
          readonly={inputCountry.readonly}
          placeholderValue={inputCountry.placeholderValue}
          error_mt={inputCountry.error_mt}
          bind:paddingsize={inputCountry.paddingsize}
          validator={inputCountry.validator}
        />
      </div>

      <div class="col-span-1 lg:col-span-1 px-2">
        <TextInput
          bind:label={inputZip.label}
          bind:value={addressOutOfIndia.zip}
          bind:error={errorsAddressOutOfIndia.zip}
          validate={inputZip.validate}
          readonly={inputZip.readonly}
          placeholderValue={inputZip.placeholderValue}
          error_mt={inputZip.error_mt}
          bind:paddingsize={inputZip.paddingsize}
          validator={inputZip.validator}
        />
      </div>
      </div>
      </div>
