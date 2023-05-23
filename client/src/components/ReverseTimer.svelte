<script>
  import { onMount } from "svelte";
  import { DateTime } from "luxon";
  import { startApplications, endApplications } from "../stores/stores";
  import { api } from "../api/api";
  let days;
  let hours;
  let minutes;
  let seconds;
  let distance = 0;
  let countdown = null;
  let countdownEnd = null;
  let currentDate;
  const RECALL_CURRENT_DATE_TIMEINSECS = 300;
  export let startDatetime;
  export let endDatetime;
  let now;
  const padNum = (num) => {
    var zero = "";
    for (var i = 0; i < 2; i++) {
      zero += "0";
    }
    return (zero + num).slice(-2);
  };
  let start = function () {
    countdown = setInterval(async () => {
      // Calculate time
      // now = new Date().getTime();
      const diff = startDatetime.diff(currentDate, [
        "days",
        "hours",
        "minutes",
        "seconds",
      ]);
      const diffSeconds = startDatetime.diff(currentDate, ["seconds"]);
      if (Math.floor(diffSeconds) % RECALL_CURRENT_DATE_TIMEINSECS === 0) {
        let {
          error,
          errorMsg,
          currentDate: cdate,
        } = await api.getCurrentDate();
        currentDate = DateTime.fromISO(cdate);
      } else {
        currentDate = currentDate.plus({ seconds: 1 });
      }
      // Set Times
      days = padNum(diff.values.days);
      hours = padNum(diff.values.hours);
      minutes = padNum(diff.values.minutes);
      seconds = padNum(Math.floor(diff.values.seconds));
      // Stop
      if (diffSeconds.values.seconds < 0) {
        clearInterval(countdown);
        days = "00";
        hours = "00";
        minutes = "00";
        seconds = "00";
        $startApplications = true;
      }
    }, 1000);
    countdownEnd = setInterval(async () => {
      // Calculate time
      if ($startApplications) {
        const diff = endDatetime.diff(currentDate, [
          "days",
          "hours",
          "minutes",
          "seconds",
        ]);
        const diffSeconds = endDatetime.diff(currentDate, ["seconds"]);
        if (Math.floor(diffSeconds) % RECALL_CURRENT_DATE_TIMEINSECS === 0) {
          let {
            error,
            errorMsg,
            currentDate: cdate,
          } = await api.getCurrentDate();
          currentDate = DateTime.fromISO(cdate);
        } else {
          currentDate = currentDate.plus({ seconds: 1 });
        }
        // Set Times
        days = padNum(diff.values.days);
        hours = padNum(diff.values.hours);
        minutes = padNum(diff.values.minutes);
        seconds = padNum(Math.floor(diff.values.seconds));
        // Stop
        if (diffSeconds.values.seconds < 0) {
          clearInterval(countdownEnd);
          days = "00";
          hours = "00";
          minutes = "00";
          seconds = "00";
          $endApplications = true;
        }
      }
    }, 1000);
  };
  onMount(async () => {
    seconds = "00";
    minutes = "00";
    hours = "00";
    days = "00";
    let { error, errorMsg, currentDate: cdate } = await api.getCurrentDate();
    currentDate = DateTime.fromISO(cdate);
    start();
  });
</script>

{#if !$startApplications}
  <div
    class="min-w-auto min-h-56 bg-gray-700 flex items-center justify-center px-5 py-5 rounded-lg p-4 m-4"
  >
    <div class="text-gray-100">
      <h1 class="text-3xl text-center mb-3 font-extralight">
        Registration starts
      </h1>
      <div class="md:text-6xl text-xl text-center flex md:w-full   items-center justify-center">
        <div class="text-md md:text-2xl mr-1 font-extralight">in</div>
        <div class="w-12 md:w-24 mx-1 p-2 bg-white text-gray-700 rounded-lg">
          <div class="font-mono leading-none md:text-3xl text-sm">{days}</div>
          <div class="font-mono uppercase md:text-xl text-xs leading-none">Days</div>
        </div>
        <div class="w-12 md:w-24 mx-1 p-2 bg-white text-gray-700 rounded-lg">
          <div class="font-mono leading-none md:text-3xl text-sm">{hours}</div>
          <div class="font-mono uppercase md:text-xl text-xs leading-none">Hours</div>
        </div>
        <div class="w-12 md:w-24 mx-1 p-2 bg-white text-gray-700 rounded-lg">
          <div class="font-mono leading-none md:text-3xl text-sm">{minutes}</div>
          <div class="font-mono uppercase md:text-xl text-xs leading-none">Min</div>
        </div>
        <div class="text-md md:text-2xl mx-1 font-extralight">and</div>
        <div class="w-12 md:w-24 mx-1 p-2 bg-white text-gray-700 rounded-lg">
          <div class="font-mono leading-none md:text-3xl text-sm">{seconds}</div>
          <div class="font-mono  uppercase md:text-xl text-xs leading-none">Sec</div>
        </div>
      </div>
    </div>
  </div>
{:else if !$endApplications}
  <div
    class="min-w-auto min-h-56 bg-gray-700 flex items-center justify-center px-5 py-5 rounded-lg p-4 m-4"
  >
    <div class="text-gray-100">
      <h1 class=" text-md md:text-3xl text-center mb-3 font-extralight">
        Registration has started it ends
      </h1>
      <div class="md:text-6xl text-xl text-center flex md:w-full   items-center justify-center">
        <div class="text-md md:text-2xl mr-1 font-extralight">in</div>
        <div class="w-12 md:w-24 mx-1 p-2 bg-white text-gray-700 rounded-lg">
          <div class="font-mono leading-none md:text-3xl text-sm">{days}</div>
          <div class="font-mono uppercase md:text-xl text-xs leading-none">Days</div>
        </div>
        <div class="w-12 md:w-24 mx-1 p-2 bg-white text-gray-700 rounded-lg">
          <div class="font-mono leading-none md:text-3xl text-sm">{hours}</div>
          <div class="font-mono uppercase md:text-xl text-xs leading-none">Hours</div>
        </div>
        <div class="w-12 md:w-24 mx-1 p-2 bg-white text-gray-700 rounded-lg">
          <div class="font-mono leading-none md:text-3xl text-sm">{minutes}</div>
          <div class="font-mono uppercase md:text-xl text-xs leading-none">Min</div>
        </div>
        <div class="text-md md:text-2xl mx-1 font-extralight">and</div>
        <div class="w-12 md:w-24 mx-1 p-2 bg-white text-gray-700 rounded-lg">
          <div class="font-mono leading-none md:text-3xl text-sm">{seconds}</div>
          <div class="font-mono  uppercase md:text-xl text-xs leading-none">Sec</div>
        </div>
      </div>
    </div>
  </div>
{:else if $endApplications}
  <div
    class="min-w-screen min-h-56 bg-gray-700 flex items-center justify-center px-5 py-5 text-gray-100"
  >
    Application reception has ended now
  </div>
{/if}
