<script>
  export let other = {
    text: "",
  };
  let error=null;
  let validateInput = () => {
    error = null;
    if(other.text.length < 1) {
      error = "please enter your achievement"
    return false;
    }
    return true;
  }
  export let validate;
  validate=validateInput;
</script>


<div class="flex flex-col">
<textarea class="rounded " placeholder="Other" bind:value={other.text}/>
{#if error}
<span class="text-xs font-normal text-red-700">
{error}
</span>
{/if}
</div>

