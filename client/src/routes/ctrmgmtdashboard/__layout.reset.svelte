<script>
  import { goto } from "$app/navigation";
</script>

<navbar>
  <div class="bg-blue-100 flex text-center">
    <div class="grid grid-cols-12">
      <div class="col-span-3 lg:col-span-1 p-2">
        <img class="" src="/PCBlogo.png" alt="" />
      </div>
      <div
        class="col-span-7 lg:col-span-9 flex items-center justify-center font-bold text-xs md:text-xl "
      >
        Center Management Pune Cantonment Board Online Applications For Post of
        Jr. Clerk
      </div>

      <div class="col-span-2">
        <div class="flex justify-end ml-20">
          <button
            type="submit"
            class=" mt-10  text-center bg-navy-400 hover:bg-navy-500 shadow-lg text-white text-md font-semibold py-2 px-2 rounded "
            on:click={() => {
              goto("/centermanagement");
            }}
          >
            SignOut
          </button>
        </div>
      </div>
    </div>
    <div class="mr-10" />
  </div>
</navbar>
<slot />
