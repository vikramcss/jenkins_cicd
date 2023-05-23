<script>
  import { goto } from "$app/navigation";
  export let postName = "";
  export let qualification = "";
  export let postId;
</script>

<!-- <div class=" col-span-4  ">
  <div
    class="grid grid-cols-12 bg-gray-200 text-left rounded bg-gradient-to-r from-orange-200 to-orange-50 border-b-2 border-orange-600 mx-2 py-4 text-gray-600 font-semibold text-lg   "
  >
    <div class="col-span-9 ml-6 pt-2">
      {postName}
    </div>
    <div class="col-span-3">
      <button
        on:click={() => goto(`/dashboard/${postId}`)}
        type="button"
        class="float-right text-gray-600 bg-white border-orange-500  hover:bg-orange-500 hover:text-white  focus:ring-orange-300 border-2  font-medium rounded-lg text-sm p-1  px-2 mr-2"
      >
        Apply</button
      >
    </div>
    <div class="col-span-12 text-xs ml-6 text-gray-600 mt-2 ">
      {qualification}
    </div>
  </div>
</div> -->
