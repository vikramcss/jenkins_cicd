<script>
  import Step from "../../common/Step.svelte";
  import { api } from "../../api/api";
  import { token } from "../../stores/stores";
  import { createEventDispatcher, onMount } from "svelte";
  import { DateTime } from "luxon";
  import Image from "../../common/Image.svelte";
  import Alert from "../../common/Alert.svelte";
  import FileUploadInput from "../../components/FileUploadInput.svelte";
  import FileUploadLabel from "../../components/FileUploadLabel.svelte";
  import { validTime } from "../../stores/stores";
  import { Circle } from "svelte-loading-spinners";

  export let personalInfo;
  export let permanentAddress;
  export let uploads = {};
  export let loadingForUpload;
  export let uploadError;

  let alertMsg = {};
  let fileUrl = {};
  let index = 0;
  let uploadsLocation = "https://pcb01uploads.s3.ap-south-1.amazonaws.com";
  let isUploaded=false
  const dispatch = createEventDispatcher();
  const onPrevious = async (e) => {
    dispatch("uploadDocuments", { action: "previous", data: {} });
  };
  let validateAlert = null;

  let applicationFetched = false;
  onMount(async () => {
    if (uploads) {
      fileUrl = uploads;
      for (const [key, value] of Object.entries(fileUrl)) {
        console.log("............/.........", `${key}: ${value}`);
        if (value) {
          fileUrl[key] = `${uploadsLocation}/${value}`;
        } else {
          fileUrl[key] = "";
        }
      }
      fileUrl = { ...uploads };
    }
    applicationFetched = true;
    index = 0;
  });
  const validate = () => {
    // check for mandatory uploads
    let valid = true;
    validateAlert = null;
    if (!fileUrl.photo) {
      let errMsg = "Photo not attached";
      validateAlert = errMsg;
      valid = false;
    }
    if (!fileUrl.sign) {
      let errMsg = "Sign not attached";
      validateAlert = validateAlert ? `${validateAlert}, ${errMsg}` : errMsg;
      valid = false;
    }
    if (!fileUrl.dob) {
      let errMsg = "DOB proof not attached";
      validateAlert = validateAlert ? `${validateAlert}, ${errMsg}` : errMsg;
      valid = false;
    }

    if (
      personalInfo.category == "SC" ||
      personalInfo.category == "ST" ||
      personalInfo.category == "OBC" ||
      personalInfo.category == "EWS"
    ) {
      if (!fileUrl.category) {
        let errMsg = `Category file (for ${personalInfo.category}) not attached`;
        validateAlert = validateAlert ? `${validateAlert}, ${errMsg}` : errMsg;
        valid = false;
      }
    }
    if (personalInfo.category == "OBC") {
      if (!fileUrl.nclfile) {
        let errMsg = "NCL certificate/undertaking not attached";
        validateAlert = validateAlert ? `${validateAlert}, ${errMsg}` : errMsg;
        valid = false;
      }
    }

    if (!fileUrl.identity) {
      let errMsg = "Identity proof not attached";
      validateAlert = validateAlert ? `${validateAlert}, ${errMsg}` : errMsg;
      valid = false;
    }
    if (
      personalInfo.gender == "Female" &&
      personalInfo.widowOrDivorced == "Yes" &&
      !fileUrl.widow_divorced_separated
    ) {
      let errMsg = "certificate of widow/divorced/separated proof not attached";
      validateAlert = validateAlert ? `${validateAlert}, ${errMsg}` : errMsg;
      valid = false;
    }
    if (
      personalInfo.gender == "Female" &&
      personalInfo.widowOrDivorced == "Yes" &&
      !fileUrl.sd_widow_divorced_separated
    ) {
      let errMsg = "widow/divorced/separated Self Declaration not attached";
      validateAlert = validateAlert ? `${validateAlert}, ${errMsg}` : errMsg;
      valid = false;
    }

    if (personalInfo.exserviceman == "Yes" && !fileUrl.exserviceman) {
      let errMsg =
        "ex-serviceman should attach relevant pages of the discharge book";
      validateAlert = validateAlert ? `${validateAlert}, ${errMsg}` : errMsg;
      valid = false;
    }

    if (personalInfo.govemployee == "Yes" && !fileUrl.govemployee) {
      let errMsg = "Pune Cantonment Employee proof not attached";
      validateAlert = validateAlert ? `${validateAlert}, ${errMsg}` : errMsg;
      valid = false;
    }

    // if (personalInfo.scribe == "Yes" && !fileUrl.scribe) {
    //   let errMsg = "Scribe Declaration from not attached";
    //   validateAlert = validateAlert ? `${validateAlert}, ${errMsg}` : errMsg;
    //   valid = false;
    // }

    if (personalInfo.pwd == "Yes" && !fileUrl.pwd) {
      let errMsg = "PwBD proof not attached";
      validateAlert = validateAlert ? `${validateAlert}, ${errMsg}` : errMsg;
      valid = false;
    }
    return valid;
  };
  const onDone = async (e) => {
    if (!validate()) {
      console.log("validate returning false;");
      return false;
    }
    loadingForUpload = true;
    dispatch("uploadDocuments", {
      action: "done",
      data: { profileCompleted: "Done" },
    });
  };

  const deleteFile = async (uploadedFile) => {
    console.log("deleteFile called");
    let { error } = await api.deleteFile({ uploadedFile, token: $token });
    if (error) return false;
    fileUrl[uploadedFile] = null;
    fileUrl = { ...fileUrl };
    console.log("fileUrl is:", fileUrl[uploadedFile]);
    return true;
  };

  const uploadFile = async (e, index, tag) => {
    isUploaded=true
    alertMsg[tag] = null;
    alertMsg = { ...alertMsg };
    if (e.target.files.length == 0) return false;

    const formData = new FormData();
    formData.append("upload_file", e.target.files[0]);
    formData.append("index", index.toString());
    formData.append("tag", tag);
    const { error, errorMsg, filename } = await api.uploadFile({
      tag,
      formData,
      token: $token,
    });
    if (error) {
      alertMsg[tag] = errorMsg;
      alertMsg = { ...alertMsg };
      return false;
    }
    fileUrl[tag] = `${uploadsLocation}/${filename}`;
    fileUrl = { ...fileUrl };
    isUploaded=false
    console.log("file url is:", fileUrl[tag]);
    console.log("alertMsg is :", alertMsg[tag]);
  };
</script>

{#if applicationFetched}
  <Step step={"Upload doc"} />
  <div class="container mx-auto">
    <nav
      class="p-3 m-3  text-center font-bold text-lg bg-orange-400 text-orange-100 rounded-lg tracking-wide  top-0"
    >
      Photo and Sign
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
      <span class="text-sm ">(attach JPEG, JPG size limit 200 kb)</span>
    </nav>
    <div class="bg-indigo-50 flex items-center justify-center m-4 rounded-lg">
      <div class="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 " />
      <div>
        <div
          class="grid grid-cols-6 grid-flow-row h-full w-full bg-gray-200 xl:bg-white  my-2 p-10 rounded-lg "
        >
          <div
            class="col-span-6 lg:col-span-3 md:mx-32 lg:mx-20 xl:mx-40  h-full justify-center rounded-lg  text-xl bg-indigo-50"
          >
            <span class="flex font-bold justify-center">Photo</span>

            <div
              class="m-2 rounded-lg h-64 border-dashed border-2 border-gray-200 bg-white flex justify-center items-center hover:cursor-pointer"
            >
              <div class="absolute">
                <div class="flex flex-col items-center ">
                  <i class="fa fa-cloud-upload fa-3x text-gray-200" />
                  <span class="block text-gray-400 font-normal"
                    >Attach you files here</span
                  > <span class="block text-gray-400 font-normal">or</span>
                  <span class="block text-orange-400 font-normal"
                    >Browse files</span
                  >
                </div>
              </div>
              <div class="absolute">
                <Image
                  src={fileUrl["photo"]}
                  cssclass="object-cover h-60 w-64"
                />
              </div>
              <input
                type="file"
                class="h-full w-full opacity-0"
                name=""
                on:change={(e) => uploadFile(e, 0, "photo")}
              />
            </div>
            {#if alertMsg["photo"]}
              <Alert
                message={alertMsg["photo"]}
                on:alertClosed={() => {
                  alertMsg = { ...alertMsg, photo: null };
                }}
              />
            {/if}
            <p class="text-gray-700 text-normal text-sm ml-2">
              (Passport size colour photo 4.5cm x 3.5cm) Note: Uploaded image
              should be less than 200kb. Image background should be white.
            </p>
          </div>

          <div
            class="col-span-6 lg:col-span-3 md:mx-32 lg:mx-20 xl:mx-40  mt-6 lg:mt-0 border border-white h-52 lg:h-48 justify-center rounded-lg  bg-indigo-50"
          >
            <span class="flex justify-center font-bold  text-xl ">Sign</span>

            <div
              class="m-2 rounded-lg h-20   border-dashed border-2 border-gray-200 bg-white flex justify-center items-center hover:cursor-pointer"
            >
              <div class="absolute">
                <div class="flex flex-col items-center ">
                  <i class="fa fa-cloud-upload fa-3x text-gray-200" />
                  <span class="block text-gray-400 font-normal"
                    >Attach you files here</span
                  > <span class="block text-gray-400 font-normal">or</span>
                  <span class="block text-orange-400 font-normal"
                    >Browse files</span
                  >
                </div>
              </div>
              <div class="absolute">
                <Image
                  src={fileUrl["sign"]}
                  cssclass="object-cover h-20 w-64"
                />
              </div>
              <input
                type="file"
                class="h-full w-full opacity-0"
                name=""
                on:change={(e) => uploadFile(e, 0, "sign")}
              />
            </div>
            {#if alertMsg["sign"]}
              <Alert
                message={alertMsg["sign"]}
                on:alertClosed={() => {
                  alertMsg = { ...alertMsg, sign: null };
                }}
              />
            {/if}
            <p class="text-gray-700 text-normal text-sm ml-2 ">
              Note: Uploaded image should be less than 200kb. Image background
              should be white
            </p>
          </div>
        </div>
      </div>
    </div>
    <nav
      class="p-3 m-3  text-center font-bold text-lg bg-orange-400 text-orange-100 rounded-lg tracking-wide sticky top-0"
    >
      Personal Information
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
      <span class="text-sm ">(attach pdf, size limit 1 mb)<span /></span>
    </nav>

    <div class="bg-indigo-50 flex items-center justify-center m-4 rounded-lg">
      <div class="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 ">
        <FileUploadLabel
          title={`Proof Of Date Of Birth`}
          suffix={`School Leaving Certificate/any other valid Birth proof for age verification. DOB: ${DateTime.fromFormat(
            personalInfo.dob,
            "dd-MM-yyyy"
          ).toFormat("dd MMM yyyy")}`}
          index={(index = index + 1)}
        />
        <FileUploadInput
          {uploadFile}
          {deleteFile}
          fileUrl={fileUrl["dob"]}
          fileTag={"dob"}
          title={"Date of Birth"}
          bind:alertMsg
          bind:isUploaded
        />
        <FileUploadLabel
          title={`Proof of Identity`}
          suffix={`Aadhar Card/Voter Id/Pan Card/Driving License for ${personalInfo.name}`}
          index={(index = index + 1)}
        />
        <FileUploadInput
          {uploadFile}
          {deleteFile}
          fileUrl={fileUrl["identity"]}
          fileTag={"identity"}
          title={"Identity"}
          bind:alertMsg
          bind:isUploaded
        />
        

        {#if personalInfo.pwd == "Yes"}
          <FileUploadLabel
            title={`Proof of Person with disability (40%)`}
            suffix={`Certificate of PwBD for ${personalInfo.name}, PwBD Type is ${personalInfo.PWDType}`}
            index={(index = index + 1)}
          />
          <FileUploadInput
            {uploadFile}
            {deleteFile}
            fileUrl={fileUrl["pwd"]}
            fileTag={"pwd"}
            title={"Person with disability"}
            bind:alertMsg
          bind:isUploaded
        />
          
        {/if}
        {#if personalInfo.widowOrDivorced == "Yes"}
          <FileUploadLabel
            title={`Proof of Widows/Divorced/Judicially separated Women`}
            suffix={`In case of Widow/Divorced/Judicially separated woman, document of proof to be submitted. Certificate regarding not 're-married' also to be submitted.`}
            index={(index = index + 1)}
          />
          <FileUploadInput
            {uploadFile}
            {deleteFile}
            fileUrl={fileUrl["widow_divorced_separated"]}
            fileTag={"widow_divorced_separated"}
            title={"Widow/Divorced/Separated"}
            bind:alertMsg
          bind:isUploaded
        />
        
        {/if}
        {#if personalInfo.widowOrDivorced == "Yes"}
          <FileUploadLabel
            title={`Self declaration of being widow/Divorced/Judicially in prescribed format as detail in advertisement`}
            suffix={`Self Declaration`}
            index={(index = index + 1)}
          />
          <FileUploadInput
            {uploadFile}
            {deleteFile}
            fileUrl={fileUrl["sd_widow_divorced_separated"]}
            fileTag={"sd_widow_divorced_separated"}
            title={"Self Declaration"}
            bind:alertMsg
          bind:isUploaded
        />
          />
        {/if}
        {#if personalInfo.exserviceman == "Yes"}
          <FileUploadLabel
            title={`Proof of Ex-Serviceman`}
            suffix={`Discharge Certificate from service, service copy of Pension PPO and copy of Ex-serviceman Identity Card for ${personalInfo.name}`}
            index={(index = index + 1)}
          />
          <FileUploadInput
            {uploadFile}
            {deleteFile}
            fileUrl={fileUrl["exserviceman"]}
            fileTag={"exserviceman"}
            title={"Ex-Serviceman"}
            bind:alertMsg
          bind:isUploaded
        />
          
        {/if}
        {#if personalInfo.govemployee == "Yes"}
          <FileUploadLabel
            title={`Employee Of Pune Cantonment Board`}
            suffix={`Certificate from PCB of employment including employee Id for ${personalInfo.name}`}
            index={(index = index + 1)}
          />
          <FileUploadInput
            {uploadFile}
            {deleteFile}
            fileUrl={fileUrl["govemployee"]}
            fileTag={"govemployee"}
            title={"Employee of PCB"}
            bind:alertMsg
          bind:isUploaded
        />
          
        {/if}

        {#if personalInfo.scribe == "Yes"}
          <FileUploadLabel
            title={`Upload Scribe Declaration Form`}
            suffix={`Declaration from of Scribe ${personalInfo.name}`}
            index={(index = index + 1)}
          />
          <FileUploadInput
            {uploadFile}
            {deleteFile}
            fileUrl={fileUrl["scribe"]}
            fileTag={"scribe"}
            title={`Scribe Declaration Form`}
            bind:alertMsg
          bind:isUploaded
        />
          
        {/if}

        {#if personalInfo.category !== "Gen"}
          <FileUploadLabel
            title={`Proof of Category (${personalInfo.category})`}
            suffix={personalInfo.category == "EWS"
              ? `Please upload Eligibility Certificate for candidate of Economically Weaker Section (EWS)`
              : personalInfo.category == "SC" ||
                personalInfo.category == "ST" ||
                "OBC"
              ? `Photo copy of Caste Certificate for (${personalInfo.category}) category, duly attested by self for reserved post`
              : ""}
            index={(index = index + 1)}
          />
          <FileUploadInput
            {uploadFile}
            {deleteFile}
            fileUrl={fileUrl["category"]}
            fileTag={"category"}
            title={`Category (${personalInfo.category})`}
            bind:alertMsg
          bind:isUploaded
        />
          {#if personalInfo.category === "OBC"}
            <FileUploadLabel
              title={`Proof of Non-Creamy Layer Certificate (NCL)`}
              suffix={"Latest Non-Creamy Layer Certificate, i.e. valid till March 2023 (for OBC candidates) or Undetaking that you will provide valid NCL certificate at time of Exam/Interview/Joining."}
              index={(index = index + 1)}
            />
            <FileUploadInput
              {uploadFile}
              {deleteFile}
              fileUrl={fileUrl["nclfile"]}
              fileTag={"nclfile"}
              title={"NCL certificate"}
              bind:alertMsg
          bind:isUploaded
        />
          {/if}
        {/if}
      </div>
    </div>

    {#if validateAlert}
      <Alert
        message={validateAlert}
        on:alertClosed={() => {
          validateAlert = null;
        }}
      />
    {/if}
    {#if uploadError}
      <Alert
        bind:message={uploadError}
        on:alertClosed={() => (uploadError = null)}
      />
    {/if}
  </div>
  <div class="flex flex-row justify-center m-4">
    {#if loadingForUpload}
      <Circle size="60" color="#FF3E00" unit="px" duration="1s" />
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
          on:click={onDone}
          type="button"
          class="mt-5 w-48  text-center bg-orange-400 hover:bg-orange-300  shadow-lg text-white font-bold py-2 px-4 rounded"
        >
          DONE
        </button>
      {:else}
        <button
          on:click={onDone}
          type="button"
          class="mt-5 w-48  text-center bg-gray-500 hover:bg-orange-300  shadow-lg text-white font-bold py-2 px-4 rounded"
        >
          DONE
        </button>
      {/if}
    {/if}
  </div>
{:else}
  <Circle size="60" color="#FF3E00" unit="px" duration="1s" />
  ...Loading Please wait
{/if}
