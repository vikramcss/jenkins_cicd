<script>
    let alertOpen = true;
    export let message; 
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    function closeAlert(){
    //   alertOpen = false;
    dispatch('alertClosed', {});
    }
  </script>
  <link
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css"
  rel="stylesheet" />
  {#if alertOpen}
    <div class="text-white px-6 py-4 border-0 rounded relative mb-4 bg-red-500">
      <span class="text-xs sm:text-sm md:text-base inline-block mr-5 align-middle">
        <i class="fas fa-bell"></i>
      </span>
      <span class="inline-block align-middle mr-8">
        <div class="text-xs sm:text-sm md:text-base ">{message}</div>
      </span>
      <button class="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none" on:click={closeAlert}>
        <span>×</span>
      </button>
    </div>
  {/if}