<script>
  import InProcessStep from "./Step/InProcessStep.svelte";
  import IncompleteStep from "./Step/IncompleteStep.svelte";
  import CompleteStep from "./Step/CompleteStep.svelte";

  export let step = "";
  let steps = [
    { name: "Personal Info", status: "", index: 1 },
    { name: "Upload doc", status: "", index: 2 },
  ];
  let inprocessIndix = -1;
  for (let i = 0; i < steps.length; i++) {
    if (steps[i].name === step) {
      inprocessIndix = i;
    }
  }
  for (let i = 0; i < steps.length; i++) {
    if (inprocessIndix < i) {
      steps[i].status = "incomplete";
    } else if (inprocessIndix === i) {
      steps[i].status = "inprocess";
    } else if (inprocessIndix > i) {
      steps[i].status = "complete";
    }
  }
</script>

<div class="space-x-10 p-10">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-3/4 m-auto">
    {#each steps as { name, status, index }}
      {#if status === "inprocess"}
        <InProcessStep {name} {index} />
      {:else if status === "incomplete"}
        <IncompleteStep {name} {index} />
      {:else if status === "complete"}
        <CompleteStep {name} {index} />
      {/if}
    {/each}
  </div>
</div>
