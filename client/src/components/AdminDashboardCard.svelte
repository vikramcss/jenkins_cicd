<script>
  export let postName = "";
  export let counts = {};
</script>

<div class="grid grid-cols-12">
  <div class="col-span-10 col-start-2 ">
    <div
      class="bg-gray-200 text-gray-700 rounded container  lg:mx-30 my-10 md:p-5"
    >
      <div class="bg-gray-100 mb-2 rounded-md p-2 text-gray-700">
        Post: <span class="font-bold text-md">
          <!-- {availablePosts.find((ap) => ap.postId == adminSummary.postId)
            .postName} -->
          {postName} : {counts.allRecs}
          
        </span>
      </div>
      <div
        class="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 md:gap-1 items-center justify-between"
      >
        <div
          class="block md:p-3 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <h5
            class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center"
          >
            <!-- {adminSummary.counts.all} -->
            {counts.all}
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
            <!-- {adminSummary.counts.sc} -->
            {counts.sc}
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
            <!-- {adminSummary.counts.st} -->
            {counts.st}
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
            <!-- {adminSummary.counts.obc} -->
            {counts.obc}
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
            <!-- {adminSummary.counts.ews} -->
            {counts.ews}
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
            <!-- {adminSummary.counts.gen} -->
            {counts.gen}
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
            <!-- {adminSummary.counts.pwd} -->
            {counts.pwd}
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
            <!-- {adminSummary.counts.govemployee} -->
            {counts.govemployee}
          </h5>
          <p class="font-normal text-gray-700 dark:text-gray-400 text-center">
            PCB Employee
          </p>
          <p />
        </div>

        <div
          class="block md:p-3 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <h5
            class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center"
          >
            <!-- {adminSummary.counts.exserviceman} -->
            {counts.exserviceman}
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
            <!-- {adminSummary.counts.male} -->
            {counts.male}
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
            {counts.female}
            <!-- {adminSummary.counts.female} -->
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
            <!-- {adminSummary.counts.Transgender} -->
            {counts.Transgender}
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
            <!-- {adminSummary.counts.widowsOrDivorced} -->
            {counts.widowsOrDivorced}
          </h5>
          <p class="font-normal text-gray-700 dark:text-gray-400 text-center">
            widows/Divorced
          </p>
          <p />
        </div>
      </div>
    </div>
  </div>
</div>
