<script>
  import Fa from "svelte-fa";
  import { faTrash } from "@fortawesome/free-solid-svg-icons";
  import TextInput from "../../common/TextInput.svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let reference = {
    refName: null,
    refOccupation: null,
    refAddress: null,
    refEmail: null,
    refMobile: null,
    refAssociation: null
  };
  export let showModal;
  export let index;

  let refName = {
    label: "Name",
    value: reference.refName,
    validate: false,
    readonly: true,
    placeholderValue: "Name",
  };

  let refOccupation = {
    label: "Designation",
    value: reference.refOccupation,
    validate: false,
    readonly: true,
    placeholderValue: "Designation",
  };

  let refAddress = {
    label: "Address",
    value: reference.refAddress,
    validate: false,
    readonly: true,
    placeholderValue: "Address",
  };

  let refEmail = {
    label: "E-Mail",
    value: reference.refEmail,
    validate: false,
    readonly: true,
    placeholderValue: "E-Mail",
  };

  let refMobile = {
    label: "Mobile",
    value: reference.refMobile,
    validate: false,
    readonly: true,
    placeholderValue: "Mobile",
  };

  let refAssociation = {
    label: "Association with Reference",
    value: reference.refAssociation,
    validate: false,
    readonly: true,
    placeholderValue: "Association with Reference",
  };

  function toggleModal({ op }) {
    console.log("toggleModal called :", op);
    showModal = false;
    console.log("toggleModal called showModel:", showModal);
    if (op === "delete") {
      dispatch("del", { index });
    }
    showModal = false;
    return true;
  }
</script>

{#if showModal}
  <div
    class="overflow-x-hidden  overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex"
  >
    <div class="relative w-auto my-6 mx-auto flex justify-center">
      <!--content-->
      <div
        class="border-0 rounded-lg shadow-lg relative flex flex-col w-8/12 md:w-full md:ml-0 mt-28 md:mt-1 bg-white outline-none focus:outline-none"
      >
        <!--header-->
        <div
          class="flex items-strat justify-between p-5 border-b border-solid border-blueGray-200 rounded-t"
        >
          <h3 class="text-3xl font-semibold">
            Delete Reference
          </h3>
          <div class=" text-gray-600">
            <Fa icon={faTrash} size="2x" />
          </div>
        </div>
        <!--body-->
        <div class="relative p-6 flex-auto">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 ">
              <TextInput
                bind:label={refName.label}
                bind:value={refName.value}
                validate={refName.validate}
                readonly={refName.readonly}
                placeholderValue={refName.placeholderValue}
              />
              <TextInput
                bind:label={refOccupation.label}
                bind:value={refOccupation.value}
                validate={refOccupation.validate}
                readonly={refOccupation.readonly}
                bind:error={refOccupation.error}
                placeholderValue={refOccupation.placeholderValue}
              />
              <TextInput
                bind:label={refAddress.label}
                bind:value={refAddress.value}
                validate={refAddress.validate}
                readonly={refAddress.readonly}
                bind:error={refAddress.error}
                placeholderValue={refAddress.placeholderValue}
              />
              <TextInput
                bind:label={refEmail.label}
                bind:value={refEmail.value}
                validate={refEmail.validate}
                readonly={refEmail.readonly}
                placeholderValue={refEmail.placeholderValue}
              />
              <TextInput
                bind:label={refMobile.label}
                bind:value={refMobile.value}
                validate={refMobile.validate}
                readonly={refMobile.readonly}
                placeholderValue={refMobile.placeholderValue}
              />
              <TextInput
                bind:label={refAssociation.label}
                bind:value={refAssociation.value}
                validate={refAssociation.validate}
                readonly={refAssociation.readonly}
                placeholderValue={refAssociation.placeholderValue}
              />
            </div>
          </div>
          <div class="flex flex-row justify-center mb-4 mx-4">
            <button
              on:click={() => toggleModal({ op: "cancel" })}
              type="submit"
              class="w-48 text-center bg-indigo-50 hover:bg-white shadow-lg text-gray-500 font-bold py-2 px-4 rounded"
            >
              CANCEL
            </button>
            <button
              on:click={() => toggleModal({ op: "delete" })}
              type="submit"
              class="w-48  text-center bg-blue-600 hover:bg-blue-500  shadow-lg text-white font-bold py-2 px-4 rounded"
            >
              DELETE
            </button>
          </div>
        </div>
      </div>
    </div>
  <div class="opacity-25 fixed inset-0 z-40 bg-black" />
{/if}
