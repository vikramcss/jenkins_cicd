<script>
  import Dashboard from "$lib/Pages/Dashboard.svelte";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  let { postId } = $page.params;
</script>

<div class="m-8">
  <div class="flex justify-center items-center text-lg text-red-500">
    Your Paymet is failed
  </div>
  <span class="flex justify-center items-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-8 w-8  text-red-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
      />
    </svg>
  </span>
  <div class="flex justify-center items-center p-2">
    <button
      on:click={() => {
        goto(`/dashboard/${postId}`);
      }}
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg "
    >
      Dashboard
    </button>
  </div>
</div>
