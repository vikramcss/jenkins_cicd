<script>
  import { api } from "../../../api/api";
  import { token, validTime, application } from "../../../stores/stores";
  import { createEventDispatcher, onMount } from "svelte";
  import Alert from "../../../common/Alert.svelte";
  import { goto } from "$app/navigation";
  import FileUploadInput from "../../../components/FileUploadInput.svelte";
  import FileUploadLabel from "../../../components/FileUploadLabel.svelte";
  import { page } from "$app/stores";
  import Step from "../../../common/StepQualifications.svelte";
  import { Jumper,Circle } from 'svelte-loading-spinners';


  export let personalInfo;
  export let essentialQualifications;
  export let uploads = {};
  export let postIdMap;

  let isUploaded = false;
  let uploaderror="";
  let loadingUpload = false;  
  let postId = $page.params.postId;
  let appid = $page.params.appid;
  console.log("personalInfo", personalInfo);

  let alertMsg = {};
  let fileUrl = {};
  let index = 0
  let uploadsLocation = "https://pcb01uploads.s3.ap-south-1.amazonaws.com";

  const dispatch = createEventDispatcher();
  const onPrevious = async (e) => {
    dispatch("uploadDocuments", { action: "previous", data: {} });
  };
  let validateAlert = null;
  let applicationFetched = true;
  onMount(async () => {
    if (!$token) goto("/signin");
    console.log("onMount beginning uploads: ", uploads);

    console.log("uploads: ", uploads);
    if (uploads) {
      fileUrl = { ...uploads };
      for (const [key, value] of Object.entries(fileUrl)) {
        console.log("............/.........", `${key}: ${value}`);
        if (value) {
          fileUrl[key] = `${uploadsLocation}/${value}`;
        } else {
          fileUrl[key] = "";
        }
      }
      fileUrl = { ...fileUrl };
      console.log("uploads: ", uploads);
    }
    applicationFetched = true;
    console.log("received application", $application);
    index = 0
  });
  const validate = () => {
    // check for mandatory uploads
    let valid = true;
    if (!fileUrl.essentialQualifications) {
      let errMsg = "Essential Qualification not attached ";
      validateAlert = validateAlert ? `${validateAlert}, ${errMsg}` : errMsg;
      loadingUpload = false
      valid = false;
    }
    if (
      (postId == "51" || postId == "52" ) &&
      !fileUrl.registrationWithMedicalCouncil
    ) {
      let errMsg =
        "attaching Registration with state medical council is mandatory for this post";
      validateAlert = validateAlert ? `${validateAlert}, ${errMsg}` : errMsg;
      loadingUpload = false
      valid = false;
    }
    if ((postId == "52") && 
      !fileUrl.experience) {
      let errMsg = "Experience not attached";
      validateAlert = validateAlert ? `${validateAlert}, ${errMsg}` : errMsg;
      loadingUpload = false
      valid = false;
    }

    return valid;
  };
  const onPreview = async (e) => {
    loadingUpload = true
    if (!validate()) {
      console.log("validate returning false;");
      loadingUpload = false
      return false;
    }
    dispatch("uploadDocuments", { action: "next", data: {} });
    loadingUpload = false
  };

  const uploadFileForPost = async (e, index, tag) => {
    isUploaded=true
    alertMsg[tag] = null;
    alertMsg = { ...alertMsg };
    if (e.target.files.length == 0) return false;

    let postRecord = postIdMap.find((pm) => pm.postId == postId).record;
    const formData = new FormData();
    formData.append("upload_file", e.target.files[0]);
    // formData.append("index", index.toString());
    // formData.append("tag", tag);
    // formData.append("postRecord", posloadingUpload = falsetRecord);

    const { error, errorMsg, filename } = await api.uploadFileForPost({
      tag,
      postRecord,
      formData,
      token: $token,
    });

    if (error) {
      alertMsg[tag] = errorMsg;
      alertMsg = { ...alertMsg };
      return false;
    }
    loadingUpload = false;
    isUploaded=false
    fileUrl[tag] = `${uploadsLocation}/${filename}`;
    fileUrl = { ...fileUrl };
    console.log("file url is:", fileUrl[tag]);
    console.log("alertMsg is :", alertMsg[tag]);
    dispatch("fileUploaded", { postRecord, tag });
  };
  const deleteFileForPost = async (uploadedFile) => {
    console.log("deleteFile called");
    let postRecord = postIdMap.find((pm) => pm.postId == postId).record;
    let { error } = await api.deleteFileForPost({
      postRecord,
      uploadedFile,
      token: $token,
    });
    if (error) return false;
    loadingUpload = false;
    fileUrl[uploadedFile] = null;
    fileUrl = { ...fileUrl };
    console.log("fileUrl is:", fileUrl[uploadedFile]);
    return true;
  };
</script>

{#if applicationFetched}
  <Step step={"Upload doc"} experience={postId == "52" ? true : false} />
  <div class="container mx-auto">
    <nav
      class="p-3 m-3 text-center font-bold text-lg bg-orange-500 text-orange-50 rounded-lg tracking-wide sticky top-0"
    >
      Essential Qualification
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 inline-block"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
        />
      </svg>
      <span class="text-sm "
        >(attach single pdf for all essential qualifications, size limit 1 mb)<span
        /></span
      >
    </nav>
    <div class="bg-indigo-50 flex items-center justify-center m-4 rounded-lg">
      <div class="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 ">
        <FileUploadLabel
          title={"Essential Qualification"}
          suffix={`Upload single pdf for (${essentialQualifications.reduce(
            (previous, current) => {
              previous = previous == "" ? "" : `${previous}, `;
              return `${previous} ${current.qualification}`;
            },
            ""
          )})`}
          index={(index = index + 1)}
        />
        <FileUploadInput
          uploadFile={uploadFileForPost}
          deleteFile={deleteFileForPost}
          fileUrl={fileUrl["essentialQualifications"]}
          fileTag={"essentialQualifications"}
          title={"Essential Qualifications for the post"}
          bind:alertMsg
          bind:isUploaded
        />
      </div>
    </div>
    <!-- {#if postId == "51" || postId == "52" || postId == "53"}
      <div class="bg-indigo-50 flex items-center justify-center m-4 rounded-lg">
        <div class="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 ">
          <FileUploadLabel
            title={"Registration With State Medical Council"}
            suffix={"Upload Registration With State Medical Council"}
            index={(index = index + 1)}
          />
          <FileUploadInput
            uploadFile={uploadFileForPost}
            deleteFile={deleteFileForPost}
            fileUrl={fileUrl["registrationWithMedicalCouncil"]}
            fileTag={"registrationWithMedicalCouncil"}
            title={"Registration with state medical council"}
            bind:alertMsg
          />
      
        </div>
      </div>
    {/if} -->

    <!-- {#if postId == "52"}
      <div class="bg-indigo-50 flex items-center justify-center m-4 rounded-lg">
        <div class="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 ">
          <FileUploadLabel
            title={"Experience"}
            suffix={"Upload Experience Certificate"}
            index={(index = index + 1)}
          />
          <FileUploadInput
            uploadFile={uploadFileForPost}
            deleteFile={deleteFileForPost}
            fileUrl={fileUrl["experience"]}
            fileTag={"experience"}
            title={"Experience"}
            bind:alertMsg
          />
        </div>
      </div>
    {/if} -->

    {#if validateAlert}
      <Alert
        message={validateAlert}
        on:alertClosed={() => {
          validateAlert = null;
        }}
      />
    {/if}
  </div>
  <div class="flex flex-row justify-center m-4">
    {#if loadingUpload}
      <div class="">
        <Circle size="60" color="#FF3E00" unit="px" duration="1s" />
      </div>
    {:else}
      <button
        on:click={onPrevious}
        type="button"
        class="mt-5 w-48 text-center bg-orange-50 hover:bg-white shadow-lg text-gray-500 font-bold py-2 px-4 rounded"
      >
        PREVIOUS
      </button>
      {#if $validTime}
        <button
          on:click={onPreview}
          type="button"
          class="mt-5 w-48  text-center bg-orange-500 hover:bg-orange-400  shadow-lg text-white font-bold py-2 px-4 rounded"
        >
          PREVIEW
        </button>
      {:else}
        <button
          on:click={(e) => goto("/dashboard")}
          type="button"
          class="mt-5 w-48  text-center bg-gray-500 hover:bg-orange-400  shadow-lg text-white font-bold py-2 px-4 rounded"
        >
          s
        </button>
      {/if}
    {/if}
  </div>
{:else}
 <div class=" h-screen">
    <Circle size="60" color="#FF3E00" unit="px" duration="1s" />
  </div>
  ...Loading Please wait
{/if}
