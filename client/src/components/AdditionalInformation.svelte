<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  export let additionalInformation;

</script>

<div class="flex flex-col justify-center mx-2 lg:mx-20 mt-5">
  <div class="bg-blue-600 w-full rounded-t-lg">
    <div
      class="text-white rounded-t-lg m-2 p-1 font-bold text-center lg:text-xl"
    >
      Additional Information
    </div>
  </div>
  <div>
    <div class="w-full bg-gray-200 mx-1 my-2 p-1 rounded-lg ">
      <div class="border-2 mr-1 mt-1 rounded-lg shadow-2xl bg-blue-50 ">
        <textarea
          class="rounded w-full"
          rows="10"
          placeholder="Any other information you may like to indicate"
          bind:value={additionalInformation}
        />
      </div>
    </div>
  </div>
</div>
