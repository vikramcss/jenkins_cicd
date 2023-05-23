<script>
  import Signin from "$lib/Pages/Signin.svelte";
  import Alert from "../../common/Alert.svelte";
  import { goto } from "$app/navigation";
  import { validTime } from "../../stores/stores";
  import { token, application, impactedRecord } from "../../stores/stores";
  import SigninFinesh from "$lib/Pages/SigninFinesh.svelte";
  import { onMount } from "svelte";
  import { api } from "../../api/api";
  import { DateTime } from "luxon";
  let dataloaded = false;
  let myTimeout;
  let alert = "";
  onMount(async () => {
    try {
      const delay = (ms) => new Promise((res) => setTimeout(res, ms));
      $application = "";
      if (!$validTime) {
        await delay(3000);
        if (!$validTime) goto("/appnotstarted");
      }
      dataloaded = true;
    } catch (e) {
      console.log("exception in onMount", e);
    }
  });

  const updateToken = (val) => {
    token.update((_) => val);
  };

  const handleEvent = async (ev, e) => {
    switch (ev) {
      case "register":
        goto("/apply");
        break;

      case "loggedIn":
        console.log(
          "handleEvent called in signin route will goto dashboard route.",
          e.detail.token
        );
        console.log("token is:", e.detail.token);
        updateToken(e.detail.token);
        // let {
        //   error,
        //   errorMsg,
        //   isFeeImpacted,
        //   impactedRecord: lImpactedRecord,
        // } = await api.feeImpacted({ token: e.detail.token });
        // if (error) {
        //   alert = errorMsg;
        //   return;
        // }
        // if (isFeeImpacted) {
        //   $impactedRecord = lImpactedRecord;
        //   goto("/feeImpacted");
        //   return;
        // }
        goto("/profileAvailablePosts");
    }
  };
</script>

<svelte:head>
  <title>Signin</title>
  <meta name="robots" content="noindex nofollow" />
  <html lang="en" />
</svelte:head>
{#if dataloaded}
  <Signin
    on:register={(e) => {
      handleEvent("register", e);
    }}
    on:loggedIn={(e) => {
      handleEvent("loggedIn", e);
    }}
  />
  {#if alert}
    <Alert
      message={alert}
      on:alertClosed={() => {
        alert = null;
      }}
    />
  {/if}
{:else}
  ...Loading
{/if}

<!-- <div
  class="relative flex items-center justify-center m-10 p-10 font-semibold rounded bg-orange-100 "
>
  <div>
    Due to administrative reasons and instructions received from the competent
    authority the current recruitment process is on hold till further notice.
  </div>
  <div class="absolute bottom-1 right-1 text-xs font-normal">
    March 15, 2400 hrs
  </div>
</div> -->
