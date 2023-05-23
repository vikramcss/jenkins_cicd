<script>
  import TextInput from "../common/TextInput.svelte";
  import DropDown from "../common/DropDown.svelte";
 

  import { createEventDispatcher } from "svelte";
  export let correspondenceAddress = {

      addressLine1: "",
      addressLine2: "",
      state: "",
      district: "",
      pin: "",


  };

  export let errorsCorrespondenceAddress = {

      addressLine1: null,
      addressLine2: null,
      state: null,
      district: null,
      pin: null,


  };

  export let permanentAddress = {
    addressLine1: "",
    addressLine2: "",
    state: "",
    district: "",
    pin: "",
  };
  export let errorsPermanantAddress = {
    addressLine1: null,
    addressLine2: null,
    state: null,
    district: null,
    pin: null,
  };

  export let addressOutsideIndia = "No";

  export let permanentIsCorrespondence = true;
  console.log('value of addressOutsideIndia is:', addressOutsideIndia);
  $: (permanentIsCorrespondence) =>
    console.log(
      "value of permanentIsCorrespondence is: ",
      permanentIsCorrespondence
    );
  const dispatch = createEventDispatcher();
  const states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Lakshadweep",
    "Puducherry",
  ];



  let address = {
    correspondence: {
      inputStates: {
        states,
        selected: correspondenceAddress.state,
      },
      inputAddressLine1: {
        label: "Address Line 1",
        validate: true,
        readonly: false,
        error: null,
        placeholderValue: "Address Line 1",
        error_mt: false,
        paddingsize: 0,
        validator: {
          method: (value) => {
            return value.length >= 3;
          },
          errormessage: "length can not be less than 3",
        },
      },

      inputAddressLine2: {
        label: "Address Line 2",
        validate: true,
        readonly: false,
        error: null,
        placeholderValue: "Address Line 2",
        error_mt: false,
        paddingsize: 0,
        validator: {
          method: (value) => {
            return value.length >= 3;
          },
          errormessage: "length can not be less than 3",
        },
      },

      inputDistrict: {
        label: "District",
        validate: true,
        readonly: false,
        error: null,
        placeholderValue: "District",
        error_mt: false,
        paddingsize: 0,
        validator: {
          method: (value) => {
            return value.length >= 3;
          },
          errormessage: "length can not be less than 3",
        },
      },
      inputPIN: {
        label: "PIN Code",
        validate: true,
        readonly: false,
        error: null,
        placeholderValue: "PIN Code",
        error_mt: false,
        paddingsize: 0,
        validator: {
          method: (value) => {
            if(isNaN(value)) return false;

            return value.length == 6;
          },
          errormessage: "pincode should be six digit",
        },
      },
    },
    permanent: {
      inputStates: {
        states,correspondenceAddress,
        selected: permanentAddress.state,
      },
      inputAddressLine1: {
        label: "Address Line 1",
        validate: true,
        readonly: false,
        error: null,
        placeholderValue: "Address Line 1",
        error_mt: false,
        paddingsize: 0,
        validator: {
          method: (value) => {
            return value.length >= 3;
          },
          errormessage: "length can not be less than 3",
        },
      },
      inputAddressLine2: {
        label: "Address Line 2",
        validate: true,
        readonly: false,
        error: null,
        placeholderValue: "Address Line 2",
        error_mt: false,
        paddingsize: 0,
        validator: {
          method: (value) => {
            return value.length >= 3;
          },
          errormessage: "length can not be less than 3",
        },
      },
      inputDistrict: {
        label: "District",
        validate: true,
        readonly: false,
        error: null,
        placeholderValue: "District",
        error_mt: false,
        paddingsize: 0,
        validator: {
          method: (value) => {
            return value.length >= 3;
          },
          errormessage: "length can not be less than 3",
        },
      },
      inputPIN: {
        label: "PIN Code",
        validate: true,
        readonly: false,
        error: null,
        placeholderValue: "PIN Code",
        error_mt: false,
        paddingsize: 0,
        validator: {
          method: (value) => {
            if(isNaN(value)) return false;
            return value.length == 6;
          },
          errormessage: "pincode should be six digit",
        },
      },
    },
  };
</script>

<div class="p-3 mt-5 lg:ml-40 lg:mr-40 mb-3 rounded-lg shadow-2xl">
  <div class="flex flex-col  h-auto ml-4 mr-4 mt-3 rounded-lg ">
    <div
      class="flex flex-row bg-orange-400 text-white text-2xl font-bold p-2 rounded-t-lg "
    >
      Correspondence Address 
    </div>
    <div
      class="m-4  rounded p-2 shadow-lg grid grid-cols-1 lg:grid-cols-4 justify-between"
    >
      <!-- <div class="col-span-3 lg:col-span-4 p-1">
        <InputRadioGroup
          label={inputAddressOutOfIndia.label}
          options={inputAddressOutOfIndia.options}
          bind:value={addressOutsideIndia}
          bind:error={errorsAddressOutsideIndia}
          bind:validator={inputAddressOutOfIndia.validator}
        />
      </div> -->
      
        <div class="col-span-3 lg:col-span-2  px-2">
          <TextInput
            bind:label={address.correspondence.inputAddressLine1.label}
            bind:value={correspondenceAddress.addressLine1}
            bind:error={errorsCorrespondenceAddress.addressLine1}
            validate={address.correspondence.inputAddressLine1.validate}
            readonly={address.correspondence.inputAddressLine1.readonly}
            placeholderValue={address.correspondence.inputAddressLine1
              .placeholderValue}
            error_mt={address.correspondence.inputAddressLine1.error_mt}
            bind:paddingsize={address.correspondence.inputAddressLine1
              .paddingsize}
            validator={address.correspondence.inputAddressLine1.validator}
          />
        </div>

        <div class="col-span-3 lg:col-span-2  px-2">
          <TextInput
            bind:label={address.correspondence.inputAddressLine2.label}
            bind:value={correspondenceAddress.addressLine2}
            bind:error={errorsCorrespondenceAddress.addressLine2}
            validate={address.correspondence.inputAddressLine2.validate}
            readonly={address.correspondence.inputAddressLine2.readonly}
            placeholderValue={address.correspondence.inputAddressLine2
              .placeholderValue}
            error_mt={address.correspondence.inputAddressLine2.error_mt}
            bind:paddingsize={address.correspondence.inputAddressLine2
              .paddingsize}
            validator={address.correspondence.inputAddressLine2.validator}
          />
        </div>
        <div class="col-span-4">
          <div class="grid grid-cols-3  gap-2">
        <div class="col-span-3 lg:col-span-1 px-2 pt-2 relative">
          <div
            class="uppercase text-xs font-semibold absolute top-4 left-6 bg-white pt-0.5 px-3 rounded z-10"
          >
            State
          </div>
          <DropDown
            bind:selected={correspondenceAddress.state}
            options={address.correspondence.inputStates.states}
            bind:error={errorsCorrespondenceAddress.state}
          />
        </div>
        <div class="col-span-3 lg:col-span-1  px-2 ">
          <TextInput
            bind:label={address.correspondence.inputDistrict.label}
            bind:value={correspondenceAddress.district}
            bind:error={errorsCorrespondenceAddress.district}
            validate={address.correspondence.inputDistrict.validate}
            readonly={address.correspondence.inputDistrict.readonly}
            placeholderValue={address.correspondence.inputDistrict
              .placeholderValue}
            error_mt={address.correspondence.inputDistrict.error_mt}
            bind:paddingsize={address.correspondence.inputDistrict.paddingsize}
            validator={address.correspondence.inputDistrict.validator}
          />
        </div>
        <div class="col-span-3 lg:col-span-1 px-2 ">
          <TextInput
            bind:label={address.correspondence.inputPIN.label}
            bind:value={correspondenceAddress.pin}
            bind:error={errorsCorrespondenceAddress.pin}
            validate={address.correspondence.inputPIN.validate}
            readonly={address.correspondence.inputPIN.readonly}
            placeholderValue={address.correspondence.inputPIN.placeholderValue}
            error_mt={address.correspondence.inputPIN.error_mt}
            bind:paddingsize={address.correspondence.inputPIN.paddingsize}
            validator={address.correspondence.inputPIN.validator}
          />
        </div>
          </div>
          </div>
    </div>
  </div>

  <!-- outside india -->
  <!-- perment address -->
  <div class="flex items-center ml-5">
    <input
      class="form-check-input appearance-none h-4 w-4 border border-orange-400 rounded-sm bg-white checked:bg-orange-600 checked:border-orange-600 focus:outline-none transition duration-200 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
      type="checkbox"
      value=""
      id="flexCheckDefault"
      bind:checked={permanentIsCorrespondence}
    />
    <label
      class="form-check-label inline-block text-base text-gray-700 text-center"
      for="flexCheckDefault"
    >
      Permanant address same as correspondence address
    </label>
  </div>
  {#if permanentIsCorrespondence === false}
    <div class="flex flex-col  h-auto ml-4 mr-4 mt-3 rounded-lg ">
      <div
        class="flex flex-row bg-orange-400 text-white text-2xl font-bold p-2 rounded-t-lg "
      >
        <div>
          <div>Permanent Address</div>
        </div>
      </div>
      <div
        class="m-4  rounded p-2 shadow-lg grid grid-cols-1 lg:grid-cols-4"
      >
        <div class="col-span-4 lg:col-span-2  px-2">
          <TextInput
            bind:label={address.permanent.inputAddressLine1.label}
            bind:value={permanentAddress.addressLine1}
            bind:error={errorsPermanantAddress.addressLine1}
            validate={address.permanent.inputAddressLine1.validate}
            readonly={address.permanent.inputAddressLine1.readonly}
            placeholderValue={address.permanent.inputAddressLine1
              .placeholderValue}
            error_mt={address.permanent.inputAddressLine1.error_mt}
            bind:paddingsize={address.permanent.inputAddressLine1.paddingsize}
            validator={address.permanent.inputAddressLine1.validator}
          />
        </div>
        <div class="col-span-4 lg:col-span-2  px-2">
          <TextInput
            bind:label={address.permanent.inputAddressLine2.label}
            bind:value={permanentAddress.addressLine2}
            bind:error={errorsPermanantAddress.addressLine2}
            validate={address.permanent.inputAddressLine2.validate}
            readonly={address.permanent.inputAddressLine2.readonly}
            placeholderValue={address.permanent.inputAddressLine2
              .placeholderValue}
            error_mt={address.permanent.inputAddressLine2.error_mt}
            bind:paddingsize={address.permanent.inputAddressLine2.paddingsize}
            validator={address.permanent.inputAddressLine2.validator}
          />
        </div>
        <div class="col-span-4">
        <div class="grid grid-cols-3">
        <div class="col-span-3 lg:col-span-1 px-2 pt-2 relative">
          <DropDown
            bind:selected={permanentAddress.state}
            options={address.permanent.inputStates.states}
            bind:error={errorsPermanantAddress.state}
          />
          <div
            class="uppercase text-xs font-semibold absolute top-4 left-6 bg-white pt-0.5 px-3 rounded"
          >
            State
          </div>
        </div>
        <div class="col-span-3 lg:col-span-1 px-2">
          <TextInput
            bind:label={address.permanent.inputDistrict.label}
            bind:value={permanentAddress.district}
            bind:error={errorsPermanantAddress.district}
            validate={address.permanent.inputDistrict.validate}
            readonly={address.permanent.inputDistrict.readonly}
            placeholderValue={address.permanent.inputDistrict.placeholderValue}
            error_mt={address.permanent.inputDistrict.error_mt}
            bind:paddingsize={address.permanent.inputDistrict.paddingsize}
            validator={address.permanent.inputDistrict.validator}
          />
        </div>
        <div class="col-span-3 lg:col-span-1 px-2">
          <TextInput
            bind:label={address.permanent.inputPIN.label}
            bind:value={permanentAddress.pin}
            bind:error={errorsPermanantAddress.pin}
            validate={address.permanent.inputPIN.validate}
            readonly={address.permanent.inputPIN.readonly}
            placeholderValue={address.permanent.inputPIN.placeholderValue}
            error_mt={address.permanent.inputPIN.error_mt}
            bind:paddingsize={address.permanent.inputPIN.paddingsize}
            validator={address.permanent.inputPIN.validator}
          />
        </div>
      </div>
    </div>
      </div>
    </div>
  {/if}
</div>
