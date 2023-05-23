<script>
  import { createEventDispatcher, onMount } from "svelte";
  import { DateTime } from "luxon";
  import PaymentReceipt from "./PaymentReceipt.svelte";
  import { api } from "../../api/api";
  import { token, impactedRecord } from "../../stores/stores";
  import Fa from "svelte-fa/src/fa.svelte";
  import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
  import { postIdMap } from "../../data/postIdMap";

  import { goto } from "$app/navigation";
  export let application = {};
  export let formschedule = {};
  export let appid;
  export let postId;
  export let availablePosts;
  export let postDetails = availablePosts.find((ap) => ap.postId == postId);
  let validPeriodMessage = "";
  let dataloaded = false;
  console.log("postId .....", postId);

  onMount(async () => {
    let { error, message: lmessage } = await api.validPeriod();
    if (error) {
      validPeriodMessage = lmessage;
    }
    dataloaded = true;
  });
  appid = application.appid;

  let profile = "enabled";
  let printFeeReceipt = false;
  let profilePrinted = false;
  let profilePrintedAt = "";
  let formStatus = "notcompleted";
  let postRecord = postIdMap.find((pm) => pm.postId == postId).record;
  let postName = availablePosts.find((pn) => pn.postId == postId).postName;

  const dispatch = createEventDispatcher();
  const updateProfileStatus = () => {
    if (
      application[postRecord]?.confirmation_client ||
      application[postRecord]?.confirmation_server
    ) {
      profile = "disabled";
    } else {
      profile = "enabled";
    }
    console.log(
      "application.printApplication: ",
      application[postRecord]?.printApplication
    );
    if (application[postRecord]?.printApplication) {
      profilePrinted = true;
      formStatus = "completed";
      let at = application[postRecord]?.printApplication.at;
      let printedDt = DateTime.fromISO(at).toLocaleString(DateTime.DATE_MED);
      let printedTime = DateTime.fromISO(at).toLocaleString(
        DateTime.TIME_24_WITH_SECONDS
      );
      profilePrintedAt = `${printedDt} ${printedTime}`;
    } else {
      profilePrinted = false;
    }
  };
  const printApplication = async (e) => {
    console.log("postId is client ...", postId);
    console.log("postDetails is client ...", postDetails);

    profilePrintedAt = `Please wait....`;
    let {
      error,
      errMSg,
      filename,
      application: lapplication,
    } = await api.printApplication({
      postId,
      postRecord,
      postName,
      token: $token,
    });
    if (!error) {
      application = { ...lapplication };
      updateProfileStatus();
    }
    console.log("pdf with filename is created:", filename);
    console.log("error :", error);
  };

  const onQualifications = async (e) => {
    // console.log("will dispatch profile");
    dispatch("qualifications", {});
  };

  const onPrint = async (e) => {
    dispatch("print", { action: "next", data: {} });
  };
  const getFeesPaidDetails = () => {
    let amount;
    let updated_at;

    if (application[postRecord]?.confirmation_client) {
      let { amount: amount_client, updated_at: updated_at_client } =
        application[postRecord]?.confirmation_client;
      amount = amount_client;
      updated_at = updated_at_client;
    } else if (application[postRecord]?.confirmation_server) {
      let { amount: amount_server, updated_at: updated_at_server } =
        application[postRecord]?.confirmation_server;
      amount = amount_server;
      updated_at = updated_at_server;
    } else {
      console.log(
        "state unexpected, trying to get Fees details when payment record is absent."
      );
      return "Fees Rs. Unknown paid @ Unknown";
    }

    let feesPaidDate = DateTime.fromISO(updated_at).toLocaleString(
      DateTime.DATE_MED
    );
    let feesPaidTime = DateTime.fromISO(updated_at).toLocaleString(
      DateTime.TIME_24_WITH_SECONDS
    );
    return `Fees Rs. ${
      Number(amount) / 100
    } paid @ ${feesPaidDate} ${feesPaidTime}`;
  };
  const onPrintFeeReceipt = () => {
    printFeeReceipt = true;
  };

  updateProfileStatus();
  let impacted = null;
  if ($impactedRecord && $impactedRecord.applications) {
    let postRecord = postIdMap.find((e) => e.postId == postId).record;
    let entry = $impactedRecord.applications.find(
      (e) => e.postName == postRecord
    );
    if (entry && (entry.confirmation_client || entry.confirmation_server)) {
      impacted = {
        confirmation_client: entry.confirmation_client,
        confirmation_server: entry.confirmation_server,
        appid: entry.post_appid,
      };
    }
  }
</script>

{#if dataloaded}
  {#if printFeeReceipt}
    <PaymentReceipt
      personalInfo={application.personalInfo}
      confirmation_client={application[postRecord]?.confirmation_client}
      confirmation_server={application[postRecord]?.confirmation_server}
      {postDetails}
      appid={application[postRecord].appid}
      showDashboardButton={impacted ? false : true}
      on:done={() => {
        printFeeReceipt = false;
      }}
    />
    {#if impacted}
      <PaymentReceipt
        personalInfo={application.personalInfo}
        confirmation_client={impacted.confirmation_client}
        confirmation_server={impacted.confirmation_server}
        {postDetails}
        appid={impacted.appid}
        showDashboardButton={true}
        on:done={() => {
          printFeeReceipt = false;
        }}
      />
    {/if}
  {:else}
    <div class="container mx-auto">
      <div class="grid grid-cols-12">
        <div
          class="p-3 m-3 col-span-12   text-center font-bold text-lg bg-orange-400 text-white rounded-lg tracking-wide sticky top-0"
        >
          <span class="text-xs font-semibold">Post Name:</span>
          {postDetails.postName} : Dashboard
        </div>
      </div>
      <div
        class="bg-indigo-50 flex items-center justify-center  m-4 rounded-lg"
      >
        <div class="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 ">
          <div
            class="col-span-2 justify-center md:justify-start md:col-span-1 p-1 md:p-3 gap-y-2 flex items-center mt-3"
          >
            <span
              class="w-6 h-6 rounded-full bg-orange-400 text-white inline-block text-center font-bold mr-3"
            >
              1
            </span>
            <div>
              <h1
                class="text-black text-md md:text-md font-bold uppercase border-b-4 border-orange-400 tracking-wide "
              >
                Qualifications/Fee
              </h1>
              {#if profile == "enabled"}
                <div class="text-xs mt-2">Not completed</div>
              {:else}
                <div class="text-xs mt-2">Completed</div>
              {/if}
            </div>
          </div>
          <div
            class="col-span-2 justify-center md:col-span-1  flex items-center "
          >
            {#if !validPeriodMessage}
              {#if profile == "enabled"}
                <button
                  on:click={onQualifications}
                  type="button"
                  class="mt-5 w-48  text-center bg-orange-400 hover:bg-orange-300  shadow-lg text-white font-bold py-2 px-4 rounded"
                >
                  Start/Edit
                </button>
              {:else}
                <button
                  on:click={() => goto(`/view/${postId}`)}
                  type="button"
                  class="mt-5 w-48  text-center bg-gray-600 shadow-lg text-white font-bold py-2 px-4 rounded"
                >
                  View
                </button>
              {/if}
            {:else}
              <button
                class="mt-5 w-55  text-center bg-orange-300  shadow-lg text-white font-bold py-2 px-4 rounded"
              >
                {validPeriodMessage}
              </button>
            {/if}
          </div>
          <div
            class="col-span-2 justify-center md:justify-start md:col-span-1 p-1 md:p-3 gap-y-2 flex items-center mt-3"
          >
            <span
              class="w-6 h-6 rounded-full bg-orange-300 text-white inline-block text-center font-bold mr-3"
            >
              2
            </span>
            <div>
              <h1
                class="text-black text-md font-bold uppercase tracking-wide border-b-4 border-orange-400 "
              >
                Fee Receipt
              </h1>
              {#if profile == "enabled"}
                <div class="text-xs mt-2">not paid</div>
              {:else}
                <div class="text-xs mt-2">paid Rs: {getFeesPaidDetails()}</div>
              {/if}
            </div>
          </div>

          <div
            class="col-span-2 justify-center md:col-span-1  flex items-center "
          >
            {#if profile == "enabled"}
              <button
                type="button"
                class="mt-5 w-48  text-center bg-gray-400 shadow-lg text-white font-bold py-2 px-4 rounded"
              >
                Payment Details
              </button>
            {:else}
              <button
                on:click={onPrintFeeReceipt}
                type="button"
                class="mt-5 w-48  text-center bg-orange-400 hover:bg-orange-300  shadow-lg text-white font-bold py-2 px-4 rounded"
              >
                Payment Details
              </button>
            {/if}
          </div>
          <!-- -----end category -->
          <div
            class="col-span-2 md:justify-start justify-center md:col-span-1 p-1 md:p-3 gap-y-2 flex items-center mt-3"
          >
            <span
              class="w-6 h-6 rounded-full bg-orange-400 text-white inline-block text-center font-bold mr-3"
            >
              3
            </span>
            <div>
              <h1
                class="text-black text-md font-bold uppercase tracking-wide border-b-4 border-orange-400 mt-2"
              >
                Print Application
              </h1>
              <!-- <div class="text-xs mt-2">{profile == 'enabled' ? 'Not completed' : 'Completed'}</div> -->
              <div class="text-xs mt-2">
                {profilePrinted == true
                  ? `Completed @ ${profilePrintedAt}`
                  : "Not Completed"}
              </div>
            </div>
          </div>
          <div
            class="col-span-2 justify-center md:col-span-1  flex items-center "
          >
            {#if profile == "enabled"}
              <div>
                <button
                  type="button"
                  class="mt-5 w-48  text-center bg-gray-400 shadow-lg text-white font-bold py-2 px-4 rounded"
                >
                  Print Application
                </button>
                <p class="text-xs text-center">(Along With Fee Receipt)</p>
              </div>
            {:else if profilePrinted == false}
              <div>
                <button
                  on:click={printApplication}
                  type="button"
                  class="mt-5 w-48  text-center bg-orange-400  hover:bg-orange-300 shadow-lg text-white font-bold py-2 px-4 rounded"
                >
                  Print Application
                </button>
              </div>
            {:else}
              <div>
                <button
                  type="button"
                  class="mt-5 w-48  text-center bg-gray-400  shadow-lg text-white font-bold py-2 px-4 rounded"
                >
                  Application Printed
                </button>
                <p class="text-xs text-center">(Along With Fee Receipt)</p>
                <a
                  href={application[postRecord]?.printApplication.filename}
                  target="_blank"
                  class="flex text-orange-400 underline space-x-2 mt-2"
                >
                  <Fa icon={faPaperclip} class="inline-block mt-3 px-2" />
                  <span class="text-sm mt-2"> view and print profile </span>
                </a>
              </div>
            {/if}
          </div>
          <div
            class="col-span-2 justify-center md:col-span-1 p-1 md:p-3 gap-y-2 flex items-center md:mt-4 md:mr-80"
          >
            <span
              class="w-6 h-6 rounded-full bg-orange-400 text-white inline-block text-center font-bold mr-3"
            >
              4
            </span>
            <div class="">
              <h1
                class="text-black text-md md:text-md font-bold uppercase border-b-4 border-orange-400 tracking-wide "
              >
                Application Form Status
              </h1>
              {#if formStatus == "completed"}
                <div class="text-xs mt-2">Completed</div>
              {:else}
                <div class="text-xs mt-2">Not Completed</div>
              {/if}
            </div>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-center ">
        <button
          type="button"
          class="mt-5 w-48  text-center bg-orange-400 hover:bg-orange-500 shadow-lg text-white font-bold py-2 px-4 rounded"
          on:click={() => {
            goto("/profileAvailablePosts");
          }}
        >
          Back
        </button>
      </div>
    </div>
  {/if}
{/if}
