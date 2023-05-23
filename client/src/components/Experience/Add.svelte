<script>
  import Fa from "svelte-fa";
  import { faPlus } from "@fortawesome/free-solid-svg-icons";
  import TextInput from "../../common/TextInput.svelte";
  import MonthYearInput from "../../common/MonthYearInput.svelte";
  import { createEventDispatcher } from "svelte";
  import Alert from "../../common/Alert.svelte";
  import { DateTime } from "luxon";

  const dispatch = createEventDispatcher();
  export let showModal;
  let alert = null;

  export let experience = {
    nameOfOrganization: "",
    postHeld: "",
    experienceFrom: "",
    experienceTo: "",
    duties: "",
  };

  let inputNameOfOrganization = {
    label: "Name of organization",
    value: "",
    validate: true,
    readonly: false,
    error: null,
    placeholderValue: "Name of organization",
    error_mt: false,
    paddingsize: 0,
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
    value: "",
    validate: true,
    readonly: false,
    error: null,
    placeholderValue: "Post Held",
    error_mt: false,
    paddingsize: 0,
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
    value: "",
    validate: true,
    readonly: false,
    error: null,
    placeholderValue: "Experience From",
    error_mt: false,
    paddingsize: 0,
    validator: {
      method: (value) => {
        inputExperienceFrom.error = null;
        let day = experience.experienceFrom.split("-")[0];
        let month = experience.experienceFrom.split("-")[1];
        let year = experience.experienceFrom.split("-")[2];
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
    value: "",
    validate: true,
    readonly: false,
    error: null,
    placeholderValue: "Experience To",
    error_mt: false,
    paddingsize: 0,
    validator: {
      method: (value) => {
        inputExperienceTo.error = null;
        let day = experience.experienceTo.split("-")[0];
        let month = experience.experienceTo.split("-")[1];
        let year = experience.experienceTo.split("-")[2];
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
  const validate = () => {
    let valid = true;
    alert = null;
    console.log("experience is :", experience);
    if (
      !inputNameOfOrganization.validator.method(experience.nameOfOrganization)
    ) {
      alert = "Name of organization is mandatory";
      valid = false;
    }
    if (!inputPostHeld.validator.method(experience.postHeld)) {
      alert = "post held is mandatory";
      valid = false;
    }
    if (!inputExperienceFrom.validator.method(experience.experienceFrom)) {
      alert = "experience from in DD-MM-YYYY format is mandatory";
      valid = false;
    }
    if (!inputExperienceTo.validator.method(experience.experienceTo)) {
      alert = "experience to in DD-MM-YYYY format is mandatory";
      valid = false;
    }
    if(DateTime.fromFormat(experience.experienceFrom,"dd-MM-yyyy") > DateTime.fromFormat(experience.experienceTo,"dd-MM-yyyy"))
    {
      alert = "experience cannot be negative";
      valid = false;
    }

    if (!valid) return false;
    return true;
  };
  const save = () => {
    if (!validate()) return false;
    return true;
  };

  function toggleModal({ op }) {
    if (op === "save" && !save()) {
      console.log("save returned false");
      return false;
    }
    console.log("toggleModal called: ", op);
    showModal = !showModal;
    console.log("toggleModal called op: ", op, "showModal:", showModal);
    if (op === "cancel") return true;

    dispatch("add", { experience });
  }
</script>

<!-- {#if showModal} -->
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
        <h3 class="text-3xl font-semibold">Add Experience</h3>
        <div class=" text-gray-600">
          <Fa icon={faPlus} size="2x" />
        </div>
      </div>
      <!--body-->
      <div class="relative p-6 flex-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 ">
          <TextInput
            bind:label={inputNameOfOrganization.label}
            bind:value={experience.nameOfOrganization}
            validate={inputNameOfOrganization.validate}
            readonly={inputNameOfOrganization.readonly}
            bind:error={inputNameOfOrganization.error}
            placeholderValue={inputNameOfOrganization.placeholderValue}
            error_mt={inputNameOfOrganization.error_mt}
            bind:paddingsize={inputNameOfOrganization.paddingsize}
            validator={inputNameOfOrganization.validator}
          />
          <TextInput
            bind:label={inputPostHeld.label}
            bind:value={experience.postHeld}
            validate={inputPostHeld.validate}
            readonly={inputPostHeld.readonly}
            bind:error={inputPostHeld.error}
            placeholderValue={inputPostHeld.placeholderValue}
            error_mt={inputPostHeld.error_mt}
            bind:paddingsize={inputPostHeld.paddingsize}
            validator={inputPostHeld.validator}
          />
          <MonthYearInput
            bind:label={inputExperienceFrom.label}
            bind:value={experience.experienceFrom}
            bind:error={inputExperienceFrom.error}
            readonly={inputExperienceFrom.readonly}
          />
          <MonthYearInput
            bind:label={inputExperienceTo.label}
            bind:value={experience.experienceTo}
            bind:error={inputExperienceTo.error}
            readonly={inputExperienceTo.readonly}
          />
          <textarea
            class="rounded mt-5 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
            placeholder="Duties"
            bind:value={experience.duties}
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
          class="w-48 text-center bg-gray-50 hover:bg-white shadow-lg text-gray-500 font-bold py-2 px-4 rounded"
        >
          CANCEL
        </button>
        <button
          on:click={() => toggleModal({ op: "save" })}
          type="submit"
          class="w-48  text-center bg-orange-600 hover:bg-orange-500  shadow-lg text-white font-bold py-2 px-4 rounded"
        >
          ADD
        </button>
      </div>
    </div>
  </div>
</div>
<div class="opacity-25 fixed inset-0 z-40 bg-black" />
<!-- {/if} -->
