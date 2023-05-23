<script>
  import Fa from "svelte-fa";
  import { faTrash } from "@fortawesome/free-solid-svg-icons";
  import TextInput from "../../common/TextInput.svelte";
  import { createEventDispatcher } from "svelte";
  import PublishedPaperDelete from "./PublishedPaperDelete.svelte";
  import PatentDelete from "./PatentDelete.svelte";
  import ProjectDelete from "./ProjectDelete.svelte";
  import TechnologyDevelopedDelete from "./TechnologyDevelopedDelete.svelte";
  import TechnologyTransferredDelete from "./TechnologyTransferredDelete.svelte";
import AwardDelete from "./AwardDelete.svelte";
import BookChapterDelete from "./BookChapterDelete.svelte";
import OtherDelete from "./OtherDelete.svelte";

  const dispatch = createEventDispatcher();

  export let achievements = {};
  export let showModal;
  export let index = 0;
  export let type;
  console.log("index", index);
  console.log("type", type);
  console.log("achievements", achievements);
  let publishedPaper = {
    title: null,
    author: null,
    nameOfJournal: null,
    year: null,
    pages: null,
    impactFactor: null,
  };
  let patent = {
    patentStatus: null,
    title: null,
    author: null,
    patentType: null,
    yearOfSubmission: null,
    patentNumber: null,
  };
  let project = {
    title: null,
    principalInvestigator: null,
    copiFunctingAgency: null,
    projectDurationFrom: null,
    projectDurationTo: null,
    projectOutlay: null,
  };
  let technologyDeveloped = {
    nameofTechnologyDeveloped: null,
    durationFrom: null,
    durationTo: null,
    patentPublished: null,
  };
  let technologyTransferred = {
    nameofTechnology: null,
    projectName: null,
    investigatorName: null,
    transferredToOrg: null,
    transferredYear: null,
    trl: null,
    costOfTechnology: null,
  };
  let award = {
    nameofAward: null,
    sponsoringAgency: null,
    awardYear: null,
  };
  let bookChapter = {
    bookTitle: null,
    bookAuthor: null,
    nameOfBook: null,
    year: null,
    pages: null,
    publishingAgency: null,
  };
  let other = {
    other: null,
  };
  switch (type) {
    case "publishedPapers":
      publishedPaper = achievements.publishedPapers[index];
      console.log("publishedPaper: ", publishedPaper);
      break;

    case "patent":
      patent = achievements.patent[index];
      break;

    case "project":
      project = achievements.project[index];
      break;

    case "technologyDeveloped":
      technologyDeveloped = achievements.technologyDeveloped[index];
      break;

    case "technologyTransferred":
      technologyTransferred = achievements.technologyTransferred[index];
      break;

    case "award":
      award = achievements.award[index];
      break;

    case "bookChapter":
      bookChapter = achievements.bookChapter[index];
      break;

    case "other":
      other = achievements.other[index];
      break;
  }

  function toggleModal({ op }) {
    console.log("toggleModal called :", op);
    showModal = false;
    console.log("toggleModal called showModel:", showModal);
    if (op === "delete") {
      dispatch("del", { index, type });
    }
    showModal = false;
    return true;
  }
  const getDeleteTitle = (type) => {
    switch (type) {
      case "publishedPapers":
        return "Published Paper";
    case "patent":
        return "Patent";

    case "project":
        return "Project";

    case "technologyDeveloped":
        return "Technology Developed";

    case "technologyTransferred":
        return "Technology Transferred";

    case "award":
        return "Award";

    case "bookChapter":
        return "Book Chapter";

    case "other":
        return "Other";
      default:
        return "Oops unknown type";
    }
  };
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
          <h3 class="text-3xl font-semibold">Delete {getDeleteTitle(type)}</h3>
          <div class=" text-gray-600">
            <Fa icon={faTrash} size="2x" />
          </div>
        </div>
        <!--body-->
        <div class="grid grid-cols-2 gap-2 relative p-6 flex-auto">
          {#if type == "publishedPapers"}
            <PublishedPaperDelete {publishedPaper} />
          {:else if type == "patent"}
            <PatentDelete {patent} />
          {:else if type == "project"}
            <ProjectDelete {project} />
          {:else if type == "technologyDeveloped"}
            <TechnologyDevelopedDelete {technologyDeveloped} />
          {:else if type == "technologyTransferred"}
            <TechnologyTransferredDelete {technologyTransferred} />
          {:else if type == "award"}
            <AwardDelete {award} />
          {:else if type == "bookChapter"}
            <BookChapterDelete {bookChapter} />
          {:else if type == "other"}
            <OtherDelete {other} />
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
