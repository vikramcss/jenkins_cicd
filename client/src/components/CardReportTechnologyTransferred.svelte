<script>
    export let srno;
    export let technologyTransferred = {};
    let {
        nameofTechnology,
        projectName,
        investigatorName,
        transferredToOrg,
        transferredYear,
        trl,
        costOfTechnology,
    } = technologyTransferred;
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
        <span class="text-xs mr-1 text-right "
            >Name of Technology:
        </span><span class="font-semibold">{nameofTechnology}</span>
    </div>

    <div class="text-base font-normal col-span-11 col-start-2">
        <span class="text-xs mr-1 text-right "
            >Project Name:
        </span><span class="font-semibold">{projectName}</span>
    </div>
    <div class="text-base font-normal col-span-11 col-start-2">
        <span class="text-xs mr-1 text-right "
            >Investigator Name:
        </span><span class="font-semibold">{investigatorName}</span>
    </div>

    <div class="col-span-11 col-start-2">
        <span class="text-xs mr-1 text-right"
            >TransferredToOrg:
        </span>{transferredToOrg}
    </div>

    <div class="col-span-11 col-start-2">
        <span class="text-xs mr-1 text-right"
            >Transferred Year:
        </span>{transferredYear}
    </div>

    <div class="col-span-11 col-start-2">
        <span class="text-xs mr-1 text-right"
            >Trl:
        </span>{trl}
    </div>

    <div class="col-span-11 col-start-2">
        <span class="text-xs mr-1 text-right"
            >Cost Of Technology:
        </span>{costOfTechnology}
    </div>
</div>
