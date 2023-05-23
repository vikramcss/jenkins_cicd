<script>
  import Fa from "svelte-fa/src/fa.svelte";
  import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
  import { api } from "../../api/api";
  import TextInput from "../../common/TextInput.svelte";
  import Alert from "../../common/Alert.svelte";
  import { createEventDispatcher } from "svelte";
  import UnitCard from "../../common/UnitCard.svelte";
  import PasswordInput from "../../common/PasswordInput.svelte";

  let dispatch = createEventDispatcher();
  export let email;
  export let verificationId;
  export let mobile;
  let errorMsg = null;

  let passwordCriteria = {
    len: {
      satisfied: false,
    },
    letters: {
      satisfied: false,
    },
    specialchar: {
      satisfied: false,
    },
    digits: {
      satisfied: false,
    },
  };

  const validatePassword = (value) => {
    passwordCriteria.len.satisfied = false;
    passwordCriteria.letters.satisfied = false;
    passwordCriteria.digits.satisfied = false;
    passwordCriteria.specialchar.satisfied = false;

    if (reenterPassword.value !== null || reenterPassword.value != "") {
      reenterPassword.error = validateReenterPassword(reenterPassword.value)
        ? null
        : "reenter password do not match";
    }

    if (value.length >= 8 && value.length <= 15)
      passwordCriteria.len.satisfied = true;
    if (/[a-zA-Z]/.test(value)) passwordCriteria.letters.satisfied = true;
    if (/[ !\\"#$%&'\(\)\*\+,-\.:;<=>\?@\[\\\]\^_`\{\|\}~]/.test(value))
      passwordCriteria.specialchar.satisfied = true;
    if (/[0-9]/.test(value)) passwordCriteria.digits.satisfied = true;

    if (
      passwordCriteria.len.satisfied === false ||
      passwordCriteria.letters.satisfied === false ||
      passwordCriteria.digits.satisfied === false ||
      passwordCriteria.specialchar.satisfied === false
    )
      return false;

    return true;
  };

  const validateReenterPassword = (value) => {
    if (value != password.value) return false;
    return true;
  };

  const createLogin = async () => {
    errorMsg = null;
    if (password.error || reenterPassword.error) {
      errorMsg = "Please fill Password and Re-enter password fields";
      return false;
    }
    if (
      !password.value ||
      password.value === "" ||
      !reenterPassword.value ||
      reenterPassword.value === ""
    ) {
      errorMsg = "Please fill Password and Re-enter password fields";
      return false;
    }
    const { error, errorMsg: lerrorMsg } = await api.createLogin({
      login: email,
      password: password.value,
      verificationId,
      mobile,
    });
    if (error) {
      errorMsg = lerrorMsg;
      return false;
    }

    dispatch("loginCreated", { email });
  };

  const handlePrevious = () => {
    dispatch("previous", {});
  };

  let loginId = {
    label: "Login Id",
    value: email,
    validate: false,
    readonly: true,
    error: null,
    placeholderValue: "",
    error_mt: false,
    paddingsize: 0,
    validator: null,
  };

  let password = {
    label: "Password",
    // value: '',
    value: "",
    validate: true,
    readonly: false,
    error: null,
    placeholderValue: "Password",
    error_mt: false,
    paddingsize: 0,
    validator: {
      method: validatePassword,
      errormessage: "Please enter valid password",
    },
  };
  let reenterPassword = {
    label: "Re-enter Password",
    // value: '',
    value: "",
    validate: true,
    readonly: false,
    error: null,
    placeholderValue: "Password",
    error_mt: false,
    paddingsize: 0,
    validator: {
      method: validateReenterPassword,
      errormessage: "Re-enter password does not match with password",
    },
  };
  let inputType = "text";
</script>

<div
  class="flex flex-col space-y-3 container md:w-1/3 mx-auto p-5 m-5 bg-gray-100 rounded shadow-xl"
>
  <div class="bg-blue-600 text-white font-semibold p-3 mb-1 rounded">
    Create Login
  </div>

  <!-- {JSON.stringify(company, null, 2)} -->

  <div>
    <TextInput
      bind:label={loginId.label}
      bind:value={loginId.value}
      validate={loginId.validate}
      readonly={loginId.readonly}
      bind:error={loginId.error}
      placeholderValue={loginId.placeholderValue}
      error_mt={loginId.error_mt}
      bind:paddingsize={loginId.paddingsize}
      validator={loginId.validator}
    />
    <div class="flex justify-between">
      <PasswordInput
        bind:label={password.label}
        bind:value={password.value}
        validate={password.validate}
        readonly={password.readonly}
        bind:error={password.error}
        placeholderValue={password.placeholderValue}
        error_mt={password.error_mt}
        bind:paddingsize={password.paddingsize}
        validator={password.validator}
      />
    </div>

    <div class="grid grid-cols-1 justify-items-end text-xs font-semibold pr-3">
      <div
        class={passwordCriteria.letters.satisfied
          ? "text-gray-700"
          : "text-red-500"}
      >
        {#if passwordCriteria.letters.satisfied}
          <Fa icon={faCheck} size="xs" pull="left" class="mt-1.5 mr-1" />
        {:else}
          <Fa icon={faTimes} size="xs" pull="left" class="mt-1.5 mr-1" />
        {/if}
        [letter]
      </div>
      <div
        class={passwordCriteria.digits.satisfied
          ? "text-gray-700"
          : "text-red-500"}
      >
        {#if passwordCriteria.digits.satisfied}
          <Fa icon={faCheck} size="xs" pull="left" class="mt-1.5 mr-1" />
        {:else}
          <Fa icon={faTimes} size="xs" pull="left" class="mt-1.5 mr-1" />
        {/if}
        [digit]
      </div>
      <div
        class={passwordCriteria.specialchar.satisfied
          ? "text-gray-700"
          : "text-red-500"}
      >
        {#if passwordCriteria.specialchar.satisfied}
          <Fa icon={faCheck} size="xs" pull="left" class="mt-1.5 mr-1" />
        {:else}
          <Fa icon={faTimes} size="xs" pull="left" class="mt-1.5 mr-1" />
        {/if}
        [special char like @,#,$,%,^,&,*]
      </div>
      <div
        class={passwordCriteria.len.satisfied
          ? "text-gray-700"
          : "text-red-500"}
      >
        {#if passwordCriteria.len.satisfied}
          <Fa icon={faCheck} size="xs" pull="left" class="mt-1.5 mr-1" />
        {:else}
          <Fa icon={faTimes} size="xs" pull="left" class="mt-1.5 mr-1" />
        {/if}
        [length 8-15]
      </div>
    </div>

    <PasswordInput
      bind:label={reenterPassword.label}
      bind:value={reenterPassword.value}
      validate={reenterPassword.validate}
      readonly={reenterPassword.readonly}
      bind:error={reenterPassword.error}
      placeholderValue={reenterPassword.placeholderValue}
      error_mt={reenterPassword.error_mt}
      bind:paddingsize={reenterPassword.paddingsize}
      validator={reenterPassword.validator}
    />
  </div>

  {#if errorMsg}
    <Alert
      message={errorMsg}
      on:alertClosed={() => {
        errorMsg = null;
      }}
    />
  {/if}

  <div class="flex justify-between pt-4">
    <button
      type="button"
      disabled
      class=" text-center bg-gray-600 cursor-not-allowed text-gray-200 shadow-lg font-bold py-2 px-4 rounded"
    >
      Previous
    </button>
    <!-- <button
			on:click={handlePrevious}
			class="bg-white-500 hover:bg-blue-700 hover:text-white border border-blue-500 text-blue-500 font-bold py-2 px-4 rounded"
		>
			Previous
		</button> -->
    <button
      type="submit"
      on:click={() => createLogin()}
      class=" ring-2 ml-2 hover:ring-blue-700 ring-blue-400 text-center bg-blue-600 hover:bg-blue-700 text-white shadow-lg font-bold py-2 px-4 rounded"
    >
      Create Login
    </button>
    <!-- <button
			on:click={() => createLogin()}
			class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
		>
			<button/>Create Login</button
		> -->
  </div>
</div>
