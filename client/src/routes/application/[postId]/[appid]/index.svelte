<script>
  import { page } from "$app/stores";
  import { application, availablePosts } from "../../../../stores/stores";
  import Qualification from "$lib/Pages/Qualification.svelte";
  import { onMount } from "svelte";
  import { token, postAppId } from "../../../../stores/stores";
  import { api } from "../../../../api/api";
  // @ts-ignore
  import FileUpload from "$lib/Pages/FUEq/FileUpload.svelte";
  import ApplicationPreview from "$lib/Pages/ApplicationPreview.svelte";
  import PaymentReceipt from "$lib/Pages/PaymentReceipt.svelte";
  import { goto } from "$app/navigation";
  import Alert from "../../../../common/Alert.svelte";
  import { postIdMap, postHandicapped } from "../../../../data/postIdMap";
  import Experience from "$lib/Pages/Experience.svelte";
  import { Jumper, Circle } from "svelte-loading-spinners";
  let personalInfo = undefined;
  let correspondenceAddress = undefined;
  let permanentAddress = undefined;
  let permanentIsCorrespondence = true;
  let essentialQualifications = [];
  let otherQualifications = [];
  let uploads = undefined;
  let appid = $page.params.appid;
  let postId = $page.params.postId;
  let login = undefined;
  let mobile = undefined;
  let errorMsg = null;
  let currentStep = null;
  let confirmation_server;
  let confirmation_client;
  let saveError = "";
  let erperienceError = "";
  let alertMsg = "";
  let dataloaded = false;
  let uploadsProfile = undefined;
  let experiences;
  let loading = false;
  let loadingExp = false;
  let scribe;

  const getScribe = (application, postId) => {
    let postRecord = postIdMap.find((pm) => pm.postId == postId).record;
    if (!postRecord) return null;

    return application &&
      application[postRecord] &&
      application[postRecord].scribe
      ? application[postRecord].scribe
      : null;
  };

  const getEssentialQualifications = (application, postId) => {
    let postRecord = postIdMap.find((pm) => pm.postId == postId).record;
    if (!postRecord) return [];

    return application &&
      application[postRecord] &&
      application[postRecord].essentialQualifications
      ? application[postRecord].essentialQualifications
      : [];
  };
  const getOtherQualifications = (application, postId) => {
    let postRecord = postIdMap.find((pm) => pm.postId == postId).record;
    if (!postRecord) return [];

    return application &&
      application[postRecord] &&
      application[postRecord].otherQualifications
      ? application[postRecord].otherQualifications
      : [];
  };
  const getExperiences = (application, postId) => {
    let postRecord = postIdMap.find((pm) => pm.postId == postId).record;
    if (!postRecord) return [];
    return application &&
      application[postRecord] &&
      application[postRecord].experiences
      ? application[postRecord].experiences
      : [];
  };
  const getUploads = (application, postId) => {
    let postRecord = postIdMap.find((pm) => pm.postId == postId).record;
    if (!postRecord) return {};

    return application &&
      application[postRecord] &&
      application[postRecord].uploads
      ? application[postRecord].uploads
      : {};
  };

  const loadApplication = async () => {
    let postRecord = postIdMap.find((pm) => pm.postId == postId).record;
    let {
      error,
      errorMsg: lErrorMsg,
      login: lLogin,
      mobile: lMobile,
      application,
    } = await api.getApplication({ token: $token });
    console.log("getApplication:", application);
    console.log("error:", error);
    if (!error) {
      console.log("application is :", application);
      login = lLogin;
      mobile = lMobile;
      if (application[postRecord]?.appid) {
        $postAppId = application[postRecord].appid;
      }
      personalInfo = application.personalInfo;
      appid = application.appid;
      correspondenceAddress = application.correspondenceAddress;
      permanentAddress = application.permanentAddress;
      permanentIsCorrespondence = application.permanentIsCorrespondence;
      essentialQualifications = getEssentialQualifications(application, postId);
      experiences = getExperiences(application, postId);
      otherQualifications = getOtherQualifications(application, postId);
      uploads = { ...getUploads(application, postId) };
      uploadsProfile = application.uploads;
      scribe = getScribe(application, postId);
      console.log("loadApplication uploads are: ", uploads);
      if (application.confirmation_client || application.confirmation_server) {
        goto(`/dashboard/${postId}/${appid}`);
      }
      dataloaded = true;
    } else {
      alertMsg = lErrorMsg;
    }
  };
  const onFileUpload = async (_) => {
    return await loadApplication();
  };
  onMount(async () => {
    console.log("onMount called for application route");
    if (!$token) goto("/signin");

    let result = await loadApplication();
    currentStep = "qualification";
    return result;
  });
  const save = async (data) => {
    console.log("data to be saved is:", data);
    let params = {};
    let postRecord = postIdMap.find((m) => m.postId == postId).record;
    console.log('postRecord is :', postRecord)
    try {
      params[postRecord] = { ...data, postId };
      const {
        error,
        errorMsg,
        application: _application,
      } = await api.savePostApplication({
        postRecord: postIdMap.find((pm) => pm.postId == postId).record,
        params,
        token: $token,
      });
      if (error) {
        console.log("saveApplication got error: ", error);
        //alertMsg = errorMsg;
        return -1;
      }
      $application = _application;
      personalInfo = _application.personalInfo;
      appid = _application[postRecord]?.appid;
      if (_application[postRecord]?.appid) {
        $postAppId = _application[postRecord].appid;
      }
      correspondenceAddress = _application.correspondenceAddress;
      permanentAddress = _application.permanentAddress;
      permanentIsCorrespondence = _application.permanentIsCorrespondence;
      essentialQualifications = getEssentialQualifications(
        _application,
        postId
      );
      otherQualifications = getOtherQualifications(_application, postId);
      uploads = getUploads(_application, postId);
      uploadsProfile = _application.uploads;
      experiences = getExperiences(_application, postId);
      scribe = getScribe(_application, postId);
      console.log("uploads from save: ", uploads);
      console.log("saveApplication has no error: ", error);
      return 0;
    } catch (e) {
      console.log("saveApplication exception and hence error: ", e);
      return -1;
    }
  };

  const handleEvent = async (ev, e) => {
    let error = 0;
    switch (ev) {
      case "saveQualification":
        console.log("Qualification :", e.detail);
        error = await save(e.detail.data);
        if (!error) {
          if (e.detail.action != "none") {
            currentStep =
              e.detail.action === "next"
                ? postId == "52"
                  ? "experience"
                  : "uploadDocuments"
                : currentStep;
            if (e.detail.action == "previous") goto(`/dashboard/${postId}`);
          }
        } else {
          saveError = "error is saving application, try again ";
        }
        loading = false;
        break;

      case "uploadDocuments":
        console.log("uploadDocuments:", e.detail);
        currentStep =
          e.detail.action === "previous"
            ? postId == "52"
              ? "experience"
              : "qualification"
            : "preview";
        break;

      case "experience":
        console.log("Experience :", e.detail);
        error = await save(e.detail.data);
        console.log("rerror is.../........", erperienceError);
        if (!error) {
          if (e.detail.action != "none") {
            currentStep =
              e.detail.action === "previous"
                ? "qualification"
                : "uploadDocuments";
          }
        } else {
          console.log("in sles");
          erperienceError =
            "error in saving experience application, try again ";
        }
        loadingExp = false;
        break;

      case "preview":
        console.log("preview:", e.detail);
        if (e.detail.action == "previous") {
          currentStep = "uploadDocuments";
        } else if (e.detail.action == "paymentDone") {
          currentStep = "paymentDone";
          confirmation_client = e.detail.confirmation_client;
        } else if (e.detail.action == "paymetnDone") {
          currentStep = "paymentDone";
          confirmation_server = e.detail.confirmation_server;
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
{#if alertMsg}
  <Alert message={alertMsg} on:alertClosed={() => (alertMsg = null)} />
{:else}
  {#if $postAppId}
    <div class="flex justify-end">
      <span
        class="border-2 border-orange-400 p-2 m-2 mr-8 rounded text-gray-800 font-bold text-sm"
        ><span class="text-xs">AppId:</span>{$postAppId}</span
      >
    </div>
  {/if}
  {#if dataloaded}
    {#if currentStep === "qualification"}
      <Qualification
        bind:scribe
        bind:personalInfo
        bind:essentialQualifications
        bind:otherQualifications
        bind:loading
        {postId}
        bind:saveError
        on:saveQualification={(e) => handleEvent("saveQualification", e)}
      />
    {:else if postId == "52" && currentStep === "experience"}
      <Experience
        {experiences}
        bind:erperienceError
        bind:loadingExp
        on:saveExperience={(e) => handleEvent("experience", e)}
      />
    {:else if currentStep === "uploadDocuments"}
      <FileUpload
        {personalInfo}
        {essentialQualifications}
        {uploads}
        {postIdMap}
        on:uploadDocuments={(e) => handleEvent("uploadDocuments", e)}
        on:fileUploaded={onFileUpload}
      />
    {:else if currentStep === "preview"}
      <ApplicationPreview
        {personalInfo}
        {permanentAddress}
        {essentialQualifications}
        uploads={{ ...uploads, ...uploadsProfile }}
        {correspondenceAddress}
        {permanentIsCorrespondence}
        {otherQualifications}
        appid={$postAppId}
        {postId}
        {scribe}
        on:preview={(e) => handleEvent("preview", e)}
      />
    {:else if currentStep === "paymentDone"}
      <PaymentReceipt
        {personalInfo}
        {confirmation_client}
        {confirmation_server}
      />
    {/if}
  {:else}
    <div class="h-screen flex justify-center items-center blur-0">
      <Circle size="60" color="#FF3E00" unit="px" duration="1s" />
    </div>
  {/if}
  <!-- {:else if currentStep === "address"}
    <Address on:saveAddress={(e) => handleEvent("saveAddress", e)} /> -->
{/if}
