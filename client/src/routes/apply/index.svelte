<script>
  import ValidateVerificationCode from "$lib/Pages/ValidateVerificationCode.svelte";
  import SendVerificationCode from "$lib/Pages/SendVerificationCode.svelte";
  import RegisterLogin from "$lib/Pages/RegisterLogin.svelte";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import CardMessage from "../../components/CardMessage.svelte";
  import RegisterLoginSuccessful from "$lib/Pages/RegisterLoginSuccessful.svelte";
  import { DateTime } from "luxon";
  import { api } from "../../api/api";
  import {
    token,
    currentDate,
    startApplications,
    endApplications,
  } from "../../stores/stores";
  let dataloaded = false;
  let message = ''
  onMount(async () => {
    try {

      console.log('onMount fired')
      let { error, errorMsg, endDatetime, startDatetime } =
        await api.getFormSchedule();
      let { currentDate: cd } = await api.getCurrentDate();
      $currentDate = cd;

      let lstartDatetime = DateTime.fromISO(startDatetime);
      let lendDatetime = DateTime.fromISO(endDatetime);
      let lcurrentDatetime = DateTime.fromISO($currentDate);

      console.log('current Date is:', lcurrentDatetime)
      console.log('end Date is:', lendDatetime)
      console.log('start Date is:', lstartDatetime)
      if(lcurrentDatetime < lendDatetime )  {
        console.log('current date is less than end date')
      } else {
        message = `Application form reception has ended on ${lendDatetime.toLocaleString(DateTime.DATETIME_FULL)}`
      }
      if(lcurrentDatetime > lstartDatetime) {
        console.log('current date is greater than start date')
      } else {
        console.log('current date is not greater than start date')
        message = `Application form reception has not started yet, it will commence on ${lstartDatetime.toLocaleString(DateTime.DATETIME_FULL)}`
      }
    } catch (e) {
      console.log('exception thrown in onMount', e);
    }
    dataloaded = true;
  });

  let currentState = "sendVerificationCode";
  let email = "";
  let verificationId = "";
  let mobile ;
  let mobileVerificationId =""
  const handleEvent = (ev, e) => {
    switch (ev) {
      case "emailRegistered":
        email = e.detail.email;
        email = email.toLowerCase()
        verificationId = e.detail.verificationId;
        mobile=e.detail.mobile,
        mobileVerificationId = e.detail.mobileVerificationId
        currentState = "messageVerificationCodeSent";
        break;
      case "otpVerified":
        email = e.detail.email;
        verificationId = e.detail.verificationId;
        currentState = "registerLogin";
        break;
      case "loginCreated":
        currentState = "registerLoginSuccessful";
        email = e.detail.email;
        break;
      case "signin":
        goto("/signin");
        break;
    }
  };
</script>

{#if dataloaded}
{#if message} 
<CardMessage {message}></CardMessage>
{:else if currentState == "sendVerificationCode"}
  <SendVerificationCode
    on:emailRegistered={(e) => {
      handleEvent("emailRegistered", e);
    }}
  />
{:else if currentState == "messageVerificationCodeSent"}
  <ValidateVerificationCode
    {email}
    {verificationId}
    {mobile}
    {mobileVerificationId}
    on:otpVerified={(e) => handleEvent("otpVerified", e)}
  />
{:else if currentState == "registerLogin"}
  <RegisterLogin
    {email}
    {verificationId}
    {mobile}
    on:loginCreated={(e) => handleEvent("loginCreated", e)}
  />
{:else if currentState == "registerLoginSuccessful"}
  <RegisterLoginSuccessful
    {email}
    on:signin={(e) => handleEvent("signin", e)}
  />
{/if}
{:else}
...Loading
{/if}
<!-- <div
  class="relative flex items-center justify-center m-10 p-10 font-semibold rounded bg-orange-100 " -->
<!-- >
  <div>
    Due to administrative reasons and instructions received from the competent
    authority the current recruitment process is on hold till further notice.
  </div>
  <div class="absolute bottom-1 right-1 text-xs font-normal">
    March 15, 2400 hrs
  </div>
</div> -->
