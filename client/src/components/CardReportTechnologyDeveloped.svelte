<script>
    export let srno;
    export let  technologyDeveloped = {};
    let {
        nameofTechnologyDeveloped,
        patentPublished,
       
    } =  technologyDeveloped;
</script>

<div
    class="grid grid-cols-12 rounded shadow-lg p-3 m-2 bg-gray-200 space-x-2 space-y-2"
>
    <div
        class="bg-gray-700 h-7 w-7 rounded-full p-3 text-white flex items-center justify-center"
    >
        {srno}
    </div>

    <div class="text-base font-normal col-span-11">
        <span class="text-xs mr-1 text-right ">Name of Technology Developed: </span><span
            class="font-semibold">{nameofTechnologyDeveloped}</span
        >
    </div>
    

    <div class="col-span-11 col-start-2">
        <span class="text-xs mr-1 text-right"
            >Patent Published:
        </span>{patentPublished}
    </div>

</div>
