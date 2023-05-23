<script>
  import TextInput from "../../common/TextInput.svelte";
  import Alert from "../../common/Alert.svelte";
  import { createEventDispatcher } from "svelte";
  import { api } from "../../api/api";

  import { goto } from "$app/navigation";

  const dispatch = createEventDispatcher();

  const validateEmail = (value) => {
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regexEmail.test(value);
  };

  const validateMobile = (value) => {
    let regexMobile = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    return regexMobile.test(value);
  };

  let mobileno = {
    label: "Enter your Mobile No.",
    value: "",
    validate: true,
    readonly: false,
    error: null,
    placeholderValue: "Mobile No.",
    error_mt: false,
    paddingsize: 0,
    validator: {
      method: validateMobile,
      errormessage: "Please enter valid Mobile No",
    },
  };

  let email = {
    label: "Enter your email id",
    value: "",
    validate: true,
    readonly: false,
    error: null,
    placeholderValue: "Email Id",
    error_mt: false,
    paddingsize: 0,
    validator: {
      method: validateEmail,
      errormessage: "Please enter valid email id",
    },
  };
  let alert = null;

  const saveEmail = async () => {
    if (!validateEmail(email.value)) {
      email.error = email.validator.errormessage;
      return false;
    }
    alert = null;
    let {
      error,
      errorMsg,
      email: lemail,
      verificationId,
    } = await api.sendVerificationCode({ email: email.value });
    if (error) {
      alert = errorMsg;
      return false;
    }

    if (!validateMobile(mobileno.value)) {
      mobileno.error = mobileno.validator.errormessage;
      return false;
    }
    alert = null;
    let {
      error: error1,
      errorMsg: errorMsg1,
      mobile: lmobile,
      mobileVerificationId,
    } = await api.sendMobileVerificationCode({ mobile: mobileno.value });
    if (error1) {
      alert = errorMsg1;
    }

    return dispatch("emailRegistered", {
      email: email.value,
      verificationId,
      mobile: mobileno.value,
      mobileVerificationId,
    });
  };
  const signin = () => {
    return goto("/signin");
  };
</script>

   <div class=" bg-gray-200 text-xs  text-gray-700 p-2 m-2 font-bold flex justify-center items-center break-normal mt-2 text-semibold">Note:- Registred Email Id & Mobile Number will be Utilize for further communication from Department.</div>
<div class="flex items-center justify-center mt-10 ">
  <div class="self-center border-2 p-3 rounded-lg shadow-md bg-gray-50  ">
    <div class="text-center font-bold tracking-wide text-xl">
      Registration
    </div>
    <form class="" on:submit|preventDefault={saveEmail}>
      <TextInput
        bind:label={email.label}
        inputBoxSize = {'w-96'}
        bind:value={email.value}
        validate={email.validate}
        readonly={email.readonly}
        bind:error={email.error}
        placeholderValue={email.placeholderValue}
        error_mt={email.error_mt}
        bind:paddingsize={email.paddingsize}
        validator={email.validator}
      />
      <!-- <span class="font-semibold ml-36 ">And</span> -->

      <TextInput
        bind:label={mobileno.label}
        bind:value={mobileno.value}
        validate={mobileno.validate}
        readonly={mobileno.readonly}
        bind:error={mobileno.error}
        placeholderValue={mobileno.placeholderValue}
        error_mt={mobileno.error_mt}
        bind:paddingsize={mobileno.paddingsize}
        validator={mobileno.validator}
      />

      {#if alert}
        <div class="mt-3">
          <Alert
            message={alert}
            on:alertClosed={() => {
              alert = null;
            }}
          />
        </div>
      {/if}
      <div class="flex items-center justify-center mt-3 py-3 bg-gray-50  ">
        <!-- <button
          type="button"
          on:click={signin}
          class="inline-flex justify-center py-2 px-4 border-2 border-indigo-700 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-indigo-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Signin
        </button> -->
        {#if validateEmail(email.value) && validateMobile(mobileno.value)}
          <button
            type="submit"
            class="text-xs sd:text-sm md:text-base ring-2 ml-2  ring-orange-400 text-center bg-orange-600 focus:ring-orange-700 focus:bg-orange-700 hover:ring-orange-700 hover:bg-orange-700 text-white shadow-lg font-bold py-2 px-4 rounded"
          >
            Send Verification Code
          </button>
        {:else}
          <button
            type="submit"
            class="text-xs sd:text-sm md:text-base ring-2 ring-white  ml-2 text-white bg-orange-600 hover:bg-orange-400 shadow-lg font-bold py-2 px-4 rounded"
          >
            Send Verification Code
          </button>
        {/if}
      </div>
      <span class="flex justify-center items-center">Or</span>
      <span class="text-xs flex justify-center items-center"
        >( if you have already registered, sign in )</span
      >
      <div class="flex items-center justify-center pt-2">
        <button
          type="button"
          on:click={signin}
          tabindex="100"
          class=" text-xs sm:text-sm md:text-base ring-2 hover:ring-0 ring-orange-400 text-center bg-white focus:bg-orange-600 focus:text-white hover:bg-orange-600 hover:text-white text-gray-600 shadow-lg font-bold py-2 px-4 rounded"
        >
          Sign In
        </button>
      </div>
   </form>
  </div>
</div>
