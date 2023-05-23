<script>
  export let options = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Lakshadweep",
    "Puducherry",
  ];
  export let selected = null;
  export let error = "please select option";
</script>

<div class="flex ">
  <div class="my-4 xl:w-96">
    <select
      class="form-select appearance-none
      block
      w-full
      px-3
      py-4
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding bg-no-repeat
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
{error != null
        ? 'border border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-200'
        : 'border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200'} 
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
      aria-label="Default select example"
      bind:value={selected}
    >
      <option selected>{selected != null ? selected : 'Select Option'}</option>
      {#each options as option}
        <option value={option}>{option}</option>
      {/each}
    </select>
  </div>
</div>
