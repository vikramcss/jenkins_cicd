<script>
  import Fa from "svelte-fa";
  import InputRadioGroup from "../../common/InputRadioGroup.svelte";
  import { faTrash } from "@fortawesome/free-solid-svg-icons";
  import TextInput from "../../common/TextInput.svelte";
  import { createEventDispatcher } from "svelte";
  import DropDown from "../../common/TwoDDropdown.svelte";
  import DateInput from "../../common/DateInput.svelte";
  import Alert from "../../common/Alert.svelte";
  import { format, cardNumber } from "./inputmmyyyyFormat";
  const dispatch = createEventDispatcher();
  export let essentialQualification = {};
  export let showModal;
  export let index;

  console.log("essentialQualification: ", essentialQualification);


  let inputQualification = {
    label: "Qualification",
    value: essentialQualification.qualification,
    readonly: true,
    paddingsize: 0,
  };

  let inputGraduationStream = {
    label: "Graduation Degree",
    value:
      essentialQualification.degree == "Other"
        ? essentialQualification.otherDegree
        : essentialQualification.degree,
    validate: true,
    readonly: false,
    paddingsize: 0,
  };

  let inputUniversity = {
    label: "University/Institute",
    value: essentialQualification.university,
    readonly: false,
    paddingsize: 0,
  };

  let inputYearOfPassing = {
    label: "Year of Passing",
    value: essentialQualification.yearOfPassing,
    readonly: false,
    paddingsize: 0,
  };

  let inputTypingCertificateType = {
    label: "Typeing Certificate",
    value: essentialQualification.certificateType,
    readonly: false,
    paddingsize: 0,
  };

  let inputCertifyingAuthority = {
    label: "Typing Certifying Authority",
    value: essentialQualification.certifyingAuthority == 'Other' ? essentialQualification.certifyingAuthorityOther: essentialQualification.certifyingAuthority ,
    readonly: false,
    paddingsize: 0,
  };

  let inputCertifyingAuthorityOther = {
    label: "Typing Certifying Authority",
    value: essentialQualification.certifyingAuthorityOther,
    validate: true,
    readonly: false,
    paddingsize: 0,
  };

  let inputMarks = {
    label: "Marks Obtained",
    value:
      essentialQualification.marksType == "Percentage"
        ? essentialQualification.evaluation?.percentage.marks
        : "",
    readonly: false,
    paddingsize: 0,
  };
  let inputPercentage = {
    label: "Percentage",
    value:
      essentialQualification.marksType == "Percentage"
        ? essentialQualification.evaluation?.percentage.percentage
        : "",
    readonly: false,
    paddingsize: 0,
  };
  let inputCGPA = {
    label: "CGPA",
    value:
      essentialQualification.marksType == "Percentage"
        ? ""
        : essentialQualification.evaluation?.cgpa.gpa,
    readonly: false,
    paddingsize: 0,
  };

  let inputMonth = {
    label: "Passing Month",
    value: essentialQualification.examMonth,
    readonly: false,
    paddingsize: 0,
  };

  let inputYear = {
    label: "Passing Year",
    value: essentialQualification.examYear,
    readonly: false,
    paddingsize: 0,
  };

  let inputGradeOrMarks = {
    label: "Grade or Marks",
    value: essentialQualification.gradeOrMarks,
    readonly: false,
    paddingsize: 0,
  };

  let inputSeatNumber = {
    label: "Seat no./Roll No./Certificate No.",
    value: essentialQualification.seatNumber,
    readonly: false,
    paddingsize: 0,
  };

  let inputDateOfAward = {
    label: "Date of Award",
    value: "",
    readonly: false,
    paddingsize: 0,
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
        <div class="relative p-6">
          <div class="grid grid-cols-1 md:grid-cols-2  md:gap-3 ">
            <TextInput
              bind:label={inputQualification.label}
              bind:value={inputQualification.value}
              bind:paddingsize={inputQualification.paddingsize}
              readonly={inputQualification.readonly}
            />
            {#if inputQualification.value === "Graduation"}
              <TextInput
                bind:label={inputGraduationStream.label}
                bind:value={inputGraduationStream.value}
                bind:paddingsize={inputGraduationStream.paddingsize}
                readonly={true}
              />
              <TextInput
                bind:label={inputUniversity.label}
                bind:value={inputUniversity.value}
                bind:paddingsize={inputUniversity.paddingsize}
                readonly={true}
              />
              <TextInput
                bind:label={inputYearOfPassing.label}
                bind:value={inputYearOfPassing.value}
                bind:paddingsize={inputYearOfPassing.paddingsize}
                readonly={true}
              />

              <div class=" flex gap-2 col-span-1 md:col-span-2 ">
                {#if essentialQualification.marksType === "Percentage"}
                  <div class="flex justify-between gap-2  ">
                    <TextInput
                      bind:label={inputMarks.label}
                      bind:value={inputMarks.value}
                      bind:paddingsize={inputMarks.paddingsize}
                      readonly={true}
                    />
                    <TextInput
                      bind:label={inputPercentage.label}
                      bind:value={inputPercentage.value}
                      bind:paddingsize={inputPercentage.paddingsize}
                      readonly={true}
                    />
                  </div>
                {:else}
                  <div class="flex justify-around w-full">
                    <div class=" col-span-1 md:col-span-2">
                      <TextInput
                        bind:label={inputCGPA.label}
                        bind:value={inputCGPA.value}
                        bind:paddingsize={inputCGPA.paddingsize}
                        readonly={true}
                      />
                    </div>
                  </div>
                {/if}
              </div>
            {:else if 
            inputQualification.value == "English Typing 40" ||
            inputQualification.value == "Hindi Typing 30"
            }
              <TextInput
                bind:label={inputTypingCertificateType.label}
                bind:value={inputTypingCertificateType.value}
                bind:paddingsize={inputTypingCertificateType.paddingsize}
                readonly={true}
              />
              <TextInput
                bind:label={inputCertifyingAuthority.label}
                bind:value={inputCertifyingAuthority.value}
                bind:paddingsize={inputCertifyingAuthority.paddingsize}
                readonly={true}
              />

              <TextInput
                bind:label={inputMonth.label}
                bind:value={inputMonth.value}
                bind:paddingsize={inputMonth.paddingsize}
                readonly={true}
              />

              <TextInput
                bind:label={inputYear.label}
                bind:value={inputYear.value}
                bind:paddingsize={inputYear.paddingsize}
                readonly={true}
              />
              <TextInput
                bind:label={inputGradeOrMarks.label}
                bind:value={inputGradeOrMarks.value}
                bind:paddingsize={inputGradeOrMarks.paddingsize}
                readonly={true}
              />
              <TextInput
                bind:label={inputSeatNumber.label}
                bind:value={inputSeatNumber.value}
                bind:paddingsize={inputSeatNumber.paddingsize}
                readonly={true}
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
  <div class="opacity-25 fixed inset-0 z-40 bg-black" />
{/if}
