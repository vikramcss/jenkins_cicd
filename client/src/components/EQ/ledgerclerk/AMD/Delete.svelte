<script>
  import Fa from "svelte-fa";
  import InputRadioGroup from "../../../../common/InputRadioGroup.svelte";
  import { faTrash } from "@fortawesome/free-solid-svg-icons";
  import TextInput from "../../../../common/TextInput.svelte";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  export let essentialQualification = {};
  export let showModal;
  export let index;
  //   ------------------------------

  let alertMessage = null;

  const qualificationOptions = {
    Qualifications: ["Graduation", "English Typing 40", "Hindi Typing 30"],
  };

  let inputQualification = {
    label: "Qualification",
    value: essentialQualification.qualification,
    validate: false,
    readonly: true,
    error: null,
    error_mt: false,
    paddingsize: 0,
  };
  let inputBoardName = {
    label: "University/Institute",
    value: essentialQualification.boardName,
    validate: false,
    readonly: true,
    error: null,
    error_mt: false,
    paddingsize: 0,
  };
  let inputMarksType = {
    label: "Marks Type",
    value: essentialQualification.marksType,
    validate: false,
    readonly: true,
    error: null,
    error_mt: false,
    paddingsize: 0,
  };
  let inputMarks = {
    label: "Marks Obtained",
    value:
      essentialQualification.marksType == "Percentage"
        ? essentialQualification.marks
        : "",
    validate: false,
    readonly: true,
    error: null,
    error_mt: false,
    paddingsize: 0,
  };
  let inputPercentage = {
    label: "Percentage",
    value:
      essentialQualification.marksType == "Percentage"
        ? essentialQualification.percentage
        : "",
    validate: false,
    readonly: true,
    error: null,
    error_mt: false,
    paddingsize: 0,
  };
  let inputCGPA = {
    label: "CGPA/Grade",
    value:
      essentialQualification.marksType == "Percentage"
        ? ""
        : essentialQualification.cgpa,
    validate: false,
    readonly: true,
    error: null,
    error_mt: false,
    paddingsize: 0,
  };

  let inputYearOfPassing = {
    label: "Passing Year",
    value: essentialQualification.yearOfPassing,
    validate: false,
    readonly: true,
    error: null,
    error_mt: false,
    paddingsize: 0,
  };

  const validateTextField = ({ field }) => {
    let { method: validatorMethod, errormessage } = field.validator;
    let { value } = field;
    if (!value || !validatorMethod(value)) {
      field.error = errormessage;
      return false;
    }
    return true;
  };

  const sendNotification = () => {
    dispatch("del", { index });
  };

  function onDelete() {
    sendNotification();
    showModal = !showModal;
    return true;
  }

  function onCancel() {
    showModal = !showModal;
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
          class="flex items-strat justify-between p-5 border-b border-solid border-orange-200 rounded-t"
        >
          <h3 class="text-3xl font-semibold">Delete Essential Qualification</h3>

          <div class=" text-gray-600">
            <Fa icon={faTrash} size="3x" />
          </div>
        </div>
        <!--body-->
        <div class="relative p-6">
          <div class="grid grid-cols-1 md:grid-cols-2  md:gap-3 ">
            <TextInput
              label={inputQualification.label}
              value={inputQualification.value}
              paddingsize={inputQualification.paddingsize}
              readonly={true}
              validate={false}
            />
            <TextInput
              label={inputBoardName.label}
              value={inputBoardName.value}
              validate={false}
              readonly={true}
              paddingsize={inputBoardName.paddingsize}
            />
            <TextInput
              label={inputYearOfPassing.label}
              value={inputYearOfPassing.value}
              validate={false}
              readonly={true}
              paddingsize={inputYearOfPassing.paddingsize}
            />
            <TextInput
              label={inputMarksType.label}
              value={inputMarksType.value}
              validate={false}
              readonly={true}
              paddingsize={inputMarksType.paddingsize}
            />
            {#if inputMarksType.value === "Percentage"}
              <TextInput
                label={inputMarks.label}
                value={inputMarks.value}
                validate={false}
                readonly={true}
                paddingsize={inputMarksType.paddingsize}
              />
              <TextInput
                label={inputPercentage.label}
                value={inputPercentage.value}
                validate={false}
                readonly={true}
                paddingsize={inputMarksType.paddingsize}
              />
            {:else if inputMarksType.value == "CGPA/Grade"}
              <TextInput
                label={inputCGPA.label}
                value={inputCGPA.value}
                validate={false}
                readonly={true}
                paddingsize={inputMarksType.paddingsize}
              />
            {/if}
          </div>
        </div>

        <div class="flex flex-row justify-center mb-4 mx-4">
          <button
            on:click={() => onCancel()}
            type="submit"
            class="w-48 text-center bg-indigo-50 hover:bg-white shadow-lg text-gray-500 font-bold py-2 px-4 rounded"
          >
            CANCEL
          </button>
          <button
            on:click={() => onDelete()}
            type="submit"
            class="w-48  text-center bg-orange-400 hover:bg-orange-500  shadow-lg text-white font-bold py-2 px-4 rounded"
          >
            DELETE
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="opacity-25 fixed inset-0 z-40 bg-black" />
{/if}

