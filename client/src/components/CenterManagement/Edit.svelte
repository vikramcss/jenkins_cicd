<script>
  import Fa from "svelte-fa";
  import { faEdit } from "@fortawesome/free-solid-svg-icons";
  import TextInput from "../../common/TextInput.svelte";
  import { createEventDispatcher } from "svelte";
  import Alert from "../../common/Alert.svelte";
  const dispatch = createEventDispatcher();
  export let showModal;
  export let center
  export let index
  let inputCenterAddress = {
    label: "Center Address",
    value: center.address,
    validate: true,
    readonly: false,
    error: null,
    placeholderValue: "Center Address",
    error_mt: false,
    paddingsize: 0,
    validator: {
      method: (value) => {
        inputCenterAddress.error = null;
        if (value.length <= 3) {
          inputCenterAddress.error = "Center Address can not be empty";
          return false;
        }
        return true;
      },
      errormessage: "Center Address can not be empty",
    },
  };
  let inputCenterPIN = {
    label: "Center PINCODE",
    value: center.pin,
    validate: true,
    readonly: false,
    error: null,
    placeholderValue: "Center PINCODE",
    error_mt: false,
    paddingsize: 0,
    validator: {
      method: (value) => {
        inputCenterPIN.error = null;
        console.log("pincode value is: ", value);
        if (/^411\s{0,1}\d{3}$/.test(value)) {
          return true;
        } else {
          inputCenterPIN.error =
            "Center PIN has to be number in format 411 XXX";
          return false;
        }
      },
      errormessage: "Center PIN has to be number in format 411 XXX",
    },
  };
  let inputCenterName = {
    label: "Center Name",
    value: center.name,
    validate: true,
    readonly: false,
    error: null,
    placeholderValue: "Center Name",
    error_mt: false,
    paddingsize: 0,
    validator: {
      method: (value) => {
        inputCenterName.error = null;
        if (value.length < 2) {
          inputCenterName.error = "Center Name can not be empty";
          return false;
        }
        return true;
      },
      errormessage: "Center Name can not be empty",
    },
  };
  let inputCenterCapacity = {
    label: "Center Capacity",
    value: center.centerCapacity,
    validate: true,
    readonly: false,
    error: null,
    placeholderValue: "Center Capacity",
    error_mt: false,
    paddingsize: 0,
    validator: {
      method: (value) => {
        inputCenterCapacity.error = null;
        if (value.length < 2) {
          inputCenterCapacity.error = "Center Capacity can not be empty";
          return false;
        }
        return true;
      },
      errormessage: "Center Capacity can not be empty",
    },
  };
  // marks type
  let inputRoomCount = {
    label: "Number's of Room",
    value: center.roomCount,
    validate: true,
    readonly: false,
    error: null,
    placeholderValue: "Number's of Room",
    error_mt: false,
    paddingsize: 0,
    validator: {
      method: (value) => {
        inputRoomCount.error = null;
        if(value.trim().length == 0) {
          inputRoomCount.error =
            "Number of Rooms should be number between 1 and 200";
          return false
        }
        if (isNaN(value)) {
          inputRoomCount.error =
            "Number of Rooms should be number between 1 and 200";
          return false;
        }
        if (Number(value) > 200 || Number(value) < 0) {
          inputRoomCount.error =
            "Number of Rooms should be number between 1 and 200";
          return false;
        }
        return true
      },
      errormessage: "Number of Rooms should be number between 1 and 200",
    },
  };

  let inputRoomCapacity = {
    label: "Room Capacity",
    value: center.roomCapacity,
    validate: true,
    readonly: false,
    error: null,
    placeholderValue: "Room Capacity",
    error_mt: false,
    paddingsize: 0,
    validator: {
      method: (value) => {
        inputRoomCapacity.error = null;
        let val = value;
        if (value === null || value === "") {
          inputRoomCapacity.error = inputRoomCapacity.validator.errormessage;
          return false;
        }
        if (val.length < 1) return false;
        return true;
      },
      errormessage: "Seat Number can not be Empty",
    },
  };

  const validateInput = () => {
    let valid = true;
    // 1. certificate type
    if (!inputCenterName.validator.method(inputCenterName.value)) {
      valid = false;
    }
    if (!inputCenterAddress.validator.method(inputCenterAddress.value)) {
      valid = false;
    }
    if (!inputRoomCount.validator.method(inputRoomCount.value)) {
      valid = false;
    }
    if (!inputRoomCapacity.validator.method(inputRoomCapacity.value)) {
      valid = false;
    }
    if (!inputCenterPIN.validator.method(inputCenterPIN.value)) {
      valid = false;
    }
    return valid;
  };
  const save = () => {
    if (!validateInput()) {
      return false;
    }
    return true;
  };

  function toggleModal({ op }) {
    if (op === "save" && !save()) {
      return false;
    }

    if (op === "cancel") {
      showModal = !showModal;
      return true;
    }
    showModal = !showModal;
    dispatch("edit", {
      center: {
      _id: center._id,
      name: inputCenterName.value,
      address: inputCenterAddress.value,
      pin: inputCenterPIN.value,
      centerCapacity: Number(inputRoomCount.value) * Number(inputRoomCapacity.value),
      roomCapacity: inputRoomCapacity.value,
      roomCount: inputRoomCount.value,
      },
      index
    });
    console.log("toggleModal called: ", op);
    console.log("toggleModal called op: ", op, "showModal:", showModal);

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
          class="flex items-strat justify-between p-5 border-b border-solid border-orange-200 rounded-t bg-navy-500"
        >
          <h3 class="text-3xl font-semibold text-white ">Edit Center Details</h3>

          <div class=" text-white">
            <Fa icon={faEdit} size="2x" />
          </div>
        </div>
        <!--body-->
        <div class="relative p-6">
          <div class="grid grid-cols-1 md:grid-cols-2  md:gap-3  ">
            <TextInput
              bind:label={inputCenterName.label}
              bind:value={inputCenterName.value}
              validate={inputCenterName.validate}
              readonly={inputCenterName.readonly}
              bind:error={inputCenterName.error}
              placeholderValue={inputCenterName.placeholderValue}
              error_mt={inputCenterName.error_mt}
              bind:paddingsize={inputCenterName.paddingsize}
              validator={inputCenterName.validator}
            />
            <TextInput
              bind:label={inputCenterAddress.label}
              bind:value={inputCenterAddress.value}
              validate={inputCenterAddress.validate}
              readonly={inputCenterAddress.readonly}
              bind:error={inputCenterAddress.error}
              placeholderValue={inputCenterAddress.placeholderValue}
              error_mt={inputCenterAddress.error_mt}
              bind:paddingsize={inputCenterAddress.paddingsize}
              validator={inputCenterAddress.validator}
            />

            <TextInput
              bind:label={inputCenterPIN.label}
              bind:value={inputCenterPIN.value}
              validate={inputCenterPIN.validate}
              readonly={inputCenterPIN.readonly}
              bind:error={inputCenterPIN.error}
              placeholderValue={inputCenterPIN.placeholderValue}
              error_mt={inputCenterPIN.error_mt}
              bind:paddingsize={inputCenterPIN.paddingsize}
              validator={inputCenterPIN.validator}
            />

            <TextInput
              bind:label={inputRoomCount.label}
              bind:value={inputRoomCount.value}
              validate={inputRoomCount.validate}
              readonly={inputRoomCount.readonly}
              bind:error={inputRoomCount.error}
              placeholderValue={inputRoomCount.placeholderValue}
              error_mt={inputRoomCount.error_mt}
              bind:paddingsize={inputRoomCount.paddingsize}
              validator={inputRoomCount.validator}
            />

            <TextInput
              bind:label={inputRoomCapacity.label}
              bind:value={inputRoomCapacity.value}
              bind:paddingsize={inputRoomCapacity.paddingsize}
              readonly={true}
            />
            <TextInput
              label={"Center Capacity"}
              value={Number(inputRoomCapacity.value) *
                Number(inputRoomCount.value)}
              bind:paddingsize={inputRoomCapacity.paddingsize}
              readonly={true}
            />
            <div class="gap-2 col-span-1 md:col-span-2 ">
              <div class=" md:flex justify-between  md:gap-2" />
              <!-- {:else} -->
              <div class="flex justify-between ">
                <div class=" col-span-1 md:col-span-2" />
              </div>
              <!-- {/if} -->
            </div>
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
            on:click={() => toggleModal({ op: "save" })}
            type="submit"
            class="w-48  text-center bg-navy-400 hover:bg-navy-500  shadow-lg text-white font-bold py-2 px-4 rounded"
          >
            SAVE
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="opacity-25 fixed inset-0 z-40 bg-black" />
{/if}
