<script>
  import Fa from "svelte-fa";
  import { faPlus } from "@fortawesome/free-solid-svg-icons";
  import Alert from "../../common/Alert.svelte";
  import { createEventDispatcher } from "svelte";
  import DropDown from "../../common/TwoDDropdown.svelte";
  import PublishedPaper from "./PublishedPaper.svelte";
  import Patent from "./Patent.svelte";
  import Project from "./Project.svelte";
  import TechnologyDeveloped from "./TechnologyDeveloped.svelte";
  import TechnologyTransferred from "./TechnologyTransferred.svelte";
  import Award from "./Award.svelte";
  import BookChapter from "./BookChapter.svelte";
  import Other from "./Other.svelte";

  let alertMsg = null;
  const dispatch = createEventDispatcher();
  export let showModal;
  let publishedPaper = {
    title: "",
    author: "",
    nameOfJournal: "",
    year: "",
    pages: "",
    impactFactor: "",
    doi: "",
  };
  let patent = {
    patentStatus: "",
    title: "",
    author: "",
    patentType: "",
    yearOfSubmission: "",
    patentNumber: "",
  };
  let project = {
    title: "",
    principalInvestigator: "",
    copi: "",
    fundingAgency: "",
    projectDurationFrom: "",
    projectDurationTo: "",
    projectOutlay: "",
  };
  let technologyDeveloped = {
    nameofTechnologyDeveloped: "",
    patentPublished: "",
    trl: "",
  };
  let technologyTransferred = {
    nameofTechnology: "",
    projectName: "",
    investigatorName: "",
    transferredToOrg: "",
    transferredYear: "",
    trl: "",
    costOfTechnology: "",
  };
  let award = {
    nameofAward: "",
    sponsoringAgency: "",
    awardYear: "",
  };
  let bookChapter = {
    bookTitle: "",
    bookAuthor: "",
    nameOfBook: "",
    year: "",
    pages: "",
    publishingAgency: "",
    doi: "",
  };

  let other = {
    text: "",
  };

  let validatecb = null;
  const achievementOptions = {
    Achievements: [
      "Published Paper",
      "Patent",
      "Project",
      "Technology Transferred",
      "Technology Developed",

      "Award",
      "Book Chapters",
      "Other",
    ],
  };
  let inputAchievement = {
    achievementOptions,
    selected: "",
    error: null,
    validator: {
      method: () => {
        inputAchievement.error =
          inputAchievement.selected.length === 0
            ? inputAchievement.validator.errormessage
            : null;
        return inputAchievement.error ? false : true;
      },
      errormessage: "Achievement type is required",
    },
  };

  let inputDetails = {
    label: "Details",
    value: "",
    validate: true,
    readonly: false,
    error: null,
    placeholderValue: "Details",
    error_mt: false,
    paddingsize: 0,
    validator: {
      method: (value) => {
        inputDetails.error = null;
        if (value.length <= 3) {
          inputDetails.error = inputDetails.validator.errormessage;
          return false;
        }
        return true;
      },
      errormessage: "Details can not be less than 3 chars",
    },
  };

  const validate = () => {
    let valid = true;
    if (inputAchievement.selected == "") {
      alertMsg = "please select achievement type";
      console.log(
        "validate called in ADD: ",
        inputAchievement.selected,
        alertMsg
      );
      return false;
    }
    if (validatecb && !validatecb()) {
      console.log("validatecb returned false");
      valid = false;
    } else {
      console.log("validatecb returned true");
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

    // let achievement = {
    //   achievementType: inputAchievement.selected,
    //   achievementDetails: inputDetails.value,
    // };
    // dispatch("add", { achievement });
    switch (inputAchievement.selected) {
      case "Published Paper":
        dispatch("addPublishedPapper", publishedPaper);
        break;
      case "Patent":
        dispatch("addPatent", patent);
        break;
      case "Project":
        dispatch("addProject", project);
        break;
      case "Technology Developed":
        dispatch("addTechnologyDeveloped", technologyDeveloped);
        break;
      case "Technology Transferred":
        dispatch("addTechnologyTransferred", technologyTransferred);
        break;
      case "Award":
        dispatch("addAward", award);
        break;
      case "Book Chapters":
        dispatch("addBookChapters", bookChapter);
        break;
      case "Other":
        dispatch("addOther", other);
        break;
    }
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
        <h3 class="text-3xl font-semibold">Add Achievement</h3>
        <div class=" text-gray-600">
          <Fa icon={faPlus} size="2x" />
        </div>
      </div>
      <!--body-->
      <div class="relative p-6 flex-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 ">
          <div>
            <DropDown
              lable="Type of Achievement"
              dropdownOptions={inputAchievement.achievementOptions}
              bind:selected={inputAchievement.selected}
            />

            {#if inputAchievement.error != null}
              <div class="relative">
                <span
                  class="absolute-mt-1.5 text-xs leading-none text-red-700"
                  id="passwordHelp"
                  >{inputAchievement.error}
                </span>
              </div>
            {/if}
          </div>
          {#if inputAchievement.selected == "Published Paper"}
            <PublishedPaper bind:publishedPaper bind:validate={validatecb} />
          {:else if inputAchievement.selected == "Patent"}
            <Patent bind:patent bind:validate={validatecb} />
          {:else if inputAchievement.selected == "Project"}
            <Project bind:project bind:validate={validatecb} />
          {:else if inputAchievement.selected == "Technology Developed"}
            <TechnologyDeveloped
              bind:technologyDeveloped
              bind:validate={validatecb}
            />
          {:else if inputAchievement.selected == "Technology Transferred"}
            <TechnologyTransferred
              bind:technologyTransferred
              bind:validate={validatecb}
            />
          {:else if inputAchievement.selected == "Award"}
            <Award bind:award bind:validate={validatecb} />
          {:else if inputAchievement.selected == "Book Chapters"}
            <BookChapter bind:validate={validatecb} bind:bookChapter />
          {:else if inputAchievement.selected == "Other"}
            <Other bind:other bind:validate={validatecb}/>
          {/if}
        </div>
      </div>
      {#if alertMsg}
        <div class="px-4">
          <Alert
            message={alertMsg}
            on:alertClosed={() => {
              alertMsg = null;
            }}
          />
        </div>
      {/if}
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
          class="w-48  text-center bg-blue-600 hover:bg-blue-500  shadow-lg text-white font-bold py-2 px-4 rounded"
        >
          ADD
        </button>
      </div>
    </div>
  </div>
</div>
<div class="opacity-25 fixed inset-0 z-40 bg-black" />
<!-- {/if} -->
