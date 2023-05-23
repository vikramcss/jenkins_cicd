<script>

import { goto } from "$app/navigation";

</script>
<div
  class="bg-white rounded-lg p-6  w-50 text-center flex item-center justify-center font-bold text-3xl "
>
  Application Date is Expired!!
</div>
<div class="flex justify-center items-center ">
  <button on:click={()=>{
      goto('/dashboard')
  }}
  
  class="bg-blue-600 rounded text-white hover:bg-blue-700 p-2 m-1 px-2">
    Go To Dashboard
  </button>
</div>
