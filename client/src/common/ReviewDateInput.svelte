<script>
  import Flatpickr from "svelte-flatpickr";

   let value = null;
   let label = "Date";
   let error=0;
   let validator;
   let dummy=value;

  const flatpickrOptions = {
    element: "#my-picker",
    enableTime: false,
    altInput: true,
    wrap: true,
    // altFormat: "F j, Y",
    altFormat: "d-m-Y",
    // dateFormat: "Y-m-d",
    dateFormat: "d-m-Y",

    onClose: function (selectedDates, dateStr, instance) {
      console.log("selectedDates: ", selectedDates);
      console.log("dateStr: ", dateStr);
      console.log("instance: ", instance);
      value = dateStr;
      if (validator) {
        error = validator.method(dateStr) ? null : validator.errormessage;
        console.log("error is: ", error);
      }
    },
    onChange(selectedDates, dateStr) {
			console.log('flatpickr hook', selectedDates, dateStr);
      value = dateStr;
		}
  };
  $:console.log('error is:', error);
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css"
  />
  <link
    rel="stylesheet"
    type="text/css"
    href="https://npmcdn.com/flatpickr/dist/themes/dark.css"
  />
</svelte:head>
<div>
  <div>
    {#if error !== null}
      <Flatpickr options={flatpickrOptions} bind:value={dummy} element="#my-picker">
        <div class="w-64 relative ">
          <label
            for="datepicker"
            class="absolute top-0 z-10 left-3 bg-white -mt-1.5 py-0 px-3 uppercase text-black block text-xs font-semibold"
          >
            {label}
          </label>
          <div class="flatpickr relative mt-5" id="my-picker">
            <input
              type="text"
              placeholder="Select Date.."
              data-input
              class="bg-white rounded border {error != null
                ? 'border border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-200'
                : 'border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200'} text-base outline-none text-gray-700 py-3 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />

            <div class="absolute top-0 right-3 px-3 py-2">
              
            </div>
          </div>
        </div>
      </Flatpickr>
    {:else}
      <Flatpickr options={flatpickrOptions} bind:value={dummy} element="#my-picker">
        <div class="w-64 relative ">
          <label
            for="datepicker"
            class="absolute top-0 z-10 left-3 bg-white -mt-1.5 py-0 px-3 uppercase text-black block text-xs font-semibold"
          >
            {label}
          </label>
          <div class="flatpickr relative mt-5" id="my-picker">
            <input
              type="text"
              placeholder="Select Date.."
              data-input
              class="bg-white rounded border {error != null
                ? 'border border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-200'
                : 'border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200'} text-base outline-none text-gray-700 py-3 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />

            <div class="absolute top-0 right-3 px-3 py-2">
            </div>
          </div>
        </div>
      </Flatpickr>
    {/if}
  </div>
  {#if error !== null}
  <div class="text-xs text-red-700">{error}</div>
  {/if}
</div>
