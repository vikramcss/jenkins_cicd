<script>
  export let other = {
    text: "",
  };
</script>

<div class="flex flex-col">
    <textarea
      class="rounded "
      readonly
      placeholder="Other"
      bind:value={other.text}
    />
</div>
