<script>
  import Fa from "svelte-fa";
  import { faTrash } from "@fortawesome/free-solid-svg-icons";
  import TextInput from "../../common/TextInput.svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  export let experience;
  export let showModal;
  export let index;
  let inputNameOfOrganization = {
    label: "Name of organization",
    value: experience.nameOfOrganization,
    validate: false,
    readonly: true,
    placeholderValue: "Name of organization",
  };
  let inputPostHeld = {
    label: "Post Held",
    value: experience.postHeld,
    validate: false,
    readonly: true,
    placeholderValue: "Post Held",
  };
  let inputExperienceFrom = {
    label: "Experience From",
    value: experience.experienceFrom,
    validate: false,
    readonly: true,
    placeholderValue: "Experience From",
  };
  let inputExperienceTo = {
    label: "Experience To",
    value: experience.experienceTo,
    validate: false,
    readonly: true,
    placeholderValue: "Experience To",
  };
  let inputDuties = {
    label: "Duties",
    value: experience.duties,
    validate: false,
    readonly: true,
    placeholderValue: "Duties",
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
            Delete Experience
          </h3>
          <div class=" text-gray-600">
            <Fa icon={faTrash} size="2x" />
          </div>
        </div>
        <!--body-->
        <div class="relative p-6 flex-auto">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 ">
              <TextInput
                bind:label={inputNameOfOrganization.label}
                bind:value={inputNameOfOrganization.value}
                validate={inputNameOfOrganization.validate}
                readonly={inputNameOfOrganization.readonly}
                placeholderValue={inputNameOfOrganization.placeholderValue}
              />
              <TextInput
                bind:label={inputPostHeld.label}
                bind:value={inputPostHeld.value}
                validate={inputPostHeld.validate}
                readonly={inputPostHeld.readonly}
                bind:error={inputPostHeld.error}
                placeholderValue={inputPostHeld.placeholderValue}
              />
              <TextInput
                bind:label={inputExperienceFrom.label}
                bind:value={inputExperienceFrom.value}
                validate={inputExperienceFrom.validate}
                readonly={inputExperienceFrom.readonly}
                bind:error={inputExperienceFrom.error}
                placeholderValue={inputExperienceFrom.placeholderValue}
              />
              <TextInput
                bind:label={inputExperienceTo.label}
                bind:value={inputExperienceTo.value}
                validate={inputExperienceTo.validate}
                readonly={inputExperienceTo.readonly}
                placeholderValue={inputExperienceTo.placeholderValue}
              />
              <TextInput
                bind:label={inputDuties.label}
                bind:value={inputDuties.value}
                validate={inputDuties.validate}
                readonly={inputDuties.readonly}
                placeholderValue={inputDuties.placeholderValue}
              />
            </div>
          </div>
          <div class="flex flex-row justify-center mb-4 mx-4">
            <button
              on:click={() => toggleModal({ op: "cancel" })}
              type="submit"
              class="w-48 text-center bg-navy-50 hover:bg-white shadow-lg text-gray-500 font-bold py-2 px-4 rounded"
            >
              CANCEL
            </button>
            <button
              on:click={() => toggleModal({ op: "delete" })}
              type="submit"
              class="w-48  text-center bg-orange-600 hover:bg-orange-500  shadow-lg text-white font-bold py-2 px-4 rounded"
            >
              DELETE
            </button>
          </div>
        </div>
      </div>
    </div>
  <div class="opacity-25 fixed inset-0 z-40 bg-black" />
{/if}
