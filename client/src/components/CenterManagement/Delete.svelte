
<script>
  import Fa from "svelte-fa";
  import { faTrash } from "@fortawesome/free-solid-svg-icons";
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
    readonly: true,
    error: null,
    paddingsize: 0,
  };
  let inputCenterPIN = {
    label: "Center PINCODE",
    value: center.pin,
    validate: true,
    readonly: true,
    error: null,
    paddingsize: 0,
  };
  let inputCenterName = {
    label: "Center Name",
    value: center.name,
    validate: true,
    readonly: true,
    paddingsize: 0,
  };
  let inputCenterCapacity = {
    label: "Center Capacity",
    value: center.centerCapacity,
    validate: true,
    readonly: true,
    paddingsize: 0,
  };
  // marks type
  let inputRoomCount = {
    label: "Number's of Room",
    value: center.roomCount,
    validate: true,
    readonly: true,
    paddingsize: 0,
  };

  let inputRoomCapacity = {
    label: "Room Capacity",
    value: center.roomCapacity,
    validate: true,
    readonly: true,
    paddingsize: 0,
  };


  function toggleModal({ op }) {
    if (op === "cancel") {
      showModal = !showModal;
      return true;
    }
    showModal = !showModal;
    dispatch("del", {
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
          <h3 class="text-3xl font-semibold text-white ">Delete Center Details</h3>

          <div class=" text-white">
            <Fa icon={faTrash} size="2x" />
          </div>
        </div>
        <!--body-->
        <div class="relative p-6">
          <div class="grid grid-cols-1 md:grid-cols-2  md:gap-3  ">
            <TextInput
              label={inputCenterName.label}
              value={inputCenterName.value}
              readonly={inputCenterName.readonly}
              paddingsize={inputCenterName.paddingsize}
            />
            <TextInput
              label={inputCenterAddress.label}
              value={inputCenterAddress.value}
              readonly={inputCenterAddress.readonly}
              paddingsize={inputCenterAddress.paddingsize}
            />

            <TextInput
              label={inputCenterPIN.label}
              value={inputCenterPIN.value}
              readonly={inputCenterPIN.readonly}
              paddingsize={inputCenterPIN.paddingsize}
            />

            <TextInput
              label={inputRoomCount.label}
              value={inputRoomCount.value}
              readonly={inputRoomCount.readonly}
              paddingsize={inputRoomCount.paddingsize}
            />

            <TextInput
              label={inputRoomCapacity.label}
              value={inputRoomCapacity.value}
              paddingsize={inputRoomCapacity.paddingsize}
              readonly={true}
            />
            <TextInput
              label={"Center Capacity"}
              value={Number(inputRoomCapacity.value) *
              Number(inputRoomCount.value)}
              paddingsize={inputRoomCapacity.paddingsize}
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
            DELETE
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="opacity-25 fixed inset-0 z-40 bg-black" />
{/if}
