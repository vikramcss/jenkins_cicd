<script>
  import PersonalInfo from "../../components/PersonalInfo.svelte";
  import Address from "../../components/Address.svelte";
  import { createEventDispatcher } from "svelte";
  import Alert from "../../common/Alert.svelte";
  import { validTime } from "../../stores/stores";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { Circle } from "svelte-loading-spinners";
  import { fly, fade } from "svelte/transition";

  const dispatch = createEventDispatcher();

  let alertMessage = null;
  export let loading;
  export let personalInfo = {
    name: "",
    presentName: "",
    fathersName: "",
    dob: "",
    nationality: "",
    religion: "",
    category: "",
    gender: "",
    email: "",
    mobile: "",
    pwd: "",
    PWDType: "",
    Married_Status: "",
    exceptionalCandidate: "",
    exceptionalCandidateJustification: "",
    exserviceman: "",
    govemployee: "",
    meityemployee: "",
    widowOrDivorced: "",
    periodofservice: "",
    Kcbperiodofservice: "",
    // scribe: "",
    KCBrelatedEmployee: "",
    annualincomeEWS: "",
    alternativeMobileNo: "",
    kcbRelatedName: "",
    kcbRelatedDesignation: "",
  };

  export let login;
  export let mobile;
  export let addressOutsideIndia = "No";
  export let correspondenceAddress = {
    addressLine1: "",
    addressLine2: "",
    state: "",
    district: "",
    pin: "",
  };
  export let permanentAddress = {
    addressLine1: "",
    addressLine2: "",
    state: "",
    district: "",
    pin: "",
  };
  export let permanentIsCorrespondence = true;
  export let saveError;
  let errorsPersonalInfo = {
    name: null,
    presentName: null,
    fathersName: null,
    dob: null,
    nationality: null,
    religion: null,
    category: null,
    email: null,
    mobile: null,
    pwd: null,
    PWDType: null,
    Married_Status: null,
    exceptionalCandidate: null,
    exceptionalCandidateJustification: null,
    exserviceman: null,
    govemployee: null,
    meityemployee: null,
    widowOrDivorced: null,
    periodofservice: null,
    Kcbperiodofservice: null,
    gender: null,
    // scribe: null,
    KCBrelatedEmployee: "",
    annualincomeEWS: null,
    alternativeMobileNo: null,
    kcbRelatedName: null,
    kcbRelatedDesignation: null,
  };
  let errorsCorrespondenceAddress = {
    addressLine1: null,
    addressLine2: null,
    state: null,
    district: null,
    pin: null,
  };
  let errorsPermanantAddress = {
    addressLine1: null,
    addressLine2: null,
    state: null,
    district: null,
    pin: null,
  };
  const validateAddress = () => {
    let validAddress = true;
    if (addressOutsideIndia === "No") {
      if (
        !correspondenceAddress.addressLine1 ||
        correspondenceAddress.addressLine1.length < 3
      ) {
        validAddress = false;
        errorsCorrespondenceAddress.addressLine1 =
          "length of address line 1 must be more than 3";
      }
      if (
        !correspondenceAddress.addressLine2 ||
        correspondenceAddress.addressLine2.length < 3
      ) {
        validAddress = false;
        errorsCorrespondenceAddress.addressLine2 =
          "length of address line 2 must be more than 3";
      }
      if (!correspondenceAddress.state || correspondenceAddress.state == "") {
        validAddress = false;
        errorsCorrespondenceAddress.state =
          "length of address line 2 must be more than 3";
      }
      if (
        !correspondenceAddress.district ||
        correspondenceAddress.district == ""
      ) {
        validAddress = false;
        errorsCorrespondenceAddress.district =
          "length of district must be more than 3";
      }
      let isSixDigits = correspondenceAddress.pin.match(/^\d{6}$/);
      console.log("match is: ", isSixDigits);
      if (
        !correspondenceAddress.pin ||
        correspondenceAddress.pin == "" ||
        !isSixDigits
      ) {
        validAddress = false;
        errorsCorrespondenceAddress.pin = "length of pin must be 6 digits";
      }

      if (permanentIsCorrespondence == false) {
        if (
          !permanentAddress.addressLine1 ||
          permanentAddress.addressLine1.length < 3
        ) {
          validAddress = false;
          errorsPermanantAddress.addressLine1 =
            "length of address line 1 must be more than 3";
        }
        if (
          !permanentAddress.addressLine2 ||
          permanentAddress.addressLine2.length < 3
        ) {
          validAddress = false;
          errorsPermanantAddress.addressLine2 =
            "length of address line 2 must be more than 3";
        }
        if (!permanentAddress.state || permanentAddress.state == "") {
          validAddress = false;
          errorsPermanantAddress.state =
            "length of address line 2 must be more than 3";
        }
        if (!permanentAddress.district || permanentAddress.district == "") {
          validAddress = false;
          errorsPermanantAddress.district =
            "length of district must be more than 3";
        }
        let isSixDigits = permanentAddress.pin.match(/^\d{6}$/);
        console.log("match is: ", isSixDigits);
        if (
          !permanentAddress.pin ||
          permanentAddress.pin == "" ||
          !isSixDigits
        ) {
          validAddress = false;
          errorsPermanantAddress.pin = "length of pin must be 6 digits";
        }
      }
    }
    console.log(
      "errorsCorrespondenceAddress is: ",
      errorsCorrespondenceAddress
    );
    return validAddress;
  };
  const validateForm = () => {
    console.log("validateForm errorsPersonalInfo :", errorsPersonalInfo);
    try {
      console.log("validatePersonalInfo : ", validatePersonalInfo);
      if (validatePersonalInfo && !validatePersonalInfo()) {
        alertMessage =
          "Please correct errors on the page before proceeding to next page";
        return false;
      }
      {
        console.log("validatePersonalInfo returned true");
      }
    } catch (e) {}

    if (!validateAddress()) {
      alertMessage =
        "Please correct errors on the page before proceeding to next page";
      return false;
    }
    if (
      errorsPersonalInfo.name == null &&
      errorsPersonalInfo.presentName == null &&
      errorsPersonalInfo.fathersName == null &&
      errorsPersonalInfo.dob == null &&
      errorsPersonalInfo.nationality == null &&
      errorsPersonalInfo.religion == null &&
      errorsPersonalInfo.category == null &&
      errorsPersonalInfo.email == null &&
      errorsPersonalInfo.mobile == null &&
      errorsPersonalInfo.exserviceman == null &&
      errorsPersonalInfo.widowOrDivorced == null &&
      errorsPersonalInfo.meityemployee == null &&
      errorsPersonalInfo.govemployee == null &&
      errorsPersonalInfo.periodofservice == null &&
      errorsPersonalInfo.Kcbperiodofservice == null &&
      errorsPersonalInfo.scribe == null &&
      errorsPersonalInfo.pwd == null &&
      errorsPersonalInfo.PWDType == null
    ) {
      return true;
    }
    alertMessage =
      "Please correct errors on the page before proceeding to next page";
    console.log("will return false");
    return false;
  };
  const handleClick = async (action, e) => {
    alertMessage = null;
    permanentAddress = permanentIsCorrespondence
      ? { ...correspondenceAddress }
      : { ...permanentAddress };

    if (action === "next") {
      if (!validateForm()) return false;
      loading = true;
      dispatch("savePersonalInfo", {
        action: "next",
        data: {
          personalInfo,
          addressOutsideIndia,
          correspondenceAddress,
          permanentIsCorrespondence,
          permanentAddress,
        },
      });
    } else {
      goto("/profileAvailablePosts");
    }
  };
  let validatePersonalInfo = null;
</script>

<PersonalInfo
  {login}
  {mobile}
  bind:validateComponent={validatePersonalInfo}
  bind:personalInfo
  bind:errorsPersonalInfo
/>
<Address
  bind:correspondenceAddress
  bind:errorsCorrespondenceAddress
  bind:permanentAddress
  bind:errorsPermanantAddress
  bind:permanentIsCorrespondence
  bind:addressOutsideIndia
/>
<div class="flex flex-row justify-center mb-4">
  {#if alertMessage}
    <!-- <p in:fly="{{ x: 200, duration: 500 }}" out:fade> -->
    <Alert
      bind:message={alertMessage}
      on:alertClosed={() => (alertMessage = null)}
    />
    <!-- </p> -->
  {/if}
  {#if saveError}
    <Alert bind:message={saveError} on:alertClosed={() => (saveError = null)} />
  {/if}
</div>
<div class="flex flex-row justify-center my-4">
  {#if loading}
    <Circle size="60" color="#FF3E00" unit="px" duration="1s" />
  {:else if $validTime}
    <button
      type="button"
      on:click={(e) => handleClick("next", e)}
      class="mt-5 w-48  text-center bg-orange-400 hover:bg-orange-300  shadow-lg text-white font-bold py-2 px-4 rounded"
    >
      NEXT
    </button>
  {:else}
    <button
      type="button"
      on:click={(e) => goto("/dashboard")}
      class="mt-5 w-48  text-center bg-gray-500 hover:bg-gray-400  shadow-lg text-white font-bold py-2 px-4 rounded"
    >
      NEXT
    </button>
  {/if}
</div>
