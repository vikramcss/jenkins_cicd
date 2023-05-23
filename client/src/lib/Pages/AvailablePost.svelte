<script>
  import QualificationCard from "./../../components/cards/JobCard3.svelte";
  import QualificationCardDisabled from "./../../components/cards/JobCard4.svelte";
  import Heading from "./../../components/cards/CardHeading.svelte";
  import ProfileCard from "./../Pages/ProfileCard.svelte";
  import { goto } from "$app/navigation";
  import { DateTime } from "luxon";
  import {
    postIdMap,
    postHandicapped,
    postCategory,
  } from "../../data/postIdMap";
  import { postAppId, impactedRecord } from "../../stores/stores";
  export let login;
  export let mobile;
  export let application;
  export let availablePosts;

  const isProfileDisabled = (app) => {
    console.log("postIdMap: ", app);
    let disabled = false;

    postIdMap.forEach((pm) => {
      let postRecord = pm.record;
      if (
        (app && app[postRecord] && app[postRecord].confirmation_client) ||
        (app && app[postRecord] && app[postRecord].confirmation_server)
      ) {
        disabled = true;
      }
    });
    return disabled;
  };

  $: profileDisabled = isProfileDisabled(application);
  let Q0Card = availablePosts.filter(
    (p) => p.postClassification == "1" && p.sub_title == "7th"
  );
  let Q1Card = availablePosts.filter(
    (p) => p.postClassification == "2" && p.sub_title == "10th"
  );
  let Q2Card = availablePosts.filter((p) => p.postClassification == "2");
  let Q3Card = availablePosts.filter((p) => p.postClassification == "3");
  let Q4Card = availablePosts.filter((p) => p.postClassification == "6");
  let Q5Card = availablePosts.filter((p) => p.postClassification == "5");
  const onApply = (postId) => {
    let postRecord = postIdMap.find((pm) => pm.postId == postId).record;
    if (application[postRecord]) {
      $postAppId = application[postRecord].appid;
    }
    $postAppId = "";
    if ($impactedRecord?.applications) {
      let impactedPost = $impactedRecord.applications.find(
        (e) => e.postName == postRecord
      );
      if (
        impactedPost &&
        !(impactedPost.confirmation_client || impactedPost.confirmation_server)
      ) {
        goto("/feeImpacted");
        return;
      }
    }
    goto(`/dashboard/${postId}`);
  };
  const isStillFeeImpacted = () => {
    if ($impactedRecord?.applications) {
      let feeNotPaid = $impactedRecord.applications.find(
        (e) => !(e.confirmation_client || e.confirmation_server)
      );
      if (feeNotPaid) {
        return true;
      }
      return false;
    }
  };
  const dobCriteria = [
    {
      postName: "Mazdoor",
      postId: "11",
      minAgeLimit: 21,
      maxAgeLimit: 30,
      relaxation: {
        SC: 0,
        ST: 0,
        OBC: 3,
        widowOrDivorced: 5,
        pwd: 10,
        govemployee: 10,
      },
    },
    {
      postName: "Disinfector",
      postId: "12",
      minAgeLimit: 21,
      maxAgeLimit: 30,
      relaxation: {
        SC: 0,
        ST: 0,
        OBC: 0,
        widowOrDivorced: 5,
        pwd: 10,
        govemployee: 10,
      },
    },
    {
      postName: "Driver",
      postId: "21",
      minAgeLimit: 21,
      maxAgeLimit: 30,
      relaxation: {
        SC: 0,
        ST: 5,
        OBC: 3,
        widowOrDivorced: 5,
        pwd: 10,
        govemployee: 10,
      },
    },
    {
      postName: "Ayah",
      postId: "13",
      minAgeLimit: 21,
      maxAgeLimit: 30,
      relaxation: {
        SC: 0,
        ST: 0,
        OBC: 3,
        widowOrDivorced: 5,
        pwd: 10,
        govemployee: 10,
      },
    },
    {
      postName: "Store Coolie",
      postId: "14",
      minAgeLimit: 21,
      maxAgeLimit: 30,
      relaxation: {
        SC: 0,
        ST: 0,
        OBC: 3,
        widowOrDivorced: 5,
        pwd: 10,
        govemployee: 10,
      },
    },
    {
      postName: "Safaikarmachari",
      postId: "15",
      minAgeLimit: 21,
      maxAgeLimit: 30,
      relaxation: {
        SC: 0,
        ST: 5,
        OBC: 3,
        widowOrDivorced: 5,
        pwd: 10,
        govemployee: 10,
      },
    },

    {
      postName: "Peon",
      postId: "24",
      minAgeLimit: 21,
      maxAgeLimit: 30,
      relaxation: {
        SC: 0,
        ST: 0,
        OBC: 0,
        widowOrDivorced: 5,
        pwd: 10,
        govemployee: 10,
      },
    },
    {
      postName: "Watchman",
      postId: "25",
      minAgeLimit: 21,
      maxAgeLimit: 30,
      relaxation: {
        SC: 0,
        ST: 0,
        OBC: 3,
        widowOrDivorced: 5,
        pwd: 10,
        govemployee: 10,
      },
    },

    {
      postName: "Nursing Orderly",
      postId: "23",
      minAgeLimit: 21,
      maxAgeLimit: 30,
      relaxation: {
        SC: 0,
        ST: 0,
        OBC: 0,
        widowOrDivorced: 5,
        pwd: 10,
        govemployee: 10,
      },
    },

    {
      postName: "Mason",
      postId: "26",
      minAgeLimit: 21,
      maxAgeLimit: 30,
      relaxation: {
        SC: 0,
        ST: 0,
        OBC: 0,
        widowOrDivorced: 5,
        pwd: 10,
        govemployee: 10,
      },
    },

    {
      postName: "Fitter",
      postId: "31",
      minAgeLimit: 21,
      maxAgeLimit: 30,
      relaxation: {
        SC: 0,
        ST: 0,
        OBC: 0,
        widowOrDivorced: 5,
        pwd: 10,
        govemployee: 10,
      },
    },

    {
      postName: "Pump Attendant",
      postId: "27",
      minAgeLimit: 21,
      maxAgeLimit: 30,
      relaxation: {
        SC: 0,
        ST: 0,
        OBC: 0,
        widowOrDivorced: 5,
        pwd: 10,
        govemployee: 10,
      },
    },
    {
      postName: "Mali",
      postId: "28",
      minAgeLimit: 21,
      maxAgeLimit: 30,
      relaxation: {
        SC: 5,
        ST: 5,
        OBC: 3,
        widowOrDivorced: 5,
        pwd: 10,
        govemployee: 10,
      },
    },
    {
      postName: "Dresser",
      postId: "29",
      minAgeLimit: 21,
      maxAgeLimit: 30,
      relaxation: {
        SC: 0,
        ST: 0,
        OBC: 0,
        widowOrDivorced: 5,
        pwd: 10,
        govemployee: 10,
      },
    },
    {
      postName: "Auto-Mechanic",
      postId: "30",
      minAgeLimit: 21,
      maxAgeLimit: 30,
      relaxation: {
        SC: 0,
        ST: 0,
        OBC: 0,
        widowOrDivorced: 5,
        pwd: 10,
        govemployee: 10,
      },
    },

    {
      postName: "FBS Lascar",
      postId: "32",
      minAgeLimit: 21,
      maxAgeLimit: 30,
      relaxation: {
        SC: 5,
        ST: 5,
        OBC: 0,
        widowOrDivorced: 5,
        pwd: 10,
        govemployee: 10,
      },
    },

    {
      postName: "Lab Attendant",
      postId: "22",
      minAgeLimit: 21,
      maxAgeLimit: 30,
      relaxation: {
        SC: 0,
        ST: 0,
        OBC: 0,
        widowOrDivorced: 5,
        pwd: 10,
        govemployee: 10,
      },
    },

    {
      postName: "Lab Assistant",
      postId: "41",
      minAgeLimit: 21,
      maxAgeLimit: 30,
      relaxation: {
        SC: 0,
        ST: 0,
        OBC: 0,
        widowOrDivorced: 5,
        pwd: 10,
        govemployee: 10,
      },
    },

    {
      postName: "Computer Programmer",
      postId: "601",
      minAgeLimit: 21,
      maxAgeLimit: 30,
      relaxation: {
        SC: 0,
        ST: 0,
        OBC: 0,
        widowOrDivorced: 5,
        pwd: 10,
        govemployee: 10,
      },
    },
    {
      postName: "Work Shop Superintendent",
      postId: "602",
      minAgeLimit: 21,
      maxAgeLimit: 30,
      relaxation: {
        SC: 0,
        ST: 0,
        OBC: 0,
        widowOrDivorced: 5,
        pwd: 10,
        govemployee: 10,
      },
    },
    {
      postName: "Fire Brigade Superintendent ",
      postId: "603",
      minAgeLimit: 21,
      maxAgeLimit: 30,
      relaxation: {
        SC: 0,
        ST: 0,
        OBC: 0,
        widowOrDivorced: 5,
        pwd: 10,
        govemployee: 10,
      },
    },
    {
      postName: "Asst Market Supdt",
      postId: "604",
      minAgeLimit: 21,
      maxAgeLimit: 30,
      relaxation: {
        SC: 0,
        ST: 0,
        OBC: 0,
        widowOrDivorced: 5,
        pwd: 10,
        govemployee: 10,
      },
    },
    {
      postName: "Health Supervisor",
      postId: "605",
      minAgeLimit: 21,
      maxAgeLimit: 30,
      relaxation: {
        SC: 0,
        ST: 0,
        OBC: 0,
        widowOrDivorced: 5,
        pwd: 10,
        govemployee: 10,
      },
    },
    {
      postName: "Assistant Medical Officer",
      postId: "606",
      minAgeLimit: 23,
      maxAgeLimit: 35,
      relaxation: {
        SC: 0,
        ST: 5,
        OBC: 3,
        widowOrDivorced: 5,
        pwd: 10,
        govemployee: 10,
      },
    },
    {
      postName: "High School Teacher(B.Ed)",
      postId: "607",
      minAgeLimit: 21,
      maxAgeLimit: 30,
      relaxation: {
        SC: 5,
        ST: 5,
        OBC: 3,
        widowOrDivorced: 5,
        pwd: 10,
        govemployee: 10,
      },
    },
    {
      postName: "Health Inspector",
      postId: "608",
      minAgeLimit: 21,
      maxAgeLimit: 30,
      relaxation: {
        SC: 5,
        ST: 0,
        OBC: 3,
        widowOrDivorced: 5,
        pwd: 10,
        govemployee: 10,
      },
    },
    {
      postName: "Junior Electrical Engineer",
      postId: "609",
      minAgeLimit: 21,
      maxAgeLimit: 30,
      relaxation: {
        SC: 0,
        ST: 0,
        OBC: 0,
        widowOrDivorced: 5,
        pwd: 10,
        govemployee: 10,
      },
    },
    {
      postName: "Junior Civil Engineer",
      postId: "610",
      minAgeLimit: 21,
      maxAgeLimit: 30,
      relaxation: {
        SC: 0,
        ST: 0,
        OBC: 3,
        widowOrDivorced: 5,
        pwd: 10,
        govemployee: 10,
      },
    },
    {
      postName: "Junior Clerk",
      postId: "611",
      minAgeLimit: 21,
      maxAgeLimit: 30,
      relaxation: {
        SC: 5,
        ST: 5,
        OBC: 3,
        widowOrDivorced: 5,
        pwd: 10,
        govemployee: 10,
      },
    },
    {
      postName: "Ledger Clerk",
      postId: "612",
      minAgeLimit: 21,
      maxAgeLimit: 30,
      relaxation: {
        SC: 0,
        ST: 0,
        OBC: 0,
        widowOrDivorced: 5,
        pwd: 10,
        govemployee: 10,
      },
    },
    {
      postName: "Hindi Typist",
      postId: "613",
      minAgeLimit: 21,
      maxAgeLimit: 30,
      relaxation: {
        SC: 0,
        ST: 0,
        OBC: 0,
        widowOrDivorced: 5,
        pwd: 10,
        govemployee: 10,
      },
    },
    {
      postName: "Lab Technician",
      postId: "614",
      minAgeLimit: 21,
      maxAgeLimit: 30,
      relaxation: {
        SC: 0,
        ST: 0,
        OBC: 0,
        widowOrDivorced: 5,
        pwd: 10,
        govemployee: 10,
      },
    },
    {
      postName: "Staff Nurse",
      postId: "615",
      minAgeLimit: 21,
      maxAgeLimit: 30,
      relaxation: {
        SC: 0,
        ST: 0,
        OBC: 3,
        widowOrDivorced: 5,
        pwd: 10,
        govemployee: 10,
      },
    },
    {
      postName: "D.Ed Teacher",
      postId: "616",
      minAgeLimit: 21,
      maxAgeLimit: 30,
      relaxation: {
        SC: 5,
        ST: 5,
        OBC: 3,
        widowOrDivorced: 5,
        pwd: 10,
        govemployee: 10,
      },
    },
  ];
  let applicationEndDate = DateTime.fromISO("2023-04-04");
  const getAgeFormatted = (lDOB) => {
    if (lDOB) {
      let dob = DateTime.fromFormat(lDOB, "dd-MM-yyyy");
      const diff = applicationEndDate.diff(dob, ["years", "months", "days"]);
      return `age: ${diff.values.years} years ${diff.values.months} months ${diff.values.days} days`;
    }
    return "";
  };
  const getAge = (lDOB) => {
    if (lDOB) {
      let dob = DateTime.fromFormat(lDOB, "dd-MM-yyyy");
      const diff = applicationEndDate.diff(dob, ["years"]);
      return diff.values.years;
    }
    return "";
  };

  let getMaxAgeWithRelaxation = (app, postId) => {
    let maxAgeLimit = dobCriteria.find((e) => e.postId == postId).maxAgeLimit;
    let ageRelaxation = 0;
    let criteriaRec = dobCriteria.find((ar) => ar.postId == postId);
    let {
      category,
      exserviceman,
      pwd,
      govemployee,
      widowOrDivorced,
      periodofservice,
    } = app.personalInfo;
    if (category == "SC" || category == "ST" || category == "OBC") {
      let relaxation = criteriaRec.relaxation[category];
      ageRelaxation = relaxation;
    }
    if (widowOrDivorced == "Yes") {
      ageRelaxation = ageRelaxation + 5;
    }
    let esmRelaxation = 0;
    let govemployeeRelaxation = 0;
    let pwdRelaxation = 0;

    if (exserviceman == "Yes") {
      esmRelaxation = 3 + Number(periodofservice);
    }
    if (govemployee == "Yes") {
      govemployeeRelaxation = criteriaRec.relaxation.govemployee;
    }
    if (pwd == "Yes") {
      pwdRelaxation = 10;
    }
    let maxRelaxation = Math.max(
      esmRelaxation,
      govemployeeRelaxation,
      pwdRelaxation
    );
    ageRelaxation = ageRelaxation + maxRelaxation;

    return maxAgeLimit + ageRelaxation >= 50 ? 50 : maxAgeLimit + ageRelaxation;
  };

  const ageQualified = (postId, application) => {
    let age = getAge(application.personalInfo.dob);
    let ageLimit = {
      min: dobCriteria.find((e) => e.postId == postId).minAgeLimit,
      max: getMaxAgeWithRelaxation(application, postId),
    };
    console.log("age limit for postId: ", postId, " is:", ageLimit);
    if (age < ageLimit.min || age > ageLimit.max) {
      return false;
    }
    return true;
  };
  const handicappedQualified = (postId, application) => {
    console.log("handicapped ", postId);
    if (application.personalInfo.pwd == "No") return true;

    let phApplicable = postHandicapped.find(
      (e) => e.postId == postId
    ).handicappedApplicable;

    if (!phApplicable) return false;

    let handicappedOptions = postHandicapped.find(
      (e) => e.postId == postId
    ).handicappedTypes;

    let found = handicappedOptions.find(
      (o) => o == application.personalInfo.PWDType
    );
    if (!found) return false;

    return true;
  };

  const postQualified = (postId, application) => {
    let found = postCategory.find((e) => e.postId == postId);
    if (!found) return true;

    let category = application.personalInfo.category;

    switch (category) {
      case "SC":
        return found.SC;
      case "ST":
        return found.ST;
      case "OBC":
        return found.OBC;
      case "EWS":
        return found.EWS;
      default:
        return false;
    }
  };

  const handicappedDisqualifiedMessage = (postId, application) => {
    console.log("handicapped", handicappedQualified(postId, application));
    if (!handicappedQualified(postId, application)) {
      console.log(
        "Disqualified because your handicapped category is not identified for this post"
      );
      return "Disqualified because your handicapped category is not identified for this post";
    }
    return "";
  };

  const categoryDisqualifiedMessage = (postId, application) => {
    if (!postQualified(postId, application)) {
      return `Disqualified because vacancies are not available for ${application.personalInfo.category} or UR category`;
    }
    return "";
  };
</script>

<ProfileCard
  profileCompleted={application?.profileCompleted}
  updated_at={application?.updated_at}
  disabled={profileDisabled}
  on:addUpdateProfile
/>
{#if isStillFeeImpacted()}
  <div class="bg-orange-200 m-3 p-3 flex justify-center items-center">
    <button
      class="bg-orange-700 text-white p-3 rounded"
      on:click={() => goto("/feeImpacted")}
    >
      You have paid shot fees for one or more posts, please pay the remaining
      fees
    </button>
  </div>
{/if}
{#if application && application.profileCompleted && application.profileCompleted == "Done"}
  <div class="grid grid-cols-5 ">
    <div class="col-span-5 lg:col-span-1  bg-gray-200 gap-2 p-3 m-3 rounded-md">
      <Heading title={"7th"} />
      {#each Q0Card as { postName, qualification, postId }, i}
        {#if application.personalInfo.gender == "Male" && postName == "Ayah"}
          <QualificationCardDisabled
            {postName}
            qualification={"notapplicable"}
          />
        {:else if handicappedQualified(postId, application) && ageQualified(postId, application) && !application[postIdMap.find( (ele) => {
                return ele.postId == postId;
              } ).record]?.confirmation_client && !application[postIdMap.find( (ele) => {
                return ele.postId == postId;
              } ).record]?.confirmation_server}
          <QualificationCard
            {postName}
            {qualification}
            on:click={() => {
              onApply(postId);
            }}
          />
        {:else if application[postIdMap.find((ele) => {
            return ele.postId == postId;
          }).record]?.confirmation_client || application[postIdMap.find( (ele) => {
                return ele.postId == postId;
              } ).record]?.confirmation_server}
          <QualificationCard
            {postName}
            qualification={"Applied"}
            on:click={() => {
              onApply(postId);
            }}
          />
        {:else}
          <QualificationCardDisabled
            handicappedDisqualifiedMessage={() =>
              handicappedDisqualifiedMessage(postId, application)}
            {postName}
            {qualification}
            age={getAgeFormatted(application.personalInfo.dob)}
            ageLimit={getMaxAgeWithRelaxation(application, postId)}
            on:click={() => {
              onApply(postId);
            }}
          />
        {/if}
      {/each}
      <!-- <Heading title={"8th"} />
      {#each Q1Card as { postName, qualification, postId }, i}
        {#if handicappedQualified(postId, application) && ageQualified(postId, application) && !application[postIdMap.find( (ele) => {
                return ele.postId == postId;
              } ).record]?.confirmation_client && !application[postIdMap.find( (ele) => {
                return ele.postId == postId;
              } ).record]?.confirmation_server && (application.personalInfo.gender == "Male" || application.personalInfo.gender == "Transgender") && postName != "Ward Aya"}
          <QualificationCard
            {postName}
            {qualification}
            on:click={() => {
              onApply(postId);
            }}
          />
        {:else if ageQualified(postId, application) && !application[postIdMap.find( (ele) => {
                return ele.postId == postId;
              } ).record]?.confirmation_client && !application[postIdMap.find( (ele) => {
                return ele.postId == postId;
              } ).record]?.confirmation_server && (application.personalInfo.gender == "Female" || application.personalInfo.gender == "Transgender") && postName != "Ward Boy"}
          <QualificationCard
            {postName}
            {qualification}
            on:click={() => {
              onApply(postId);
            }}
          />
        {:else if application[postIdMap.find((ele) => {
            return ele.postId == postId;
          }).record]?.confirmation_client || application[postIdMap.find( (ele) => {
                return ele.postId == postId;
              } ).record]?.confirmation_server}
          <QualificationCard
            {postName}
            qualification={"Applied"}
            on:click={() => {
              onApply(postId);
            }}
          />
        {:else if application.personalInfo.gender == "Male" && postName == "Ward Aya"}
          <QualificationCardDisabled
            {postName}
            qualification={"notapplicable"}
          />
        {:else if application.personalInfo.gender == "Female" && postName == "Ward Boy"}
          <QualificationCardDisabled
            {postName}
            qualification={"notapplicable"}
          />
        {:else}
          <QualificationCardDisabled
            handicappedDisqualifiedMessage={() =>
              handicappedDisqualifiedMessage(postId, application)}
            {postName}
            {qualification}
            age={getAgeFormatted(application.personalInfo.dob)}
            ageLimit={getMaxAgeWithRelaxation(application, postId)}
            on:click={() => {
              onApply(postId);
            }}
          />
        {/if}
      {/each} -->
    </div>
    <div class="col-span-5 lg:col-span-1 bg-gray-200 gap-2 p-3 m-3 rounded-md">
      <Heading title={"10th & Certification"} />
      {#each Q2Card as { postName, qualification, postId }, i}
        {#if postQualified(postId, application) && handicappedQualified(postId, application) && ageQualified(postId, application) && !application[postIdMap.find( (ele) => {
                return ele.postId == postId;
              } ).record]?.confirmation_client && !application[postIdMap.find( (ele) => {
                return ele.postId == postId;
              } ).record]?.confirmation_server}
          <QualificationCard
            {postName}
            {qualification}
            on:click={() => {
              onApply(postId);
            }}
          />
        {:else if application[postIdMap.find((ele) => {
            return ele.postId == postId;
          }).record]?.confirmation_client || application[postIdMap.find( (ele) => {
                return ele.postId == postId;
              } ).record]?.confirmation_server}
          <QualificationCard
            {postName}
            qualification={"Applied"}
            on:click={() => {
              onApply(postId);
            }}
          />
        {:else}
          <QualificationCardDisabled
            categoryQualified={() =>
              categoryDisqualifiedMessage(postId, application)}
            handicappedDisqualifiedMessage={() =>
              handicappedDisqualifiedMessage(postId, application)}
            {postName}
            {qualification}
            age={getAgeFormatted(application.personalInfo.dob)}
            ageLimit={getMaxAgeWithRelaxation(application, postId)}
            on:click={() => {
              onApply(postId);
            }}
          />
        {/if}
      {/each}
    </div>
    <div class="col-span-5 lg:col-span-1 bg-gray-200 gap-2 p-3 m-3 rounded-md">
      <Heading title={"12th & Certification"} />
      {#each Q3Card as { postName, qualification, postId }, i}
        {#if handicappedQualified(postId, application) && ageQualified(postId, application) && !application[postIdMap.find( (ele) => {
                return ele.postId == postId;
              } ).record]?.confirmation_client && !application[postIdMap.find( (ele) => {
                return ele.postId == postId;
              } ).record]?.confirmation_server}
          <QualificationCard
            {postName}
            {qualification}
            on:click={() => {
              onApply(postId);
            }}
          />
        {:else if application[postIdMap.find((ele) => {
            return ele.postId == postId;
          }).record]?.confirmation_client || application[postIdMap.find( (ele) => {
                return ele.postId == postId;
              } ).record]?.confirmation_server}
          <QualificationCard
            {postName}
            qualification={"Applied"}
            on:click={() => {
              onApply(postId);
            }}
          />
        {:else}
          <QualificationCardDisabled
            handicappedDisqualifiedMessage={() =>
              handicappedDisqualifiedMessage(postId, application)}
            {postName}
            {qualification}
            age={getAgeFormatted(application.personalInfo.dob)}
            ageLimit={getMaxAgeWithRelaxation(application, postId)}
            on:click={() => {
              onApply(postId);
            }}
          />
        {/if}
      {/each}
    </div>

    <div class="col-span-5 lg:col-span-2 bg-gray-200 gap-2 p-3 m-3 rounded-md">
      <div class="col-span-2">
        <Heading title={"Diploma/Degree"} />
        <div class="grid grid-cols-2 gap-1 ">
          {#each Q4Card as { postName, qualification, postId }, i}
            {#if handicappedQualified(postId, application) && ageQualified(postId, application) && !application[postIdMap.find( (ele) => {
                    return ele.postId == postId;
                  } ).record]?.confirmation_client && !application[postIdMap.find( (ele) => {
                    return ele.postId == postId;
                  } ).record]?.confirmation_server}
              <QualificationCard
                {postName}
                qualification={"Diploma/Degree"}
                on:click={() => {
                  onApply(postId);
                }}
              />
            {:else if application[postIdMap.find((ele) => {
                return ele.postId == postId;
              }).record]?.confirmation_client || application[postIdMap.find( (ele) => {
                    return ele.postId == postId;
                  } ).record]?.confirmation_server}
              <QualificationCard
                {postName}
                qualification={"Applied"}
                on:click={() => {
                  onApply(postId);
                }}
              />
            {:else}
              <QualificationCardDisabled
                handicappedDisqualifiedMessage={() =>
                  handicappedDisqualifiedMessage(postId, application)}
                {postName}
                {qualification}
                age={getAgeFormatted(application.personalInfo.dob)}
                ageLimit={getMaxAgeWithRelaxation(application, postId)}
                on:click={() => {
                  onApply(postId);
                }}
              />
            {/if}
          {/each}
        </div>
      </div>
    </div>
    <!-- <div class="col-span-5 lg:col-span-1 bg-gray-200 gap-2 p-3 m-3 rounded-md">
      <Heading title={"MBBS Doctors"} />
      {#each Q5Card as { postName, qualification, postId }, i}
        {#if handicappedQualified(postId, application) && ageQualified(postId, application) && !application[postIdMap.find( (ele) => {
                return ele.postId == postId;
              } ).record]?.confirmation_client && !application[postIdMap.find( (ele) => {
                return ele.postId == postId;
              } ).record]?.confirmation_server}
          <QualificationCard
            {postName}
            {qualification}
            on:click={() => {
              onApply(postId);
            }}
          />
        {:else if application[postIdMap.find((ele) => {
            return ele.postId == postId;
          }).record]?.confirmation_client || application[postIdMap.find( (ele) => {
                return ele.postId == postId;
              } ).record]?.confirmation_server}
          <QualificationCard
            {postName}
            qualification={"Applied"}
            on:click={() => {
              onApply(postId);
            }}
          />
        {:else}
          <QualificationCardDisabled
            handicappedDisqualifiedMessage={() =>
              handicappedDisqualifiedMessage(postId, application)}
            {postName}
            {qualification}
            age={getAgeFormatted(application.personalInfo.dob)}
            ageLimit={getMaxAgeWithRelaxation(application, postId)}
            on:click={() => {
              onApply(postId);
            }}
          />
        {/if}
      {/each}
    </div> -->
  </div>
{/if}
