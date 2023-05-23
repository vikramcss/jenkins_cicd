<script>
  import Fa from "svelte-fa";
  import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
  export let qualifications;
  export let editDeleteOp;
</script>

<div>
  <div class="grid grid-cols-6 w-full  mx-1 my-2 p-1 rounded-lg ">
    <div
      class="col-span-7  border-2 mr-1 mt-1 rounded-lg shadow-2xl bg-orange- "
    >
      {#each qualifications as q, i}
        <div class="grid grid-cols-10">
          <div
            class="flex justify-center items-center col-span-12 lg:col-span-1 p-2 m-2 rounded-lg"
          >
            <div
              class="w-9 h-9 bg-gray-700 text-white rounded-full text-center flex items-center justify-center text-xl font-extrabold"
            >
              {i + 1}
            </div>
          </div>
          <div
            class="col-span-12 lg:col-span-2 p-2 bg-white m-2 rounded-lg border-2"
          >
            <div class="row-span-1 flex justify-center text-center text-sm">
              Qualification
            </div>
            <div class="row-span-1 flex justify-center text-center font-bold">
              {q.qualification}
            </div>
          </div>
          <div
            class="col-span-12 lg:col-span-2 p-2 bg-white m-2 rounded-lg border-2"
          >
            <div class="row-span-1 flex justify-center text-center text-sm">
              University/Institute
            </div>
            <div
              class="row-span-1 flex justify-center text-center text-sm font-bold"
            >
              {q.qualification == "7th" ? q.schoolName : q.boardName}
            </div>
          </div>
          <div
            class="col-span-12 lg:col-span-2 p-2 bg-white m-2 rounded-lg border-2"
          >
            <div class="row-span-1 flex justify-center text-center text-sm">
              Year of Passing
            </div>
            <div
              class="row-span-1 flex justify-center text-center text-sm font-bold"
            >
              {q.yearOfPassing}
            </div>
          </div>

          <div
            class="col-span-12 lg:col-span-2 p-2 bg-white m-2 rounded-lg border-2"
          >
            <div class="row-span-1 flex justify-center text-center text-sm">
              Marks/GCPA/Grade
            </div>
            <div
              class="row-span-1 flex justify-center text-center text-sm font-bold"
            >
              {q.marksType == "Percentage"
                ? q.marks + "-" + q.percentage + "%"
                : q.cgpa}
            </div>
          </div>

          <div
            class="col-span-12 lg:col-span-1 p-2 bg-white m-2 rounded-lg border-2 pt-8"
          >
            <div class="flex justify-center p-1 ">
              <div
                on:click={() => editDeleteOp("delete", i)}
                class="ml-3 inline-flex text-gray-600 hover:text-gray-800 cursor-pointer"
              >
                <Fa icon={faTrash} />
              </div>
              <div
                on:click={() => editDeleteOp("edit", i)}
                class="ml-3 inline-flex text-gray-600 hover:text-gray-800 cursor-pointer"
              >
                <Fa icon={faEdit} />
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>
