<script>
  import { onMount } from "svelte";
  import CardMessage from "../../components/CardMessage.svelte";
  import { DateTime } from "luxon";
  import { api } from "../../api/api";
  import { currentDate } from "../../stores/stores";
  let dataLoaded = false;
  let message = "";
  onMount(async () => {
    try {
      console.log("onMount fired");
      let { error, errorMsg, endDatetime, startDatetime } =
        await api.getFormSchedule();
      let { currentDate: cd } = await api.getCurrentDate();
      $currentDate = cd;

      let lStartDatetime = DateTime.fromISO(startDatetime);
      let lendDatetime = DateTime.fromISO(endDatetime);
      let lCurrentDatetime = DateTime.fromISO($currentDate);

      console.log("current Date is:", lCurrentDatetime);
      console.log("end Date is:", lendDatetime);
      console.log("start Date is:", lStartDatetime);
      if (lCurrentDatetime < lendDatetime) {
        console.log("current date is less than end date");
      } else {
        message = `Application form reception has ended on ${lendDatetime.toLocaleString(
          DateTime.DATETIME_FULL
        )}`;
      }
      if (lCurrentDatetime > lStartDatetime) {
        console.log("current date is greater than start date");
      } else {
        console.log("current date is not greater than start date");
        message = `Application form reception has not started yet, it will commence on ${lStartDatetime.toLocaleString(
          DateTime.DATETIME_FULL
        )}`;
      }
    } catch (e) {
      console.log("exception thrown in onMount", e);
    }
    dataLoaded = true;
  });
</script>

{#if dataLoaded}
  <CardMessage {message} />
{:else}
  ...Loading
{/if}
