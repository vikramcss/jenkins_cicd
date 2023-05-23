<script>
  import Experience from "../../components/Experience.svelte";
  import Achievement from "../../components/Achievement.svelte";
  import Step from "../../common/StepQualifications.svelte";
  import { createEventDispatcher } from "svelte";
  import { DateTime } from "luxon";
  import Alert from "../../common/Alert.svelte";
  import { goto } from "$app/navigation";
  import { validTime } from "../../stores/stores";
  import { Circle } from 'svelte-loading-spinners';

  export let experiences = [];
  export let uploads = {};
  export let erperienceError=""
  export let loadingExp;

  let sum = 0;
  let alertMsg = null;
  let totalExperience;
  const dispatch = createEventDispatcher();
  const onPrevious = async (e) => {
    loadingExp=true
    dispatch("saveExperience", {
      action: "previous",
      data: { experiences},
    });
  };
  $:totalExperience = experiences.reduce((total,q)=>{      
      let day = q.experienceFrom.split("-")[0];
      let month = q.experienceFrom.split("-")[1];
      let year = q.experienceFrom.split("-")[2];
      
      let expFrom = DateTime.fromObject({ day, month, year });

      day = q.experienceTo.split("-")[0];
      month = q.experienceTo.split("-")[1];
      year = q.experienceTo.split("-")[2];
      let expTo = DateTime.fromObject({ day, month, year });

      let duration = expTo.diff(expFrom, ["years","months","days"]);
      let years = total.years+duration.years;
      let months = total.months+duration.months;
      let days = total.days+duration.days;
      if(days>30){
        months=months+1
        days=0
      }
      if(months>12){
        years+=1
        months=0
      }
      return {days,months,years}
    },{years:0,months:0,days:0})
  const validate = () => {
    let totalExp = 0;
    experiences.forEach((q) => {
      let day = q.experienceFrom.split("-")[0];
      let month = q.experienceFrom.split("-")[1];
      let year = q.experienceFrom.split("-")[2];
      
      let expFrom = DateTime.fromObject({ day, month, year });

      day = q.experienceTo.split("-")[0];
      month = q.experienceTo.split("-")[1];
      year = q.experienceTo.split("-")[2];
      let expTo = DateTime.fromObject({ day, month, year });

      let duration = expTo.diff(expFrom, ["years"]);
      totalExp += duration.years;
    });
    return totalExp < 5 ?  [false, `Your experience is ${totalExp.toFixed(3)} years`]: [true, ''] ;
  };

  const onNext = async (e) => {
    let [valid, error] = validate();
    if (!valid) {
      alertMsg = `Atleast 5 years experience is required for this post. ${error}.`;
      return false;
    }
    loadingExp=true
    dispatch("saveExperience", {
      action: "next",
      data: { experiences},
    });
    return true;
  };
</script>

<Step step={"experience"} experience={true} />
<Experience bind:experiences />
{#if experiences && experiences.length>0}
  <div class="mx-20 p-5">
    <div class="text-gray-800 px-6 py-4 border-0 rounded relative mb-4 bg-orange-400">
      <span class="text-xs sm:text-sm md:text-base inline-block mr-5 align-middle">
        <i class="fas fa-bell"></i>
      </span>
      <span class="inline-block align-middle mr-8">
        <div class="text-xs sm:text-sm md:text-base font-semibold">Total Experience is: {totalExperience.years}-{totalExperience.months}-{totalExperience.days} (YYYY-MM-DD)</div>
      </span>
    </div>
  </div>
{/if}
{#if alertMsg}
<div class="mx-5 p-5">
  <Alert
    message={alertMsg}
    on:alertClosed={() => {
      alertMsg = null;
    }}
  />
</div>
{/if}
{#if erperienceError}
  <div class="flex flex-col justify-center mx-2 lg:mx-20 mt-5">
    <Alert
      message={erperienceError}
      on:alertClosed={() => (erperienceError = null)}
    />
  </div>
{/if}
<div class="flex flex-row justify-center m-4">
  {#if loadingExp}
    <div class="">
      <Circle size="60" color="#FF3E00" unit="px" duration="1s" />
    </div>
  {:else} 
    <button
      on:click={onPrevious}
      type="button"
      class="mt-5 w-48 text-center bg-gray-50 hover:bg-white shadow-lg text-gray-500 font-bold py-2 px-4 rounded"
    >
      PREVIOUS
    </button>
    {#if $validTime}
      <button
        on:click={onNext}
        type="button"
        class="mt-5 w-48  text-center bg-orange-600 hover:bg-orange-500  shadow-lg text-white font-bold py-2 px-4 rounded"
      >
        NEXT
      </button>
    {:else}
      <button
        type="button"
        on:click={()=>
        goto("/timeOver")} 
        class="mt-5 w-48  text-center bg-orange-600 hover:bg-orange-500  shadow-lg text-white font-bold py-2 px-4 rounded"
      >
        NEXT
      </button>
    {/if}
  {/if}
</div>
