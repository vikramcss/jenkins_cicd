<script>
    export let src;
    export let cssclass;
</script>
{#if src }
  <img alt="Profile_Image" {src} class={cssclass}>
{/if}