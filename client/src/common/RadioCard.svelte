<script>
  import Fa from "svelte-fa/src/fa.svelte";
  import { faCheck } from "@fortawesome/free-solid-svg-icons";
  import {createEventDispatcher} from 'svelte'
  export let label = "card label";
  export let selected = false;
  const dispatch = createEventDispatcher()
  const onKeyDown = (e) =>{
    console.log('onkeydown', e.key)
    if(e.key == ' ') {
      console.log('the key is space')
      dispatch('keyboardSelect', {})
    }
  }
</script>

<div on:click tabindex="0" on:keydown={onKeyDown}>
  <div
    class="select-none shadow-2xl cursor-pointer relative inline-block rounded p-1 mt-4 md:mt-0 {selected
      ? 'border-2 bg-orange-200 border-blue-700 text-black'
      : 'border border-gray-400 text-gray-700 '}"
  >
    {#if selected}
      <div
        class="absolute top-0 right-1 text-black p-1"
      >
        <Fa icon={faCheck} size="xs" />
      </div>
    {/if}
    <div
      class="mt-1 pt-2 text-xs {selected
        ? 'font-semibold '
        : 'tracking-tighter font-normal'}"
    >
      {label}
    </div>
  </div>
</div>
