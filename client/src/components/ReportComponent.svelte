<script>
  import { createEventDispatcher } from "svelte";
  import { api } from "../api/api.js";
  import { token, validTime, availablePosts } from "../stores/stores";
  import Alert from "../common/Alert.svelte";
  import Image from "../common/Image.svelte";
  import { DateTime } from "luxon";
  import { startApplications, endApplications } from "../stores/stores";
  import Qualification from "$lib/Pages/Qualification.svelte";
  import Fa from "svelte-fa";
  import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
  import { postIdMap } from "../data/postIdMap";

  export let uploads = {};
  export let personalInfo;
  export let correspondenceAddress;
  export let permanentAddress;
  export let essentialQualifications;
  export let appid;

  export let permanentIsCorrespondence;
  export let otherQualifications;

  export let initiatePayment;
  export let order_id;
  export let applicantInfo;
  export let makePaymentCB;
  export let postId;
  export let scribe;
  let driverQualifications = essentialQualifications.filter(
    (q) =>
      q.qualification == "Driving Licence LMV" ||
      q.qualification == "Driving Licence HMV"
  );

  let postRecord = postIdMap.find((pm) => pm.postId == postId).record;
  let postName = $availablePosts.find((ap) => ap.postId == postId).postName;
  console.log("personal info in report ", personalInfo);

  let uploadsLocation = "https://pcb01uploads.s3.ap-south-1.amazonaws.com";

  let photoUrl = uploads.photo ? `${uploadsLocation}/${uploads.photo}` : null;
  let signUrl = uploads.sign ? `${uploadsLocation}/${uploads.sign}` : null;

  let dateofbirthUrl = uploads.dob ? `${uploadsLocation}/${uploads.dob}` : null;
  let nclUrl = uploads.nclfile ? `${uploadsLocation}/${uploads.nclfile}` : null;

  let categoryUrl = "";
  if (personalInfo.category != "Gen") {
    categoryUrl = uploads.category
      ? `${uploadsLocation}/${uploads.category}`
      : null;
  }

  let nationalityUrl = uploads.identity
    ? `${uploadsLocation}/${uploads.identity}`
    : null;

  let pwdUrl = "";
  if (personalInfo.pwd == "Yes") {
    pwdUrl = uploads.pwd ? `${uploadsLocation}/${uploads.pwd}` : null;
  }

  let addressUrl = uploads.addressfile
    ? `${uploadsLocation}/${uploads.addressfile}`
    : null;

  let permanentaddressUrl = uploads.addressfile
    ? `${uploadsLocation}/${uploads.addressfile}`
    : null;

  let essentialQualificationUrl = uploads.essentialQualifications
    ? `${uploadsLocation}/${uploads.essentialQualifications}`
    : null;

  let exservicemanUrl = "";
  if (personalInfo.exserviceman == "Yes") {
    exservicemanUrl = uploads.exserviceman
      ? `${uploadsLocation}/${uploads.exserviceman}`
      : null;
  }

  let widowsCertificatefileUrl = "";
  if (personalInfo.widowOrDivorced == "Yes") {
    widowsCertificatefileUrl = uploads.widow_divorced_separated
      ? `${uploadsLocation}/${uploads.widow_divorced_separated}`
      : null;
  }

  let kirkeeCBoardEmpUrl = "";
  if (personalInfo.govemployee == "Yes") {
    kirkeeCBoardEmpUrl = uploads.govemployee
      ? `${uploadsLocation}/${uploads.govemployee}`
      : null;
  }

  let paymentAlert;
  let alert;

  let logourl = "/STP-logo.jpg";
  const dispatch = createEventDispatcher();
  // begin
  let reinitiatePayment = null;

  const paymentDone = (response, confirmation_client) => {
    console.log(confirmation_client);
    dispatch("preview", { action: "paymentDone", confirmation_client });
  };
  const makePayment = async () => {
    console.log("makePayment called");
    paymentAlert = null;

    console.log("makePayment called#2");
    if (!$validTime) {
      alert = "time is up";

      console.log("makePayment called#3");
      return;
    }

    console.log("makePayment called#4");

    const {
      error,
      errorMsg,
      orderid,
      applicantInfo: lapplicantInfo,
    } = await api.getPaymentId({
      token: $token,
      postRecord,
      amount: 100 * 100,
    });
    applicantInfo = lapplicantInfo;

    if (error == 0) {
      order_id = orderid;
      if (!initiatePayment) initiatePayment = true;
      else if (reinitiatePayment) reinitiatePayment();
    } else {
      paymentAlert = "Error in initiating payment";
    }
    console.log("makePayment called ##2");
    console.log("order_id is:", order_id, " error is:", error);
  };
  const scriptLoaded = () => {
    console.log("script loaded");
  };
  makePaymentCB = makePayment;
</script>

<svelte:head>
  <script
    src="https://checkout.razorpay.com/v1/checkout.js"
    on:load={scriptLoaded}>
  </script>
</svelte:head>
<!-- Personal Information Web View -->
<div class="text-xs md:text-base">
  <div class="hidden lg:inline">
    <div class="flex justify-center mt-5 ">
      <div
        class=" w-11/12 grid grid-cols-3 bg-white rounded-lg shadow-lg  grid-flow-row"
      >
        <div class="col-span-3 ">
          <div
            class="grid grid-cols-7 bg-orange-500  text-lg font-semibold p-2 rounded-t-lg"
          >
            <div class="col-span-7 md:col-span-6 text-white flex ">
              Personal Information
              <div class="col-span-7 md:col-span-6 text-white ml-10">
                Post Name : {postName}
              </div>
            </div>
            <div class="col-span-1  flex justify-center text-white w-full ">
              AppId : {appid}
            </div>
            <!-- <div
              class="col-span-7 md:col-span-1 text-center bg-white rounded p-1"
            >
              AppId: {appid}
            </div> -->
          </div>
        </div>
        <div class="col-span-3">
          <div class="grid grid-cols-6 p-4">
            <div class="col-span-1  text-right">Full Name :</div>
            <div class="col-span-1 text-left ml-2 font-bold">
              {personalInfo.name}
              <a href={nationalityUrl} target="_blank">
                <Fa icon={faPaperclip} class="inline-block mt-1 px-2" />
              </a>
            </div>
            <div class="col-span-3">
              <div class="grid grid-cols-4">
                <!-- <div class="col-span-1 text-right">Marital Status :</div>
                <div class="col-span-1  text-left ml-2 font-bold">
                  {personalInfo.Married_Status}
                </div> -->
                <div class="col-span-1 text-right">Marital Status :</div>
                <div class="col-span-1 text-left ml-2  font-bold">
                  {personalInfo.Married_Status}
                  <!-- {personalInfo.widowOrDivorced == "No"
                    ? "No"
                    : personalInfo.widowOrDivorced}
                  {#if widowsCertificatefileUrl}
                    <a href={widowsCertificatefileUrl} target="_blank">
                      <Fa icon={faPaperclip} class="inline-block mt-1 px-2" />
                    </a>
                  {/if} -->
                </div>
                <div class="col-span-1 text-right">PCB Employee :</div>
                <div class="col-span-1 text-left ml-2  font-bold">
                  {personalInfo.govemployee == "No"
                    ? "No"
                    : personalInfo.govemployee}
                  {#if kirkeeCBoardEmpUrl}
                    <a href={kirkeeCBoardEmpUrl} target="_blank">
                      <Fa icon={faPaperclip} class="inline-block mt-1 px-2" />
                    </a>
                  {/if}
                </div>
              </div>
            </div>

            <div class="col-span-1 md:row-span-5 mb-2">
              <div class=" flex justify-center items-center">
                <Image src={photoUrl} cssclass="object-cover h-60 w-64" />
              </div>
            </div>

            <div class="col-span-1 text-right">Father's/Husband's Name :</div>
            <div class="col-span-1 text-left ml-2 font-bold">
              {personalInfo.fathersName}
            </div>
            <div class="col-span-3">
              <div class="grid grid-cols-4">
                <div class="col-span-1 text-right">Ex-ServiceMan :</div>
                <div class="col-span-1 text-left ml-2 font-bold">
                  {personalInfo.exserviceman == "No"
                    ? "No"
                    : personalInfo.exserviceman}
                  {#if exservicemanUrl}
                    <a href={exservicemanUrl} target="_blank">
                      <Fa icon={faPaperclip} class="inline-block mt-1 px-2" />
                    </a>
                  {/if}
                </div>

                <div class="col-span-1 text-right">Category :</div>
                <div class="col-span-1  text-left ml-2 font-bold">
                  {personalInfo.category}
                  {#if categoryUrl}
                    <a href={categoryUrl} target="_blank">
                      <Fa icon={faPaperclip} class="inline-block mt-1 px-2" />
                    </a>
                  {/if}
                  {#if personalInfo.category == "OBC"}
                    {#if nclUrl}
                      <a href={nclUrl} target="_blank">
                        (NCL<Fa
                          icon={faPaperclip}
                          class="inline-block mt-1 px-2"
                        />)
                      </a>
                    {/if}
                  {/if}
                </div>
              </div>
            </div>

            <div class="col-span-1 text-right">Date Of Birth :</div>
            <div class="col-span-1  text-left ml-2 font-bold">
              {personalInfo.dob}
              <a href={dateofbirthUrl} target="_blank">
                <Fa icon={faPaperclip} class="inline-block mt-1 px-2" />
              </a>
            </div>
            <div class="col-span-3">
              <div class="grid grid-cols-4">
                <div class="col-span-1 text-right">Nationality :</div>
                <div class="col-span-1  text-left ml-2 font-bold">
                  {personalInfo.nationality}
                </div>
                <!-- <div class="col-span-1 text-right">Religion :</div>
                <div class="col-span-1  text-left ml-2 font-bold">
                  {personalInfo.religion}
                </div> -->
              </div>
            </div>

            <div class="col-span-1 text-right">Gender :</div>
            <div class="col-span-1  text-left ml-2 font-bold">
              {personalInfo.gender}
            </div>
            <!-- {#if personalInfo.gender == "Female"}
            <div class="col-span-1 text-right">widow_divorced_separated :</div>
            <div class="col-span-1 text-left ml-2  font-bold">
              {personalInfo.widowOrDivorced == "No"
                ? "No"
                : personalInfo.widowOrDivorced}
              {#if widowsCertificatefileUrl}
                <a href={widowsCertificatefileUrl} target="_blank">
                  <Fa icon={faPaperclip} class="inline-block mt-1 px-2" />
                </a>
              {/if}
            </div>
            {/if} -->

            <div class="col-span-3">
              <div class="grid grid-cols-4">
                <div class="col-span-1 text-right">Widow/Divorced :</div>
                <div class="col-span-1 text-left ml-2  font-bold">
                  {personalInfo.widowOrDivorced == "No"
                    ? "No"
                    : personalInfo.widowOrDivorced}
                  {#if widowsCertificatefileUrl}
                    <a href={widowsCertificatefileUrl} target="_blank">
                      <Fa icon={faPaperclip} class="inline-block mt-1 px-2" />
                    </a>
                  {/if}
                </div>

                <div class="col-span-1 text-right">PwBD :</div>
                <div class="col-span-1  text-left ml-2 font-bold">
                  {personalInfo.pwd == "No" ? "No" : personalInfo.PWDType}
                  {#if pwdUrl}
                    <a href={pwdUrl} target="_blank">
                      <Fa icon={faPaperclip} class="inline-block mt-1 px-2" />
                    </a>
                  {/if}
                </div>
              </div>
            </div>
            <div class="col-span-1 text-right">Email ID :</div>
            <div class="col-span-1  text-left ml-2 font-bold">
              {personalInfo.email}
            </div>
            <div class="col-span-3">
              <div class="grid grid-cols-4">
                <div class="col-span-1 text-right">Mobile No :</div>
                <div class="col-span-1  text-left ml-2 font-bold">
                  {personalInfo.mobile}
                </div>
                {#if postId == "12" && personalInfo.pwd == "Yes"}
                  {#if scribe}
                    <div class="col-span-1 text-right">Scribe :</div>
                    <div class="col-span-1  text-left ml-2 font-bold">
                      {scribe}
                    </div>
                  {/if}
                {/if}
              </div>
            </div>
            {#if personalInfo.KCBrelatedEmployee == "Yes"}
            <div class="col-span-2 mb-4 text-right">Related to any member/employee of PCB:</div>
            <div class="col-span-4  text-left ml-2 font-bold">
              {personalInfo.KCBrelatedEmployee} ({personalInfo.kcbRelatedName},{personalInfo.kcbRelatedDesignation})
            </div>
            {:else}

            <div class="col-span-2 mb-4 text-right">Related to any member/employee of PCB:</div>
            <div class="col-span-4  text-left ml-2 font-bold">
              {personalInfo.KCBrelatedEmployee} 
            </div>
            {/if}

            <div class="col-span-1 text-right">Correspondence Address :</div>
            <div class="col-span-4  text-left ml-2 font-bold">
              {correspondenceAddress.addressLine1}
              {correspondenceAddress.addressLine2}
              {correspondenceAddress.district}
              {correspondenceAddress.state}
              {correspondenceAddress.pin}
            </div>
            <div class="col-span-1 row-span-2  ">
              <div class="flex justify-center items-center">
                <Image src={signUrl} cssclass="object-cover h-20 w-64" />
              </div>
            </div>
            <div class="col-span-1 text-right">Permanent Address :</div>
            <div class="col-span-4  text-left ml-2 font-bold">
              {#if permanentIsCorrespondence}
                {correspondenceAddress.addressLine1}
                {correspondenceAddress.addressLine2}
                {correspondenceAddress.district}
                {correspondenceAddress.state}
                {correspondenceAddress.pin}
              {:else}
                {permanentAddress.addressLine1}
                {permanentAddress.addressLine2}
                {permanentAddress.district}
                {permanentAddress.state}
                {permanentAddress.pin}
              {/if}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Personal Information Mobile View -->
  <div class="lg:hidden">
    <div class="flex justify-center mt-5 ">
      <div
        class=" w-11/12 grid  bg-white rounded-lg shadow-lg grid-cols-3 grid-flow-row"
      >
        <div class="col-span-3 ">
          <!-- <div
            class="grid grid-cols-7 bg-orange-500  text-lg font-semibold p-2 rounded-t-lg"
          >
            <div class="col-span-4 text-white">Personal Information</div>
            <div class="col-span-3 text-center bg-white rounded p-1">
              AppId: {appid}
            </div>
          </div> -->
        </div>
        <div class="col-span-3">
          <div
            class="grid grid-cols-3 bg-orange-500 text-white text-lg font-semibold p-2 rounded-t-lg"
          >
            <div class="col-span-3 flex justify-center">
              Personal Information
            </div>

            <div class="col-span-3 text-base rounded flex justify-center">
              Post Name : {postName}
            </div>

            <div class="col-span-3 text-base rounded flex justify-center">
              AppId : {appid}
            </div>
          </div>
          <div class="grid grid-cols-6 p-4">
            <div class="col-span-6 mb-2">
              <div class=" flex justify-center items-center">
                <Image src={photoUrl} cssclass="object-cover h-60 w-64" />
              </div>
            </div>
            <div class="col-span-6  ">
              <div class="flex justify-center items-center">
                <Image src={signUrl} cssclass="object-cover h-20" />
              </div>
            </div>

            <div class="col-span-3  text-right">Full Name :</div>
            <div class="col-span-3 text-left ml-2 font-bold">
              {personalInfo.name}
            </div>

            <div class="col-span-3 text-right">Father's/Husband's Name :</div>
            <div class="col-span-3 text-left ml-2 font-bold">
              {personalInfo.fathersName}
            </div>

            <div class="col-span-3 text-right">Date Of Birth :</div>
            <div class="col-span-3  text-left ml-2 font-bold">
              {personalInfo.dob}
              <a href={dateofbirthUrl} target="_blank">
                <Fa icon={faPaperclip} class="inline-block mt-1 px-2" />
              </a>
            </div>
            <div class="col-span-3 text-right">Nationality :</div>
            <div class="col-span-3  text-left ml-2 font-bold">
              {personalInfo.nationality}
              <a href={nationalityUrl} target="_blank">
                <Fa icon={faPaperclip} class="inline-block mt-1 px-2" />
              </a>
            </div>
            <div class="col-span-3 text-right">Religion :</div>
            <div class="col-span-3  text-left ml-2 font-bold">
              {personalInfo.religion}
            </div>
            <div class="col-span-3 text-right">Category :</div>
            <div class="col-span-3  text-left ml-2 font-bold">
              {personalInfo.category}
              {#if categoryUrl}
                <a href={categoryUrl} target="_blank">
                  <Fa icon={faPaperclip} class="inline-block mt-1 px-2" />
                </a>
              {/if}
              {#if personalInfo.category == "OBC"}
                {#if nclUrl}
                  <a href={nclUrl} target="_blank">
                    (NCL<Fa
                      icon={faPaperclip}
                      class="inline-block mt-1 px-2"
                    />)
                    <!-- NCL -->
                  </a>
                {/if}
              {/if}
            </div>
            <div class="col-span-3 text-right">Gender :</div>
            <div class="col-span-3  text-left ml-2 font-bold">
              {personalInfo.gender}
            </div>

            <div class="col-span-3 text-right">Widow/Divorced :</div>
            <div class="col-span-3 text-left ml-2  font-bold">
              {personalInfo.widowOrDivorced == "No"
                ? "No"
                : personalInfo.widowOrDivorced}
              {#if widowsCertificatefileUrl}
                <a href={widowsCertificatefileUrl} target="_blank">
                  <Fa icon={faPaperclip} class="inline-block mt-1 px-2" />
                </a>
              {/if}
            </div>

            <div class="col-span-3 text-right">PWD :</div>
            <div class="col-span-3  text-left ml-2 font-bold">
              {personalInfo.pwd == "No" ? "No" : personalInfo.PWDType}
              {#if pwdUrl}
                <a href={pwdUrl} target="_blank">
                  <Fa icon={faPaperclip} class="inline-block mt-1 px-2" />
                </a>
              {/if}
            </div>

            <div class="col-span-3 text-right">Ex-ServiceMan :</div>
            <div class="col-span-3 text-left ml-2 font-bold">
              {personalInfo.exserviceman == "No"
                ? "No"
                : personalInfo.exserviceman}
              {#if exservicemanUrl}
                <a href={exservicemanUrl} target="_blank">
                  <Fa icon={faPaperclip} class="inline-block mt-1 px-2" />
                </a>
              {/if}
            </div>

            <div class="col-span-3 text-right">Marital Status :</div>
            <div class="col-span-3 text-left ml-2  font-bold">
              {personalInfo.Married_Status}
              {personalInfo.widowOrDivorced == "No"
                ? ""
                : personalInfo.widowOrDivorced}
              {#if widowsCertificatefileUrl}
                <a href={widowsCertificatefileUrl} target="_blank">
                  <Fa icon={faPaperclip} class="inline-block mt-1 px-2" />
                </a>
              {/if}
            </div>

            <div class="col-span-3 text-right">PCB Employee :</div>
            <div class="col-span-3 text-left ml-2  font-bold">
              {personalInfo.govemployee == "No"
                ? "No"
                : personalInfo.govemployee}
              {#if kirkeeCBoardEmpUrl}
                <a href={kirkeeCBoardEmpUrl} target="_blank">
                  <Fa icon={faPaperclip} class="inline-block mt-1 px-2" />
                </a>
              {/if}
            </div>
            {#if personalInfo.KCBrelatedEmployee == "Yes"}
            <div class="col-span-3 text-right">Related to any member/employee of PCB:</div>
            <div class="col-span-3 text-left ml-2  font-bold">
              {personalInfo.KCBrelatedEmployee} ({personalInfo.kcbRelatedName},{personalInfo.kcbRelatedDesignation})
            </div>
            {:else}

            <div class="col-span-3 text-right">Related to any member/employee of PCB:</div>
            <div class="col-span-3 text-left ml-2  font-bold">
              {personalInfo.KCBrelatedEmployee} 
            </div>
            {/if}
            <div class="col-span-3 text-right">Email ID :</div>
            <div class="col-span-3  text-left ml-2 font-bold">
              {personalInfo.email}
            </div>
            <div class="col-span-3 text-right">Mobile No :</div>
            <div class="col-span-3  text-left ml-2 font-bold">
              {personalInfo.mobile}
            </div>
            {#if scribe && postId == "12" && personalInfo.pwd == "Yes"}
              <div class="col-span-3 text-right">Scribe :</div>
              <div class="col-span-3  text-left ml-2 font-bold">
                {scribe}
              </div>
            {/if}
            <div class="col-span-3 text-right">Correspondance Address :</div>
            <div class="col-span-3  text-left ml-2 font-bold">
              {correspondenceAddress.addressLine1}
              {correspondenceAddress.addressLine2}
              {correspondenceAddress.district}
              {correspondenceAddress.state}
              {correspondenceAddress.pin}
            </div>
            <div class="col-span-3 text-right">Permanent Address :</div>
            <div class="col-span-3  text-left ml-2 font-bold">
              {#if permanentIsCorrespondence}
                {correspondenceAddress.addressLine1}
                {correspondenceAddress.addressLine2}
                {correspondenceAddress.district}
                {correspondenceAddress.state}
                {correspondenceAddress.pin}
              {:else}
                {permanentAddress.addressLine1}
                {permanentAddress.addressLine2}
                {permanentAddress.district}
                {permanentAddress.state}
                {permanentAddress.pin}
              {/if}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Essential Qualification 7th Web View-->
  <div class="hidden lg:inline ">
    <div class="flex justify-center mt-5 ">
      <div
        class=" grid w-11/12 bg-white rounded-lg shadow-lg grid-cols-3 grid-flow-row"
      >
        <div class="col-span-3">
          <div
            class="grid grid-cols-6 bg-orange-500 text-white text-lg font-semibold p-2 rounded-t-lg"
          >
            <div class="col-span-3">Essential Qualification</div>

            <div class="col-span-3 rounded flex justify-end">
              <a
                href={essentialQualificationUrl}
                target="_blank"
                class="flex rounded p-1 text-gray-100  underline space-x-2"
              >
                <Fa icon={faPaperclip} class="inline-block mt-1 px-2" />
                <span class="text-sm">{"Essential Qualifications"}</span>
              </a>
            </div>
          </div>
        </div>
        <!-- {JSON.stringify(essentialQualifications)} -->
        <div class="col-span-3 p-1">
          <div
            class="grid grid-cols-6 border border-opacity-50 border-gray-500 "
          >
            <div
              class="break-words p-2 text-center border border-opacity-50 border-gray-500 font-bold flex items-center justify-center col-span-1 "
            >
              Sr.No.
            </div>
            <div
              class="break-words p-2 text-center border border-opacity-50 border-gray-500 font-bold items-center flex justify-center col-span-1  "
            >
              Qualification
            </div>

            <div
              class="break-words p-2 text-center border border-opacity-50 border-gray-500 font-bold items-center flex justify-center col-span-1 "
            >
              School Name/Board
            </div>
            <div
              class="break-words p-2 text-center border border-opacity-50 border-gray-500 font-bold items-center flex justify-center col-span-1 "
            >
              Year of Passing
            </div>
            <div
              class="break-words p-2 text-center border border-opacity-50 border-gray-500 font-bold items-center flex justify-center col-span-1 "
            >
              Marks/CGPA/Grade
            </div>
            <div
              class="break-words p-2 text-center border border-opacity-50 border-gray-500 font-bold flex items-center justify-center col-span-1 "
            >
              Percentage (%)
            </div>

            {#each essentialQualifications.filter((q) => !(q.qualification == "Driving Licence LMV" || q.qualification == "Driving Licence HMV")) as q, i}
              <div
                class="break-words p-2 text-center border border-opacity-50 border-gray-500 flex items-center justify-center col-span-1 "
              >
                {i + 1}
              </div>

              <div
                class="break-words p-2 text-center border border-opacity-50 border-gray-500 items-center flex justify-center col-span-1 "
              >
                {q.qualification}
              </div>
              <div
                class="break-words p-2 text-center border border-opacity-50 border-gray-500 items-center flex justify-center col-span-1 "
              >
                {q.schoolName ? q.schoolName : q.boardName}
              </div>
              <div
                class="break-words p-2 text-center border border-opacity-50 border-gray-500 items-center flex justify-center col-span-1 "
              >
                {q.yearOfPassing}
              </div>
              <div
                class="break-words p-2 text-center border border-opacity-50 border-gray-500 items-center flex justify-center col-span-1 "
              >
                {q.cgpa ? q.cgpa : q.Grade ? q.Grade : q.marks}
              </div>
              <div
                class="break-words p-2 text-center border border-opacity-50 border-gray-500 items-center flex justify-center col-span-1 "
              >
                {#if q.marksType == "Percentage"}
                  {q.percentage}
                {:else}
                  --
                {/if}
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Essential Qualification Graduation Mobile View -->
  <!-- <div class="lg:hidden">
    <div class="flex justify-center mt-5 ">
      <div
        class="grid w-11/12 bg-white rounded-lg shadow-lg grid-cols-3 grid-flow-row"
      >
        <div class="col-span-3">
          <div
            class="grid grid-cols-3 bg-orange-500 text-white text-lg font-semibold p-2 rounded-t-lg"
          >
            <div class="col-span-3 flex justify-center" >
              Essential Qualification : Graduation dgsfgasfg
            </div>

            <div class="col-span-3 rounded flex justify-center">
              <a
                href={essentialQualificationUrl}
                target="_blank"
                class="flex  rounded p-1 text-gray-100  underline space-x-2"
              >
                <Fa icon={faPaperclip} class="inline-block mt-1 px-2" />
                <span class="text-sm"
                  >{"Essential Qualifications: Graduation"}</span
                >
              </a>
            </div>
          </div>
        </div>

        {#each essentialQualifications.filter((q) => !(q.qualification == "Driving License LMV" || q.qualification == "Driving License HMV")) as q, i}
          <div class="col-span-3">
            <div
              class="grid grid-cols-12 mt-2 ml-2 mr-2 border border-opacity-50 border-gray-500"
            />
            <div class="col-span-3">
              <div class="grid grid-cols-5 px-2 ">
                <div class="col-span-5 ">
                  <div class="grid grid-cols-4   ">
                    <div
                      class="break-words p-2 text-center border border-opacity-50 border-gray-500 flex items-center justify-center col-span-4 font-bold "
                    >
                      Sr. No. {i + 1}
                    </div>
                    <div
                      class="break-words p-2 text-center border border-opacity-50 border-gray-500 flex items-center justify-center col-span-2 font-bold  "
                    >
                      Qualification
                    </div>
                    <div
                      class="break-words p-2 text-center border border-opacity-50 border-gray-500 flex items-center justify-center col-span-2   "
                    >
                      {q.qualification}
                    </div>

                    <div
                      class="break-words p-2 text-center border border-opacity-50 border-gray-500 items-center flex justify-center col-span-2 font-bold  "
                    >
                      University/Board
                    </div>
                    <div
                      class="break-words p-2 text-center border border-opacity-50 border-gray-500 flex items-center justify-center col-span-2   "
                    >
                      {q.schoolName ? q.schoolName : q.boardName}
                    </div>
                    <div
                      class="break-words p-2 text-center border border-opacity-50 border-gray-500 items-center flex justify-center col-span-2 font-bold  "
                    >
                      Year of Passing
                    </div>
                    <div
                      class="break-words p-2 text-center border border-opacity-50 border-gray-500 flex items-center justify-center col-span-2   "
                    >
                      {q.yearOfPassing}
                    </div>
                    <div
                      class="break-words p-2 text-center border border-opacity-50 border-gray-500 items-center flex justify-center col-span-2 font-bold "
                    >
                      Marks/CGPA/Grade
                    </div>
                    <div
                      class="break-words p-2 text-center border border-opacity-50 border-gray-500 flex items-center justify-center col-span-2 lg:col-span-2 "
                    >
                      {q.cgpa ? q.cgpa : q.Grade ? q.Grade : q.marks}
                    </div>
                    <div
                      class="break-words p-2 text-center border border-opacity-50 border-gray-500 flex items-center justify-center col-span-2 font-bold"
                    >
                      Percentage (%)
                    </div>
                    <div
                      class="break-words p-2 text-center border border-opacity-50 border-gray-500 flex items-center justify-center col-span-2 lg:col-span-5  "
                    >
                      {q.percentage}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div> -->
  <!-- Essential Qualification 7th Web View-->
  {#if driverQualifications.length}
    <div class="hidden lg:inline ">
      <div class="flex justify-center mt-5 ">
        <div
          class=" grid w-11/12 bg-white rounded-lg shadow-lg grid-cols-3 grid-flow-row"
        >
          <div class="col-span-3">
            <div
              class="grid grid-cols-6 bg-orange-500 text-white text-lg font-semibold p-2 rounded-t-lg"
            >
              <div class="col-span-3">Driving Licence</div>

              <div class="col-span-3 rounded flex justify-end">
                <!-- <a
                  href={essentialQualificationUrl}
                  target="_blank"
                  class="flex rounded p-1 text-gray-100  underline space-x-2"
                >
                  <Fa icon={faPaperclip} class="inline-block mt-1 px-2" />
                  <span class="text-sm">{"Essential Qualifications"}</span>
                </a> -->
              </div>
            </div>
          </div>
          <!-- {JSON.stringify(essentialQualifications)} -->
          <div class="col-span-3 p-1">
            <div
              class="grid grid-cols-4 border border-opacity-50 border-gray-500 "
            >
              <div
                class="break-words p-2 text-center border border-opacity-50 border-gray-500 font-bold flex items-center justify-center col-span-1 "
              >
                Sr.No.
              </div>
              <div
                class="break-words p-2 text-center border border-opacity-50 border-gray-500 font-bold items-center flex justify-center col-span-1  "
              >
                Licence Type
              </div>

              <div
                class="break-words p-2 text-center border border-opacity-50 border-gray-500 font-bold items-center flex justify-center col-span-1 "
              >
                Licence Number
              </div>
              <div
                class="break-words p-2 text-center border border-opacity-50 border-gray-500 font-bold items-center flex justify-center col-span-1 "
              >
                Valid Till
              </div>

              {#each driverQualifications as q, i}
                <div
                  class="break-words p-2 text-center border border-opacity-50 border-gray-500 flex items-center justify-center col-span-1 "
                >
                  {i + 1}
                </div>

                <div
                  class="break-words p-2 text-center border border-opacity-50 border-gray-500 items-center flex justify-center col-span-1 "
                >
                  {q.qualification}
                </div>
                <div
                  class="break-words p-2 text-center border border-opacity-50 border-gray-500 items-center flex justify-center col-span-1 "
                >
                  {q.dLNumber}
                </div>
                <div
                  class="break-words p-2 text-center border border-opacity-50 border-gray-500 items-center flex justify-center col-span-1 "
                >
                  {q.validTill}
                </div>
                
              {/each}
            </div>
          </div>
        </div>
      </div>
    </div>
  {/if}
  

  <!-- Essential Qualification Graduation Mobile View -->
  <div class="lg:hidden">
    <div class="flex justify-center mt-5 ">
      <div
        class="grid w-11/12 bg-white rounded-lg shadow-lg grid-cols-3 grid-flow-row"
      >
        <div class="col-span-3">
          <div
            class="grid grid-cols-3 bg-orange-500 text-white text-lg font-semibold p-2 rounded-t-lg"
          >
            <div class="col-span-3 flex justify-center">
              Essential Qualification : Graduation 
            </div>

            <div class="col-span-3 rounded flex justify-center">
              <a
                href={essentialQualificationUrl}
                target="_blank"
                class="flex  rounded p-1 text-gray-100  underline space-x-2"
              >
                <Fa icon={faPaperclip} class="inline-block mt-1 px-2" />
                <span class="text-sm"
                  >{"Essential Qualifications: Graduation"}</span
                >
              </a>
            </div>
          </div>
        </div>

        <!-- {#each essentialQualifications as q, i} -->
        {#each essentialQualifications.filter((q) => !(q.qualification == "Driving Licence LMV" || q.qualification == "Driving Licence HMV")) as q, i}
          <div class="col-span-3">
            <div
              class="grid grid-cols-12 mt-2 ml-2 mr-2 border border-opacity-50 border-gray-500"
            />
            <div class="col-span-3">
              <div class="grid grid-cols-5 px-2 ">
                <div class="col-span-5 ">
                  <div class="grid grid-cols-4   ">
                    <div
                      class="break-words p-2 text-center border border-opacity-50 border-gray-500 flex items-center justify-center col-span-4 font-bold "
                    >
                      Sr. No. {i + 1}
                    </div>
                    <div
                      class="break-words p-2 text-center border border-opacity-50 border-gray-500 flex items-center justify-center col-span-2 font-bold  "
                    >
                      Qualification
                    </div>
                    <div
                      class="break-words p-2 text-center border border-opacity-50 border-gray-500 flex items-center justify-center col-span-2   "
                    >
                      {q.qualification}
                    </div>

                    <div
                      class="break-words p-2 text-center border border-opacity-50 border-gray-500 items-center flex justify-center col-span-2 font-bold  "
                    >
                      University/Board
                    </div>
                    <div
                      class="break-words p-2 text-center border border-opacity-50 border-gray-500 flex items-center justify-center col-span-2   "
                    >
                      {q.schoolName ? q.schoolName : q.boardName}
                    </div>
                    <div
                      class="break-words p-2 text-center border border-opacity-50 border-gray-500 items-center flex justify-center col-span-2 font-bold  "
                    >
                      Year of Passing
                    </div>
                    <div
                      class="break-words p-2 text-center border border-opacity-50 border-gray-500 flex items-center justify-center col-span-2   "
                    >
                      {q.yearOfPassing}
                    </div>
                    <div
                      class="break-words p-2 text-center border border-opacity-50 border-gray-500 items-center flex justify-center col-span-2 font-bold "
                    >
                      Marks/CGPA/Grade
                    </div>
                    <div
                      class="break-words p-2 text-center border border-opacity-50 border-gray-500 flex items-center justify-center col-span-2 lg:col-span-2 "
                    >
                      {q.cgpa ? q.cgpa : q.Grade ? q.Grade : q.marks}
                    </div>
                    <div
                      class="break-words p-2 text-center border border-opacity-50 border-gray-500 flex items-center justify-center col-span-2 font-bold"
                    >
                      Percentage (%)
                    </div>
                    <div
                      class="break-words p-2 text-center border border-opacity-50 border-gray-500 flex items-center justify-center col-span-2 lg:col-span-5  "
                    >
                      {q.percentage ? q.percentage : '-'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
  <!-- Essential Qualification Graduation Mobile View -->
  {#if driverQualifications.length}
  <div class="lg:hidden">
    <div class="flex justify-center mt-5 ">
      <div
        class="grid w-11/12 bg-white rounded-lg shadow-lg grid-cols-3 grid-flow-row"
      >
        <div class="col-span-3">
          <div
            class="grid grid-cols-3 bg-orange-500 text-white text-lg font-semibold p-2 rounded-t-lg"
          >
            <div class="col-span-3 flex justify-center">
              Driving License
            </div>

            <div class="col-span-3 rounded flex justify-center">
              <!-- <a
                href={essentialQualificationUrl}
                target="_blank"
                class="flex  rounded p-1 text-gray-100  underline space-x-2"
              >
                <Fa icon={faPaperclip} class="inline-block mt-1 px-2" />
                <span class="text-sm"
                  >{"Essential Qualifications: Graduation"}</span
                >
              </a> -->
            </div>
          </div>
        </div>

        <!-- {#each essentialQualifications as q, i} -->
        {#each driverQualifications as q, i}
          <div class="col-span-3">
            <div
              class="grid grid-cols-12 mt-2 ml-2 mr-2 border border-opacity-50 border-gray-500"
            />
            <div class="col-span-3">
              <div class="grid grid-cols-5 px-2 ">
                <div class="col-span-5 ">
                  <div class="grid grid-cols-4   ">
                    <div
                      class="break-words p-2 text-center border border-opacity-50 border-gray-500 flex items-center justify-center col-span-4 font-bold "
                    >
                      Sr. No. {i + 1}
                    </div>
                    <div
                      class="break-words p-2 text-center border border-opacity-50 border-gray-500 flex items-center justify-center col-span-2 font-bold  "
                    >
                Licence Type
                    </div>
                    <div
                      class="break-words p-2 text-center border border-opacity-50 border-gray-500 flex items-center justify-center col-span-2   "
                    >
                      {q.qualification}
                    </div>

                    <div
                      class="break-words p-2 text-center border border-opacity-50 border-gray-500 items-center flex justify-center col-span-2 font-bold  "
                    >
                Licence Number
                    </div>
                    <div
                      class="break-words p-2 text-center border border-opacity-50 border-gray-500 flex items-center justify-center col-span-2   "
                    >
                      {q.dLNumber}
                    </div>
                    <div
                      class="break-words p-2 text-center border border-opacity-50 border-gray-500 items-center flex justify-center col-span-2 font-bold  "
                    >
                    Valid Till
                    </div>
                    <div
                      class="break-words p-2 text-center border border-opacity-50 border-gray-500 flex items-center justify-center col-span-2   "
                    >
                      {q.validTill}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
{/if}
  <!-- Other Qualificatio Web View-->
  <div class="hidden lg:inline ">
    <div class="flex justify-center mt-5 ">
      <div
        class=" grid w-11/12 bg-white rounded-lg shadow-lg grid-cols-3 grid-flow-row"
      >
        <div class="col-span-3">
          <div
            class="grid grid-cols-6 bg-orange-500 text-white text-lg font-semibold p-2 rounded-t-lg"
          >
            <div class="col-span-3">Other Qualification</div>
          </div>
        </div>

        <div class="col-span-3 p-1">
          <div
            class="grid grid-cols-6 border border-opacity-50 border-gray-500 "
          >
            <div
              class="break-words p-2 text-center border border-opacity-50 border-gray-500 font-bold flex items-center justify-center col-span-1 "
            >
              Sr.No.
            </div>

            <div
              class="break-words p-2 text-center border border-opacity-50 border-gray-500 font-bold items-center flex justify-center col-span-1  "
            >
              Qualification
            </div>
            <div
              class="break-words p-2 text-center border border-opacity-50 border-gray-500 font-bold items-center flex justify-center col-span-1 "
            >
              Specialization
            </div>
            <div
              class="break-words p-2 text-center border border-opacity-50 border-gray-500 font-bold items-center flex justify-center col-span-1 "
            >
              University/Board
            </div>
            <div
              class="break-words p-2 text-center border border-opacity-50 border-gray-500 font-bold items-center flex justify-center col-span-1 "
            >
              Year Of Passing
            </div>
            <div
              class="break-words p-2 text-center border border-opacity-50 border-gray-500 font-bold items-center flex justify-center col-span-1 "
            >
              Marks & (%) / CGPA
            </div>

            {#each otherQualifications as q, i}
              <div
                class="break-words p-2 text-center border border-opacity-50 border-gray-500 flex items-center justify-center col-span-1 "
              >
                {i + 1}
              </div>

              <div
                class="break-words p-2 text-center border border-opacity-50 border-gray-500 items-center flex justify-center col-span-1 "
              >
                {q.qualification}
                {q.qualification !== "10th" &&
                q.qualification !== "12th" &&
                q.qualification !== "Diploma" &&
                q.qualification !== "PhD"
                  ? `- ${q.degree}`
                  : ""}
              </div>
              <div
                class="break-words p-2 text-center border border-opacity-50 border-gray-500 items-center flex justify-center col-span-1 "
              >
                {#if q.qualification == "10th"}
                  --
                {:else if q.qualification == "12th"}
                  {q.twelthSpecialization}
                {:else}
                  {q.subject}
                {/if}
              </div>
              <div
                class="break-words p-2 text-center border border-opacity-50 border-gray-500 items-center flex justify-center col-span-1 "
              >
                {q.university}
              </div>
              <div
                class="break-words p-2 text-center border border-opacity-50 border-gray-500 items-center flex justify-center col-span-1 "
              >
                {#if q.qualification !== "PhD"}
                  {q.yearOfPassing}
                {:else}
                  {q.dateOfAward}
                {/if}
              </div>
              <div
                class="break-words p-2 text-center border border-opacity-50 border-gray-500 items-center flex justify-center col-span-1 "
              >
                {#if q.qualification !== "PhD"}
                  {#if q.marksType == "CGPA/Grade"}
                    {q.cgpa}
                  {:else}
                    {q.marks} ({q.percentage}%)
                  {/if}
                {:else}
                  --
                {/if}
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Other Qualification Mobile View-->
  <div class="lg:hidden">
    <div class="flex justify-center mt-5 ">
      <div
        class="grid w-11/12 bg-white rounded-lg shadow-lg grid-cols-3 grid-flow-row"
      >
        <div class="col-span-3">
          <div
            class="grid grid-cols-3 bg-orange-500 text-white text-lg font-semibold p-2 rounded-t-lg"
          >
            <div class="col-span-3 flex justify-center">
              Other Qualification 
            </div>
          </div>
        </div>

        {#each otherQualifications as q, i}
          <div class="col-span-3">
            <div
              class="grid grid-cols-12 mt-2 ml-2 mr-2 border border-opacity-50 border-gray-500"
            />
            <div class="col-span-3">
              <div class="grid grid-cols-5 px-2 ">
                <div class="col-span-5 ">
                  <div class="grid grid-cols-4   ">
                    <div
                      class="break-words p-2 text-center border border-opacity-50 border-gray-500 flex items-center justify-center col-span-4 font-bold "
                    >
                      Sr. No.
                      {i + 1}
                    </div>
                    <div
                      class="break-words p-2 text-center border border-opacity-50 border-gray-500 flex items-center justify-center col-span-2 font-bold  "
                    >
                      Qualificatio
                    </div>
                    <div
                      class="break-words p-2 text-center border border-opacity-50 border-gray-500 flex items-center justify-center col-span-2   "
                    >
                      {q.qualification}
                    </div>
                    <div
                      class="break-words p-2 text-center border border-opacity-50 border-gray-500 items-center flex justify-center col-span-2 font-bold  "
                    >
                      Specialization
                    </div>
                    <div
                      class="break-words p-2 text-center border border-opacity-50 border-gray-500 flex items-center justify-center col-span-2   "
                    >
                      {#if q.qualification == "10th"}
                        --
                      {:else if q.qualification == "12th"}
                        {q.twelthSpecialization}
                      {:else if q.qualification == "Diploma"}
                        {q.diplomaSubject}
                      {/if}
                    </div>
                    <div
                      class="break-words p-2 text-center border border-opacity-50 border-gray-500 items-center flex justify-center col-span-2 font-bold  "
                    >
                      University/Board
                    </div>
                    <div
                      class="break-words p-2 text-center border border-opacity-50 border-gray-500 flex items-center justify-center col-span-2   "
                    >
                      {q.university}
                    </div>
                    <div
                      class="break-words p-2 text-center border border-opacity-50 border-gray-500 items-center flex justify-center col-span-2 font-bold  "
                    >
                      year Of Passing
                    </div>
                    <div
                      class="break-words p-2 text-center border border-opacity-50 border-gray-500 flex items-center justify-center col-span-2   "
                    >
                      {q.yearOfPassing}
                    </div>
                    <div
                      class="break-words p-2 text-center border border-opacity-50 border-gray-500 items-center flex justify-center col-span-2 font-bold "
                    >
                      Marks & (%)/CGPA
                    </div>
                    <div
                      class="break-words p-2 text-center border border-opacity-50 border-gray-500 flex items-center justify-center col-span-2 lg:col-span-2 "
                    >
                      {q.marks} ({q.percentage}%)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>
