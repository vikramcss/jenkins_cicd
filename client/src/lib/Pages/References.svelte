<script>
  import References from "../../components/References.svelte";
  import AdditionalInformation from "../../components/AdditionalInformation.svelte";
  import Alert from "../../common/Alert.svelte";
  import Step from "../../common/Step.svelte";
  import { createEventDispatcher } from "svelte";
import { endApplications, startApplications } from "../../stores/stores";
import { goto } from "$app/navigation";

  export let references = [];
  export let additionalInformation;
  let alert = null;
  const dispatch = createEventDispatcher();
  const onPrevious = async (e) => {
    dispatch("saveReferences", { action: "previous", data: { references , additionalInformation} });
  };
  const onNext = async (e) => {
    alert = null;
    if(references.length < 0) {
      alert = 'atleast one reference is required'
    } else {
    dispatch("saveReferences", { action: "next", data: { references, additionalInformation }});
    }
  };
</script>

<Step step={"Additional Info"} />
<!-- <References bind:references /> -->
<AdditionalInformation bind:additionalInformation />
<div class="container mx-auto ">
{#if alert}
<Alert message={alert} on:alertClosed={()=>{alert=null}}></Alert>
{/if}

</div>
<div class="flex flex-row justify-center m-4">
  <button
    on:click={onPrevious}
    type="button"
    class="mt-5 w-48 text-center bg-blue-50 hover:bg-white shadow-lg text-gray-500 font-bold py-2 px-4 rounded"
  >
    PREVIOUS
  </button>
  {#if $startApplications && !$endApplications}
  <button
    on:click={onNext}
    type="button"
    class="mt-5 w-48  text-center bg-blue-600 hover:bg-blue-500  shadow-lg text-white font-bold py-2 px-4 rounded"
  >
    NEXT
  </button>
  {:else}
  <button
  type="button"
   on:click={()=>
     goto("/timeOver")} 
    class="mt-5 w-48  text-center bg-blue-600 hover:bg-blue-500  shadow-lg text-white font-bold py-2 px-4 rounded"
  >
    NEXT
  </button>
 
  {/if }
</div>
