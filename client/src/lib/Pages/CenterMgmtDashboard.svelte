<script>
  import Add from "../../components/CenterManagement/Add.svelte";
  import Delete from "../../components/CenterManagement/Delete.svelte";
  import Edit from "../../components/CenterManagement/Edit.svelte";
  import { createEventDispatcher } from "svelte";
  import Fa from "svelte-fa";
  import {
    faPlusCircle,
    faEdit,
    faTrash,
  } from "@fortawesome/free-solid-svg-icons";

  let addBtnClicked = false;
  let editBtnClicked = false;
  let editIndex = -1;
  let deleteBtnClicked = false;
  let deleteIndex = -1;
  const dispatch = createEventDispatcher();

  const handleButtonClicked = (action, index = -1) => {
    console.log("action: ", action, " index: ", index);
    switch (action) {
      case "add":
        addBtnClicked = true;
        editBtnClicked = false;
        deleteBtnClicked = false;
        break;
      case "edit":
        editIndex = index;
        editBtnClicked = true;
        addBtnClicked = false;
        deleteBtnClicked = false;
        break;
      case "delete":
        deleteIndex = index;
        deleteBtnClicked = true;
        addBtnClicked = false;
        editBtnClicked = false;
        break;
    }
  };
  export let centers = [];
  export let alertMessage;
  const onAdd = (e) => {
    alertMessage = null;
    console.log("onAdd called: ", e.detail);
    centers = [...centers, e.detail];
    dispatch('addCenter', e.detail)
  };
  const onDelete = (e) => {
    console.log("onDelete called: ", e.detail.index);
    const {_id }= centers[e.detail.index]
    centers.splice(e.detail.index, 1);
    centers = centers;
    dispatch('deleteCenter', {_id})
  };
  const onEdit = (e) => {
    let { index, center } = e.detail;
    console.log("onEdit called: ", center, "index: ", index);
    centers.splice(index, 1, center);
    centers = centers;
    dispatch('editCenter', center)
  };
  $:totalCapacity = centers.reduce((a,c)=> a+Number(c.centerCapacity), 0)
</script>

<div class="flex flex-col justify-center mx-2 lg:mx-20 mt-5">
  <div class="grid grid-cols-6 bg-navy-500 rounded-t-xl">
    <div class="lg:col-span-2 col-span-6 flex justify-center lg:justify-start ">
      <span class="bg-navy-400 text-white text-sm sm:justify-center font-bold m-2 p-3 rounded">Total Capacity: {totalCapacity}</span>
    </div>
    <div class="lg:col-span-2 col-span-6 text-white flex pl-1 justify-center items-center font-semibold text-xl  ">
      Exam Center Management 
    </div>      
    <div class="lg:col-span-2 col-span-6 p-2  flex lg:justify-end items-center justify-center mr-6 ">
      <span class="text-white text-md font-bold ">Add </span>
      <div
        on:click={() => handleButtonClicked("add")}
        class=" flex-inline ml-2 text-white hover:text-gray-200  text-3xl cursor-pointer"
      >
        <Fa icon={faPlusCircle} />
    </div>
    </div>
  </div>
  
  <!-- <div class="grid grid-cols-8 bg-navy-500 w-full  rounded-t-lg ">
    <span class="bg-navy-400 text-white text-sm p-2 m-2 font-semibold   rounded">Total Capacity: {totalCapacity}</span>
    <div
      class="col-span-8 lg:col-span-6 text-white rounded-t-lg m-2 p-1 font-bold text-center lg:text-xl"
    >
     Exam Center Management  -->
     <!-- <span class="bg-blue-100 text-navy-500 text-sm p-2 rounded">Total Capacity: {totalCapacity}</span> -->
    <!-- </div>
    <div
      class="col-span-8 lg:col-span-1 flex justify-center rounded-t-lg items-center h-12 bg-navy-500 font-bold "
    >
      <span class="text-white">Add </span>
      <div
        on:click={() => handleButtonClicked("add")}
        class="flex justify-center items-center flex-inline ml-2 text-white hover:text-gray-200  text-3xl cursor-pointer"
      >
        <Fa icon={faPlusCircle} />
      </div>
    </div>
  </div> -->
  <div>
    <div class="grid grid-cols-6 w-full  mx-1 my-2  rounded-lg ">
      <div
        class="col-span-7  border-2 mr-1 mt-1 rounded-lg shadow-2xl bg-orange- "
      >
        {#each centers as c, i}
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
              class="col-span-12 lg:col-span-5 p-2 bg-white m-2 rounded-lg border-2"
            >
              <div class="row-span-1 flex justify-center text-center text-sm">
                Center Name/Address
              </div>
              <div class="row-span-1 flex justify-center text-center font-bold">
                {c.name}
              </div>
              <div class="flex justify-center text-center text-xs">
                {c.address}
              </div>
            
            </div>
            <!-- <div
              class="col-span-12 lg:col-span-2 p-2 bg-white m-2 rounded-lg border-2"
            >
              <div class="row-span-1 flex justify-center text-center text-sm">
                Center Address
              </div>
              <div
                class="row-span-1 flex justify-center text-center text-sm font-bold"
              >
                {c.address}
              </div>
            </div> -->
<!-- 
            <div
              class="col-span-12 lg:col-span-4 p-2 bg-white m-2 rounded-lg border-2"
            >
              <div class="row-span-1 flex justify-center text-center text-sm">
                Number of Rooms
              </div>
              <div
                class="row-span-1 flex justify-center text-center text-sm"
              >
               Number of Rooms is:<span class="font-bold">{c.roomCount}</span>  Room Capacity is: {c.roomCapacity}
              </div>
              
          
            </div> -->
            <!-- <div
              class="col-span-12 lg:col-span-2 p-2 bg-white m-2 rounded-lg border-2"
            >
              <div class="row-span-1 flex justify-center text-center text-sm">
                Room Capacity
              </div>
              <div
                class="row-span-1 flex justify-center text-center text-sm font-bold"
              >
                {c.roomCapacity}
              </div>
            </div> -->
            <div
              class="col-span-12 lg:col-span-5 p-2 bg-white m-2 rounded-lg border-2"
            >
              <div class="row-span-1 flex justify-center text-center text-sm">
                Center Capacity
              </div>
              <div
                class="row-span-1 flex justify-center text-center text-sm font-bold"
              >
              {c.roomCount}(rooms) x {c.roomCapacity} (per room) = {c.centerCapacity}
              </div>
            </div>
            <div
              class="col-span-12 lg:col-span-1 p-2 bg-white m-2 rounded-lg border-2 pt-8"
            >
              <div class="flex justify-center p-1 ">
                <div
                  on:click={() => handleButtonClicked("delete", i)}
                  class="ml-3 inline-flex text-gray-600 hover:text-gray-800 cursor-pointer"
                >
                  <Fa icon={faTrash} />
                </div>
                <div
                  on:click={() => handleButtonClicked("edit", i)}
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
<div>
  {#if addBtnClicked}
    <Add on:add={onAdd} bind:showModal={addBtnClicked} />
  {:else if deleteBtnClicked}
    <Delete
      on:del={onDelete}
      bind:showModal={deleteBtnClicked}
      index={deleteIndex}
      center={centers[deleteIndex]}
    />
  {:else if editBtnClicked}
    <Edit
      on:edit={onEdit}
      bind:showModal={editBtnClicked}
      index={editIndex}
      center={centers[editIndex]}
    />
  {/if}
</div>
