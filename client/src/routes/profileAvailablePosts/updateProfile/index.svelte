<script>
  import PersonalInfo from "$lib/Pages/PersonalInfo.svelte";
  import { onMount } from "svelte";
  import { token, application, user } from "../../../stores/stores";
  import { api } from "../../../api/api";
  import { goto } from "$app/navigation";
  import FileuploadProfile from "$lib/Pages/FileuploadProfile.svelte";
  import Step from "../../../common/Step.svelte";
  import { Circle } from 'svelte-loading-spinners';

  let personalInfo = undefined;
  let correspondenceAddress = undefined;
  let permanentAddress = undefined;
  let permanentIsCorrespondence = true;
  let uploads = undefined;
  let addressOutsideIndia = undefined;
  let additionalInformation = undefined;
  let appid;
  let loading = false;
  let loadingForUpload = false
  let login = $user.login;
  let mobile = $user.mobile;
  let errorMsg = null;
  let currentStep = null;
  let confirmation_server;
  let confirmation_client;
  let saveError = "";
  let uploadError = ""
  onMount(async () => {
    if (!$token) goto("/signin");
    // console.log("onMount called for application route");
    // let {
    //   error,
    //   errorMsg: lerrorMsg,
    //   login: llogin,
    //   mobile: lmobile,
    //   application,
    // } = await api.getApplication({ token: $token });
    // console.log("getApplication:", application);
    // console.log("error:", error);
    if ($application && $application.personalInfo) {
      // login = $application?.personalInfo.email;
      // mobile = $application?.personalInfo.mobile;
      console.log("application is :", $application);
      personalInfo = $application.personalInfo;
      appid = $application.appid;
      correspondenceAddress = $application.correspondenceAddress;
      permanentIsCorrespondence = $application.permanentIsCorrespondence;
      permanentAddress = $application.permanentAddress;
      addressOutsideIndia = $application.addressOutsideIndia;
      // if ($application.confirmation_client || $application.confirmation_server) {
      //   goto(`/dashboard/${postId}`);
      // }
    }
    currentStep = "personalInfo";
  });
  const save = async (data) => {
    console.log("data to be saved is:", data);
    try {
      const {
        error,
        errorMsg: lErrorMsg,
        application: lApplication,
      } = await api.saveApplication({
        params: { ...data },
        token: $token,
      });
      if (error) {
        console.log("saveApplication got error: ", error);
        errorMsg = lErrorMsg;
        loading = false
        return -1;
      }
      personalInfo = lApplication.personalInfo;
      appid = lApplication.appid;
      correspondenceAddress = lApplication.correspondenceAddress;
      permanentIsCorrespondence = lApplication.permanentIsCorrespondence;
      permanentAddress = lApplication.permanentAddress;
      uploads = lApplication.uploads ? lApplication.uploads : {};
      addressOutsideIndia = lApplication.addressOutsideIndia;
      $application = { ...lApplication };
      return 0;
    } catch (e) {
      console.log("saveApplication exception and hence error: ", e);
      return -1;
    }
  };

  const handleEvent = async (ev, e) => {
    let error = 0;
    switch (ev) {
      case "savePersonalInfo":
        //loading = e.detail.loading;
        error = await save(e.detail.data);
        if (!error) {
          currentStep =  e.detail.action === "next" ? "uploadDocuments" : currentStep;
        } else {
          saveError = "error is saving application, try again ";
        }
        loading = false
        break;
      case "uploadDocuments":
        error = await save(e.detail.data);
        if (!error) {
          currentStep = e.detail.action === "done" ? currentStep : "personalInfo";
          if (e.detail.action == "done") {
            goto("/profileAvailablePosts");
          }
          loadingForUpload = false
        } else {
          uploadError = "error in uploading files, try again ";
          loadingForUpload = false
        }
        break;
    }
  };
</script>

<svelte:head>
  <title>Application</title>
  <meta name="robots" content="noindex nofollow" />
  <html lang="en" />
</svelte:head>
<!-- {#if appid}
  <div class="flex justify-end">
    <span
      class="border-2 border-orange-500 p-2 m-2 mr-8 rounded text-gray-800 font-bold text-sm"
      ><span class="text-xs">AppId:</span>{appid}</span
    >
  </div>
{/if} -->
<div />
{#if login}
  {#if currentStep === "personalInfo"}
    <Step step={"Personal Info"} />
    <PersonalInfo
      {login}
      {mobile}
      {personalInfo}
      {correspondenceAddress}
      {permanentAddress}
      {permanentIsCorrespondence}
      {addressOutsideIndia}
      bind:saveError
      bind:loading
      on:savePersonalInfo={(e) => handleEvent("savePersonalInfo", e)}
    />
  {:else if currentStep === "uploadDocuments"}
    <FileuploadProfile
      {personalInfo}
      {permanentAddress}
      {uploads}
      bind:loadingForUpload
      bind:uploadError
      on:uploadDocuments={(e) => handleEvent("uploadDocuments", e)}
    />
  {/if}
{:else if errorMsg}
  <div>Error in communicating with server ...</div>
{:else}
<Circle size="60" color="#FF3E00" unit="px" duration="1s" />
  <div>Loading...</div>
{/if}
