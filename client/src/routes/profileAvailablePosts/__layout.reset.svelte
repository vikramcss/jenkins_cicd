<script>
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { application, token } from "../../stores/stores";
  import { api } from "../../api/api";
  import Image from "../../common/Image.svelte";

  export let personalInfo;
  let appid;
  let photo;
  let dataLoaded = false;
  onMount(async () => {
    if (!$token) goto("/signin");
    let {
      error,
      errorMsg: lerrorMsg,
      login: llogin,
      application,
    } = await api.getApplication({ token: $token });
    console.log("Application is..../", application);
    photo = application?.uploads?.photo;
    personalInfo = application.personalInfo;
    appid = application.appid;
    dataLoaded = true;
  });
  let placeHolderProfile = "/avatar.jpg";
</script>

<navbar>
  {#if dataLoaded}
    <div class="bg-orange-400 flex text-center ">
      <div class="grid md:grid-cols-10">
        <div class="col-span-3 lg:col-span-1 p-5 ">
          <img class="w-32 lg:w-full rounded-full" src="/PCBlogo.png" alt="" />
        </div>
        <div
          class="col-span-7 lg:col-span-6 ml-14 text-gray-700 flex items-center mr-10  justify-start font-semibold text-lg lg:text-xl "
        >
          Available Post - Pune Cantonment Board
        </div>
        <div class=" flex justify-center items-center ">
          {#if photo}
            <!-- {#if false} -->
            <Image
              src={`https://pcb01uploads.s3.ap-south-1.amazonaws.com/${photo}`}
              cssclass="object-cover h-20 w-20 md:ml-14 ml-8 rounded-full "
            />
          {:else}
            <Image
              src={placeHolderProfile}
              cssclass="object-cover h-20 w-20 lg:ml-14 ml-8 rounded-full "
            />
          {/if}
        </div>

        <div
          class=" text-left text-xs ml-8 lg:ml-4  font-bold text-gray-700 md:mt-12 w-full mt-8 mb-4"
        >
          {personalInfo?.name ? ` ${personalInfo?.name}` : ""}
          {personalInfo?.email ? `${personalInfo?.email}` : ""}
          <div class="text-xs">
            {personalInfo?.category
              ? `${personalInfo?.category}`
              : ""}{personalInfo?.mobile ? `, ${personalInfo?.mobile}` : ""}
          </div>
        </div>
      </div>
      <div class="mr-4">
        <button
          type="submit"
          class=" mt-8 w-18 p-2 h-18 text-center flex justify-center bg-white hover:bg-orange-400 shadow-lg text-orange-500 hover:text-orange-50 text-sm font-semibold rounded "
          on:click={() => {
            $token = "";
            goto("/signin");
          }}
        >
          SignOut
        </button>
      </div>
    </div>
  {/if}
</navbar>

<slot />
