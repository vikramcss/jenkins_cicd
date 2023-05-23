<script>
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import AvailablePost from "../../lib/Pages/AvailablePost.svelte";
  import { api } from "../../api/api";
  import {
    token,
    application,
    user,
    impactedRecord,
  } from "../../stores/stores";
  import Alert from "../../common/Alert.svelte";

  import { Jumper, Circle } from "svelte-loading-spinners";

  let login;
  let mobile;
  let dataLoaded = false;
  let alertMsg = null;
  let availablePosts = null;
  const onAddUpdateProfile = (e) => {
    goto("/profileAvailablePosts/updateProfile");
  };

  onMount(async () => {
    console.log("onMount called for application route");
    try {
      console.log("application ", $application);
      if (!$token) goto("/signin");
      let {
        error,
        errorMsg: lerrorMsg,
        login: llogin,
        mobile: lmobile,
        application: lapplication,
      } = await api.getApplication({ token: $token });
      console.log("error:", error);
      if (!error) {
        $application = { ...lapplication };
        console.log("application is :", $application);
        login = llogin;
        mobile = lmobile;
        $user = { login, mobile };
      } else {
        // errorMsg = lerrorMsg;
        login = llogin;
        mobile = lmobile;
        $user = { login, mobile };
      }
      // get available posts in the advertisement
      let {
        error: lerror1,
        errorMsg: lerrorMsg1,
        availablePosts: lavailablePosts,
      } = await api.getAvailablePosts({ token: $token });
      if (lerror1) {
        alertMsg = lerrorMsg1;
        return;
      }
      availablePosts = [...lavailablePosts];
      console.log("available posts: ", availablePosts);

      // let {
      //   error: lError2,
      //   errorMsg,
      //   isFeeImpacted,
      //   impactedRecord: lImpactedRecord,
      // } = await api.feeImpacted({ token: $token });
      // if (lError2) {
      //   alertMsg = errorMsg;
      //   return;
      // }
      // if (isFeeImpacted) {
      //   $impactedRecord = lImpactedRecord;
      //   // goto("/feeImpacted");
      //   // return;
      // }
      dataLoaded = true;
    } catch (e) {
      console.log("error in communicating with server: ", e);
      alertMsg = e;
    }
  });
</script>

{#if dataLoaded}
  <AvailablePost
    {login}
    {mobile}
    application={$application}
    {availablePosts}
    on:addUpdateProfile={onAddUpdateProfile}
  />
{:else}
  <div class="flex justify-center items-center h-screen">
    <Circle size="60" color="#FF3E00" unit="px" duration="1s" />
  </div>
{/if}
