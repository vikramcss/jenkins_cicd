<script>
  import RadioCard from "./RadioCard.svelte";
  export let moreinfo = "";
  export let label = "label";
  export let options = ["One", "Two"];
  export let value = "One";
  export let validator = null;
  export let error;
  export let toDelete=false;
  
  const handleClick = (param) => {
    error = null;
    options.forEach((v) => {
      if (v === param) value = v;
    });
    options = options;
    if (validator) {
      if (!validator.method(param)) {
        error = validator.errormessage;
      }
    }
  };

</script>

<div>
  <div
    class="relative border {error ? 'border-red-500' : 'border-gray-300'} mt-5"
  >
    <div
      class="absolute top-0 -mt-2 left-0 tracking-tighter bg-white px-2 rounded-sm ml-3 text-xs font-semibold uppercase"
    >
      {label}
    </div>
    {#if moreinfo != ""}
      <div class=" mt-3 px-2 text-xs font-semibold">{moreinfo}</div>
    {/if}
    <div class="flex flex-wrap gap-2 pb-2 pt-3 px-2">
      {#each options as option}
        {#if toDelete}
          <RadioCard
            label={option}
            selected={option === value ? true : false}
            on:keyboardSelect={()=>{console.log('received in radio groups option is:', option); handleClick(option)}}
          />
        {:else}
          <RadioCard
            label={option}
            selected={option === value ? true : false}
            on:click={() => handleClick(option)}
            on:keyboardSelect={()=>{console.log('received in radio groups option is:', option); handleClick(option)}}
          />
        {/if}

      {/each}
    </div>
  </div>
  <div class="text-xs lowercase text-red-700">
    {#if error}
      {error}
    {/if}
  </div>
</div>
