<script>
  import { goto } from "$app/navigation";

  import { DateTime } from "luxon";
  import { onMount } from "svelte";
  import { adminToken } from "../../stores/stores";
  export let adminSummary;
  export let refresh;
  

  let reportTime = null;
  onMount(() => {
    if (!$adminToken) goto("/admin");
    reportTime = DateTime.now().toFormat("dd-MM-y hh:mm:ss");
  });
</script>

<div class="grid grid-cols-12">
  <div class="col-span-10 col-start-2 mt-4 ">
    <div
      class="flex-col md:flex-row p-2 bg-gray-200 text-gray-900 rounded container  text-center md:text-2xl lg:text-3xl font-semibold"
    >
      Verification of candidate <div
        class="md:float-right md:mt-4 text-xs text-gray-700"
      >
        {reportTime}
      </div>
    </div>
  </div>
</div>

<div class="grid grid-cols-12 mx-20 mt-10">
  <div class=" col-span-3 w-auto ">
    <div
      class="block md:p-3 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <h5
        class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center"
      >
        {adminSummary.counts.all}
      </h5>
      <p class="font-semibold text-gray-700 dark:text-gray-400 text-center">
        Total Form
      </p>
      <p />
      <div class="grid grid-col-4 border-t-2  gap-4 justify-between py-2">
        <div class="flex justify-between ">
          <div class="col-span-3 text-right mt-2 text-xs ">Verified :</div>
          <div class="col-span-3  text-left ml-1 text-xl">00</div>
          <div class="col-span-3 text-right mt-2 text-xs ml-6">Qualified :</div>
          <div class="col-span-3  text-left ml-1  text-xl">00</div>
          <div class="col-span-3 text-right mt-2 text-xs ml-6">
            Disqualified :
          </div>
          <div class="col-span-3  text-left ml-1  text-xl">00</div>
        </div>
      </div>
    </div>
  </div>

  <div class=" col-span-3 w-auto ml-2 ">
    <div 
    on:click={()=>{
      goto('/category/sc')
    }}
      class="block md:p-3 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <h5
        class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center"
      >
        {adminSummary.counts.sc}
      </h5>
      <p class="font-semibold text-gray-700 dark:text-gray-400 text-center">
        SC
      </p>
      <p />
      <div class="grid grid-col-4 border-t-2  gap-4 justify-between py-2">
        <div class="flex justify-between ">
          <div class="col-span-3 text-right mt-2 text-xs ">Verified :</div>
          <div class="col-span-3  text-left ml-1 text-xl">00</div>
          <div class="col-span-3 text-right mt-2 text-xs ml-6">Qualified :</div>
          <div class="col-span-3  text-left ml-1  text-xl">00</div>
          <div class="col-span-3 text-right mt-2 text-xs ml-6">
            Disqualified :
          </div>
          <div class="col-span-3  text-left ml-1  text-xl">00</div>
        </div>
      </div>
    </div>
  </div>

  <div class=" col-span-3 w-auto ml-2 ">
    <div
      class="block md:p-3 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <h5
        class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center"
      >
        {adminSummary.counts.st}
      </h5>
      <p class="font-semibold text-gray-700 dark:text-gray-400 text-center">
        ST
      </p>
      <p />
      <div class="grid grid-col-4 border-t-2  gap-4 justify-between py-2">
        <div class="flex justify-between ">
          <div class="col-span-3 text-right mt-2 text-xs ">Verified :</div>
          <div class="col-span-3  text-left ml-1 text-xl">00</div>
          <div class="col-span-3 text-right mt-2 text-xs ml-6">Qualified :</div>
          <div class="col-span-3  text-left ml-1  text-xl">00</div>
          <div class="col-span-3 text-right mt-2 text-xs ml-6">
            Disqualified :
          </div>
          <div class="col-span-3  text-left ml-1  text-xl">00</div>
        </div>
      </div>
    </div>
  </div>
  <div class=" col-span-3 w-auto ml-2  ">
    <div
      class="block md:p-3 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <h5
        class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center"
      >
        {adminSummary.counts.obc}
      </h5>
      <p class="font-semibold text-gray-700 dark:text-gray-400 text-center">
        OBC
      </p>
      <p />
      <div class="grid grid-col-4 border-t-2  gap-4 justify-between py-2">
        <div class="flex justify-between ">
          <div class="col-span-3 text-right mt-2 text-xs ">Verified :</div>
          <div class="col-span-3  text-left ml-1 text-xl">00</div>
          <div class="col-span-3 text-right mt-2 text-xs ml-6">Qualified :</div>
          <div class="col-span-3  text-left ml-1  text-xl">00</div>
          <div class="col-span-3 text-right mt-2 text-xs ml-6">
            Disqualified :
          </div>
          <div class="col-span-3  text-left ml-1  text-xl">00</div>
        </div>
      </div>
    </div>
  </div>
  <div class=" col-span-3 w-auto ml-2 mt-4 ">
    <div
      class="block md:p-3 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <h5
        class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center"
      >
        {adminSummary.counts.gen}
      </h5>
      <p class="font-semibold text-gray-700 dark:text-gray-400 text-center ">
        General
      </p>
      <p />
      <div class="grid grid-col-4 border-t-2  gap-4 justify-between py-2">
        <div class="flex justify-between ">
          <div class="col-span-3 text-right mt-2 text-xs ">Verified :</div>
          <div class="col-span-3  text-left ml-1 text-xl">00</div>
          <div class="col-span-3 text-right mt-2 text-xs ml-6">Qualified :</div>
          <div class="col-span-3  text-left ml-1  text-xl">00</div>
          <div class="col-span-3 text-right mt-2 text-xs ml-6">
            Disqualified :
          </div>
          <div class="col-span-3  text-left ml-1  text-xl">00</div>
        </div>
      </div>
    </div>
  </div>
  <div class=" col-span-3 w-auto ml-2 mt-4 ">
    <div
      class="block md:p-3 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <h5
        class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center"
      >
        {adminSummary.counts.ews}
      </h5>
      <p class="font-semibold text-gray-700 dark:text-gray-400 text-center ">
        EWS
      </p>
      <p />
      <div class="grid grid-col-4 border-t-2  gap-4 justify-between py-2">
        <div class="flex justify-between ">
          <div class="col-span-3 text-right mt-2 text-xs ">Verified :</div>
          <div class="col-span-3  text-left ml-1 text-xl">00</div>
          <div class="col-span-3 text-right mt-2 text-xs ml-6">Qualified :</div>
          <div class="col-span-3  text-left ml-1  text-xl">00</div>
          <div class="col-span-3 text-right mt-2 text-xs ml-6">
            Disqualified :
          </div>
          <div class="col-span-3  text-left ml-1  text-xl">00</div>
        </div>
      </div>
    </div>
  </div>
  <div class=" col-span-3 w-auto ml-2 mt-4 ">
    <div
      class="block md:p-3 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <h5
        class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center"
      >
        {adminSummary.counts.pwd}
      </h5>
      <p class="font-semibold text-gray-700 dark:text-gray-400 text-center ">
        PWDB
      </p>
      <p />
      <div class="grid grid-col-4 border-t-2  gap-4 justify-between py-2">
        <div class="flex justify-between ">
          <div class="col-span-3 text-right mt-2 text-xs ">Verified :</div>
          <div class="col-span-3  text-left ml-1 text-xl">00</div>
          <div class="col-span-3 text-right mt-2 text-xs ml-6">Qualified :</div>
          <div class="col-span-3  text-left ml-1  text-xl">00</div>
          <div class="col-span-3 text-right mt-2 text-xs ml-6">
            Disqualified :
          </div>
          <div class="col-span-3  text-left ml-1  text-xl">00</div>
        </div>
      </div>
    </div>
  </div>
  <div class=" col-span-3 w-auto ml-2 mt-4 ">
    <div
      class="block md:p-3 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <h5
        class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center"
      >
        {adminSummary.counts.govemployee}
      </h5>
      <p class="font-semibold text-gray-700 dark:text-gray-400 text-center ">
        KCB Employee
      </p>
      <p />
      <div class="grid grid-col-4 border-t-2  gap-4 justify-between py-2">
        <div class="flex justify-between ">
          <div class="col-span-3 text-right mt-2 text-xs ">Verified :</div>
          <div class="col-span-3  text-left ml-1 text-xl">00</div>
          <div class="col-span-3 text-right mt-2 text-xs ml-6">Qualified :</div>
          <div class="col-span-3  text-left ml-1  text-xl">00</div>
          <div class="col-span-3 text-right mt-2 text-xs ml-6">
            Disqualified :
          </div>
          <div class="col-span-3  text-left ml-1  text-xl">00</div>
        </div>
      </div>
    </div>
  </div>
  <div class=" col-span-3 w-auto ml-2 mt-4 ">
    <div
      class="block md:p-3 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <h5
        class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center"
      >
        {adminSummary.counts.exserviceman}
      </h5>
      <p class="font-semibold text-gray-700 dark:text-gray-400 text-center ">
        Ex-serviceman
      </p>
      <p />
      <div class="grid grid-col-4 border-t-2  gap-4 justify-between py-2">
        <div class="flex justify-between ">
          <div class="col-span-3 text-right mt-2 text-xs ">Verified :</div>
          <div class="col-span-3  text-left ml-1 text-xl">00</div>
          <div class="col-span-3 text-right mt-2 text-xs ml-6">Qualified :</div>
          <div class="col-span-3  text-left ml-1  text-xl">00</div>
          <div class="col-span-3 text-right mt-2 text-xs ml-6">
            Disqualified :
          </div>
          <div class="col-span-3  text-left ml-1  text-xl">00</div>
        </div>
      </div>
    </div>
  </div>
  <div class=" col-span-3 w-auto ml-2 mt-4 ">
    <div
      class="block md:p-3 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <h5
        class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center"
      >
        {adminSummary.counts.exserviceman}
      </h5>
      <p class="font-semibold text-gray-700 dark:text-gray-400 text-center ">
       Female
      </p>
      <p />
      <div class="grid grid-col-4 border-t-2  gap-4 justify-between py-2">
        <div class="flex justify-between ">
          <div class="col-span-3 text-right mt-2 text-xs ">Verified :</div>
          <div class="col-span-3  text-left ml-1 text-xl">00</div>
          <div class="col-span-3 text-right mt-2 text-xs ml-6">Qualified :</div>
          <div class="col-span-3  text-left ml-1  text-xl">00</div>
          <div class="col-span-3 text-right mt-2 text-xs ml-6">
            Disqualified :
          </div>
          <div class="col-span-3  text-left ml-1  text-xl">00</div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- <div class="grid grid-cols-12">
  <div class="col-span-10 col-start-2 mt-4 ">
    <div
      class="flex-col md:flex-row p-2 bg-gray-200 text-gray-900 rounded container  text-center md:text-2xl lg:text-3xl font-semibold"
    >
      Summary of application forms received<div
        class="md:float-right md:mt-4 text-xs text-gray-700"
      >
        {reportTime}
      </div>
    </div>
  </div>
</div> -->

<!-- <div class="grid grid-cols-12">
  <div class="col-span-10 col-start-2 ">
    <div
      class="bg-gray-200 text-gray-700 rounded container  lg:mx-30 my-10 md:p-5"
    >
      <div
        class="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 md:gap-1 items-center justify-between"
      >
        <div
          class="block md:p-3 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <h5
            class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center"
          >
            {adminSummary.counts.all}
          </h5>
          <p class="font-normal text-gray-700 dark:text-gray-400 text-center">
            Total forms
          </p>
          <p />
        </div>

        <div
          class="block md:p-3 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <h5
            class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center"
          >
            {adminSummary.counts.reg}
          </h5>
          <p class="font-normal text-gray-700 dark:text-gray-400 text-center">
            Registration
          </p>
          <p />
        </div>

        <div
          class="block md:p-3 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <h5
            class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center"
          >
            {adminSummary.counts.sc}
          </h5>
          <p class="font-normal text-gray-700 dark:text-gray-400 text-center">
            SC
          </p>
          <p />
        </div>
        <div
          class="block md:p-3 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <h5
            class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center"
          >
            {adminSummary.counts.st}
          </h5>
          <p class="font-normal text-gray-700 dark:text-gray-400 text-center">
            ST
          </p>
          <p />
        </div>
        <div
          class="block md:p-3 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <h5
            class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center"
          >
            {adminSummary.counts.obc}
          </h5>
          <p class="font-normal text-gray-700 dark:text-gray-400 text-center">
            OBC
          </p>
          <p />
        </div>
        <div
          class="block md:p-3 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <h5
            class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center"
          >
            {adminSummary.counts.ews}
          </h5>
          <p class="font-normal text-gray-700 dark:text-gray-400 text-center">
            EWS
          </p>
          <p />
        </div>
        <div
          class="block md:p-3 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <h5
            class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center"
          >
            {adminSummary.counts.gen}
          </h5>
          <p class="font-normal text-gray-700 dark:text-gray-400 text-center">
            General
          </p>
          <p />
        </div>
        <div
          class="block md:p-3 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <h5
            class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center"
          >
            {adminSummary.counts.pwd}
          </h5>
          <p class="font-normal text-gray-700 dark:text-gray-400 text-center">
            PWD
          </p>
          <p />
        </div>



        <div
        class="block md:p-3 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <h5
          class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center"
        >
          {adminSummary.counts.govemployee}
        </h5>
        <p class="font-normal text-gray-700 dark:text-gray-400 text-center">
          KCB Employee
        </p>
        <p />
      </div>


      <div
      class="block md:p-3 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <h5
        class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center"
      >
        {adminSummary.counts.exserviceman}
      </h5>
      <p class="font-normal text-gray-700 dark:text-gray-400 text-center">
        Ex-Serviceman
      </p>
      <p />
    </div>


    <div
    class="block md:p-3 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
  >
    <h5
      class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center"
    >
      {adminSummary.counts.male}
    </h5>
    <p class="font-normal text-gray-700 dark:text-gray-400 text-center">
      Male
    </p>
    <p />
  </div>


  <div
  class="block md:p-3 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
>
  <h5
    class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center"
  >
    {adminSummary.counts.female}
  </h5>
  <p class="font-normal text-gray-700 dark:text-gray-400 text-center">
    Female
  </p>
  <p />
</div>


<div
  class="block md:p-3 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
>
  <h5
    class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center"
  >
    {adminSummary.counts.Transgender}
  </h5>
  <p class="font-normal text-gray-700 dark:text-gray-400 text-center">
    Transgender
  </p>
  <p />
</div>



        <div
          class="block md:p-3 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <h5
            class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center"
          >
            {adminSummary.counts.feespaid}
          </h5>
          <p class="font-normal text-gray-700 dark:text-gray-400 text-center">
            Fees Paid
          </p>
          <p />
        </div>
      </div>
    </div>
  </div>
</div> -->
<div class="flex space-x-4 items-center justify-center  m-10 ">
  <button
    on:click={async () => {
      adminSummary.counts.all = 0;
      adminSummary.counts.sc = 0;
      adminSummary.counts.st = 0;
      adminSummary.counts.obc = 0;
      adminSummary.counts.gen = 0;
      adminSummary.counts.ews = 0;
      adminSummary.counts.pwd = 0;
      adminSummary.counts.feespaid = 0;
      await refresh();
      reportTime = DateTime.now().toFormat("dd-MM-y hh:mm:ss");
    }}
    type="button"
    class="mt-5 w-48  text-center bg-navy-600 hover:bg-navy-500  shadow-lg text-white font-bold py-2 px-4 rounded"
  >
    Refresh
  </button>
  <!-- <button
    on:click={async () => {
      $adminToken=''
      goto("/admin");
    }}
    type="button"
    class="mt-5 w-48  text-center bg-gray-600 hover:bg-gray-500  shadow-lg text-white font-bold py-2 px-4 rounded"
  >
    Logout
  </button> -->
  <button
    on:click={() => {
      goto("/candidatesDetails");
    }}
    type="button"
    class="mt-5 w-48  text-center bg-gray-600 hover:bg-gray-500  shadow-lg text-white font-bold py-2 px-4 rounded"
  >
    View
  </button>
</div>
