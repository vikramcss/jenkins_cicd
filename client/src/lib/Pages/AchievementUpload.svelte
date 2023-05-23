<script>
  import Alert from "../../common/Alert.svelte";
  import Fa from "svelte-fa/src/fa.svelte";
  import { faPaperclip, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
  export let title;
  export let subscript;
  export let uploadFunction;
  export let fileurl;
  export let alert = null;
  export let deleteFileFun = null;
  export let instruction; 
</script>

<div class="p-3 gap-y-2 flex items-center col-span-2 md:col-span-1">
  <span
    class="w-6 h-6 rounded-full bg-blue-600 text-white inline-block text-center font-bold mr-3"
  />
  <div>
    <h1
      class="text-black text-md font-bold uppercase tracking-wide border-b-4 border-blue-200"
    >
      {title} <sapn class="text-xs font-normal normal-case">{instruction}</sapn>
    </h1>
    <div class="text-xs mt-2">
      {subscript}
    </div>
  </div>
</div>

<div class="p-3 gap-y-2 col-span-2 md:col-span-1">
  <div class="flex justify-center">
    <div class="mb-3 w-96 ">
      <label for="formFile" class="form-label inline-block mb-2 text-blue-50" />
      <input
        class="form-control
                          block
                          w-full
                          px-3
                          py-1.5
                          text-base
                          font-normal
                          text-gray-700
                          bg-white bg-clip-padding
                          border border-solid border-blue-600
                          rounded
                          transition
                          ease-in-out
                          m-0
                          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        on:change={(e) => uploadFunction(e, 0)}
        type="file"
        id="formFile"
      />
      {#if fileurl}
        <div class="flex justify-between w-full ">
          <a
            href={fileurl}
            target="_blank"
            class="flex text-blue-600 underline space-x-2"
          >
            <Fa icon={faPaperclip} class="inline-block mt-1 px-2" />
            <span class="text-sm"> {title} file </span>
          </a>
          <button on:click={() => deleteFileFun()}>
            <Fa
              icon={faTrashAlt}
              class="inline-block mt-1 px-2"
              color="#4b5563"
            />
          </button>
        </div>
      {/if}
    </div>
    {#if alert}
      <Alert message={alert} on:alertClosed={() => (alert = null)} />
    {/if}
  </div>
</div>
