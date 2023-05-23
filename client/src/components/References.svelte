<script>
  import Add from "./References/Add.svelte";
  import Delete from "./References/Delete.svelte";
  import Alert from "../common/Alert.svelte";

  import Fa from "svelte-fa";
  import {
    faPlusCircle,
    faEdit,
    faTrash,
  } from "@fortawesome/free-solid-svg-icons";

  export let references = [];

  let addReference = false;
  let editReference = false;
  let deleteReference = false;
  let deleteIndex = -1;
  let alert = null;

  const reference = (action, index = -1) => {
    console.log("action: ", action, " index: ", index);
    switch (action) {
      case "add":
        if (references.length >= 3) {
          alert = "at most 3 references can be added";
        } else {
          addReference = true;
        }
        editReference = false;
        deleteReference = false;
        break;
      case "edit":
        editReference = true;
        addReference = false;
        deleteReference = false;
        break;
      case "delete":
        deleteIndex = index;
        deleteReference = true;
        addReference = false;
        editReference = false;
        break;
    }
  };
  const onAdd = (e) => {
    console.log("onAdd called: ", e.detail.references);
    references.push(e.detail.references);
    references = references;
  };
  const onDelete = (e) => {
    console.log("onDelete called: ", e.detail.index);
    references.splice(e.detail.index, 1);
    references = references;
  };
</script>

<div class="flex flex-col justify-center mx-2 lg:mx-20 mt-5">
  <div class="grid grid-cols-7 bg-blue-600 w-full rounded-t-lg">
    <div
      class="col-span-7 lg:col-span-6 text-white rounded-t-lg m-2 p-1 font-bold text-center lg:text-xl"
    >
      References (*No Blood Relation)
    </div>
    <div
      class="col-span-7 lg:col-span-1 flex justify-center rounded-t-lg items-center h-12 bg-blue-600 font-bold "
    >
      <span class="text-white">Add </span>
      <div
        on:click={() => reference("add")}
        class="flex justify-center items-center flex-inline ml-2 text-white hover:text-gray-200  text-3xl cursor-pointer"
      >
        <Fa icon={faPlusCircle} />
      </div>
    </div>
  </div>
  <div>
    <div class="grid grid-cols-6 w-full bg-gray-200 mx-1 my-2 p-1 rounded-lg ">
      <div
        class="col-span-7  border-2 mr-1 mt-1 rounded-lg shadow-2xl bg-blue-50 "
      >
        {#each references as q, i}
          <div class="grid grid-cols-12 ">
            <div
              class="flex items-center col-span-12 lg:col-span-1 p-2 m-2 rounded-lg"
            >
              <div
                class="w-9 h-9 bg-gray-700 text-white rounded-full text-center flex items-center justify-center text-xl font-extrabold"
              >
                {i + 1}
              </div>
            </div>
            <div class="col-span-12 lg:col-span-2 p-2 bg-white m-2 rounded-lg">
              <div class="row-span-1 flex justify-center text-center text-sm">
                Name
              </div>
              <div class="row-span-1 flex justify-center text-center font-bold">
                {q.refName}
              </div>
            </div>
            <div class="col-span-12 lg:col-span-2 p-2 bg-white m-2 rounded-lg">
              <div
                class="row-span-1 flex justify-center text-center text-sm break-words"
              >
                Designation
              </div>
              <div class="row-span-1 flex justify-center text-center font-bold">
                {q.refOccupation}
              </div>
            </div>
            <div class="col-span-12 lg:col-span-2 p-2 bg-white m-2 rounded-lg">
              <div class="row-span-1 flex justify-center text-center text-sm">
                Address
              </div>
              <div class="row-span-1 flex justify-center text-center font-bold">
                {q.refAddress}
              </div>
            </div>
            <div
              class="col-span-12 lg:col-span-2 p-2 bg-white m-2 rounded-lg break-all"
            >
              <div class="row-span-1 flex justify-center text-center text-sm ">
                Email
              </div>
              <div class="row-span-1 flex justify-center text-center font-bold">
                {q.refEmail}
              </div>
            </div>

            <div class="col-span-12 lg:col-span-2 p-2 bg-white m-2 rounded-lg">
              <div class="row-span-1 flex justify-center text-center text-sm">
                Mobile
              </div>
              <div class="row-span-1 flex justify-center text-center font-bold">
                {q.refMobile}
              </div>
            </div>
            <div class="col-span-12 lg:col-span-1 p-2 bg-white m-2 rounded-lg">
              <div class="flex justify-center items-center p-1">
                
                <div
                  on:click={() => reference("delete", i)}
                  class="ml-3 inline-flex text-gray-600 hover:text-gray-800 cursor-pointer"
                >
                  <Fa icon={faTrash} />
                </div>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
  {#if alert}
    <div>
      <Alert
        message={alert}
        on:alertClosed={() => {
          alert = null;
        }}
      />
    </div>
  {/if}
</div>
{#if addReference}
  <Add on:add={onAdd} bind:showModal={addReference} />
{:else if deleteReference}
  <Delete
    on:del={onDelete}
    bind:showModal={deleteReference}
    index={deleteIndex}
    reference={references[deleteIndex]}
  />
  <!-- <Add on:add={onDelete} bind:showModal={deleteExperience} /> -->
{/if}
