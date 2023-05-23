<script>
  import Add from "./EssentialQualification/Add.svelte";
  import Delete from "./EssentialQualification/Delete.svelte";
  import Edit from "./EssentialQualification/Edit.svelte";
  import { createEventDispatcher } from "svelte";
  import Fa from "svelte-fa";
  import {
    faPlusCircle,
    faEdit,
    faTrash,
  
  } from "@fortawesome/free-solid-svg-icons";

  let addQualification = false;
  let editQualification = false;
  let editIndex = -1;
  let deleteQualification = false;
  let deleteIndex = -1;
  const dispatch = createEventDispatcher();

  // essentialQualification data type
  // let essentialQualification = {
  //   qualification: null,
  //   subject: null,
  //   university: null,
  //   yearOfPassing: null,
  //   marks: null,
  //   percentage: null,
  // };
  const qualification = (action, index = -1) => {
    console.log("action: ", action, " index: ", index);
    switch (action) {
      case "add":
        addQualification = true;
        editQualification = false;
        deleteQualification = false;
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
  export let qualifications = [];
  export let alertMessage;
  const onAdd = (e) => {
    alertMessage = null;
    console.log("onAdd called: ", e.detail.essentialQualification);
    qualifications.push(e.detail.essentialQualification);
    qualifications = qualifications;
  };
  const onDelete = (e) => {
    console.log("onDelete called: ", e.detail.index);
    qualifications.splice(e.detail.index, 1);
    qualifications = qualifications;
  };
  const onEdit = (e) => {
    let { index, essentialQualification } = e.detail;
    console.log("onEdit called: ", essentialQualification, "index: ", index);
    qualifications.splice(index, 1, essentialQualification);
    // qualifications.splice(index,1);
    qualifications = qualifications;
  };
  
</script>

<div class="flex flex-col justify-center mx-2 lg:mx-20 mt-5">
  <div class="grid grid-cols-7 bg-orange-500 w-full rounded-t-lg">
    <div
      class="col-span-7 lg:col-span-6 text-white rounded-t-lg m-2 p-1 font-bold text-center lg:text-xl"
    >
      Center Management
    </div>
    <div
      class="col-span-7 lg:col-span-1 flex justify-center rounded-t-lg items-center h-12 bg-orange-500 font-bold "
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
    <div class="grid grid-cols-6 w-full  mx-1 my-2 p-1 rounded-lg ">
      <div
        class="col-span-7  border-2 mr-1 mt-1 rounded-lg shadow-2xl bg-orange- "
      >
        {#each qualifications as q, i}
          {#if q.qualification == "Graduation"}
            <div class="grid grid-cols-12">
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
                <div
                  class="row-span-1 flex justify-center text-center font-bold"
                >
                  {q.qualification}
                </div>
              </div>
              <div
                class="col-span-12 lg:col-span-2 p-2 bg-white m-2 rounded-lg border-2"
              >
                <div class="row-span-1 flex justify-center text-center text-sm">
                  University/Board
                </div>
                <div
                  class="row-span-1 flex justify-center text-center font-bold"
                >
                  {q.university}
                </div>
              </div>
              <div
                class="col-span-12 lg:col-span-2 p-2 bg-white m-2 rounded-lg border-2"
              >
                <div class="row-span-1 flex justify-center text-center text-sm">
                  Degree
                </div>
                <div
                  class="row-span-1 flex justify-center text-center font-bold"
                >
            
                  {#if q.degree === "Other"}
                    {q.degree} - {q.otherDegree}
                  {:else}
                    {q.degree}
                  {/if}

                  <!-- {q.degree} -->
                </div>
              </div>
              <div
                class="col-span-12 lg:col-span-2 p-2 bg-white m-2 rounded-lg border-2"
              >
                <div class="row-span-1 flex justify-center text-center text-sm">
                  Year Of Passing
                </div>
                <div
                  class="row-span-1 flex justify-center text-center font-bold"
                >
                  {q.yearOfPassing}
                </div>
              </div>
              <div
                class="col-span-12 lg:col-span-2 p-2 bg-white m-2 rounded-lg border-2"
              >
                <div class="row-span-1 flex justify-center text-center text-sm">
                  {#if q.marksType == "Percentage"}
                    Marks & (%)
                  {:else}
                    CGPA
                  {/if}
                </div>
                <div
                  class="row-span-1 flex justify-center text-center font-bold"
                >
                  {#if q.marksType == "Percentage"}
                    {q.evaluation.percentage.marks} ({q.evaluation.percentage
                      .percentage}%)
                  {:else}
                    {q.evaluation.cgpa.gpa}
                  {/if}
                </div>
              </div>

              <div
                class="col-span-12 lg:col-span-1 p-2 bg-white m-2 rounded-lg border-2"
              >
                <div class="flex justify-center pt-3 p-1 ">
                  <div
                    on:click={() => qualification("delete", i)}
                    class="ml-3 inline-flex text-gray-600 hover:text-gray-800 cursor-pointer"
                  >
                    <Fa icon={faTrash} />
                  </div>
                  <div
                    on:click={() => qualification("edit", i)}
                    class="ml-3 inline-flex text-gray-600 hover:text-gray-800 cursor-pointer"
                  >
                    <Fa icon={faEdit} />
                  </div>
                </div>
              </div>
            </div>
          {:else}
            <div class="grid grid-cols-12">
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
                <div
                  class="row-span-1 flex justify-center text-center font-bold"
                >
                  {q.qualification}
                </div>
              </div>
              <div
                class="col-span-12 lg:col-span-2 p-2 bg-white m-2 rounded-lg border-2"
              >
                <div class="row-span-1 flex justify-center text-center text-sm">
                  Typing Certificate
                </div>
                <div
                  class="row-span-1 flex justify-center text-center text-sm font-bold"
                >
                  {q.certificateType}
                </div>
              </div>
              <div
                class="col-span-12 lg:col-span-2 p-2 bg-white m-2 rounded-lg border-2"
              >
                <div class="row-span-1 flex justify-center text-center text-sm">
                  Certifying Authority
                </div>
                <div
                  class="row-span-1 flex justify-center text-center text-sm font-bold"
                >
                {#if q.certifyingAuthority === "Other"}
                {q.certifyingAuthority} - {q.certifyingAuthorityOther}
              {:else}
                {q.certifyingAuthority}
              {/if}
             
                  <!-- {q.certifyingAuthority} -->
                </div>
              </div>
              
              <div
                class="col-span-12 lg:col-span-2 p-2 bg-white m-2 rounded-lg border-2"
              >
                <div class="row-span-1 flex justify-center text-center text-sm">
                  Month-Year(Exam)
                </div>
                <div
                  class="row-span-1 flex justify-center text-center text-sm font-bold"
                >
                  {q.examMonth}-{q.examYear}
                </div>
              </div>
              <div
                class="col-span-12 lg:col-span-2 p-2 bg-white m-2 rounded-lg border-2"
              >
                <div class="row-span-1 flex justify-center text-center text-sm">
                  Grade/Marks
                </div>
                <div
                  class="row-span-1 flex justify-center text-center text-sm font-bold"
                >
                  {q.gradeOrMarks}
                </div>
              </div>
              <div
                class="col-span-12 lg:col-span-1 p-2 bg-white m-2 rounded-lg border-2 pt-8"
              >
                <div class="flex justify-center p-1 ">
                  <div
                    on:click={() => qualification("delete", i)}
                    class="ml-3 inline-flex text-gray-600 hover:text-gray-800 cursor-pointer"
                  >
                    <Fa icon={faTrash} />
                  </div>
                  <div
                    on:click={() => qualification("edit", i)}
                    class="ml-3 inline-flex text-gray-600 hover:text-gray-800 cursor-pointer"
                  >
                    <Fa icon={faEdit} />
                  </div>
                </div>
              </div>
            </div>
          {/if}
        {/each}
      </div>
    </div>
  </div>
</div>
<div>
  <!-- {#if deleteQualification}
    <div>delete qualification is true</div>
  {/if} -->
  {#if addQualification}
    <Add on:add={onAdd} bind:showModal={addQualification} />
  {:else if deleteQualification}
    <!-- {#if deleteQualification == true}
    delete qualification is---: {deleteQualification} -->
    <Delete
      on:del={onDelete}
      bind:showModal={deleteQualification}
      index={deleteIndex}
      essentialQualification={qualifications[deleteIndex]}
    />
  {:else if editQualification}
    <Edit
      on:edit={onEdit}
      bind:showModal={editQualification}
      index={editIndex}
      essentialQualification={qualifications[editIndex]}
    />
    <!-- <Add on:add={onDelete} bind:showModal={deleteQualification} /> -->
  {/if}
</div>
