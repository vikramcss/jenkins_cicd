<script>
  import InProcessStep from "./Step/InProcessStep.svelte";
  import IncompleteStep from "./Step/IncompleteStep.svelte";
  import CompleteStep from "./Step/CompleteStep.svelte";

  export let step = "";
  export let experience = true;
  let steps = experience
    ? [
        { name: "Qualifications", status: "", index: 1 },
        { name: "experience", status: "", index: 2 },
        { name: "Upload doc", status: "", index: 3 },
        { name: "Preview", status: "", index: 4 },
      ]
    : [
        { name: "Qualifications", status: "", index: 1 },
        { name: "Upload doc", status: "", index: 2 },
        { name: "Preview", status: "", index: 3 },
      ];

  let inProcessIndex = -1;
  for (let i = 0; i < steps.length; i++) {
    if (steps[i].name === step) {
      inProcessIndex = i;
    }
  }
  for (let i = 0; i < steps.length; i++) {
    if (inProcessIndex < i) {
      steps[i].status = "incomplete";
    } else if (inProcessIndex === i) {
      steps[i].status = "inprocess";
    } else if (inProcessIndex > i) {
      steps[i].status = "complete";
    }
  }
</script>

<div class="space-x-10 p-10">
  <div
    class="grid grid-cols-1 {experience
      ? 'md:grid-cols-4'
      : 'md:grid-cols-3'}  gap-4 w-3/4 m-auto"
  >
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
