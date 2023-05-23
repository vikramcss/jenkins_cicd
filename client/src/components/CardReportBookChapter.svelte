<script>
    export let srno;
    export let bookChapter = {};
    let {
        bookTitle,
        bookAuthor,
        nameOfBook,
        year,
        pages,
        publishingAgency,
        doi,
    } = bookChapter;
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
        <span class="text-md mr-1 text-right ">Book Title: </span><span
            class="font-semibold">{bookTitle}</span
        >
    </div>
    <div class="col-span-11 col-start-2">
        <span class="text-xs mr-1 text-right"
            >Book Chapter:
        </span>{bookAuthor}
    </div>

    <div class="col-span-11 col-start-2">
        <span class="text-xs mr-1 text-right">Name Of Book: </span>{nameOfBook}
    </div>
    <div class="col-span-11 col-start-2">
        <span class="text-xs mr-1 text-right">Year: </span>{year}
    </div>
    <div class="col-span-11 col-start-2">
        <span class="text-xs mr-1 text-right">Pages: </span>{pages}
    </div>
    <div class="col-span-11 col-start-2">
        <span class="text-xs mr-1 text-right"
            >Publishing Agency:
        </span>{publishingAgency}
    </div>

    <div class="col-span-11 col-start-2">
        <span class="text-xs mr-1 text-right"
            >DOI:
        </span>{doi}
    </div>
    
</div>
