<script>
    export let srno;
    export let award = {};
    let {
        nameofAward,
        sponsoringAgency,
        awardYear,
      
    } = award;
</script>

<div
    class="grid grid-cols-12 rounded shadow-lg p-3 m-2 bg-gray-200 space-x-2 space-y-2"
>
    <div
        class="bg-gray-700 h-6 w-6 rounded-full p-2 text-white flex items-center justify-center"
    >
        {srno}
    </div>

    <div class="text-base font-normal col-span-11">
        <span class="text-xs mr-1 text-right ">nameofAward: </span><span
            class="font-semibold">{nameofAward}</span
        >
    </div>
    <div class="col-span-11 col-start-2">
        <span class="text-xs mr-1 text-right">sponsoringAgency: </span>{sponsoringAgency}
    </div>
    
    <div class="col-span-11 col-start-2">
        <span class="text-xs mr-1 text-right"
            > awardYear:
        </span>{awardYear}
    </div>

</div>

