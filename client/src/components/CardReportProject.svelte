<script>
    export let srno;
    export let project = {};
    let {
        title,
        principalInvestigator,
        copi,
        fundingAgency,
        projectDurationFrom,
        projectDurationTo,
        projectOutlay,
    } = project;
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
        <span class="text-xs mr-1 text-right ">Title: </span><span
            class="font-semibold">{title}</span
        >
    </div>
    <div class=" flex items-center space-x-2  col-span-11 col-start-2">
        <span class="text-xs mr-1 text-right"
            >Principal Investigator:
        </span>{principalInvestigator}

        <span class="text-xs mr-1 text-right"
            >Co-Principal Investigator:
        </span>{copi}
    </div>
    <div class="col-span-11 col-start-2">
        
    </div>
    <div class="col-span-11 col-start-2">
        <span class="text-xs mr-1 text-right"
            >funding Agency:
        </span>{fundingAgency}
    </div>

    <div class=" flex items-center space-x-2 col-span-11 col-start-2">
        <span class="text-xs mr-1 text-right"
            >Project Duration From:
        </span>{projectDurationFrom}

        <span class="text-xs mr-1 text-right"
            >Project Duration To:
        </span>{projectDurationTo}
    </div>

    <div class="col-span-11 col-start-2">
        
    </div>


    <div class="col-span-11 col-start-2">
        <span class="text-xs mr-1 text-right"
            >Project Outlay:
        </span>{projectOutlay}
    </div>

</div>
