<script>
  import SrNo from "./SrNo.svelte";
  export let title;
  export let suffix;
  export let index;

  console.log('title',title , suffix ,index)
</script>

<div class=" col-span-2 md:col-span-1 p-3 gap-y-2 flex items-center">
  <div class="min-w-fit">
    <SrNo srno={index} />
  </div>
  <div>
    <h1
      class="text-black text-sm ml-4 font-bold uppercase tracking-wide border-b-4 border-orange-300"
    >
      {title}
    </h1>
    <div class="text-xs mt-2 ml-4">
      {suffix}
    </div>
  </div>
</div>
