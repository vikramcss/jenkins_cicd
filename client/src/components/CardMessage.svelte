<script>
import { goto } from "$app/navigation";
export let message=''
</script>
<div class="bg-gray-700 text-gray-200 text-xl m-10 p-4 rounded text-center">
    {message}
<div class="flex flex-row justify-center mt-4 mx-2 text-sm">
        <button
          on:click={() => goto("/")}
          type="submit"
          class="w-48 text-center bg-indigo-50 hover:bg-white shadow-lg text-gray-500 font-bold py-2 px-4 rounded"
        >
          Home
        </button>
        
      </div>
</div>
