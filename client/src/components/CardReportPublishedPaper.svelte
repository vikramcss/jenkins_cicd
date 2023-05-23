<script>
    export let srno;
    export let publishedPaper = {};
    let { title, author, nameOfJournal, year, pages, impactFactor, doi } =
        publishedPaper;
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
        <span class="text-sm mr-1 text-right">Title: </span><span
            class="font-semibold">{title}</span
        >
    </div>
    <div class="col-span-11 col-start-2">
        <span class="text-sm mr-1 text-right"
            >Name of Journal:
        </span> <span class="font-semibold">{nameOfJournal}</span>
    </div>
    <div class="col-span-11 col-start-2">
        <span class="text-sm mr-1 text-right">Authors: </span>{author}
    </div>
    <div class="col-span-11 col-start-2">
        <span class="text-sm mr-1 text-right ">Year: </span> <span class="font-semibold">{year}</span>
        <span class="text-sm mr-1 text-right ">Pages: </span> <span class="font-semibold">{pages}</span>
        <span class="text-sm mr-1 text-right "
            >Impact Factor:
        </span> <span class="font-semibold">{impactFactor}</span>
        <span class="text-sm mr-1 text-right">DOI: </span> <span class="font-semibold">{doi}</span>
    </div>
</div>
