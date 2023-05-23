<script>
  import Fa from "svelte-fa";
  import InputRadioGroup from "../../common/InputRadioGroup.svelte";
  import { faTrash } from "@fortawesome/free-solid-svg-icons";
  import TextInput from "../../common/TextInput.svelte";
  import { createEventDispatcher } from "svelte";
  import DropDown from "../../common/TwoDDropdown.svelte";
  import Alert from "../../common/Alert.svelte";
  const dispatch = createEventDispatcher();
  export let otherQualification = {};
  export let showModal;
  export let index;


  let input12thSpecialization = {
    label: "Twenth Specialization",
    value: otherQualification.twelthSpecialization,
    paddingsize: 0,
  };

  let inputMarksTypeOther = {
    label: "Marks Type",
    value: otherQualification.marksType,
    options: [otherQualification.marksType],
    error: null,
    validator: {
      method: (value) => {
        return inputMarksTypeOther.options.find((o) => o == value);
      },
      errormessage: "Enter marks must",
    },
  };

  let inputMarksOther = {
    label: "Marks Obtained",
    value: otherQualification.marks,
    paddingsize: 0,
  };

  let inputPercentageOther = {
    label: "Percentage",
    value: otherQualification.percentage,
    paddingsize: 0,
  };

  let inputCGPAOther = {
    label: "CGPA/Grade",
    value: otherQualification.cgpa,
    paddingsize: 0,
  };


  let inputQualification = {
    label: "Qualification",
    value: otherQualification.qualification,
    paddingsize: 0,
  };
  let inputSubject = {
    label: "Subject/Specialization",
    value: otherQualification.subject,
    paddingsize: 0,
  };
  let inputDegree = {
    label: "Degree",
    value: otherQualification.degree,
    paddingsize: 0,
  };

  let inputUniversity = {
    label: "University/Board",
    value: otherQualification.university,
    paddingsize: 0,
  };

  let inputDateOfAward = {
    label: "Date of Award",
    value: otherQualification.dateOfAward,
    paddingsize: 0,
  };
  let inputYearOfPassing = {
    label: "Year of Passing",
    value: otherQualification.yearOfPassing,
    paddingsize: 0,
  };
  let inputMarks = {
    label: "Marks Obtained",
    value: otherQualification.marks,
    paddingsize: 0,
  };
  let inputPercentage = {
    label: "Percentage",
    value: otherQualification.percentage,
    paddingsize: 0,
  };

  let alertMessage = null;

  function toggleModal({ op }) {
    showModal = !showModal;
    console.log("toggleModal called: ", op);
    if (op === "cancel") {
      return true;
    }
    dispatch("del", { otherQualification: {}, index });
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
          <h3 class="text-3xl font-semibold">Delete Other Qualification</h3>
          <div class=" text-gray-600">
            <Fa icon={faTrash} size="2x" />
          </div>
        </div>
        <!--body-->
        <div class="relative p-6 flex-auto">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3  ">
              <TextInput
                label={inputQualification.label}
                value={inputQualification.value}
                readonly={true}
                paddingsize={inputQualification.paddingsize}
              />

            {#if inputQualification.value === "12th"}
              <TextInput
                label={input12thSpecialization.label}
                value={input12thSpecialization.value}
                readonly={true}
                paddingsize={inputQualification.paddingsize}
              />

            {/if}
            {#if inputQualification.value === "Graduation"}
              <TextInput
                label={inputDegree.label}
                value={inputDegree.value}
                readonly={true}
                paddingsize={inputDegree.paddingsize}
              />
            {:else if inputQualification.value === "Post Graduation"}
              <TextInput
                label={inputDegree.label}
                value={inputDegree.value}
                readonly={true}
                paddingsize={inputDegree.paddingsize}
              />
            {:else if inputQualification.value === "Other"}
              <TextInput
                label={inputDegree.label}
                value={inputDegree.value}
                readonly={true}
                paddingsize={inputDegree.paddingsize}
              />
            {/if}
            {#if inputQualification.value != "10th" && inputQualification.value != "12th"}
              <TextInput
                label={inputSubject.label}
                value={inputSubject.value}
                readonly={true}
                paddingsize={inputSubject.paddingsize}
              />
            {/if}
            <TextInput
              label={inputUniversity.label}
              value={inputUniversity.value}
              readonly={true}
              paddingsize={inputUniversity.paddingsize}
            />
            {#if inputQualification.value == "PhD"}
              <TextInput
                label={inputDateOfAward.label}
                value={inputDateOfAward.value}
                readonly={true}
                paddingsize={inputDateOfAward.paddingsize}
              />
            {/if}

            <div class="gap-2 col-span-1 md:col-span-2 ">
              {#if inputQualification.value != "PhD"}
                <div class="col-span-1 md:col-span-2 flex justify-center">
                  <InputRadioGroup
                    label={inputMarksTypeOther.label}
                    options={inputMarksTypeOther.options}
                    value={inputMarksTypeOther.value}
                    error={null}
                  />
                </div>

                {#if inputMarksTypeOther.value == "Percentage"}
                  <div class=" md:flex justify-between  md:gap-2">
                    <TextInput
                      label={inputMarks.label}
                      value={inputMarks.value}
                      readonly={true}
                      paddingsize={inputMarks.paddingsize}
                    />
                    <TextInput
                      label={inputPercentage.label}
                      value={inputPercentage.value}
                      readonly={true}
                      paddingsize={inputPercentage.paddingsize}
                    />
                  </div>
                  <div>
                    <TextInput
                      label={inputYearOfPassing.label}
                      value={inputYearOfPassing.value}
                      readonly={true}
                      paddingsize={inputYearOfPassing.paddingsize}
                    />
                  </div>
                {:else if inputQualification.value != "PhD"}
                  <div class="grid grid-cols-2 md:gap-2 ">
                    <div class=" col-span-2 md:col-span-2">
                      <TextInput
                        label={inputCGPAOther.label}
                        value={inputCGPAOther.value}
                        readonly={true}
                        paddingsize={inputCGPAOther.paddingsize}
                      />
                    </div>
                    <div class=" col-span-2 md:col-span-2">
                      <TextInput
                        label={inputYearOfPassing.label}
                        value={inputYearOfPassing.value}
                        readonly={true}
                        paddingsize={inputYearOfPassing.paddingsize}
                      />
                    </div>
                  </div>
                {/if}
              {/if}
            </div>
          </div>
        </div>

        <div class="mx-5">
          {#if alertMessage}
            <Alert
              message={alertMessage}
              on:alertClosed={() => (alertMessage = null)}
            />
          {/if}
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
            on:click={() => toggleModal({ op: "save" })}
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
