<script>
  import { goto } from "$app/navigation";
  import { createEventDispatcher } from "svelte";
  import { DateTime } from "luxon";
  export let personalInfo;
  export let confirmation_client;
  export let confirmation_server;
  export let postDetails;
  export let appid;
  export let showDashboardButton;
  import { page } from "$app/stores";
  import { impactedRecord } from "../../stores/stores";
  import { postIdMap } from "../../data/postIdMap";
  let { postId } = $page.params;

  const dispatch = createEventDispatcher();
  let payment_confirmation = confirmation_client
    ? confirmation_client
    : confirmation_server;

  const getFeesPaidDateTime = () => {
    let { amount, updated_at } = payment_confirmation;
    let feesPaidDate = DateTime.fromISO(
      payment_confirmation.updated_at
    ).toLocaleString();
    let month = feesPaidDate.split("/")[0];
    let day = feesPaidDate.split("/")[1];
    let year = feesPaidDate.split("/")[2];
    feesPaidDate = `${day}-${month}-${year}`;
    let feesPaidTime = DateTime.fromISO(
      payment_confirmation.updated_at
    ).toLocaleString(DateTime.TIME_24_WITH_SECONDS);
    return `${feesPaidDate} ${feesPaidTime}`;
  };
</script>

<div class="flex flex-col items-center w-full mt-4">
  <div
    class="flex flex-col w-11/12 md:w-5/12 h-1/4 bg-white p-5 border-1 border-opacity-50 shadow-lg border-black rounded-lg"
  >
    <div
      class="grid grid-cols-12   rounded-xl border-4 border-orange-400 font-sans  p-4"
    >
      <div class="col-span-6 flex justify-end mt-6 border-r-4 p-2">
        <img src="/PCBlogo.png" alt="" class=" object-cover w-36 h-36  " />
      </div>
      <div class="col-span-6 flex justify-start p-2 mt-8">
        <img src="/STP-logo.jpg" alt="" class=" object-cover h-28 w-28" />
      </div>

      <div
        class="border-collapse border-2 col-span-12 font-bold text-4xl text-center font-serif text-orange-700 border-b-4 P-4  mt-4"
      >
        FEE RECEIPT
      </div>
      <div class="col-span-12 text-xl  text-center font-semibold m-4">
        Fee Collected By <span class="font-bold text-orange-800 tracking-wide "
          >SCITECHPARK</span
        >
        On Behalf of <span class="font-bold text-orange-600">PCB</span> For The
        Post of {postDetails.postName}
      </div>
      <div
        class="border-t-2 border-b-2 border-l-2 p-1 col-span-5 text-center text-xl uppercase font-bold"
      >
        Application Id
      </div>
      <div
        class="border-t-2 border-b-2 p-1 col-span-1 text-center text-xl font-bold"
      >
        :
      </div>
      <div class="border-t-2 border-b-2 border-r-2 p-1 col-span-6 text-xl">
        {appid}
      </div>
      <div
        class="border-t-2 border-b-2 border-l-2 p-1 col-span-5 text-center text-xl uppercase font-bold"
      >
        Payment
      </div>
      <div
        class="border-t-2 border-b-2 p-1 col-span-1 text-center text-xl font-bold"
      >
        :
      </div>
      <div class="border-t-2 border-b-2 border-r-2 p-1 col-span-6 text-xl">
        Rs.{payment_confirmation.amount / 100}/-
      </div>
      <div
        class="border-t-2 border-b-2 border-l-2 p-1 col-span-5 text-center text-base md:text-xl uppercase font-bold border-b-3"
      >
        Order ID
      </div>
      <div
        class="border-t-2 border-b-2p-1 col-span-1 text-center text-xl font-bold"
      >
        :
      </div>
      <div class="border-t-2 border-b-2 border-r-2 p-1 col-span-6 text-xl">
        {payment_confirmation.razorpay_order_id}
      </div>
      <div
        class="border-t-2 border-b-2 border-l-2 p-1 col-span-5 text-center text-base md:text-xl uppercase font-bold"
      >
        Payment ID
      </div>
      <div
        class="border-t-2 border-b-2 p-1 col-span-1 text-center text-xl font-bold"
      >
        :
      </div>
      <div class="border-t-2 border-b-2 border-r-2 p-1 col-span-6 text-xl">
        {payment_confirmation.razorpay_payment_id}
      </div>
      <div
        class="border-t-2 border-b-2 border-l-2 p-1 col-span-5 text-center text-base md:text-xl uppercase font-bold"
      >
        Name
      </div>
      <div
        class="border-t-2 border-b-2 p-1 col-span-1 text-center text-xl font-bold"
      >
        :
      </div>
      <div class="border-t-2 border-b-2 border-r-2 p-1 col-span-6 text-xl">
        {personalInfo.name}
      </div>
      <div
        class="border-t-2 border-b-2 border-l-2 p-1 col-span-5 text-center text-base md:text-xl uppercase font-bold"
      >
        Category
      </div>
      <div
        class="border-t-2 border-b-2 p-1 col-span-1 text-center text-xl font-bold"
      >
        :
      </div>
      <div class="border-t-2 border-b-2 border-r-2 p-1 col-span-6 text-xl">
        {personalInfo.category}
      </div>
      <div
        class="border-t-2 border-b-2 border-l-2 p-1 col-span-5 text-center text-base md:text-xl uppercase font-bold"
      >
        PWD
      </div>
      <div
        class="border-t-2 border-b-2 p-1 col-span-1 text-center text-xl font-bold"
      >
        :
      </div>
      <div class="border-t-2 border-b-2 border-r-2 p-1 col-span-6 text-xl">
        {personalInfo.pwd}
      </div>
      <div
        class="borr-t-2 border-b-2 border-l-2 p-1 col-span-5 text-center text-base md:text-xl uppercase font-bold"
      >
        Gender
      </div>
      <div
        class="border-t-2 border-b-2 p-1 col-span-1 text-center text-xl font-bold"
      >
        :
      </div>
      <div class="border-t-2 border-b-2 border-r-2 p-1 col-span-6 text-xl">
        {personalInfo.gender}
      </div>

      <div
        class="border-t-2 border-b-2 border-l-2 p-1 col-span-5 text-center text-base md:text-xl uppercase font-bold"
      >
        DATE/TIME
      </div>
      <div
        class="border-t-2 border-b-2 p-1 col-span-1 text-center text-xl font-bold"
      >
        :
      </div>
      <div class="border-t-2 border-b-2 border-r-2 p-1 col-span-6 text-xl">
        <!-- {payment_confirmation.updated_at} -->
        {getFeesPaidDateTime()}
      </div>

      <div class="mt-4  col-span-2 flex justify-center items-center">
        <i class="fas fa-check-circle" />
        <svg
          class="rounded-full w-8 h-8 "
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
          ><path
            d="m512 58.667969c0-32.363281-26.304688-58.667969-58.667969-58.667969h-394.664062c-32.363281 0-58.667969 26.304688-58.667969 58.667969v394.664062c0 32.363281 26.304688 58.667969 58.667969 58.667969h394.664062c32.363281 0 58.667969-26.304688 58.667969-58.667969zm0 0"
            fill="#4caf50"
          /><path
            d="m385.75 171.585938c8.339844 8.339843 8.339844 21.820312 0 30.164062l-138.667969 138.664062c-4.160156 4.160157-9.621093 6.253907-15.082031 6.253907s-10.921875-2.09375-15.082031-6.253907l-69.332031-69.332031c-8.34375-8.339843-8.34375-21.824219 0-30.164062 8.339843-8.34375 21.820312-8.34375 30.164062 0l54.25 54.25 123.585938-123.582031c8.339843-8.34375 21.820312-8.34375 30.164062 0zm0 0"
            fill="#fafafa"
          /></svg
        >
      </div>
      <div
        class="mt-4 p-1 col-span-10 text-center text-base md:text-xl uppercase font-bold"
      >
        Your Payment Succesfully Completed
      </div>
    </div>
  </div>
</div>
{#if showDashboardButton}
  <div class="flex flex-row justify-center my-4">
    <button
      type="button"
      on:click={(e) => {
        dispatch("done", {});
        goto(`/dashboard/${postId}`);
      }}
      class="mt-5 w-48  text-center bg-orange-600 hover:bg-orange-500  shadow-lg text-white font-bold py-2 px-4 rounded uppercase"
    >
      Dashboard
    </button>
  </div>
{/if}
