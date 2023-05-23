<script>
  export let postName = "";
  export let qualification = "";
  export let age = "";
  export let ageLimit = 0;
  export let handicappedDisqualifiedMessage = null;
  export let categoryQualified = null;
</script>

<div class="  bg-gray-100 shadow-lg rounded-lg my-1 pb-1">
  <div class="py-4 px-8">
    <div>
      <h2 class="text-gray-800 text-xl font-semibold">{postName}</h2>
      <p class="mt-2 text-gray-600 text-sm">{qualification}</p>
    </div>
    <div class="flex justify-end mt-4">
      <!-- <a href="#" class="text-xl font-medium text-indigo-500">John Doe</a> -->
      <!-- <button
        class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg cursor-not-allowed focus:ring-4 focus:outline-none focus:ring-orange-300 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
      >
        Apply
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
      </button> -->
    </div>
  </div>
  {#if handicappedDisqualifiedMessage != null && handicappedDisqualifiedMessage() != ""}
    <div class="bg-red-100 rounded-b-md shadow-md m-2 p-2 pb-2 ">
      <div class="text-xs">
        Not qualified for {postName}
      </div>
      <p class="text-xs">
        {handicappedDisqualifiedMessage()}
      </p>
    </div>

  {:else if categoryQualified !=null && categoryQualified()!=""}
    <div class="bg-red-100 rounded-b-md shadow-md m-2 p-2 pb-2 ">
      <div class="text-xs">
        Not qualified for {postName}
      </div>
      <p class="text-xs">
        {categoryQualified()}
      </p>
    </div>
  {:else if qualification == "notapplicable"}
    <div class="bg-red-100 rounded-b-md shadow-md m-2 p-2 pb-2 ">
      <div class="text-xs">
        Not qualified for {postName}
      </div>
      <p class="text-xs">
        {postName == "Ayah"
          ? "Male are not eligible"
          : "Female are not eligible"}
      </p>
    </div>
  {:else}
    <div class="bg-red-100 rounded-b-md shadow-md m-2 p-2 pb-2 ">
      <div class="text-xs">
        Not qualified for {postName}
      </div>
      <p class="text-xs">
        {age}
      </p>
      <p class="text-xs">
        age limit: {ageLimit}
      </p>
    </div>
  {/if}
</div>
