<script>
  import EssentialQualification7th from "../../components/EQ/7th/EssentialQualification.svelte";
  import EssentialQualification8th from "../../components/EQ/8th/EssentialQualification.svelte";
  import EssentialQualification12th from "../../components/EQ/12th /EssentialQualification.svelte";
  import EssentialQualification10th from "../../components/EQ/10th/EssentialQualification.svelte";
  import EssentialQualificationDriver from "../../components/EQ/driver/EssentialQualification.svelte";

  import EssentialQualificationLabAssistant from "../../components/EQ/labAssistant/EssentialQualification.svelte";
  import EssentialQualificationMali from "../../components/EQ/mali/EssentialQualification.svelte";
  import EssentialQualificationPharmacist from "../../components/EQ/pharmacist/EssentialQualification.svelte";
  import EssentialQualificationDresser from "../../components/EQ/dresser/EssentialQualification.svelte";
  import EssentialQualificationPumpAttendant from "../../components/EQ/pumpattendant/EssentialQualification.svelte";
  import EssentialQualificationAutoMechanic from "../../components/EQ/automechanic/EssentialQualification.svelte";
  import EssentialQualificationComputerProgrammer from "../../components/EQ/computerProgrammer/EssentialQualification.svelte";
  import EssentialQualificationFireBrigadeSuperintendent from "../../components/EQ/fireBrigadeSuperintendent/EssentialQualification.svelte";
  import EssentialQualificationHealthSupervisor from "../../components/EQ/healthSupervisor/EssentialQualification.svelte";
  import EssentialQualificationHighSchoolTeacherBEd from "../../components/EQ/highSchoolTeacherB.ed/EssentialQualification.svelte";
  import EssentialQualificationJuniorElectricalEngineer from "../../components/EQ/juniorElectricalEngineer/EssentialQualification.svelte";
  import EssentialQualificationStaffNurse from "../../components/EQ/staffNurse/EssentialQualification.svelte";
  import EssentialQualificationWorkShopSuperintendent from "../../components/EQ/workshopsuperintendent/EssentialQualification.svelte";
  import EssentialQualificationAsttMarketSupdt from "../../components/EQ/asttmarketsupdt/EssentialQualification.svelte";
  import EssentialQualificationHealthInspector from "../../components/EQ/HealthInspector/EssentialQualification.svelte";
  import EssentialQualificationJuniorCivil from "../../components/EQ/juniorcivilengineer/EssentialQualification.svelte";
  import EssentialQualificationLedgerClerk from "../../components/EQ/ledgerclerk/EssentialQualification.svelte";
  import EssentialQualificationLabTechnician from "../../components/EQ/labtechnician/EssentialQualification.svelte";
  import EssentialQualificationDEdTeacher from "../../components/EQ/d.ed_teacher/EssentialQualification.svelte";
  import EssentialQualificationJuniorCleark from "../../components/EQ/juniorClerk/EssentialQualification.svelte";
  import EssentialQualificationHindiTypist from "../../components/EQ/hindiTypist/EssentialQualification.svelte";

  import EssentialQualificationCarpenter from "../../components/EQ/carpenter/EssentialQualification.svelte";
  import EssentialQualificationWireman from "../../components/EQ/wireman/EssentialQualification.svelte";
  import EssentialQualificationFireman from "../../components/EQ/fireman/EssentialQualification.svelte";
  import EssentialQualificationMason from "../../components/EQ/mason/EssentialQualification.svelte";
  import EssentialQualificationFbsLascar from "../../components/EQ/fbslascar/EssentialQualification.svelte";
  import EssentialQualificationFitter from "../../components/EQ/fitter/EssentialQualification.svelte";
  import EssentialQualificationPhysiotherapist from "../../components/EQ/physiotherapist/EssentialQualification.svelte";
  import EssentialQualificationStenographer from "../../components/EQ/stenographer/EssentialQualification.svelte";
  import EssentialQualificationSanitaryInspector from "../../components/EQ/sanitaryInspector/EssentialQualification.svelte";
  import EssentialQualificationXRayTechnician from "../../components/EQ/xRayTechnician/EssentialQualification.svelte";
  import EssentialQualificationRegistrar from "../../components/EQ/registrar/EssentialQualification.svelte";
  import EssentialQualificationPediatrician from "../../components/EQ/pediatrician/EssentialQualification.svelte";
  import EssentialQualificationAsstMedicalOfficer from "../../components/EQ/asstMedicalOfficer/EssentialQualification.svelte";
  import { verification } from "../../common/qualificationVerification/verification";
  import OtherQualification from "../../components/OtherQualification.svelte";
  import Step from "../../common/StepQualifications.svelte";
  import Alert from "../../common/Alert.svelte";
  import { createEventDispatcher } from "svelte";
  import { goto } from "$app/navigation";
  import { validTime } from "../../stores/stores";
  import { postHandicapped } from "../../data/postIdMap";

  import InputRadioGroup from "../../common/InputRadioGroup.svelte";
  export let personalInfo;

  import { Jumper, Circle } from "svelte-loading-spinners";

  export let essentialQualifications = [];
  export let otherQualifications = [];
  export let postId;
  export let loading;
  export let saveError;
  export let scribe;

  let isHandicapped = postHandicapped.find(
    (ph) => ph.postId == postId
  )?.handicappedApplicable;
  let pwdTypeOptions = isHandicapped
    ? postHandicapped.find((ph) => ph.postId == postId)?.handicappedTypes
    : [];

  let inputNeedsScribe = {
    label: "Do You Need Scribe ?",
    options: ["Yes", "No"],
    value: scribe,
    error: null,
    validator: {
      method: (value) => {
        return true;
      },
    },
  };

  const onUpdateQualifications = async (e) => {
    console.log("onUpdateOtherQualifications called", e.detail);
    dispatch("saveQualification", {
      action: "none",
      data: { essentialQualifications, otherQualifications },
    });
  };
  const checkRequiredOtherQualificaitonMet = (reqQualifications) => {
    let conditionNotMet = false;
    reqQualifications.forEach((rq) => {
      let found = otherQualifications.find((oq) => {
        if (rq == oq.qualification) return true;
        return false;
      });
      if (!found) conditionNotMet = true;
    });
    return !conditionNotMet;
  };
  const dispatch = createEventDispatcher();
  let alertMessage = null;

  const onPrevious = async (e) => {
    loading = true;
    dispatch("saveQualification", {
      action: "previous",
      data: { essentialQualifications, otherQualifications },
    });
    return true;
  };
  const validate = () => {
    let valid = true;
    alertMessage = "";
    console.log("essentialQualifications: ", essentialQualifications);
    let { error, errorMsg } = verification(
      essentialQualifications,
      otherQualifications,
      postId
    );
    console.log("error: ", error, "error message: ", "errorMsg:", errorMsg);
    console.log("InputNeedsScribe value is :", inputNeedsScribe.value);
    if (
      postId == "12" &&
      personalInfo.pwd == "Yes" &&
      !(inputNeedsScribe.value == "Yes" || inputNeedsScribe.value == "No")
    ) {
      valid = false;
      alertMessage = "Please select (Yes/No) Do you Need scribe";
    }
    if (error) {
      valid = false;
      alertMessage = alertMessage ? `${alertMessage} ${errorMsg}` : errorMsg;
    }
    return valid;
  };
  const onNext = async (e) => {
    if (!validate()) return false;

    if (personalInfo.pwd == "Yes") {
      dispatch("saveQualification", {
        action: "next",
        data: {
          essentialQualifications,
          otherQualifications,
          scribe: inputNeedsScribe.value,
        },
      });
    }
    loading = true;
    dispatch("saveQualification", {
      action: "next",
      data: { essentialQualifications, otherQualifications },
    });
    return true;
  };
</script>

<Step step={"Qualifications"} experience={postId == "52" ? true : false} />
{#if postId == "12"}
  {#if personalInfo.pwd == "Yes" && postHandicapped.find((ph) => ph.postId == postId).handicappedApplicable == true}
    <div class="flex flex-col justify-center mx-2 lg:mx-20 mt-5">
      <div class="grid grid-cols-7 bg-orange-400 w-full rounded-t-lg">
        <div
          class="col-span-7 lg:col-span-6 text-white rounded-t-lg m-2 p-1 font-bold text-center lg:text-xl"
        >
          Handicapped
        </div>
        <div
          class="col-span-7 lg:col-span-1 flex justify-center rounded-t-lg items-center h-12 bg-orange-400 font-bold "
        />
      </div>
      <div class="col-span-6 md:col-span-2 p-1">
        <InputRadioGroup
          label={inputNeedsScribe.label}
          options={inputNeedsScribe.options}
          bind:value={inputNeedsScribe.value}
          error=""
          bind:validator={inputNeedsScribe.validator}
        />
      </div>
      Note: If you need Scribe, one will be provided to you Pune Cantonment Board
    </div>
  {/if}
{/if}
<!-- {#if postId == "11" || postId == "12" || postId == "13" || postId == "14" || postId == "15"}
  <EssentialQualification8th
    bind:qualifications={essentialQualifications}
    bind:alertMessage
    {postId}
    on:updateEssentialQualifications={onUpdateQualifications}
  /> -->
  {#if postId == "11" || postId == "12" || postId == "13" || postId == "14" || postId == "15"}
  <EssentialQualification7th
    bind:qualifications={essentialQualifications}
    bind:alertMessage
    {postId}
    on:updateEssentialQualifications={onUpdateQualifications}
  />
{:else if postId=="22" || postId =="23" || postId=="24" || postId=="25"}
  <EssentialQualification10th
    bind:qualifications={essentialQualifications}
    bind:alertMessage
    {postId}
    on:updateEssentialQualifications={onUpdateQualifications}
  />
  {:else if postId == "21"}
  <EssentialQualificationDriver
    bind:qualifications={essentialQualifications}
    bind:alertMessage
    {postId}
    on:updateEssentialQualifications={onUpdateQualifications}
  />
  {:else if postId == "41"}
  <EssentialQualificationLabAssistant
    bind:qualifications={essentialQualifications}
    bind:alertMessage
    {postId}
    on:updateEssentialQualifications={onUpdateQualifications}
  />
  
  {:else if postId == "26"}
  <EssentialQualificationMason
    bind:qualifications={essentialQualifications}
    bind:alertMessage
    {postId}
    on:updateEssentialQualifications={onUpdateQualifications}
    />
{:else if postId == "27" }
  <EssentialQualificationPumpAttendant
    bind:qualifications={essentialQualifications}
    bind:alertMessage
    {postId}
    on:updateEssentialQualifications={onUpdateQualifications}
  />
   {:else if postId == "28"}
  <EssentialQualificationMali
   bind:qualifications={essentialQualifications}
    bind:alertMessage
    {postId}
    on:updateEssentialQualifications={onUpdateQualifications}
  />

{:else if postId == "29" }
  <EssentialQualificationDresser
    bind:qualifications={essentialQualifications}
    bind:alertMessage
    {postId}
    on:updateEssentialQualifications={onUpdateQualifications}
  />
  {:else if postId == "31"}
  <EssentialQualificationFitter
   bind:qualifications={essentialQualifications}
    bind:alertMessage
    {postId}
    on:updateEssentialQualifications={onUpdateQualifications}
  />
{:else if postId == "30" }
  <EssentialQualificationAutoMechanic
    bind:qualifications={essentialQualifications}
    bind:alertMessage
    {postId}
    on:updateEssentialQualifications={onUpdateQualifications}
  />
  {:else if postId == "41" }
  <EssentialQualification12th
    bind:qualifications={essentialQualifications}
    bind:alertMessage
    {postId}
    on:updateEssentialQualifications={onUpdateQualifications}
  />
{:else if postId == "28"}
  <EssentialQualificationMali
    bind:qualifications={essentialQualifications}
    bind:alertMessage
    {postId}
    on:updateEssentialQualifications={onUpdateQualifications}
  />
  {:else if postId == "32"}
  <EssentialQualificationFbsLascar
    bind:qualifications={essentialQualifications}
    bind:alertMessage
    {postId}
    on:updateEssentialQualifications={onUpdateQualifications}
  />
  {:else if postId == "601"}
    <EssentialQualificationComputerProgrammer
     bind:qualifications={essentialQualifications}
    bind:alertMessage
    {postId}
    on:updateEssentialQualifications={onUpdateQualifications}
    />
  {:else if postId == "602"}
  <EssentialQualificationWorkShopSuperintendent
    bind:qualifications={essentialQualifications}
    bind:alertMessage
    {postId}
    on:updateEssentialQualifications={onUpdateQualifications}
  />
   {:else if postId == "603"}
    <EssentialQualificationFireBrigadeSuperintendent
     bind:qualifications={essentialQualifications}
    bind:alertMessage
    {postId}
    on:updateEssentialQualifications={onUpdateQualifications}
    />
  {:else if postId == "604"}
  <EssentialQualificationAsttMarketSupdt
    bind:qualifications={essentialQualifications}
    bind:alertMessage
    {postId}
    on:updateEssentialQualifications={onUpdateQualifications}
  />
   {:else if postId == "605"}
    <EssentialQualificationHealthSupervisor
     bind:qualifications={essentialQualifications}
    bind:alertMessage
    {postId}
    on:updateEssentialQualifications={onUpdateQualifications}
    />
  {:else if postId == "606"}
  <EssentialQualificationAsstMedicalOfficer
    bind:qualifications={essentialQualifications}
    bind:alertMessage
    {postId}
    on:updateEssentialQualifications={onUpdateQualifications}
  />
   {:else if postId == "607"}
    <EssentialQualificationHighSchoolTeacherBEd
     bind:qualifications={essentialQualifications}
    bind:alertMessage
    {postId}
    on:updateEssentialQualifications={onUpdateQualifications}
    />
  {:else if postId == "608"}
  <EssentialQualificationHealthInspector
    bind:qualifications={essentialQualifications}
    bind:alertMessage
    {postId}
    on:updateEssentialQualifications={onUpdateQualifications}
  />

   {:else if postId == "609"}
    <EssentialQualificationJuniorElectricalEngineer
     bind:qualifications={essentialQualifications}
    bind:alertMessage
    {postId}
    on:updateEssentialQualifications={onUpdateQualifications}
    />
  {:else if postId == "610"}
  <EssentialQualificationJuniorCivil
    bind:qualifications={essentialQualifications}
    bind:alertMessage
    {postId}
    on:updateEssentialQualifications={onUpdateQualifications}
  />
   {:else if postId == "615"}
    <EssentialQualificationStaffNurse
     bind:qualifications={essentialQualifications}
    bind:alertMessage
    {postId}
    on:updateEssentialQualifications={onUpdateQualifications}
    />
  {:else if postId == "612"}
  
  <EssentialQualificationLedgerClerk
    bind:qualifications={essentialQualifications}
    bind:alertMessage
    {postId}
    on:updateEssentialQualifications={onUpdateQualifications}
  />
  {:else if postId == "614"}
  <EssentialQualificationLabTechnician
    bind:qualifications={essentialQualifications}
    bind:alertMessage
    {postId}
    on:updateEssentialQualifications={onUpdateQualifications}
  />

  {:else if postId == "616"}
  <EssentialQualificationDEdTeacher
    bind:qualifications={essentialQualifications}
    bind:alertMessage
    {postId}
    on:updateEssentialQualifications={onUpdateQualifications}
  />

   {:else if postId == "611"}
  <EssentialQualificationJuniorCleark
    bind:qualifications={essentialQualifications}
    bind:alertMessage
    {postId}
    on:updateEssentialQualifications={onUpdateQualifications}
  />
     {:else if postId == "613"}
  <EssentialQualificationHindiTypist
    bind:qualifications={essentialQualifications}
    bind:alertMessage
    {postId}
    on:updateEssentialQualifications={onUpdateQualifications}
  />

{:else if postId == 22}
  <EssentialQualificationPharmacist
    bind:qualifications={essentialQualifications}
    bind:alertMessage
    {postId}
    on:updateEssentialQualifications={onUpdateQualifications}
  />
{:else if postId == 23}
  <EssentialQualificationDresser
    bind:qualifications={essentialQualifications}
    bind:alertMessage
    {postId}
    on:updateEssentialQualifications={onUpdateQualifications}
  />
{:else if postId == 24}
  <EssentialQualificationCarpenter
    bind:qualifications={essentialQualifications}
    bind:alertMessage
    {postId}
    on:updateEssentialQualifications={onUpdateQualifications}
  />
{:else if postId == 25}
  <EssentialQualificationWireman
    bind:qualifications={essentialQualifications}
    bind:alertMessage
    {postId}
    on:updateEssentialQualifications={onUpdateQualifications}
  />
{:else if postId == 26}
  <EssentialQualificationFireman
    bind:qualifications={essentialQualifications}
    bind:alertMessage
    {postId}
    on:updateEssentialQualifications={onUpdateQualifications}
  />
{:else if postId == 27}
  <EssentialQualificationMason
    bind:qualifications={essentialQualifications}
    bind:alertMessage
    {postId}
    on:updateEssentialQualifications={onUpdateQualifications}
  />
{:else if postId == 31}
  <EssentialQualificationPhysiotherapist
    bind:qualifications={essentialQualifications}
    bind:alertMessage
    {postId}
    on:updateEssentialQualifications={onUpdateQualifications}
  />
{:else if postId == 32}
  <EssentialQualificationStenographer
    bind:qualifications={essentialQualifications}
    bind:alertMessage
    {postId}
    on:updateEssentialQualifications={onUpdateQualifications}
  />
{:else if postId == 33}
  <EssentialQualificationSanitaryInspector
    bind:qualifications={essentialQualifications}
    bind:alertMessage
    {postId}
    on:updateEssentialQualifications={onUpdateQualifications}
  />
{:else if postId == 41}
  <EssentialQualificationXRayTechnician
    bind:qualifications={essentialQualifications}
    bind:alertMessage
    {postId}
    on:updateEssentialQualifications={onUpdateQualifications}
  />
{:else if postId == 51}
  <EssentialQualificationRegistrar
    bind:qualifications={essentialQualifications}
    bind:alertMessage
    {postId}
    on:updateEssentialQualifications={onUpdateQualifications}
  />
{:else if postId == 52}
  <EssentialQualificationPediatrician
    bind:qualifications={essentialQualifications}
    bind:alertMessage
    {postId}
    on:updateEssentialQualifications={onUpdateQualifications}
  />
{:else if postId == 53}
  <EssentialQualificationAsstMedicalOfficer
    bind:qualifications={essentialQualifications}
    bind:alertMessage
    {postId}
    on:updateEssentialQualifications={onUpdateQualifications}
  />
{/if}
<OtherQualification
  bind:qualifications={otherQualifications}
  {essentialQualifications}
  bind:alertMessage
  on:updateOtherQualifications={onUpdateQualifications}
/>
{#if alertMessage}
  <div class="flex flex-col justify-center mx-2 lg:mx-20 mt-5">
    <Alert
      message={alertMessage}
      on:alertClosed={() => (alertMessage = null)}
    />
  </div>
{/if}
{#if saveError}
  <div class="flex flex-col justify-center mx-2 lg:mx-20 mt-5">
    <Alert message={saveError} on:alertClosed={() => (saveError = null)} />
  </div>
{/if}
<div class="flex flex-row justify-center m-4">
  {#if loading}
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
    <!-- {#if $startApplications && !$endApplications} -->
    {#if $validTime}
      <button
        on:click={onNext}
        type="button"
        class="mt-5 w-48  text-center bg-orange-400 hover:bg-orange-300  shadow-lg text-white font-bold py-2 px-4 rounded"
      >
        NEXT
      </button>
    {:else}
      <button
        on:click={(e) => goto("/dashboard")}
        type="button"
        class="mt-5 w-48  text-center bg-gray-500 hover:bg-orange-300  shadow-lg text-white font-bold py-2 px-4 rounded"
      >
        NEXT
      </button>
    {/if}
  {/if}
</div>
