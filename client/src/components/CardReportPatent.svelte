<script>
    export let srno;
    export let patent = {};
    let {
        patentStatus,
        title,
        author,
        patentType,
        yearOfSubmission,
        patentNumber,
    } = patent;
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
        <span class="text-xs mr-1 text-right ">Title: </span><span
            class="font-semibold">{title}</span
        >
    </div>
    <div class="col-span-11 col-start-2">
        <span class="text-xs mr-1 text-right">Authors: </span>{author}
    </div>
    
    <div class="col-span-11 col-start-2">
        <span class="text-xs mr-1 text-right"
            >Patent Status:
        </span>{patentStatus}
    </div>
    
    <div class="col-span-11 col-start-2 space-x-2">
        <span class="text-xs mr-1 text-right">Patent Type: </span>{patentType}
        <span class="text-xs mr-1 text-right">Patent No: </span>{patentNumber}
        <span class="text-xs mr-1 text-right">Year of Submission: </span>{yearOfSubmission}
    </div>

    <div class="col-span-11 col-start-2">
        
   
    </div>
</div>
