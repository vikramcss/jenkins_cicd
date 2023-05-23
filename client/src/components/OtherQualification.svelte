<script>
  import Add from "./OtherQualification/Add.svelte";
  import Delete from "./OtherQualification/Delete.svelte";
  import Edit from "./OtherQualification/Edit.svelte";
  import { createEventDispatcher } from "svelte";
  import Fa from "svelte-fa";
  import {
    faPlusCircle,
    faEdit,
    faTrash,
  } from "@fortawesome/free-solid-svg-icons";

  export let essentialQualifications = [];
  export let qualifications = [];
  export let alertMessage;

  let addQualification = false;
  let editQualification = false;
  let editIndex = -1;
  let deleteQualification = false;
  let deleteIndex = -1;

  const dispatch = createEventDispatcher();

  const qualification = (action, index = -1) => {
    alertMessage = null;
    console.log("action: ", action, " index: ", index);
    switch (action) {
      case "add":
        if (essentialQualifications.length == 0) {
          alertMessage = "Kindly fill the essential qualifications please";
        } else {
          addQualification = true;
          editQualification = false;
          deleteQualification = false;
        }
        break;
      case "edit":
        editIndex = index;
        editQualification = true;
        addQualification = false;
        deleteQualification = false;
        break;
      case "delete":
        deleteIndex = index;
        deleteQualification = true;
        addQualification = false;
        editQualification = false;
        break;
    }
  };
  const onAdd = (e) => {
    console.log("onAdd called: ", e.detail.otherQualification);
    qualifications.push(e.detail.otherQualification);
    qualifications = qualifications;
    dispatch("updateOtherQualifications", qualifications);
  };

  const onDelete = (e) => {
    console.log("onDelete called: ", e.detail.index);
    qualifications.splice(e.detail.index, 1);
    qualifications = qualifications;
    dispatch("updateOtherQualifications", qualifications);
  };
  const onEdit = (e) => {
    let { index, otherQualification } = e.detail;
    console.log("onEdit called: ", otherQualification, "index: ", index);
    qualifications.splice(index, 1, otherQualification);
    // qualifications.splice(index,1);
    qualifications = qualifications;
    dispatch("updateOtherQualifications", qualifications);
  };
</script>

<div class="flex flex-col justify-center mx-2 lg:mx-20 mt-5">
  <div class="grid grid-cols-7 bg-orange-400 w-full rounded-t-lg">
    <div
      class="col-span-7 lg:col-span-6 text-white rounded-t-lg m-2 p-1 font-bold text-center lg:text-xl"
    >
      Other Qualification (Optional)
    </div>
    <div
      class="col-span-7 lg:col-span-1 flex justify-center rounded-t-lg items-center h-12 bg-orange-400 font-bold "
    >
      <span class="text-white">Add </span>
      <div
        on:click={() => qualification("add")}
        class="flex justify-center items-center flex-inline ml-2 text-white hover:text-gray-200  text-3xl cursor-pointer"
      >
        <Fa icon={faPlusCircle} />
      </div>
    </div>
  </div>
  <div>
    <div class="grid grid-cols-12 w-full bg-gray- mx-1 my-2 p-1 rounded-lg ">
      <div class="col-span-12  border-2 mr-1 mt-1 rounded-lg shadow-2xl ">
        {#each qualifications as q, i}
          <div class="grid grid-cols-12 ">
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
                {#if q.qualification != '10th' && q.qualification != '12th' &&  q.qualification != 'PhD' && q.qualification != 'Diploma'}
                {q.qualification}-{q.degree}
                {:else}
                {q.qualification}
                {/if}
              </div>
            </div>
            <div
              class="col-span-12 lg:col-span-2 p-2 bg-white m-2 rounded-lg border-2"
            >
              <div class="row-span-1 flex justify-center text-center text-sm">
                University/Board
              </div>
              <div class="row-span-1 flex justify-center text-center font-bold">
                {q.university}
              </div>
            </div>
            <div
              class="col-span-12 lg:col-span-2 p-2 bg-white m-2 rounded-lg border-2"
            >
              <div class="row-span-1 flex justify-center text-center text-sm">
                Specialization
              </div>
              <div class="row-span-1 flex justify-center text-center font-bold">
                {#if q.qualification == "10th"}
                  --
                {:else if q.qualification == "12th"}
                  {q.twelthSpecialization}
                {:else}
                  {q.subject}
                {/if}
              </div>
            </div>

            <div
              class="col-span-12 lg:col-span-2 p-2 bg-white m-2 rounded-lg border-2"
            >
              <div class="row-span-1 flex justify-center text-center text-sm">
                {#if q.qualification == "PhD"}
                  Date of Award
                {:else}
                  Year Of Passing
                {/if}
              </div>
              <div class="row-span-1 flex justify-center text-center font-bold">
                {#if q.qualification == "PhD"}
                  {q.dateOfAward}
                {:else}
                  {q.yearOfPassing}
                {/if}
              </div>
            </div>
            <div
              class="col-span-12 lg:col-span-2 p-2 bg-white m-2 rounded-lg border-2"
            >
              <div class="row-span-1 flex justify-center text-center text-sm">
                {#if q.marksType == "Percentage"}
                  Marks Obtained & (%)
                {:else}
                  CGPA/Grade
                {/if}
              </div>
              <div class="row-span-1 flex justify-center text-center font-bold">
                {#if q.qualification == "PhD"}
                  --
                {:else if q.marksType == "Percentage"}
                  {q.marks}
                  ({q.percentage}%)
                {:else}
                  {q.cgpa}
                {/if}
              </div>
            </div>

            <div
              class="col-span-12 lg:col-span-1 p-2 bg-white m-2 rounded-lg border-2"
            >
              <div class="flex justify-center pt-3 p-1 ">
                <div
                  on:click={() => qualification("delete", i)}
                  class="ml-3 text-gray-600 hover:text-gray-800 cursor-pointer "
                >
                  <Fa icon={faTrash} />
                </div>
                <div
                  on:click={() => qualification("edit", i)}
                  class="ml-3 text-gray-600 hover:text-gray-800 cursor-pointer"
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
</div>

{#if addQualification}
  <Add on:add={onAdd} bind:showModal={addQualification} />
{:else if deleteQualification}
  <Delete
    on:del={onDelete}
    bind:showModal={deleteQualification}
    index={deleteIndex}
    otherQualification={qualifications[deleteIndex]}
  />
{:else if editQualification}
  <Edit
    on:edit={onEdit}
    bind:showModal={editQualification}
    index={editIndex}
    otherQualification={qualifications[editIndex]}
  />

  <!-- <Add on:add={onDelete} bind:showModal={deleteQualification} /> -->
{/if}
