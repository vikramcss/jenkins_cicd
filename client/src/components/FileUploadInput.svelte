<script>
  import Fa from "svelte-fa/src/fa.svelte";
  import { faPaperclip, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
  import Alert from "../common/Alert.svelte";
  export let uploadFile;
  export let deleteFile;
  export let fileUrl;
  export let fileTag;
  export let title;
  export let alertMsg;
  export let isUploaded;
  console.log("isUploadedSlow..../",isUploaded)
</script>

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
                          border border-solid border-orange-500
                          rounded
                          transition
                          ease-in-out
                          m-0
                          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        on:change={(e) => uploadFile(e, 0, fileTag)}
        type="file"
        id="formFile"
      />
      {#if fileUrl}
        <div class="flex justify-between w-full ">
          <a
            href={fileUrl}
            target="_blank"
            class="flex text-blue-600 underline space-x-2"
          >
            <Fa icon={faPaperclip} class="inline-block mt-1 px-2" />
            <span class="text-sm">{title}</span>
          </a>
          <button on:click={() => deleteFile(fileTag)}>
            <Fa
              icon={faTrashAlt}
              class="inline-block mt-1 px-2"
              color="#4b5563"
            />
          </button>
        </div>
      {:else if isUploaded && ! fileUrl}
            Loading...
      {/if}
    </div>
  </div>
  {#if alertMsg[fileTag]}
    <div>
      <Alert
        message={alertMsg[fileTag]}
        on:alertClosed={() => {
          (alertMsg[fileTag] = null), (alertMsg = { ...alertMsg });
        }}
      />
    </div>
  {/if}
</div>
