<script>
  import Add from "./AMD/Add.svelte";
  import Delete from "./AMD/Delete.svelte";
  import Edit from "./AMD/Edit.svelte";
  import List from "./AMD/List.svelte";
  import { createEventDispatcher } from "svelte";
  import Fa from "svelte-fa";
  import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

  let addQualification = false;
  let editQualification = false;
  let editIndex = -1;
  let deleteQualification = false;
  let deleteIndex = -1;
  const dispatch = createEventDispatcher();

  const editDeleteOp = (action, index = -1) => {
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
  export let postId;
  const onAdd = (e) => {
    alertMessage = null;
    console.log("onAdd called: ", e.detail.essentialQualification);
    qualifications.push(e.detail.essentialQualification);
    qualifications = qualifications;
    dispatch("updateEssentialQualifications", qualifications);
  };
  const onDelete = (e) => {
    console.log("onDelete called: ", e.detail.index);
    qualifications.splice(e.detail.index, 1);
    qualifications = qualifications;
    dispatch("updateEssentialQualifications", qualifications);
  };
  const onEdit = (e) => {
    let { index, essentialQualification } = e.detail;
    console.log("onEdit called: ", essentialQualification, "index: ", index);
    qualifications.splice(index, 1, essentialQualification);
    qualifications = qualifications;
    dispatch("updateEssentialQualifications", qualifications);
  };
</script>

<div class="flex flex-col justify-center mx-2 lg:mx-20 mt-5">
  <div class="grid grid-cols-7 bg-orange-400 w-full rounded-t-lg">
    <div
      class="col-span-7 lg:col-span-6 text-white rounded-t-lg m-2 p-1 font-bold text-center lg:text-xl"
    >
      Essential Qualification  (Mandatory)
    </div>
    <div
      class="col-span-7 lg:col-span-1 flex justify-center rounded-t-lg items-center h-12 bg-orange-400 font-bold "
    >
      <span class="text-white">Add </span>
      <div
        on:click={() => editDeleteOp("add")}
        class="flex justify-center items-center flex-inline ml-2 text-white hover:text-gray-200  text-3xl cursor-pointer"
      >
        <Fa icon={faPlusCircle} />
      </div>
    </div>
  </div>
  <List {qualifications} {editDeleteOp} />
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
