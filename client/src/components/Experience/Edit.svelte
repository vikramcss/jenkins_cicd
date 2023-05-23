<script>
  import MonthYearInput from "../../common/MonthYearInput.svelte";
  import Alert from "../../common/Alert.svelte";
  import Fa from "svelte-fa";
  import { faEdit } from "@fortawesome/free-solid-svg-icons";
  import TextInput from "../../common/TextInput.svelte";
  import { createEventDispatcher } from "svelte";
  import { DateTime } from "luxon";
  const dispatch = createEventDispatcher();
 
  export let experience;
  export let showModal;
  let alert = null;
  export let index;
  let inputNameOfOrganization = {
    label: "Name of organization",
    value: experience.nameOfOrganization,
    validate: false,
    readonly: false,
    placeholderValue: "Name of organization",
    validator: {
      method: (value) => {
        inputNameOfOrganization.error = null;
        if (value.length < 3) {
          inputNameOfOrganization.error =
            "Name of organization can not be empty";
          return false;
        }
        return true;
      },
      errormessage: "can not be less than 3 chars long",
    },
  };
  let inputPostHeld = {
    label: "Post Held",
    value: experience.postHeld,
    validate: false,
    readonly: false,
    placeholderValue: "Post Held",
    validator: {
      method: (value) => {
        inputPostHeld.error = null;
        if (value.length < 3) {
          inputPostHeld.error = inputPostHeld.validator.errormessage;
          return false;
        }
        return true;
      },
      errormessage: "Post Held can not be less than 3 chars",
    },
  };
  let inputExperienceFrom = {
    label: "Experience From",
    value: experience.experienceFrom,
    validate: false,
    readonly: false,
    placeholderValue: "Experience From",
    validator: {
      method: (value) => {
        inputExperienceFrom.error = null;
        let day = inputExperienceFrom.value.split("-")[0];
        let month = inputExperienceFrom.value.split("-")[1];
        let year = inputExperienceFrom.value.split("-")[2];
        if(Number(year) < 1980 || Number(year) > 2023) {
          inputExperienceFrom.error = 'Experience has to be between 1980 and 2023'
          return false;
        }
        try {
          let dtFrom = DateTime.fromObject({ day, month, year });

          if (dtFrom.invalid) {
            inputExperienceFrom.error = "invalid date";
            return false;
          }
        } catch (e) {

            inputExperienceFrom.error = "invalid date";
            return false;
        }
        return true;
      },
      errormessage: "can not be less than 3 chars",
    },
  };
  let inputExperienceTo = {
    label: "Experience To",
    value: experience.experienceTo,
    validate: false,
    readonly: false,
    placeholderValue: "Experience To",
    validator: {
      method: (value) => {
        inputExperienceTo.error = null;
        let day = inputExperienceTo.value.split("-")[0];
        let month = inputExperienceTo.value.split("-")[1];
        let year = inputExperienceTo.value.split("-")[2];
        if(Number(year) < 1980 || Number(year) > 2023) {
          inputExperienceTo.error = 'Experience has to be between 1980 and 2023'
          return false;
        }

        try {
          let dtFrom = DateTime.fromObject({ day, month, year });

          if (dtFrom.invalid) {
            inputExperienceTo.error = "invalid date";
            return false;
          }
        } catch (e) {

            inputExperienceTo.error = "invalid date";
            return false;
        }
        return true;
      },
      errormessage: "can not be less than 3 chars",
    },
  };

  let inputDuties = {
    label: "Duties",
    value: experience.duties,
    validate: false,
    readonly: false,
    placeholderValue: "Duties",
  };
  const validate = () => {
    let valid = true;
    alert = null;
    console.log("experience is :", experience);
    if (!inputNameOfOrganization.validator.method(inputNameOfOrganization.value)) {
      alert = "Name of organization is mandatory";
      valid = false;
    }
    if (!inputPostHeld.validator.method(inputPostHeld.value)) {
      alert = "post held is mandatory";
      valid = false;
    }
    if (!inputExperienceFrom.validator.method(inputExperienceFrom.value)) {
      alert = "experience from in DD-MM-YYYY format is mandatory";
      valid = false;
    }
    if (!inputExperienceTo.validator.method(inputExperienceTo.value)) {
      alert = "experience to in DD-MM-YYYY format is mandatory";
      valid = false;
    }
    if(DateTime.fromFormat(inputExperienceFrom.value,"dd-MM-yyyy") > DateTime.fromFormat(inputExperienceTo.value,"dd-MM-yyyy"))
    {
      alert = "experience cannot be negative";
      valid = false;
    }


    if (!valid) return false;
    return true;
  };
  let alertMessage = null;
  const save = () => {
    if (!validate()) return false;
    return true;
  };

  function toggleModal({ op }) {
    if (op === "edit" && !save()) {
      return false;
    }
    console.log("toggleModal called :", op);
    showModal = !showModal;
    console.log("toggleModal called showModel:", showModal);
    if (op === "cancel") return true;

    let experience = {
      nameOfOrganization: inputNameOfOrganization.value,
      postHeld:inputPostHeld.value ,
      experienceFrom: inputExperienceFrom.value,
      experienceTo: inputExperienceTo.value,
      duties: inputDuties.value,
    };
    dispatch("edit",{index,experience})
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
          <h3 class="text-3xl font-semibold">Edit Experience</h3>
          <div class=" text-gray-600">
            <Fa icon={faEdit} size="2x" />
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
              bind:error={inputNameOfOrganization.error}
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
            <!-- <TextInput
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
          /> -->
            <MonthYearInput
              bind:label={inputExperienceFrom.label}
              bind:value={inputExperienceFrom.value}
              bind:error={inputExperienceFrom.error}
              readonly={inputExperienceFrom.readonly}
           />
            <MonthYearInput
              bind:label={inputExperienceTo.label}
              bind:value={inputExperienceTo.value}
              bind:error={inputExperienceTo.error}
              readonly={inputExperienceTo.readonly}
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
        {#if alert}
          <div class="px-4">
            <Alert
              message={alert}
              on:alertClosed={() => {
                alert = null;
              }}
            />
          </div>
        {/if}
        <div class="flex flex-row justify-center mb-4 mx-4">
          <button
            on:click={() => toggleModal({ op: "cancel" })}
            type="submit"
            class="w-48 text-center bg-navy-50 hover:bg-white shadow-lg text-gray-500 font-bold py-2 px-4 rounded"
          >
            CANCEL
          </button>
          <button
            on:click={() => toggleModal({ op: "edit" })}
            type="submit"
            class="w-48  text-center bg-orange-600 hover:bg-orange-500  shadow-lg text-white font-bold py-2 px-4 rounded"
          >
            UPDATE
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="opacity-25 fixed inset-0 z-40 bg-black" />
{/if}
