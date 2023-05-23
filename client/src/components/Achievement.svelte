<script>
  import Add from "./Achievement/Add.svelte";
  import Delete from "./Achievement/Delete.svelte";
  import { createEventDispatcher } from "svelte";
  import Fa from "svelte-fa";
  import {
    faPlusCircle,
    faEdit,
    faTrash,
  } from "@fortawesome/free-solid-svg-icons";
  import TechnologyDeveloped from "./Achievement/TechnologyDeveloped.svelte";
  let addAchievement = false;
  let editAchievement = false;
  let deleteAchievement = false;
  let deleteIndex = -1;
  const dispatch = createEventDispatcher();

  // "Published Paper",
  //     "Patent",
  //     "Project",
  //     "Technology Developed",
  //     "Technology Transferred",
  //     "Award",
  //     "Recognition",
  //     "Book Chapters",
  //     "Other",

  let publishedPapers = [];
  let patent = [];
  let project = [];
  let technologyDeveloped = [];
  let technologyTransferred = [];
  let award = [];
  let recognition = [];
  let bookChapter = [];
  let other = [];
  let deleteType = null;

  const achievement = (action, index = -1, type = "none") => {
    console.log("action: ", action, " index: ", index);
    switch (action) {
      case "add":
        addAchievement = true;
        editAchievement = false;
        deleteAchievement = false;
        break;
      case "edit":
        editAchievement = true;
        addAchievement = false;
        deleteAchievement = false;
        break;
      case "delete":
        deleteType = type;
        deleteIndex = index;
        deleteAchievement = true;
        addAchievement = false;
        editAchievement = false;
        break;
    }
  };
  export let achievements = {};

  publishedPapers = achievements.publishedPapers
    ? achievements.publishedPapers
    : [];

  patent = achievements.patent ? achievements.patent : [];

  project = achievements.project ? achievements.project : [];

  technologyDeveloped = achievements.technologyDeveloped
    ? achievements.technologyDeveloped
    : [];

  technologyTransferred = achievements.technologyTransferred
    ? achievements.technologyTransferred
    : [];

  award = achievements.award ? achievements.award : [];

  bookChapter = achievements.bookChapter ? achievements.bookChapter : [];
  
  other = achievements.other ? achievements.other : [];

  const onAdd_ = (e) => {
    console.log("onAdd called: ", e.detail.achievement);
    achievements.push(e.detail.achievement);
    achievements = achievements;
  };
  const onAdd = (ev, data) => {
    console.log("received event: ", ev);

    switch (ev.toString()) {
      case "addPublishedPapper":
        publishedPapers = [...publishedPapers, data];
        console.log(publishedPapers);
        break;

      case "patent":
        patent = [...patent, data];
        console.log(patent);
        break;

      case "project":
        project = [...project, data];
        break;

      case "technologyDeveloped":
        technologyDeveloped = [...technologyDeveloped, data];
        console.log(technologyDeveloped);
        break;

      case "technologyTransferred":
        technologyTransferred = [...technologyTransferred, data];
        break;

      case "technologyTransferred":
        technologyTransferred = [...technologyTransferred, data];
        break;

      case "award":
        award = [...award, data];
        console.log(award);
        break;

      case "bookChapter":
        bookChapter = [...bookChapter, data];
        console.log(bookChapter);
        break;

      case "other":
        other = [...other, data];
        console.log(other);
        break;
    }

    if (publishedPapers.length > 0)
      achievements.publishedPapers = publishedPapers;

    if (patent.length > 0) achievements.patent = patent;

    if (project.length > 0) achievements.project = project;

    if (technologyDeveloped.length > 0)
      achievements.technologyDeveloped = technologyDeveloped;

    if (technologyTransferred.length > 0)
      achievements.technologyTransferred = technologyTransferred;

    if (award.length > 0) achievements.award = award;

    if (bookChapter.length > 0) achievements.bookChapter = bookChapter;

    if (other.length > 0) achievements.other = other;
  };

  const onDelete = (e) => {
    switch (e.detail.type) {
      case "publishedPapers":
        publishedPapers = publishedPapers.filter((p,i) => i != e.detail.index )
        achievements.publishedPapers = publishedPapers
        break;
      case "patent":
        patent = patent.filter((p,i) => i != e.detail.index )
        achievements.patent = patent
        break;
    case "project":
        project = project.filter((p,i) => i != e.detail.index )
        achievements.project = project
      break;

    case "technologyDeveloped":
        technologyDeveloped = technologyDeveloped.filter((p,i) => i != e.detail.index )
        achievements.technologyDeveloped = technologyDeveloped
      break;

    case "technologyTransferred":
        technologyTransferred = technologyTransferred.filter((p,i) => i != e.detail.index )
        achievements.technologyTransferred = technologyTransferred
      break;

    case "award":
        award = award.filter((p,i) => i != e.detail.index )
        achievements.award = award
      break;

    case "bookChapter":
        bookChapter = bookChapter.filter((p,i) => i != e.detail.index )
        achievements.bookChapter = bookChapter
      break;

    case "other":
        other = other.filter((p,i) => i != e.detail.index )
        achievements.other = other
      break;
    }
    achievements = {...achievements};
  };
  const onPrevious = (e) => {
    dispatch("saveAchievement", { action: "previous", data: {} });
  };
  const onNext = (e) => {
    dispatch("saveAchievement", { action: "next", data: {} });
  };
</script>

<div class="flex flex-col justify-center mx-2 lg:mx-20 mt-5">
  <div class="grid grid-cols-7 bg-blue-600 w-full rounded-t-lg">
    <div
      class="col-span-7 lg:col-span-6 text-white rounded-t-lg m-2 p-1 font-bold text-center lg:text-xl"
    >
      Achievement
    </div>
    <div
      class="col-span-7 lg:col-span-1 flex justify-center rounded-t-lg items-center h-12 bg-blue-600 font-bold "
    >
      <span class="text-white">Add </span>
      <div
        on:click={() => achievement("add")}
        class="flex justify-center items-center flex-inline ml-2 text-white hover:text-gray-200  text-3xl cursor-pointer"
      >
        <Fa icon={faPlusCircle} />
      </div>
    </div>

    <div
      class="flex iteams-center justify-center col-span-7 text-base text-white px-4 font-semibold"
    >
      Published Papers/ Patents/ Projects/ Technologies Developed/ Technologies Transferred/
      Awards/ Book Chapters/ Others 
    </div>
  </div>
  <div>
    <div class="grid grid-cols-12 w-full bg-gray-200 mx-1 my-2 p-1 rounded-lg ">
      <div
        class="col-span-12  border-2 mr-1 mt-1 rounded-lg shadow-2xl bg-blue-50 "
      >
        {#if publishedPapers.length > 0}
          <div
            class="bg-blue-600 text-center text-white text-md font-bold tracking-normal rounded-lg "
          >
            Published Papers
          </div>
        {/if}
        {#each publishedPapers as q, i}
          <div class="grid grid-cols-12 ">
            <div
              class="flex justify-center items-center col-span-12 lg:col-span-1 p-2 m-2 rounded-lg"
            >
              <div
                class="w-9 h-9 bg-gray-700 text-white rounded-full text-center flex items-center justify-center text-xl font-extrabold"
              >
                {i + 1}
              </div>
            </div>
            <div class="col-span-12 lg:col-span-3 p-2 bg-white m-2 rounded-lg">
              <div class="row-span-1 flex justify-center text-center text-sm">
                Title
              </div>
              <div class="row-span-1 flex justify-center text-center font-bold">
                {q.title}
                {q.author}
              </div>
            </div>
            <div class="col-span-12 lg:col-span-7 p-2 bg-white m-2 rounded-lg">
              <div class="row-span-1 flex justify-center text-center text-sm">
                Details
              </div>
              <div class="row-span-1 flex justify-center text-center font-bold">
                {q.nameOfJournal}
                {q.year}
                {q.pages}
              </div>
            </div>
            <div class="col-span-12 lg:col-span-1 p-2 bg-white m-2 rounded-lg">
              <div class="flex justify-center items-center p-1">
                <div
                  on:click={() => {}}
                  class="ml-3 inline-flex text-gray-600 hover:text-gray-900 cursor-pointer"
                >
                  <Fa icon={faEdit} />
                </div>
                <div
                  on:click={() => achievement("delete", i, "publishedPapers")}
                  class="ml-3 inline-flex text-gray-600 hover:text-gray-800 cursor-pointer"
                >
                  <Fa icon={faTrash} />
                </div>
              </div>
            </div>
          </div>
        {/each}

        {#if patent.length > 0}
          <div
            class="bg-blue-600 text-center text-white text-md font-bold tracking-normal rounded-lg"
          >
            Patents
          </div>
        {/if}
        {#each patent as p, i}
          <div class="grid grid-cols-12 ">
            <div
              class="flex justify-center items-center col-span-12 lg:col-span-1 p-2 m-2 rounded-lg"
            >
              <div
                class="w-9 h-9 bg-gray-700 text-white rounded-full text-center flex items-center justify-center text-xl font-extrabold"
              >
                {i + 1}
              </div>
            </div>
            <div class="col-span-12 lg:col-span-3 p-2 bg-white m-2 rounded-lg">
              <div class="row-span-1 flex justify-center text-center text-sm">
                Title
              </div>
              <div class="row-span-1 flex justify-center text-center font-bold">
                {p.title},
                {p.author}
              </div>
            </div>
            <div class="col-span-12 lg:col-span-7 p-2 bg-white m-2 rounded-lg">
              <div class="row-span-1 flex justify-center text-center text-sm">
                Details
              </div>
              <div class="row-span-1 flex justify-center text-center font-bold">
                {p.patentType}
                {p.yearOfSubmission}
                {p.patentNumber}
              </div>
            </div>
            <div class="col-span-12 lg:col-span-1 p-2 bg-white m-2 rounded-lg">
              <div class="flex justify-center items-center p-1">
                <div
                  on:click={() => {}}
                  class="ml-3 inline-flex text-gray-600 hover:text-gray-900 cursor-pointer"
                >
                  <Fa icon={faEdit} />
                </div>
                <div
                  on:click={() => achievement("delete", i, "patent")}
                  class="ml-3 inline-flex text-gray-600 hover:text-gray-800 cursor-pointer"
                >
                  <Fa icon={faTrash} />
                </div>
              </div>
            </div>
          </div>
        {/each}

        <!-- project -->
        {#if project.length > 0}
          <div
            class="bg-blue-600 text-center text-white text-md font-bold tracking-normal rounded-lg"
          >
            Projects
          </div>
        {/if}
        {#each project as pp, i}
          <div class="grid grid-cols-12 ">
            <div
              class="flex justify-center items-center col-span-12 lg:col-span-1 p-2 m-2 rounded-lg"
            >
              <div
                class="w-9 h-9 bg-gray-700 text-white rounded-full text-center flex items-center justify-center text-xl font-extrabold"
              >
                {i + 1}
              </div>
            </div>
            <div class="col-span-12 lg:col-span-3 p-2 bg-white m-2 rounded-lg">
              <div class="row-span-1 flex justify-center text-center text-sm">
                Title
              </div>
              <div class="row-span-1 flex justify-center text-center font-bold">
                {pp.title}
                {pp.principalInvestigator}
              </div>
            </div>
            <div class="col-span-12 lg:col-span-7 p-2 bg-white m-2 rounded-lg">
              <div class="row-span-1 flex justify-center text-center text-sm">
                Details
              </div>
              <div class="row-span-1 flex justify-center text-center font-bold">
                {pp.copi},
                {pp.fundingAgency},
                {pp.projectDurationFrom} to
                {pp.projectDurationTo}
              </div>
            </div>
            <div class="col-span-12 lg:col-span-1 p-2 bg-white m-2 rounded-lg">
              <div class="flex justify-center items-center p-1">
                <div
                  on:click={() => {}}
                  class="ml-3 inline-flex text-gray-600 hover:text-gray-900 cursor-pointer"
                >
                  <Fa icon={faEdit} />
                </div>
                <div
                  on:click={() => achievement("delete", i, "project")}
                  class="ml-3 inline-flex text-gray-600 hover:text-gray-800 cursor-pointer"
                >
                  <Fa icon={faTrash} />
                </div>
              </div>
            </div>
          </div>
        {/each}
        {#if technologyTransferred.length > 0}
          <div
            class="bg-blue-600 text-center text-white text-md font-bold tracking-normal rounded-lg"
          >
            Technology Transferred
          </div>
        {/if}

        {#each technologyTransferred as tt, i}
          <div class="grid grid-cols-12 ">
            <div
              class="flex justify-center items-center col-span-12 lg:col-span-1 p-2 m-2 rounded-lg"
            >
              <div
                class="w-9 h-9 bg-gray-700 text-white rounded-full text-center flex items-center justify-center text-xl font-extrabold"
              >
                {i + 1}
              </div>
            </div>
            <div class="col-span-12 lg:col-span-3 p-2 bg-white m-2 rounded-lg">
              <div class="row-span-1 flex justify-center text-center text-sm">
                Title
              </div>
              <div class="row-span-1 flex justify-center text-center font-bold">
                {tt.nameofTechnology}
                {tt.projectName}
              </div>
            </div>
            <div class="col-span-12 lg:col-span-7 p-2 bg-white m-2 rounded-lg">
              <div class="row-span-1 flex justify-center text-center text-sm">
                Details
              </div>
              <div class="row-span-1 flex justify-center text-center font-bold">
                {tt.investigatorName}
                {tt.transferredToOrg}
                {tt.transferredYear}
                {tt.trl}
                {tt.costOfTechnology}
              </div>
            </div>
            <div class="col-span-12 lg:col-span-1 p-2 bg-white m-2 rounded-lg">
              <div class="flex justify-center items-center p-1">
                <div
                  on:click={() => {}}
                  class="ml-3 inline-flex text-gray-600 hover:text-gray-900 cursor-pointer"
                >
                  <Fa icon={faEdit} />
                </div>
                <div
                  on:click={() => achievement("delete", i, "technologyTransferred")}
                  class="ml-3 inline-flex text-gray-600 hover:text-gray-800 cursor-pointer"
                >
                  <Fa icon={faTrash} />
                </div>
              </div>
            </div>
          </div>
        {/each}
        <!-- technologyDeveloped -->

        {#if technologyDeveloped.length > 0}
          <div
            class="bg-blue-600 text-center text-white text-md font-bold tracking-normal rounded-lg"
          >
            Technology Developed
          </div>
        {/if}
        {#each technologyDeveloped as td, i}
          <div class="grid grid-cols-12 ">
            <div
              class="flex justify-center items-center col-span-12 lg:col-span-1 p-2 m-2 rounded-lg"
            >
              <div
                class="w-9 h-9 bg-gray-700 text-white rounded-full text-center flex items-center justify-center text-xl font-extrabold"
              >
                {i + 1}
              </div>
            </div>
            <div class="col-span-12 lg:col-span-3 p-2 bg-white m-2 rounded-lg">
              <div class="row-span-1 flex justify-center text-center text-sm">
                Title
              </div>
              <div class="row-span-1 flex justify-center text-center font-bold">
                {td.nameofTechnologyDeveloped}
              </div>
            </div>
            <div class="col-span-12 lg:col-span-7 p-2 bg-white m-2 rounded-lg">
              <div class="row-span-1 flex justify-center text-center text-sm">
                Details
              </div>
              <div class="row-span-1 flex justify-center text-center font-bold">
                Patent {td.patentPublished},
                TRL {td.trl}
              </div>
            </div>
            <div class="col-span-12 lg:col-span-1 p-2 bg-white m-2 rounded-lg">
              <div class="flex justify-center items-center p-1">
                <div
                  on:click={() => {}}
                  class="ml-3 inline-flex text-gray-600 hover:text-gray-900 cursor-pointer"
                >
                  <Fa icon={faEdit} />
                </div>
                <div
                  on:click={() => achievement("delete", i, "technologyDeveloped")}
                  class="ml-3 inline-flex text-gray-600 hover:text-gray-800 cursor-pointer"
                >
                  <Fa icon={faTrash} />
                </div>
              </div>
            </div>
          </div>
        {/each}

        <!-- technologyTransfered -->
        <!-- award -->
        {#if award.length > 0}
          <div
            class="bg-blue-600 text-center text-white text-md font-bold tracking-normal rounded-lg"
          >
            Awards
          </div>
        {/if}
        {#each award as a, i}
          <div class="grid grid-cols-12 ">
            <div
              class="flex justify-center items-center col-span-12 lg:col-span-1 p-2 m-2 rounded-lg"
            >
              <div
                class="w-9 h-9 bg-gray-700 text-white rounded-full text-center flex items-center justify-center text-xl font-extrabold"
              >
                {i + 1}
              </div>
            </div>
            <div class="col-span-12 lg:col-span-3 p-2 bg-white m-2 rounded-lg">
              <div class="row-span-1 flex justify-center text-center text-sm">
                Title
              </div>
              <div class="row-span-1 flex justify-center text-center font-bold">
                {a.nameofAward}
              </div>
            </div>
            <div class="col-span-12 lg:col-span-7 p-2 bg-white m-2 rounded-lg">
              <div class="row-span-1 flex justify-center text-center text-sm">
                Details
              </div>
              <div class="row-span-1 flex justify-center text-center font-bold">
                {a.sponsoringAgency}
                {a.awardYear}
              </div>
            </div>
            <div class="col-span-12 lg:col-span-1 p-2 bg-white m-2 rounded-lg">
              <div class="flex justify-center items-center p-1">
                <div
                  on:click={() => {}}
                  class="ml-3 inline-flex text-gray-600 hover:text-gray-900 cursor-pointer"
                >
                  <Fa icon={faEdit} />
                </div>
                <div
                  on:click={() => achievement("delete", i, "award")}
                  class="ml-3 inline-flex text-gray-600 hover:text-gray-800 cursor-pointer"
                >
                  <Fa icon={faTrash} />
                </div>
              </div>
            </div>
          </div>
        {/each}

        <!-- bookchapter -->
        {#if bookChapter.length > 0}
          <div
            class="bg-blue-600 text-center text-white text-lg text-bold rounded-lg"
          >
            Book Chapters
          </div>
        {/if}
        {#each bookChapter as bc, i}
          <div class="grid grid-cols-12 ">
            <div
              class="flex justify-center items-center col-span-12 lg:col-span-1 p-2 m-2 rounded-lg"
            >
              <div
                class="w-9 h-9 bg-gray-700 text-white rounded-full text-center flex items-center justify-center text-xl font-extrabold"
              >
                {i + 1}
              </div>
            </div>
            <div class="col-span-12 lg:col-span-3 p-2 bg-white m-2 rounded-lg">
              <div class="row-span-1 flex justify-center text-center text-sm">
                Title
              </div>
              <div class="row-span-1 flex justify-center text-center font-bold">
                {bc.bookTitle}
              </div>
            </div>
            <div class="col-span-12 lg:col-span-7 p-2 bg-white m-2 rounded-lg">
              <div class="row-span-1 flex justify-center text-center text-sm">
                Details
              </div>
              <div class="row-span-1 flex justify-center text-center font-bold">
                {bc.bookAuthor},
                {bc.nameOfBook},
                {bc.year},
                {bc.pages},
                {bc.publishingAgency}
              </div>
            </div>
            <div class="col-span-12 lg:col-span-1 p-2 bg-white m-2 rounded-lg">
              <div class="flex justify-center items-center p-1">
                <div
                  on:click={() => {}}
                  class="ml-3 inline-flex text-gray-600 hover:text-gray-900 cursor-pointer"
                >
                  <Fa icon={faEdit} />
                </div>
                <div
                  on:click={() => achievement("delete", i, "bookChapter")}
                  class="ml-3 inline-flex text-gray-600 hover:text-gray-800 cursor-pointer"
                >
                  <Fa icon={faTrash} />
                </div>
              </div>
            </div>
          </div>
        {/each}

        <!-- other -->
        {#if other.length > 0}
          <div
            class="bg-blue-600 text-center text-white text-lg text-bold rounded-lg"
          >
            Others
          </div>
        {/if}
        {#each other as o, i}
          <div class="grid grid-cols-12 ">
            <div
              class="flex justify-center items-center col-span-12 lg:col-span-1 p-2 m-2 rounded-lg"
            >
              <div
                class="w-9 h-9 bg-gray-700 text-white rounded-full text-center flex items-center justify-center text-xl font-extrabold"
              >
                {i + 1}
              </div>
            </div>
            <div class="col-span-12 lg:col-span-3 p-2 bg-white m-2 rounded-lg">
              <div class="row-span-1 flex justify-center text-center text-sm">
                Title
              </div>
              <div class="row-span-1 flex justify-center text-center font-bold">
                {o.text}
              </div>
            </div>
            <div class="col-span-12 lg:col-span-7 p-2 bg-white m-2 rounded-lg">
              <div class="row-span-1 flex justify-center text-center text-sm">
                Details
              </div>
              <div
                class="row-span-1 flex justify-center text-center font-bold"
              />
            </div>
            <div class="col-span-12 lg:col-span-1 p-2 bg-white m-2 rounded-lg">
              <div class="flex justify-center items-center p-1">
                
                
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>

{#if addAchievement}
  <Add
    on:addOther={(e) => {
      onAdd("other", e.detail);
    }}
    on:addBookChapters={(e) => {
      onAdd("bookChapter", e.detail);
    }}
    on:addAward={(e) => {
      onAdd("award", e.detail);
    }}
    on:addTechnologyTransferred={(e) => {
      onAdd("technologyTransferred", e.detail);
    }}
    on:addTechnologyDeveloped={(e) => {
      onAdd("technologyDeveloped", e.detail);
    }}
    on:addProject={(e) => {
      onAdd("project", e.detail);
    }}
    on:addPatent={(e) => {
      onAdd("patent", e.detail);
    }}
    on:addPublishedPapper={(e) => {
      onAdd("addPublishedPapper", e.detail);
    }}
    on:add={onAdd_}
    bind:showModal={addAchievement}
  />
{:else if deleteAchievement}
  <Delete
    on:del={onDelete}
    bind:showModal={deleteAchievement}
    index={deleteIndex}
    {achievements}
    type={deleteType}
  />
  <!-- <Add on:add={onDelete} bind:showModal={deleteExperience} /> -->
{/if}
