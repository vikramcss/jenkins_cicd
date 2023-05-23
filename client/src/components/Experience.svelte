<script>
  import Add from "./Experience/Add.svelte";
  import Delete from "./Experience/Delete.svelte";
  import Edit from "./Experience/Edit.svelte";
  import { createEventDispatcher } from "svelte";
  import { DateTime } from "luxon";

  import Fa from "svelte-fa";
  import {
    faPlusCircle,
    faEdit,
    faTrash,
  } from "@fortawesome/free-solid-svg-icons";

  let addExperience = false;
  let editExperience = false;
  let editIndex = -1;
  let deleteExperience = false;
  let deleteIndex = -1;

  const dispatch = createEventDispatcher();

  const experience = (action, index = -1) => {
    console.log("action: ", action, " index: ", index);
    switch (action) {
      case "add":
        addExperience = true;
        editExperience = false;
        deleteExperience = false;
        break;
      case "edit":
        editIndex = index;
        editExperience = true;
        addExperience = false;
        deleteExperience = false;
        break;
      case "delete":
        deleteIndex = index;
        deleteExperience = true;
        addExperience = false;
        editExperience = false;
        break;
    }
  };
  export let experiences = [];
  console.log("experiences is ", experiences);
  const onAdd = (e) => {
    console.log("onAdd called: ", e.detail.experience);
    experiences.push(e.detail.experience);
    experiences = experiences;
  };
  const onDelete = (e) => {
    console.log("onDelete called: ", e.detail.index);
    experiences.splice(e.detail.index, 1);
    experiences = experiences;
  };
  const onEdit = (e) => {
    let { index, experience } = e.detail;
    console.log("onEdit called: ", experience, "index: ", index);
    experiences.splice(index, 1, experience);
    experiences = experiences;
  };

  let duration = [];
  const getExperienceDuration = ({ experienceFrom, experienceTo }) => {
    try {
      let day = experienceFrom.split("-")[0];
      let month = experienceFrom.split("-")[1];
      let year = experienceFrom.split("-")[2];
      let fromDt = DateTime.fromObject({ day, year, month });
      day = experienceTo.split("-")[0];
      month = experienceTo.split("-")[1];
      year = experienceTo.split("-")[2];
      let toDt = DateTime.fromObject({ day, year, month });
      let duration = toDt.diff(fromDt, ["day", "years", "months"]);
      console.log("duration is:", duration);
      return `${duration.values.days} day, ${duration.values.months} months, ${duration.values.years} years`;
    } catch (e) {
      return "invalid duration";
    }
  };
</script>

<div class="flex flex-col justify-center mx-2 lg:mx-20 mt-5">
  <div class="grid grid-cols-7 bg-orange-600 w-full rounded-t-lg">
    <div
      class="col-span-7 lg:col-span-6 text-white rounded-t-lg m-2 p-1 font-bold text-center lg:text-xl"
    >
      Experience
    </div>
    <div
      class="col-span-7 lg:col-span-1 flex justify-center rounded-t-lg items-center h-12 bg-orange-600 font-bold "
    >
      <span class="text-white">Add </span>
      <div
        on:click={() => experience("add")}
        class="flex justify-center items-center flex-inline ml-2 text-white hover:text-gray-200  text-3xl cursor-pointer"
      >
        <Fa icon={faPlusCircle} />
      </div>
    </div>

    <div
      class="flex iteams-center justify-center col-span-7 text-base text-white px-4 font-semibold"
    >
      All previous and present employment - starting with most recent
    </div>
  </div>
  <div>
    <div class="grid grid-cols-6 w-full bg-gray-200 mx-1 my-2 p-1 rounded-lg ">
      <div class="col-span-7  border-2 mr-1 mt-1 rounded-lg shadow-2xl bg-orange-50">
        {#each experiences as q, i}
          <div class="grid grid-cols-12">
            <div class="flex justify-center items-center col-span-10 lg:col-span-1 p-2 m-2 rounded-lg">
              <div  class="w-9 h-9 bg-gray-700 text-white rounded-full text-center flex items-center justify-center text-xl font-extrabold">
                {i + 1}
              </div>
            </div>
            <div class="col-span-12 lg:col-span-2 p-2 bg-white m-2 rounded-lg">
              <div class="row-span-1 flex justify-center text-center text-sm">
                Name of Organization
              </div>
              <div class="row-span-1 flex justify-center text-center font-bold">
                {q.nameOfOrganization}
              </div>
            </div>
            <div class="col-span-12 lg:col-span-2 p-2 bg-white m-2 rounded-lg">
              <div class="row-span-1 flex justify-center text-center text-sm">
                Post Held
              </div>
              <div class="row-span-1 flex justify-center text-center font-bold">
                {q.postHeld}
              </div>
            </div>

            <div class="col-span-12 lg:col-span-3 p-2 bg-white m-2 rounded-lg">
              <div class="row-span-1 flex justify-center text-center text-sm">
                Experience
              </div>
              <div class="row-span-1 flex justify-center text-center font-bold">
                {q.experienceFrom} To
                {q.experienceTo}
              </div>
            </div>
            <div class="col-span-12 lg:col-span-3 p-2 bg-white m-2 rounded-lg">
              <div class="row-span-1 flex justify-center text-center text-sm">
                Duration
              </div>

              <div class="row-span-1 flex justify-center text-center font-bold">
                {getExperienceDuration(q)}
              </div>
            </div>
            <div class="col-span-12 lg:col-span-1 p-2 bg-white m-2 rounded-lg">
              <div class="flex justify-center items-center p-1">
                <div
                  on:click={() => experience("delete", i)}
                  class="ml-3 inline-flex text-gray-600 hover:text-gray-800 cursor-pointer"
                >
                  <Fa icon={faTrash} />
                </div>
                <div
                  on:click={() => experience("edit", i)}
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
</div>

{#if addExperience}
  <Add on:add={onAdd} bind:showModal={addExperience} />
{:else if deleteExperience}
  <Delete
    on:del={onDelete}
    bind:showModal={deleteExperience}
    index={deleteIndex}
    experience={experiences[deleteIndex]}
  />
{:else if editExperience}
  <Edit
    on:edit={onEdit}
    bind:showModal={editExperience}
    index={editIndex}
    experience={experiences[editIndex]}
  />
  <!-- <Add on:add={onDelete} bind:showModal={deleteExperience} /> -->
{/if}
