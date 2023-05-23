<script>
  import { createEventDispatcher, onMount } from "svelte";
  import { api } from "../../api/api";
  import { token } from "../../stores/stores";
  import Razorpay from "../../components/Razorpay.svelte";
  import ReportComponent from "../../components/ReportComponent.svelte";
  import { goto } from "$app/navigation";
  import { validTime } from "../../stores/stores";
  import Step from "../../common/StepQualifications.svelte";
  import { Circle } from "svelte-loading-spinners";
  import Alert from "../../common/Alert.svelte";

  // import PaymentReceipt from "./PaymentReceipt.svelte";
  export let personalInfo = {};
  export let correspondenceAddress;
  export let permanentAddress;
  export let essentialQualifications;
  export let uploads = {};
  export let permanentIsCorrespondence;
  export let postId;
  export let otherQualifications;
  export let appid;
  export let scribe;

  let paymentError = "";
  let loadingPayment = false;
  function handleClick() {
    alert("Please Accept the Declaration");
  }

  const dispatch = createEventDispatcher();
  let printFeeReceipt = false;
  let submitverified = false;
  let initiatePayment = false;
  let makePaymentCB = null;
  let applicantInfo = {};

  let order_id;
  let applicationfetched = true;

  const storeDeclaration = async () => {
    loadingPayment = true;
    const {
      error,
      errorMsg,
      application: lapplicantion,
    } = await api.saveApplication({
      params: { submitverified: "Yes" },
      token: $token,
    });
    if (error) {
      paymentError = "unable to pay fees, please try again";
      loadingPayment = false;
      return errorMsg;
    }
    loadingPayment = false;
    console.log("............/......", lapplicantion);
  };
  const onPrintFeeReceipt = () => {
    printFeeReceipt = true;
  };
</script>

<Step step={"Preview"} experience={postId == "52" ? true : false} />
{#if applicationfetched}
  <ReportComponent
    {personalInfo}
    {correspondenceAddress}
    {permanentAddress}
    {essentialQualifications}
    {uploads}
    {appid}
    {permanentIsCorrespondence}
    {otherQualifications}
    {postId}
    {scribe}
    bind:initiatePayment
    bind:order_id
    bind:applicantInfo
    bind:makePaymentCB
  />

  <div class="mx-10 px-5 py-4 font-semibold text-lg">
    <div
      class="text-sm font-semibold tracking-wide text-gray-800 whitespace-normal"
    >
      <span>
        <input type="checkbox" bind:checked={submitverified} class="" />
      </span>
      <span class="pl-2"
        >I hereby declare that I have carefully read and fully understood all
        the instructions and details pertaining to the post being applied by me
        and all statements made and information furnished in this application
        are true and complete to the best of my knowledge and belief.
      </span>
    </div>

    <div
      class="text-sm font-semibold tracking-wide my-2 text-gray-800 whitespace-normal "
    >
      I have read the advertisement and I am qualified for this post. I have
      reviewed all the attachments uploaded and are accurate, readable and
      clear. I also declare that I have not concealed any material information
      which may debar my candidature for the post applied for. In the event of
      suppression or distortion of any fact including category, age or
      educational qualification, experience etc. made in my application form, I
      understand that I will be denied any employment in the organization and if
      already employed on any of the posts in the Institute, my services will be
      terminated forthwith without notice.
      <span class="text-red-600">Payment once done,even for single post,the personal information filled by the candidate will be frozen and will not be editable</span>
    </div>
  </div>
  {#if paymentError}
    <div class="flex flex-col justify-center mx-2 lg:mx-20 mt-5">
      <Alert
        message={paymentError}
        on:alertClosed={() => (paymentError = null)}
      />
    </div>
  {/if}
  <div class="flex flex-row justify-center gap-2 mx-4 mb-5">
    {#if loadingPayment}
      <div class="">
        <Circle size="60" color="#FF3E00" unit="px" duration="1s" />
      </div>
    {:else}
      <button
        type="submit"
        class="mt-5 w-48 text-center bg-orange-100 hover:bg-white shadow-lg text-gray-500 hover:text-gray-700 font-bold py-2 px-4 rounded"
        on:click={() => {
          dispatch("preview", { action: "previous", data: {} });
        }}
      >
        PREVIOUS
      </button>

      {#if $validTime}
        {#if submitverified}
          <button
            type="submit"
            class="mt-5 w-48  text-center bg-orange-600 hover:bg-orange-500  shadow-lg text-white font-bold py-2 px-4 rounded"
            on:click={() => {
              if (makePaymentCB) makePaymentCB();
              storeDeclaration();
            }}
          >
            PAY FEES
          </button>
        {:else}
          <button
            type="submit"
            class="mt-5 w-48  text-center bg-gray-600 hover:bg-gray-500  shadow-lg text-white font-bold py-2 px-4 rounded"
            on:click={handleClick}
          >
            PAY FEES
          </button>
        {/if}
      {:else}
        <button
          type="submit"
          class="mt-5 w-48  text-center bg-gray-600 hover:bg-gray-500  shadow-lg text-white font-bold py-2 px-4 rounded"
          on:click={(e) => goto(`/dashboard/${postId}`)}
        >
          PAY FEES
        </button>
      {/if}
    {/if}
  </div>
  {#if initiatePayment}
    <Razorpay
      {order_id}
      name={applicantInfo.name}
      email={applicantInfo.email}
      contact={applicantInfo.mobile}
      amount={applicantInfo.amount}
      {postId}
    />
  {/if}
  <!-- {#if printFeeReceipt}
  <PaymentReceipt
    personalInfo={application.personalInfo}
    confirmation_client={application.confirmation_client}
    on:done={() => 
      printFeeReceipt = false
      }
      />
  {/if} -->
{/if}
