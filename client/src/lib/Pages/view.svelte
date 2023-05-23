<script>
  import { createEventDispatcher, onMount } from "svelte";
  import { api } from "../../api/api";
  import { token } from "../../stores/stores";
  import Razorpay from "../../components/Razorpay.svelte";
  import ReportComponent from "../../components/ReportComponent.svelte";
  import { goto } from "$app/navigation";
  import { validTime } from "../../stores/stores";
  import Step from "../../common/StepQualifications.svelte";

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

  console.log("correspondence address:", correspondenceAddress);

  // export let application={};

  function handleClick() {
    alert("Please Accept the Declaration");
  }
  // const printApplication = () => {
  //   api.printApplication({ postId,token: $token });
  // };

  const dispatch = createEventDispatcher();
  let printFeeReceipt = false;
  let submitverified = true;
  let initiatePayment = false;
  let makePaymentCB = null;
  let applicantInfo = {};

  let order_id;
  let applicationFetched = true;
</script>

{#if applicationFetched}
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
    <!-- <label for="done">{task.done? "Completed": "Not Completed"}

    <input name="done" type=checkbox bind:checked={task.done}>
    {task.name}
    <button on:click={()=> handleClick(task)}>Delete</button>
    <button on:click={()=>onEdit(i)}>Edit</button>
  
  </label>  -->

    <div
      class="text-sm font-semibold tracking-wide text-gray-800 whitespace-normal "
    >
      <span><input type="checkbox" checked class="" disabled /></span>
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
      terminated forthwith without notice. <span class="text-red-500"
        >Payment once done,even for single post,the personal information filled
        by the candidate will be frozen and will not be editable</span
      >
    </div>
  </div>

  <div class="flex flex-row justify-center gap-2 mx-4 mb-5">
    <button
      type="submit"
      class="mt-5 w-48 text-center bg-orange-400 hover:bg-orange-500 shadow-lg text-gray-500 hover:text-gray-700 font-bold py-2 px-4 rounded"
      on:click={() => {
        goto(`/dashboard/${postId}`);
      }}
    >
      Back
    </button>

    <!-- <button
  type="submit"
  class="mt-5 w-48  text-center bg-blue-500 hover:bg-gray-500  shadow-lg text-white font-bold py-2 px-4 rounded"
  on:click={printApplication} 
>
  Print
</button> -->
  </div>
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
