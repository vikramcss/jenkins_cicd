<script>
  import { createEventDispatcher } from "svelte";
  import { DateTime } from "luxon";
  const dispatch = createEventDispatcher();
  export let profileCompleted;
  export let updated_at;
  export let disabled = false;
</script>

<main>
  <div
    class="flex items-center justify-around py-2 my-10 rounded bg-gray-300 font-semibold text-gray-700 m-2"
  >
    You will need to complete your profile before you can apply for posts below
  </div>
  <div class="grid grid-cols-3">
    <div class="col-span-3 md:col-span-1 md:col-start-2 ">
      <div
        class="grid grid-cols-7 bg-gray-100 to-gray-100 mx-2 md:mx-0 p-6 shadow-xl border-b-4 border-gray-500 rounded-lg"
      >
        <div class="col-span-5">
          <div class="grid-cols-3 ">
            <div class="col-span-3 text-xs text-gray-700  ">
              {#if profileCompleted && profileCompleted == "Done"}
                <span class="bg-gray-500 text-white p-1 rounded "
                  >Completed
                </span>
              {:else}
                <span class="bg-gray-500 text-white p-1 rounded "
                  >Not Completed
                </span>
              {/if}
            </div>
            <div class="col-span-3 text-base font-bold mt-2 ">Profile</div>
            <div class="col-span-3 pt-12 text-xs font-thin ">
              <span
                class="inline-block bg-gray-500 rounded text-xs p-1 text-white font-bold text-md hover:bg-neutral-300"
              >
                {updated_at
                  ? "Updated: " + DateTime.fromISO(updated_at).toRelative()
                  : ""}
              </span>
            </div>
          </div>
        </div>
        {#if !disabled}
          <div class="col-span-2 ">
            <div class="grid grid-cols-1 gap-2">
              <button
                type="button"
                class="float-right text-gray-600 bg-white border-gray-500  hover:bg-orange-500 hover:text-white  focus:ring-orange-300 border-2  font-bold rounded-lg text-md p-1"
                on:click={() => {
                  dispatch("addUpdateProfile", {});
                }}
              >
                {#if updated_at}
                  Edit
                {:else}
                  Create
                {/if}
              </button>
            </div>
          </div>
        {:else}
          <div class="col-span-2 ">
            <div class="grid grid-cols-1 gap-2">
              <button
                type="button"
                class="float-right cursor-not-allowed text-gray-600 bg-white border-gray-500 border-2  font-bold rounded-lg text-md p-1"
              >
                Disabled
              </button>
            </div>
          </div>
        {/if}
      </div>
    </div>
  </div>
  <h1 class="text-base font-semibold flex justify-center items-center pt-4 mx-2 ">
    Disclaimer: Payment once done, even for a single post, the personal
    information filled by the candidate will be frozen and will not be editable.
  </h1>
  <div
    class="flex items-center justify-around mt-10 py-2 rounded bg-gray-200 text-gray-700 font-semibold m-2"
  >
    Check Advertisement for more details
  </div>
</main>
