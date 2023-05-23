<script>
  import "../style.css";
  import { goto } from "$app/navigation";
  import Header from "../common/Header.svelte";
  import Footer from "../common/Footer.svelte";
  import { validTime } from "../stores/stores";
</script>

<main>
  <div class="min-h-full">
    <Header>
      {#if $validTime}
        <button
          on:click={() => goto("/signin")}
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Sign In
        </button>
      {:else}
        <button
          class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded cursor-not-allowed"
        >
          Sign In
        </button>
      {/if}
    </Header>
    <slot />
  </div>
  <div class="mt-40">
    <Footer />
  </div>
</main>
