<script>
  import { goto } from "$app/navigation";
export let postName = "";
export let payscale = "";
export let payscaleno = "";
export let nop = "";
export let age = "";
</script>
<div
class="col-span-5 lg:col-span-1 bg-gray-200 text-gray-900 p-1 my-2 m-2 rounded-xl"
>
<div class="grid grid-cols-5 gap-1">
  <div class="col-span-5 flex items-center justify-center font-semibold text-center m-2">
    {postName}
  </div>
  <div
    class=" col-span-5 m-1 p-1 flex flex-col justify-center items-center text-center bg-white rounded-xl  text-2xl font-semibold"
  >
    <span class="text-xs font-normal">Number of Posts</span>
    <span class="text-base font-bold">{nop}</span>
  </div>
  <div
    class="col-span-5 m-1 p-1 flex flex-col justify-center items-center text-center bg-white rounded-xl h-12 text-2xl font-semibold"
  >
    <span class="text-xs font-normal">Payscale {payscaleno}</span>
    <span class="text-base font-bold">
      <img
        src="/rupee.svg"
        alt="INR"
        class="inline-block h-3 md:h-4 w-4 md:m-2 "
      />{payscale}
    </span>
  </div>
  <div
    class="col-span-5 m-1 p-1 flex flex-col justify-center items-center text-center bg-white rounded-xl h-12 text-2xl font-semibold"
  >
    <span class="text-xs font-normal">Age</span>
    <span class="text-base font-bold">{age}</span>
  </div>
  <div
  class="col-span-5 flex justify-center "
>
    <!-- <button
    on:click={() => goto("https://kcb02.parikshaworld.com/apply")}
    class="bg-orange-500 hover:bg-orange-700 text-white text-sm font-bold  p-1 rounded"
  >
  Apply
  </button> -->
</div>

</div>
</div>