<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let email;
</script>

<div
  class="  bg-gray-200 rounded-sm shadow-lg m-5 p-5 flex justify-center items-center"
>
  <div class="grid grid-cols-1 ">
    <div class="col-span-1 flex justify-center">
      <span class=" ">Login for User </span>
    </div>
    <div class="col-span-1 flex justify-center">
      <span class="p-2 font-bold text-gray-800 underline">{email} </span>
    </div>
    <div class="col-span-1 flex justify-center">
      <span>created successfully </span>
    </div>
    <div class="col-span-1 flex justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-8 w-8 text-green-500"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clip-rule="evenodd"
        />
      </svg>
    </div>
  </div>
</div>
<div class="flex justify-center items-center p-2">
  <button
    on:click={() => dispatch("signin", {})}
    class="bg-navy-500 hover:bg-navy-700 text-white font-bold py-2 px-4 rounded"
  >
    <button />Sign In</button
  >
</div>
