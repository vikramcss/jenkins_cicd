<script>
  import { createEventDispatcher } from "svelte";
  import Alert from "../../common/Alert.svelte";
  import TextInput from "../../common/TextInput.svelte";
  import { api } from "../../api/api";

  export let email;
  export let verificationId;
  export let mobile;
  export let mobileVerificationId;

  let alert = null;
  let otpTimeOut = false;
  const dispatch = createEventDispatcher();

  let form_otp = {
    label: "Email Verification Code",
    value: "",
    validate: true,
    readonly: false,
    eroror: "",
    placeholderValue: "",
    error_mt: false,
    paddingsize: 0,
  };
  let form_email = {
    label: "Email",
    value: email,
    validate: false,
    readonly: true,
    eroror: "",
    placeholderValue: "",
    error_mt: false,
    paddingsize: 0,
  };

  let form_mobile_otp = {
    label: "Mobile Verification Code",
    value: "",
    validate: true,
    readonly: false,
    eroror: "",
    placeholderValue: "",
    error_mt: false,
    paddingsize: 0,
  };

  let form_mobile = {
    label: "Mobile",
    value: mobile,
    validate: false,
    readonly: true,
    eroror: "",
    placeholderValue: "",
    error_mt: false,
    paddingsize: 0,
  };

  const validateOTP = async () => {
    otpTimeOut = true;
    alert = null;
    let valid = true;
    const { error, errorMsg } = await api.validateOTP({
      email,
      verificationId,
      otp: form_otp.value,
    });
    if (error !== 0) {
      // alert = "Invalid Verification Code";
      alert = errorMsg;
      valid = false;
    }

    const { error: lerror, errorMsg: lerrorMsg } = await api.validateMobileOTP({
      mobile,
      mobileVerificationId,
      otp: form_mobile_otp.value,
    });
    if (lerror !== 0) {
      // alert = "Invalid Mobile Verification Code";
      alert = alert ? `${alert} and ${lerrorMsg}` : lerrorMsg;
      valid = false;
    }
    if (!valid) {
      alert = `${alert}, please click resend OTP to get fresh OTP`;
      return false;
    }
    dispatch("otpVerified", {
      email,
      verificationId,
      mobile,
      mobileVerificationId,
    });
    return true;
  };
  // const resendVerificationCode = async () => {
  //       alert = null;
  //       console.log("in resendVerificationCode");
  //       let {error, errorMsg, email:lemail, verificationId:lverificationId}  = await api.sendVerificaitonCode({email: email.value})
  //       console.log("sendVerificationCOde called");
  //       if(error)  alert = "Failed to resend Verificaiton Code";
  //       alert = "New verification code is sent to your email";
  //       verificationId = lverificationId;
  // }
  const resendVerificationCode = async () => {
    alert = null;
    let {
      error,
      errorMsg,
      email: lemail,
      verificationId: lverificationId,
    } = await api.sendVerificationCode({ email });

    alert = "New verification codes are sent to your email and mobile";

    if (error) alert = "Failed to resend Verificaiton Code";
    verificationId = lverificationId;

    let {
      error: error1,
      errorMsg: errorMsg1,
      mobile: lmobile,
      mobileVerificationId: lmobileVerificationId,
    } = await api.sendMobileVerificationCode({ mobile });
    console.log("error is ", error1);
    if (error1) alert = "Failed to resend mobile verification Code ";
    mobileVerificationId = lmobileVerificationId;
    // return dispatch("emailRegistered", { email:email.value, verificationId });
  };
</script>

<div class="flex items-center justify-center mt-10 ">
  <div class="self-center">
    <form on:submit|preventDefault={validateOTP}>
      <TextInput
        bind:label={form_otp.label}
        bind:value={form_otp.value}
        validate={form_otp.validate}
        readonly={form_otp.readonly}
        bind:error={form_otp.error}
        placeholderValue={form_otp.placeholderValue}
        error_mt={form_otp.error_mt}
        bind:paddingsize={form_otp.paddingsize}
      />
      <TextInput
        bind:label={form_email.label}
        bind:value={form_email.value}
        validate={form_email.validate}
        readonly={form_email.readonly}
        bind:error={form_email.error}
        placeholderValue={form_email.placeholderValue}
        error_mt={form_email.error_mt}
        bind:paddingsize={form_email.paddingsize}
      />

      <TextInput
        bind:label={form_mobile_otp.label}
        bind:value={form_mobile_otp.value}
        validate={form_mobile_otp.validate}
        readonly={form_mobile_otp.readonly}
        bind:error={form_mobile_otp.error}
        placeholderValue={form_mobile_otp.placeholderValue}
        error_mt={form_mobile_otp.error_mt}
        bind:paddingsize={form_mobile_otp.paddingsize}
      />
      <TextInput
        bind:label={form_mobile.label}
        bind:value={form_mobile.value}
        validate={form_mobile.validate}
        readonly={form_mobile.readonly}
        bind:error={form_mobile.error}
        placeholderValue={form_mobile.placeholderValue}
        error_mt={form_mobile.error_mt}
        bind:paddingsize={form_mobile.paddingsize}
      />
      <!-- {#if otpTimeOut} -->
      <div class="my-2 text-red-800">
        Email and Mobile OTP Valid for 5 minutes
      </div>
      <!-- {/if} -->
      {#if alert}
        <div class="m-3">
          <Alert
            message={alert}
            on:alertClosed={() => {
              alert = null;
            }}
          />
        </div>
      {/if}
      <div class="flex items-center justify-between py-3 bg-gray-50">
        <button
          type="submit"
          class=" ring-2 ml-2 hover:ring-blue-700 ring-blue-400 text-center bg-blue-600 hover:bg-blue-700 text-white shadow-lg font-bold py-2 px-4 rounded"
        >
          Submit OTP
        </button>
        <!-- <button
          type="submit"
          class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Enter OTP
        </button> -->
        <button
          type="button"
          on:click={resendVerificationCode}
          class=" ml-2 ring-2 hover:ring-blue-700 ring-blue-400 text-center bg-gray-600 hover:bg-blue-700 text-white shadow-lg font-bold py-2 px-4 rounded"
        >
          Resend OTP
        </button>
        <!-- <button
          type="button"
          on:click={resendVerificationCode}
          class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Resend OTP
        </button> -->
      </div>
    </form>
  </div>
</div>
<div />
