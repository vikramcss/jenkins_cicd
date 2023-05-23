<script>
  export let name;
  export let index;
</script>

<div class="border-t-4 border-orange-500 pt-4">
  <div class="flex text-gray-500 font-bold">
    <div
      class="
            w-6 h-6 rounded-full bg-orange-600 broder border-orange-600 text-white text-center font-bold mx-2
            "
    >
      {index}
    </div>
    <div>{name}</div>
  </div>
</div>
