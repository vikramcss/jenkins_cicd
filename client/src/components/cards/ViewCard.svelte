<script>
  export let postName = "";
  export let qualification = "";
</script>

<div class=" py-4 px-8 bg-white shadow-lg rounded-lg my-1">
  <div>
    <h2 class="text-gray-800 text-xl font-semibold">{postName}</h2>
    <p class="mt-2 text-gray-600 text-sm">Applied</p>
  </div>
  <div class="flex justify-end mt-4">
    <!-- <a href="#" class="text-xl font-medium text-indigo-500">John Doe</a> -->
    <button
      class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-500 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
      on:click
    >
      View
      <svg
        aria-hidden="true"
        class="w-4 h-4 ml-2 -mr-1"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        ><path
          fill-rule="evenodd"
          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
          clip-rule="evenodd"
        /></svg
      >
    </button>
  </div>
</div>
