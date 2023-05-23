<script>
  import { goto } from "$app/navigation";
  import AdminDashboardCard from "../../components/AdminDashboardCard.svelte";
  import { DateTime } from "luxon";
  import { onMount } from "svelte";
  import { adminToken } from "../../stores/stores";
  export let countSummary;
  export let availablePosts;
  export let registeredCount;
  export let refresh;

  $: summaryAvailablePostsCounts = countSummary
    ? countSummary.reduce(
        (p, c) => {
          return {
            allRecs: p.allRecs + c.counts.allRecs,
            all: p.all + c.counts.all,
            sc: p.sc + c.counts.sc,
            st: p.st + c.counts.st,
            obc: p.obc + c.counts.obc,
            ews: p.ews + c.counts.ews,
            gen: p.gen + c.counts.gen,
            pwd: p.pwd + c.counts.pwd,
            govemployee: p.govemployee + c.counts.govemployee,
            exserviceman: p.exserviceman + c.counts.exserviceman,
            male: p.male + c.counts.male,
            female: p.female + c.counts.female,
            Transgender: p.Transgender + c.counts.Transgender,
            widowsOrDivorced: p.widowsOrDivorced + c.counts.widowsOrDivorced,
          };
        },
        {
          allRecs: 0,
          all: 0,
          sc: 0,
          st: 0,
          obc: 0,
          ews: 0,
          gen: 0,
          pwd: 0,
          govemployee: 0,
          exserviceman: 0,
          male: 0,
          female: 0,
          Transgender: 0,
          widowsOrDivorced: 0,
        }
      )
    : {
        allRecs: 0,
        all: 0,
        sc: 0,
        st: 0,
        obc: 0,
        ews: 0,
        gen: 0,
        pwd: 0,
        govemployee: 0,
        exserviceman: 0,
        male: 0,
        female: 0,
        Transgender: 0,
        widowsOrDivorced: 0,
      };
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
      Summary of application forms received: {registeredCount}
      <span class="text-xs">registered</span>
      <div class="md:float-right md:mt-4 text-xs text-gray-700">
        {reportTime}
      </div>
    </div>
  </div>
</div>
<AdminDashboardCard
  postName={"All Posts"}
  counts={summaryAvailablePostsCounts}
/>
{#each countSummary as adminSummary}
  <AdminDashboardCard
    postName={availablePosts.find((ap) => ap.postId == adminSummary.postId)
      .postName}
    counts={adminSummary.counts}
  />
{/each}
<div class="flex space-x-4 items-center justify-center  m-10 ">
  <button
    on:click={async () => {
      await refresh();
      reportTime = DateTime.now().toFormat("dd-MM-y hh:mm:ss");
    }}
    type="button"
    class="mt-5 w-48  text-center bg-navy-600 hover:bg-navy-500  shadow-lg text-white font-bold py-2 px-4 rounded"
  >
    Refresh
  </button>
  <button
    on:click={async () => {
      $adminToken = "";
      goto("/admin");
    }}
    type="button"
    class="mt-5 w-48  text-center bg-gray-600 hover:bg-gray-500  shadow-lg text-white font-bold py-2 px-4 rounded"
  >
    Logout
  </button>
</div>
