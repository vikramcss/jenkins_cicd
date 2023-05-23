<script>
  import "../../style.css";
  import { goto } from "$app/navigation";
  import Header from "../../common/Header.svelte";
  import Footer from "../../common/Footer.svelte";
</script>

<main>
  <div class="min-h-full">
    <Header>
      <button
        on:click={() => goto("/signin")}
        class="bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded"
      >
        Sign In
      </button>
    </Header>
    <slot />
  </div>
  <Footer />
</main>
