<script>
  import { goto } from "$app/navigation";
  import Home from "$lib/Pages/Home.svelte";
  import { onMount } from "svelte";
  import { api } from "../api/api";
  import { DateTime } from "luxon";
  import { validTime } from "../stores/stores";
  let startDatetime;
  let endDatetime;
  let loaded = false;
  onMount(async () => {
    const {
      error,
      startDatetime: utcStartDatetime,
      endDatetime: utcEndDatetime,
    } = await api.getFormSchedule();
    console.log(
      `startDatetime is:${utcStartDatetime}  endDatetime is: ${utcEndDatetime}`
    );
    startDatetime = DateTime.fromISO(utcStartDatetime);
    endDatetime = DateTime.fromISO(utcEndDatetime);
    loaded = true;
  });

  const handleRegister = (e) => {
    e.detail.event === "register" ? goto("/register") : "";
  };
</script>

<svelte:head>
  <title>SCITECH Park, Pune</title>
  <meta name="robots" content="noindex nofollow" />
  <html lang="en" />
</svelte:head>
<!-- <div class="bg-red-500 text-red-100 m-5 p-3">
  value of valid time is {$validTime}
</div> -->
{#if loaded}
  <Home
    {startDatetime}
    {endDatetime}
    on:click={() => {
      goto("/signin");
    }}
    on:routeEvent={handleRegister}
  />
{:else}
  ...Loading
{/if}
