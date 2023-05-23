<script>
  import Fa from "svelte-fa";
  import { faTrash } from "@fortawesome/free-solid-svg-icons";
  import TextInput from "../../common/TextInput.svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  export let essentialQualification = {};
  export let showModal;
  export let index;
  const qualificationOptions = ["B.Sc", "M.Sc", "Diploma", "Engginering"];
  console.log("essentialQualification is: ", essentialQualification);
  let inputQualification = {
    label: "Qualification",
    // value: essentialQualification.qualification,
    value: essentialQualification.qualification,
    validate: false,
    readonly: true,
    placeholderValue: "Qualification",
  };

  // const { subject } =
  //   essentialQualification.qualification == "Ph.d"
  //     ? essentialQualification.phD
  //     : essentialQualification.mtechME;
  let inputSubject = {
    label: "Subject",
    value: essentialQualification.subject,
    validate: false,
    readonly: true,
    placeholderValue: "Subject",
  };

  // const { university } =
  //   essentialQualification.qualification == "Ph.d"
  //     ? essentialQualification.phD
  //     : essentialQualification.mtechME;
  let inputUniversity = {
    label: "University/Research Institute",
    value: essentialQualification.university,
    validate: false,
    readonly: true,
    error: null,
    placeholderValue: "University/Research Institute",
  };

  // const { yearOfPassing } =
  //   essentialQualification.qualification == "Ph.d"
  //     ? essentialQualification.phD
  //     : essentialQualification.mtechME;

  let inputYearOfPassing = {
    label: "Year of Passing",
    value: essentialQualification.yearOfPassing,
    validate: false,
    readonly: true,
    error: null,
    placeholderValue: "Year of Passing",
  };
  console.log("##1");
  // const { marks } =
  //   essentialQualification.qualification == "Ph.d"
  //     ? { marks: null }
  //     : essentialQualification.mtechME.marksType == "Percentage"
  //     ? essentialQualification.mtechME.percentage
  //     : { marks: null };
  let inputMarksValue = null;
  let inputPercentageValue = null;
  let inputCGPAValue = null;
  if (essentialQualification.marksType == "Percentage") {
    inputMarksValue = essentialQualification.evaluation.percentage.marks;
    inputPercentageValue =
      essentialQualification.evaluation.percentage.percentage;
  } else if (essentialQualification.marksType == "CGPA") {
    inputCGPAValue = essentialQualification.evaluation.cgpa.gpa;
  }
  let inputMarks = {
    label: "Marks",
    value: inputMarksValue,
    validate: false,
    readonly: true,
    error: null,
    placeholderValue: "Marks",
  };
  console.log("##2");

  // const { percentage } =
  //   essentialQualification.qualification == "Ph.d"
  //     ? { percentage: null }
  //     : essentialQualification.mtechME.marksType == "Percentage"
  //     ? essentialQualification.mtechME.percentage
  //     : { percentage: null };
  let inputPercentage = {
    label: "Percentage",
    value: inputPercentageValue,
    validate: false,
    readonly: true,
    error: null,
    placeholderValue: "Percentage",
  };
  // console.log("##3");

  // const { cgpa } =
  //   essentialQualification.qualification == "Ph.d"
  //     ? { cgpa: null }
  //     : essentialQualification.mtechME.marksType == "CGPA"
  //     ? { cgpa: essentialQualification.mtechME.cgpa.gpa }
  //     : { cgpa: null };
  let inputCGPA = {
    label: "CGPA",
    value: inputCGPAValue,
    validate: false,
    readonly: true,
    error: null,
    placeholderValue: "CGPA",
  };

  console.log("##4");
  // const { dateOfAward } =
  //   essentialQualification.qualification == "Ph.d"
  //     ? essentialQualification.phD
  //     : { dateOfAward: null };
  let inputDateOfAward = {
    label: "Date Of Award",
    value: essentialQualification.dateOfAward,
    validate: false,
    readonly: true,
    error: null,
    placeholderValue: "Date Of Award",
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
          class="flex items-strat justify-between p-5 border-b border-solid border-orange-200 rounded-t"
        >
          <h3 class="text-3xl font-semibold">Delete Essential Qualification</h3>
          <div class=" text-gray-600">
            <Fa icon={faTrash} size="3x" />
          </div>
        </div>
        <!--body-->
        <div class="relative p-6 flex-auto">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 ">
            <TextInput
              bind:label={inputQualification.label}
              bind:value={inputQualification.value}
              validate={inputQualification.validate}
              readonly={inputQualification.readonly}
              bind:error={inputQualification.error}
              placeholderValue={inputQualification.placeholderValue}
            />
            <TextInput
              bind:label={inputSubject.label}
              bind:value={inputSubject.value}
              validate={inputSubject.validate}
              readonly={inputSubject.readonly}
              bind:error={inputSubject.error}
              placeholderValue={inputSubject.placeholderValue}
            />
            <TextInput
              bind:label={inputUniversity.label}
              bind:value={inputUniversity.value}
              validate={inputUniversity.validate}
              readonly={inputUniversity.readonly}
              bind:error={inputUniversity.error}
              placeholderValue={inputUniversity.placeholderValue}
            />
            <TextInput
              bind:label={inputYearOfPassing.label}
              bind:value={inputYearOfPassing.value}
              validate={inputYearOfPassing.validate}
              readonly={inputYearOfPassing.readonly}
              placeholderValue={inputYearOfPassing.placeholderValue}
            />
            {#if essentialQualification.marksType == "Percentage"}
              <TextInput
                bind:label={inputMarks.label}
                bind:value={inputMarks.value}
                validate={inputMarks.validate}
                readonly={inputMarks.readonly}
                placeholderValue={inputMarks.placeholderValue}
              />
              <TextInput
                bind:label={inputPercentage.label}
                bind:value={inputPercentage.value}
                validate={inputPercentage.validate}
                readonly={inputPercentage.readonly}
                placeholderValue={inputPercentage.placeholderValue}
              />
            {:else}
              <TextInput
                bind:label={inputCGPA.label}
                bind:value={inputCGPA.value}
                validate={inputCGPA.validate}
                readonly={inputCGPA.readonly}
                placeholderValue={inputCGPA.placeholderValue}
              />
            {/if}
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
            class="w-48  text-center bg-orange-400 hover:bg-orange-500  shadow-lg text-white font-bold py-2 px-4 rounded"
          >
            DELETE
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}
