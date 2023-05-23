<script>
  import { onMount } from "svelte";
  let days;
  let hours;
  let minutes;
  let seconds;

  let distance = 0;
  let countdown = null;
  let beerTime = new Date("May 17, 2023 00:00:00").getTime();
  let now = new Date().getTime();
  const padNum = (num) => {
    var zero = "";
    for (var i = 0; i < 2; i++) {
      zero += "0";
    }
    return (zero + num).slice(-2);
  };
  let start = function () {
    countdown = setInterval(() => {
      // Calculate time
      now = new Date().getTime();
      distance = beerTime - now;
      // Set Times
      days = padNum(Math.floor(distance / (1000 * 60 * 60 * 24)));
      hours = padNum(
        Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      );
      minutes = padNum(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
      seconds = padNum(Math.floor((distance % (1000 * 60)) / 1000));
      // Stop
      if (distance < 0) {
        clearInterval(countdown);
        days = "00";
        hours = "00";
        minutes = "00";
        seconds = "00";
      }
    }, 100);
  };
  onMount(() => {
    seconds = "00";
    minutes = "00";
    hours = "00";
    days = "00";
    start();
  });
</script>

<div
  class="min-w-screen min-h-56 bg-gray-500 flex items-center justify-center px-5 py-5"
>
  <div class="text-gray-100">
    <h1 class="text-3xl text-center mb-3 font-extralight">
      Registration starts
    </h1>
    <div class="text-6xl text-center flex w-full items-center justify-center">
      <div class="text-2xl mr-1 font-extralight">in</div>
      <div class="w-24 mx-1 p-2 bg-white text-gray-500 rounded-lg">
        <div class="font-mono leading-none">{days}</div>
        <div class="font-mono uppercase text-sm leading-none">Days</div>
      </div>
      <div class="w-24 mx-1 p-2 bg-white text-gray-500 rounded-lg">
        <div class="font-mono leading-none">{hours}</div>
        <div class="font-mono uppercase text-sm leading-none">Hours</div>
      </div>
      <div class="w-24 mx-1 p-2 bg-white text-gray-500 rounded-lg">
        <div class="font-mono leading-none">{minutes}</div>
        <div class="font-mono uppercase text-sm leading-none">Minutes</div>
      </div>
      <div class="text-2xl mx-1 font-extralight">and</div>
      <div class="w-24 mx-1 p-2 bg-white text-gray-500 rounded-lg">
        <div class="font-mono leading-none">{seconds}</div>
        <div class="font-mono uppercase text-sm leading-none">Seconds</div>
      </div>
    </div>
  </div>
</div>
