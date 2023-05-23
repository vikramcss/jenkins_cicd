<script>
  import { adminToken } from "../../stores/stores";
  import { onMount } from "svelte";
  import AdminDashboard from "$lib/Pages/AdminDashboard.svelte";
  import { goto } from "$app/navigation";
  import { api } from "../../api/api";

  let countSummary = [];
  let availablePosts = [];
  let registeredCount = 0;
  const getAdminSummary = async () => {
    let {
      error: lError,
      errorMsg: lErrorMsg,
      availablePosts: lAvailablePosts,
    } = await api.getAvailablePosts({ token: $adminToken });
    availablePosts = lAvailablePosts;
    let {
      error,
      errorMsg,
      countSummary: lCountSummary,
      registeredCount: lRegisteredCount,
    } = await api.adminSummary({ token: $adminToken });
    countSummary = lCountSummary;
    registeredCount = lRegisteredCount;
  };
  onMount(async () => {
    if ($adminToken == "") {
      goto("admin");
    }
    await getAdminSummary();
  });
  const refresh = () => {};
</script>
{#if countSummary.length}
  <AdminDashboard
    {registeredCount}
    {countSummary}
    {availablePosts}
    refresh={getAdminSummary}
  />
{:else}
  ...Loading please wait
{/if}
