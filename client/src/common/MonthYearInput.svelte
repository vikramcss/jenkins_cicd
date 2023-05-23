<script>
  import { imask } from "svelte-imask";
  import { DateTime } from "luxon";
  export let value;
  export let error = null;
  export let label;
  export let readonly;

  const options = {
    // mask: "+{7}(000)000-00-00",
    maskString: "DD-MM-YYYY",
    mask: "00-00-0000",
  };

  const onChange = () => {
    console.log('onChange MonthYearInput value is:', value)
  }
  function accept({ detail: imask }) {
    error = null;
    console.log("completed", imask);
    let day = imask._value.split("-")[0];
    let month = imask._value.split("-")[1];
    let year = imask._value.split("-")[2];
    console.log("day:", day);
    console.log("month:", month);
    console.log("year:", year);
    let dt = DateTime.fromObject({ year, month, day });
    if (dt.invalid) {
      error = "invalid date";
      return;
    }
    console.log("luxon date is: ", dt);
    if (Number(month) > 12) {
      error = "month not acceptable";
      console.log("error is :", error);
      return;
    }
    if (Number(year) > 2023 || year < 1980) {
      error = "year should be between 1980 and 2023 ";
      console.log("error is :", error);
      return;
    }
  }

  function complete({ detail: imask }) {
    error = null;
    console.log("completed", imask);
    let day = imask._value.split("-")[0];
    let month = imask._value.split("-")[1];
    let year = imask._value.split("-")[2];
    console.log("day:", day);
    console.log("month:", month);
    console.log("year:", year);
    let dt = DateTime.fromObject({ year, month, day });
    if (dt.invalid) {
      error = "invalid date";
      return;
    }
    console.log("luxon date is: ", dt);
    if (Number(month) > 12) {
      error = "month not acceptable";
      console.log("error is :", error);
      return;
    }
    if (Number(year) > 2023 || year < 1980) {
      error = "year should be between 1980 and 2023 ";
      console.log("error is :", error);
      return;
    }
  }
</script>

<div class="flex flex-col w-full px-1 mt-3 relative pt-3">
  <label
    for="phone"
    class="absolute top-0 left-3 mt-1.5 px-2 uppercase font-semibold text-xs bg-white"
    >{label}
  </label>
  {#if !readonly}
    <input
      use:imask={options}
      on:accept={accept}
      on:complete={complete}
      on:change={onChange}
      bind:value
      name="phone"
      type="tel"
      placeholder="DD-MM-YYYY"
      class="bg-white rounded border {error != null
        ? 'border border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-200'
        : 'border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200'} text-base outline-none text-gray-700 py-3 px-3 leading-8 transition-colors duration-200 ease-in-out"
    />
    {#if error != null}
      <div class="relative">
        <span
          class="absolute -mt-1 pt-1 text-xs leading-none text-red-700"
          id="passwordHelp"
          >{error}
        </span>
      </div>
    {/if}
  {:else}
    <input
      use:imask={options}
      on:accept={accept}
      on:complete={complete}
      {value}
      name="phone"
      type="tel"
      placeholder="DD-MM-YYYY"
      class="my-1 bg-white rounded border {error != null
        ? 'border border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-200'
        : 'border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200'} text-base outline-none text-gray-700 py-3 px-3 leading-8 transition-colors duration-200 ease-in-out"
    />
  {/if}
</div>
