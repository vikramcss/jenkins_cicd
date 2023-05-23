<script>
  import { goto } from "$app/navigation";
  import { validTime } from "../stores/stores";

  let selected = false;
  let showModal = true;
  const hamBurger = () => {
    showModal = !showModal;
  };
</script>

<nav class="bg-gray-100">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16">
      <div class="flex items-center">
        <div class="flex-shrink-0">
          <a href="/">
            <img class="h-16 w-16" src="/STP-logo.jpg" alt="Workflow" />
          </a>
        </div>
        <div class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-4">
            <!-- Current: "bg-gray-900 text-gray-900", Default: "text-gray-800 hover:bg-gray-700 hover:text-gray-900" -->
            <a
              href="/advertisement"
              class="hover:bg-gray-200 text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              aria-current="page">Advertisement</a
            >
            <a
              href="/importantdates"
              class="text-gray-800 hover:bg-gray-200 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >Important Dates And Fees</a
            >
            {#if $validTime}
              <div class="ml-4 ">
                <button
                  on:click={() => goto("/apply")}
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
                >
                  Apply
                </button>
              </div>
            {:else}
              <div class="ml-4 ">
                <button
                  class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded cursor-not-allowed"
                >
                  Apply
                </button>
              </div>
            {/if}
          </div>
        </div>
      </div>
      <div class="hidden md:block">
        <div class="ml-4 flex items-center md:ml-6">
          <button
            type="button"
            class="bg-gray-100 p-1 rounded-full text-gray-800 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
          >
            <span class="sr-only">View notifications</span>
            <slot />
          </button>
          <div class="ml-3 relative" />
        </div>
      </div>
      <div class="-mr-2 flex md:hidden">
        <!-- Mobile menu button -->
        <button
          type="button"
          class="bg-gray-100 inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-gray-900 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
          aria-controls="mobile-menu"
          aria-expanded="false"
          on:click={hamBurger}
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="block h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <svg
            class="hidden h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>

  {#if showModal}
    <div class="md:hidden" id="mobile-menu">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <a
          href="/advertisement"
          class="text-gray-800 hover:bg-gray-200 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
          aria-current="page">Advertisement</a
        >

        <a
          href="/importantdates"
          class="text-gray-800  hover:bg-gray-200 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
          >Important Dates And Fees</a
        >
        <div class="grid grid-cols-2">
          <div class="col-span-1  flex justify-start">
            <button
              on:click={() => goto("/apply")}
              class="bg-blue-500 hover:bg-blue-700 text-white  text-sm font-medium px-2 py-2 rounded-md ml-2"
            >
              Apply
            </button>
            <button
              on:click={() => goto("/signin")}
              class="bg-blue-500 hover:bg-blue-700 text-white  text-sm font-medium px-2 py-2 rounded-md ml-4"
            >
              Sign In
            </button>
          </div>
          <!-- <div class="col-span-1 bg-rose-400">
            <button
              on:click={() => goto("/signin")}
              class="bg-blue-500 hover:bg-blue-700 text-white  text-sm font-medium px-2 py-2 rounded-md "
            >
              Sign in
            </button>
          </div> -->
        </div>
      </div>
    </div>
  {/if}
</nav>
