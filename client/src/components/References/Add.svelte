<script>
  import Fa from "svelte-fa";
  import { faPlus } from "@fortawesome/free-solid-svg-icons";
  import TextInput from "../../common/TextInput.svelte";
  import { createEventDispatcher } from "svelte";
  import TextInputV2 from "../../common/TextInputV2.svelte";

  const dispatch = createEventDispatcher();

  export let showModal;
  let isInternational = false;

  let name = {
    label: "Name",
    value: "",
    validate: true,
    readonly: false,
    error: null,
    placeholderValue: "Name",
    error_mt: false,
    paddingsize: 0,
    validator: {
      method: (value) => {
        name.error = null;
        if (value.length < 3) {
          name.error = "Name can not be empty";
          return false;
        }
        return true;
      },
      errormessage: "can not be less than 3 chars long",
    },
  };

  let occupation = {
    label: "Designation",
    value: "",
    validate: true,
    readonly: false,
    error: null,
    placeholderValue: "Designation",
    error_mt: false,
    paddingsize: 0,
    validator: {
      method: (value) => {
        occupation.error = null;
        if (value.length < 3) {
          occupation.error = occupation.validator.errormessage;
          return false;
        }
        return true;
      },
      errormessage: "Designation can not be less than 3 chars",
    },
  };

  let address = {
    label: "Address",
    value: "",
    validate: true,
    readonly: false,
    error: null,
    placeholderValue: "Address",
    error_mt: false,
    paddingsize: 0,
    validator: {
      method: (value) => {
        address.error = null;
        if (value.length < 3) {
          address.error = address.validator.errormessage;
          return false;
        }
        return true;
      },
      errormessage: "Address can not be less than 3 chars",
    },
  };
  let email = {
    label: "E-Mail",
    value: "",
    validate: true,
    readonly: false,
    error: null,
    placeholderValue: "E-Mail",
    error_mt: false,
    paddingsize: 0,
    validator: {
      method: (value) => {
        let regex =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regex.test(value)) email.error = email.validator.errormessage;
        return regex.test(value);
      },
      errormessage: "Please enter valid E-Mail ID",
    },
  };

  let mobile = {
    label: "Mobile Number",
    value: "",
    validate: true,
    readonly: false,
    error: null,
    placeholderValue: "Mobile Number",
    error_mt: false,
    paddingsize: 0,
    validator: {
      method: (value) => {
        let regex = /[789]{1}[0-9]{9}/;
        if (!regex.test(value)) mobile.error = mobile.validator.errormessage;
        return regex.test(value);
      },
      errormessage: "Please enter valid 10 digit mobile number",
    },
  };

  let association = {
    label: "Association with Reference",
    value: "",
    validate: true,
    readonly: false,
    error: null,
    placeholderValue: "Association with Reference",
    error_mt: false,
    paddingsize: 0,
    validator: {
      method: (value) => {
        if (!value || value.length < 3) {
          association.error = association.validator.errormessage;
          return false;
        }
        return true;
      },
      errormessage: "should be at least three characters long",
    },
  };
  const validate = () => {
    let valid = true;
    if (!name.validator.method(name.value)) {
      valid = false;
    }
    if (!occupation.validator.method(occupation.value)) {
      valid = false;
    }
    if (!address.validator.method(address.value)) {
      valid = false;
    }
    if (!email.validator.method(email.value)) {
      valid = false;
    }
    if (!isInternational) {
      if (!mobile.validator.method(mobile.value)) {
        valid = false;
      }
    }

    if (!valid) return false;
    return true;
  };
  const save = () => {
    if (!validate()) return false;
    return true;
  };

  function toggleModal({ op }) {
    if (op === "save" && !save()) {
      console.log("save returned false");
      return false;
    }
    console.log("toggleModal called: ", op);
    showModal = !showModal;
    console.log("toggleModal called op: ", op, "showModal:", showModal);
    if (op === "cancel") return true;

    let references = {
      refName: name.value,
      refOccupation: occupation.value,
      refAddress: address.value,
      refEmail: email.value,
      refMobile: mobile.value,
      refAssociation: association.value,
    };
    dispatch("add", { references });
  }
</script>

<!-- {#if showModal} -->
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
        class="flex items-strat justify-between p-5 border-b border-solid border-blueGray-200 rounded-t"
      >
        <h3 class="text-3xl font-semibold">Add Reference</h3>
        <div class=" text-gray-600">
          <Fa icon={faPlus} size="2x" />
        </div>
      </div>
      <!--body-->
      <div class="relative p-6 flex-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 ">
          <TextInput
            bind:label={name.label}
            bind:value={name.value}
            validate={name.validate}
            readonly={name.readonly}
            bind:error={name.error}
            placeholderValue={name.placeholderValue}
            error_mt={name.error_mt}
            bind:paddingsize={name.paddingsize}
            validator={name.validator}
          />
          <TextInput
            bind:label={occupation.label}
            bind:value={occupation.value}
            validate={occupation.validate}
            readonly={occupation.readonly}
            bind:error={occupation.error}
            placeholderValue={occupation.placeholderValue}
            error_mt={occupation.error_mt}
            bind:paddingsize={occupation.paddingsize}
            validator={occupation.validator}
          />
          <TextInput
            bind:label={address.label}
            bind:value={address.value}
            validate={address.validate}
            readonly={address.readonly}
            bind:error={address.error}
            placeholderValue={address.placeholderValue}
            error_mt={address.error_mt}
            bind:paddingsize={address.paddingsize}
            validator={address.validator}
          />
          <TextInput
            bind:label={email.label}
            bind:value={email.value}
            validate={email.validate}
            readonly={email.readonly}
            bind:error={email.error}
            placeholderValue={email.placeholderValue}
            error_mt={email.error_mt}
            bind:paddingsize={email.paddingsize}
            validator={email.validator}
          />
          <div>
            <div class="flex justify-end">
              <label class = "flex items-center mr-2">
                <div class="mr-2">International number</div>
                <input type="checkbox" bind:checked={isInternational} class="flex items-center"/>
              </label>
            </div>
            {#if !isInternational}
              <TextInputV2
                bind:label={mobile.label}
                bind:value={mobile.value}
                validate={mobile.validate}
                readonly={mobile.readonly}
                bind:error={mobile.error}
                placeholderValue={mobile.placeholderValue}
                error_mt={mobile.error_mt}
                bind:paddingsize={mobile.paddingsize}
                validator={mobile.validator}
                margintop={"0"}
              />
            {:else}
              <TextInputV2
                bind:label={mobile.label}
                bind:value={mobile.value}
                validate={false}
                readonly={mobile.readonly}
                bind:error={mobile.error}
                placeholderValue={mobile.placeholderValue}
                error_mt={mobile.error_mt}
                bind:paddingsize={mobile.paddingsize}
                validator={mobile.validator}
                margintop={"0"}
              />
            {/if}
          </div>

          <TextInput
            bind:label={association.label}
            bind:value={association.value}
            validate={association.validate}
            readonly={association.readonly}
            bind:error={association.error}
            placeholderValue={association.placeholderValue}
            error_mt={association.error_mt}
            bind:paddingsize={association.paddingsize}
            validator={association.validator}
          />
        </div>
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
          class="w-48  text-center bg-blue-600 hover:bg-blue-500  shadow-lg text-white font-bold py-2 px-4 rounded"
        >
          ADD
        </button>
      </div>
    </div>
  </div>
</div>
<div class="opacity-25 fixed inset-0 z-40 bg-black" />
<!-- {/if} -->
