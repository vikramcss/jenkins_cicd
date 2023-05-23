<script>
  import ApplicationPreview from "$lib/Pages/view.svelte";
  import ReportComponent from "../../../components/ReportComponent.svelte";
  import { page } from "$app/stores";
  import { postIdMap } from "../../../data/postIdMap";
  import { api } from "../../../api/api";
  import { token, postAppId, application } from "../../../stores/stores";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";

  let personalInfo = undefined;
  let correspondenceAddress = undefined;
  let permanentAddress = undefined;
  let permanentIsCorrespondence = true;
  let essentialQualifications = [];
  let otherQualifications = [];
  let uploads = undefined;
  let appid = ""
  let postId = $page.params.postId;
  let login = undefined;
  let mobile = undefined;
  let errorMsg = null;
  let currentStep = null;
  let confirmation_server;
  let confirmation_client;
  let saveError = "";
  let alertMsg = "";
  let dataLoaded = false;
  let uploadsProfile = undefined;
  let experiences;
  let scribe;

  let printFeeReceipt = false;
  let submitverified = false;
  let computerCertificate = false;
  let initiatePayment = false;
  let makePaymentCB = null;
  let applicantInfo = {};

  let order_id;
  let applicationfetched = true;

  const getScribe = (application, postId) => {
    let postRecord = postIdMap.find((pm) => pm.postId == postId).record;
    if (!postRecord) return null;

    return application &&
      application[postRecord] &&
      application[postRecord].scribe
      ? application[postRecord].scribe
      : null;
  };

  const getAppid = (application,postId) => {
    let postRecord = postIdMap.find((pm) => pm.postId == postId).record;
    if (!postRecord) return [];

    return application &&
      application[postRecord] &&
      application[postRecord].appid
      ? application[postRecord].appid
      : [];
  }

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
      appid = getAppid(application,postId);
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
      dataLoaded = true;
    } else {
      alertMsg = lErrorMsg;
    }
  };
  onMount(async () => {
    console.log("onMount called for application route");
    if (!$token) goto("/signin");

    let result = await loadApplication();

    currentStep = "qualification";
    return result;
  });
</script>

{#if dataLoaded}
  <ApplicationPreview
    {personalInfo}
    {permanentAddress}
    {essentialQualifications}
    uploads={{ ...uploads, ...uploadsProfile }}
    {correspondenceAddress}
    {permanentIsCorrespondence}
    {otherQualifications}
    {appid}
    {postId}
    {scribe}
  />
{:else}
  ...Loading
{/if}
