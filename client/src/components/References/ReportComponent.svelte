i am copy of ReportComponent
<script>
  import { createEventDispatcher } from "svelte";
  import { api } from "../api/api.js";
  import { token } from "../stores/stores";
  import Alert from "../common/Alert.svelte";
  import Image from "../common/Image.svelte";
  import { DateTime } from "luxon";
  import { startApplications, endApplications } from "../stores/stores";

  
  export let personalInfo;
  export let correspondenceAddress;
  export let permanentAddress;
  export let essentialQualifications;
  export let experiences;
  export let appid;

  export let uploads = {};
  export let permanentIsCorrespondence;
  export let otherQualifications;

  export let initiatePayment;
  export let order_id;
  export let applicantInfo;
  export let makePaymentCB;

  let paymentAlert;
  let alert;

  let uploadsLocation = "https://pcb01uploads.s3.ap-south-1.amazonaws.com";
  let photoUrl = uploads.photo ? `${uploadsLocation}/${uploads.photo}` : null;
  let signUrl = uploads.sign ? `${uploadsLocation}/${uploads.sign}` : null;

  let logourl = "/STP-logo.jpg";
  const dispatch = createEventDispatcher();
  // begin
  let reinitiatePayment = null;

  const paymentDone = (response, confirmation_client) => {
    console.log(confirmation_client);
    dispatch("preview", { action: "paymentDone", confirmation_client });
  };
  const makePayment = async () => {
    paymentAlert = null;

    if (!($startApplications && !$endApplications)) {
      alert = "time is up";
      return;
    }

    console.log("makePayment called");
    const {
      error,
      errorMsg,
      orderid,
      applicantInfo: lapplicantInfo,
    } = await api.getPaymentId({
      token: $token,
      amount: 100 * 100,
    });
    applicantInfo = lapplicantInfo;

    if (error == 0) {
      order_id = orderid;
      if (!initiatePayment) initiatePayment = true;
      else if (reinitiatePayment) reinitiatePayment();
    } else {
      paymentAlert = "Error in initiating payment";
    }

    console.log("order_id is:", order_id, " error is:", error);
  };
  const scriptLoaded = () => {
    console.log("script loaded");
  };
  makePaymentCB = makePayment;
</script>

<svelte:head>
  <script
  src="https://checkout.razorpay.com/v1/checkout.js"
  on:load={scriptLoaded}>
</script>
  
</svelte:head>
<div class="text-xs lg:text-base m-8 border-4">
  <div class="hidden lg:inline">
  <div class="flex justify-center mt-5 ">
    <div class="w-11/12 grid rounded-lg grid-cols-3 grid-flow-row">
      <div class="col-span-3">
        <div
          class="flex border-b-2 tracking-wider text-lg font-semibold p-2 rounded-t-lg"
        >
        Personal Information (AppId: {appid})
        </div>
      </div>
      <div class="col-span-3">
        <div class="grid grid-cols-6 p-4">
          <div class="col-span-1 text-right">Full Name :</div>
          <div class="col-span-4 text-left ml-2 font-bold">
            {personalInfo.name}
          </div>
          <div class="col-span-1 row-span-5 mb-2">
            <div class="">
              <Image src={photoUrl} cssclass="object-cover h-60 w-64" />
            </div>
          
          </div>

          <div class="col-span-1   text-right">Father's/Husband's Name :</div>
          <div class="col-span-4   text-left ml-2 font-bold">
          {personalInfo.fathersName}
          </div>
          <div class="col-span-1   text-right">Date Of Birth :</div>
          <div class="col-span-1   text-left ml-2 font-bold">
            {personalInfo.dob}
          </div>

          <div class="col-span-1   text-right">Nationality :</div>
          <div class="col-span-2 text-left ml-2 font-bold">
            {personalInfo.nationality}
          </div>
          <div class="col-span-1 text-right">Religion :</div>
          <div class="col-span-1 text-left ml-2 font-bold">
            {personalInfo.religion}
          </div>
          <div class="col-span-1 text-right">Category :</div>
          <div class="col-span-2 text-left ml-2 font-bold">
            {personalInfo.category}
          </div>
          <div class="col-span-1 text-right">Gender :</div>
          <div class="col-span-1 text-left ml-2 font-bold">
            {personalInfo.gender}
          </div>
          <div class="col-span-1 text-right">PWD :</div>
          <div class="col-span-2 text-left ml-2 font-bold">
            {personalInfo.pwd == "No" ? "No" : personalInfo.PWDType}
          </div>
          <div class="col-span-1 text-right">Email ID :</div>
          <div class="col-span-1 text-left ml-2 font-bold">
            {personalInfo.email}
          </div>
          <div class="col-span-1 text-right">Mobile No :</div>
          <div class="col-span-2 text-left ml-2 font-bold">
            {personalInfo.mobile}
          </div>
          <div class="col-span-1 row-span-2 ">
            <div class="">
              <Image src={signUrl} cssclass="object-cover h-20 w-64" />
            </div>
          
          </div>
          <div class="col-span-1 text-right">Correspondance Address :</div>
          <div class="col-span-4 text-left ml-2 font-bold">
            {correspondenceAddress.addressLine1}
            {correspondenceAddress.addressLine2}
            {correspondenceAddress.district}
            {correspondenceAddress.state}
            {correspondenceAddress.pin} 
          </div>
          <div class="col-span-1 text-right">Permanent Address :</div>
          <div class="col-span-5 text-left ml-2 font-bold">
            {#if permanentIsCorrespondence}
            {correspondenceAddress.addressLine1}
            {correspondenceAddress.addressLine2}
            {correspondenceAddress.district}
            {correspondenceAddress.state}
            {correspondenceAddress.pin}
          {:else}
            {permanentAddress.addressLine1}
            {permanentAddress.addressLine2}
            {permanentAddress.district}
            {permanentAddress.state}
            {permanentAddress.pin}
          {/if}
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
  <
  <div class="flex justify-center">
    <div class="flex flex-col h-auto w-11/12 mt-3 ">
      <div class=" ">
        <div
          class=" flex flex-row border-b-2  tracking-wider text-lg font-bold p-2 mb-4 bg-gray-600 rounded"
        >
          Essential Qualification : Graduation
        </div>
      </div>
      <div class="bg-white p-2 flex flex-col">
        <div class="grid grid-cols-5 grid-flow-row  ">
          <div class=" col-span-5   rounded-lg shadow-lg">
            <div class="grid grid-cols-10 ">
              <div class="col-span-1 border border-gray-400 ">
                <div class="font-bold text-sm border text-center p-2">Sr.No.</div>
                {#each essentialQualifications.filter(e=>e.qualification == 'Graduation') as q, i}
                  <div class="font-semibold text-sm border h-12 text-center p-2">
                    {i + 1}
                  </div>
                {/each}
              </div>
              <div class="col-span-2 border border-gray-400 ">
                <div class="font-bold text-sm border text-center p-2">
                  University/Board
                </div>
  
                {#each essentialQualifications.filter(e=>e.qualification == 'Graduation') as q, i}
                  <div class="font-semibold text-sm border h-12 text-center p-2">
                    {#if q.qualification == "Graduation"}
                      {q.university}
                    {:else}
                      {q.certifyingAuthority}
                    {/if}
                  </div>
                {/each}
              </div>
              <div class="col-span-1 border border-gray-400 ">
                <div class="font-bold text-sm border text-center p-2">
                  Qualification
                </div>
                {#each essentialQualifications.filter(e=>e.qualification == 'Graduation') as q, i}
                  <div class="font-semibold  text-sm border h-12 text-center p-2">
                    {q.qualification}
                  </div>
                {/each}
              </div>
              <div class="col-span-2 border border-gray-400 ">
                <div class="font-bold text-sm border text-center p-2">
                  Specialization
                </div>
  
                {#each essentialQualifications.filter(e=>e.qualification == 'Graduation') as q, i}
                  <div class="font-semibold  text-sm border h-12 text-center p-2">
                    {#if q.degree === "Other"}
                    {q.degree} - {q.otherDegree}
                  {:else}
                    {q.degree}
                  {/if}
                  </div>
                {/each}
              </div>
              <div class="col-span-1 border border-gray-400 ">
                <div class="font-bold text-sm border text-center p-2">
                  Year of Passing
                </div>
                {#each essentialQualifications.filter(e=>e.qualification == 'Graduation') as q, i}
                  <div class="font-semibold  text-sm border h-12 text-center p-2">
                    {#if q.qualification == "Graduation"}
                      {q.yearOfPassing}
                    {:else}
                      {q.examMonth} - {q.examYear}
                    {/if}
                  </div>
                {/each}
              </div>
              <div class="col-span-2 border border-gray-400 ">
                <div class="font-bold text-sm border text-center p-2">
                  Marks/CGPA
                </div>
                {#each essentialQualifications.filter(e=>e.qualification == 'Graduation') as q, i}
                  <div class="font-semibold  text-sm border h-12 text-center p-2">
                    {#if q.qualification == "Graduation"}
                      {#if q.marksType == "Percentage"}
                        {q.evaluation.percentage.marks}
                      {:else}
                        {q.evaluation.cgpa.gpa}
                      {/if}
                    {:else}
                      {q.gradeOrMarks}
                    {/if}
                  </div>
                {/each}
              </div>
              <div class="col-span-1 border border-gray-400 ">
                <div class="font-bold text-sm border text-center p-2">
                  Percentage (%)
                </div>
                {#each essentialQualifications.filter(e=>e.qualification == 'Graduation') as q, i}
                  <div class="font-semibold  text-sm border h-12 text-center p-2">
                    {#if q.qualification == "Graduation"}
                      {#if q.marksType == "Percentage"}
                        {q.evaluation.percentage.percentage}%
                      {:else}
                        N/A
                      {/if}
                    {:else}
                      --
                    {/if}
                  </div>
                {/each}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="flex justify-center">
    <div class="flex flex-col h-auto w-11/12 mt-3 ">
      <div class=" ">
        <div
          class=" flex flex-row border-b-2  tracking-wider text-lg font-bold p-2 mb-4 bg-gray-600 rounded"
        >
          Essential Qualification : Eglish Typing 40
        </div>
      </div>
      <div class="bg-white p-2 flex flex-col">
        <div class="grid grid-cols-5 grid-flow-row  ">
          <div class=" col-span-5   rounded-lg shadow-lg">
            <div class="grid grid-cols-10 ">
              <div class="col-span-1 border border-gray-400 ">
                <div class="font-bold text-sm border text-center p-2">Sr.No.</div>
                {#each essentialQualifications.filter(e=>e.qualification == 'English Typing 40') as q, i}
                  <div class="font-semibold text-sm border h-12 text-center p-2">
                    {i + 1}
                  </div>
                {/each}
              </div>
              <div class="col-span-2 border border-gray-400 ">
                <div class="font-bold text-sm border text-center p-2">
                 Certifying Authority
                </div>
  
                {#each essentialQualifications.filter(e=>e.qualification == 'English Typing 40') as q, i}
                  <div class="font-semibold text-sm border h-12 text-center p-2">
                    {#if q.certifyingAuthority === "Other"}
                    {q.certifyingAuthority} - {q.certifyingAuthorityOther}
                  {:else}
                    {q.certifyingAuthority}
                  {/if}
                  </div>
                {/each}
              </div>
              <div class="col-span-1 border border-gray-400 ">
                <div class="font-bold text-sm border text-center p-2">
                  Qualification
                </div>
                {#each essentialQualifications.filter(e=>e.qualification == 'English Typing 40') as q, i}
                  <div class="font-semibold  text-sm border h-12 text-center p-2">
                    {q.qualification}
                  </div>
                {/each}
              </div>
              <div class="col-span-2 border border-gray-400 ">
                <div class="font-bold text-sm border text-center p-2">
                  Typing Certificate
                </div>
  
                {#each essentialQualifications.filter(e=>e.qualification == 'English Typing 40') as q, i}
                  <div class="font-semibold  text-sm border h-12 text-center p-2">
                    {#if q.qualification == "Graduation"}
                      {q.degree}
                    {:else}
                      {q.certificateType}
                    {/if}
                  </div>
                {/each}
              </div>
              <div class="col-span-2 border border-gray-400 ">
                <div class="font-bold text-sm border text-center p-2">
                Month-Year (Exam)
                </div>
                {#each essentialQualifications.filter(e=>e.qualification == 'English Typing 40') as q, i}
                  <div class="font-semibold  text-sm border h-12 text-center p-2">
                    {#if q.qualification == "Graduation"}
                      {q.yearOfPassing}
                    {:else}
                      {q.examMonth} - {q.examYear}
                    {/if}
                  </div>
                {/each}
              </div>
              <div class="col-span-2 border border-gray-400 ">
                <div class="font-bold text-sm border text-center p-2">
                 Grade/Marks
                </div>
                {#each essentialQualifications.filter(e=>e.qualification == 'English Typing 40') as q, i}
                  <div class="font-semibold  text-sm border h-12 text-center p-2">
                    {#if q.qualification == "Graduation"}
                      {#if q.marksType == "Percentage"}
                        {q.evaluation.percentage.marks}
                      {:else}
                        {q.evaluation.cgpa.gpa}
                      {/if}
                    {:else}
                      {q.gradeOrMarks}
                    {/if}
                  </div>
                {/each}
              </div>
              <!-- <div class="col-span-1 border border-gray-400 ">
                <div class="font-bold text-sm border text-center p-2">
                  Percentage (%)
                </div>
                {#each essentialQualifications.filter(e=>e.qualification == 'English Typing 40') as q, i}
                  <div class="font-semibold  text-sm border h-12 text-center p-2">
                    {#if q.qualification == "Graduation"}
                      {#if q.marksType == "Percentage"}
                        {q.evaluation.percentage.percentage}%
                      {:else}
                        N/A
                      {/if}
                    {:else}
                      --
                    {/if}
                  </div>
                {/each}
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="flex justify-center">
    <div class="flex flex-col h-auto w-11/12 mt-3 ">
      <div class=" ">
        <div
          class="flex flex-row border-b-2 tracking-wider text-lg font-bold p-2 mb-4 bg-gray-600 rounded"
        >
          Other Qualification 10th onwards
        </div>
      </div>
  
      <div class="bg-white p-2 flex flex-col">
        <div class="grid grid-cols-5 grid-flow-row  ">
          <div class=" col-span-5   rounded-lg shadow-lg">
            <div class="grid grid-cols-10 ">
              <div class="col-span-1 border border-gray-400 ">
                <div class="font-bold text-sm border text-center p-2 ">
                  Sr.No.
                </div>
                {#each otherQualifications as q, i}
                  <div class="font-semibold text-sm border text-center p-2">
                    {i + 1}
                  </div>
                {/each}
              </div>
              <div class="col-span-2 border border-gray-400 ">
                <div class="font-bold text-sm border text-center p-2">
                  University/Board
                </div>
                {#each otherQualifications as q, i}
                  <div class="font-semibold text-sm border text-center p-2">
                    {q.university}
                  </div>
                {/each}
              </div>
              <div class="col-span-2 border border-gray-400 ">
                <div class="font-bold text-sm border text-center p-2">
                  Qualification
                </div>
                {#each otherQualifications as q, i}
                  <div class="font-semibold  text-sm border text-center p-2">
                    {q.qualification}
                  </div>
                {/each}
              </div>
              <div class="col-span-2 border border-gray-400 ">
                <div class="font-bold text-sm border text-center p-2">
                  Specialization
                </div>
                {#each otherQualifications as q, i}
                  <div class="font-semibold  text-sm border text-center p-2">
                    {#if q.qualification == "10th"}
                      --
                    {:else if q.qualification == "12th"}
                      {q.twelthSpecialization}
                    {:else if q.qualification == "Diploma"}
                      {q.diplomaSubject}
                    {/if}
                  </div>
                {/each}
              </div>
              <div class="col-span-1 border border-gray-400 ">
                <div class="font-bold text-sm border text-center p-2">
                  Year Of Passing
                </div>
                {#each otherQualifications as q, i}
                  <div class="font-semibold  text-sm border text-center p-2">
                    {q.yearOfPassing}
                  </div>
                {/each}
              </div>
  
              <div class="col-span-1 border border-gray-400 ">
                <div class="font-bold text-sm border text-center p-2">Marks</div>
                {#each otherQualifications as q, i}
                  <div class="font-semibold  text-sm border text-center p-2">
                    {q.marks}
                  </div>
                {/each}
              </div>
              <div class="col-span-1 border border-gray-400 ">
                <div class="font-bold text-sm border text-center p-2">
                  Percentage (%)
                </div>
                {#each otherQualifications as q, i}
                  <div class="font-semibold  text-sm border text-center p-2">
                    {q.percentage}%
                  </div>
                {/each}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
  <div class="flex justify-center mt-5 ">
    <div
      class="grid w-11/12 md:w-7/12 bg-white shadow-lg grid-cols-3 grid-flow-row"
    />
  </div>
  
  {#if paymentAlert}
    <Alert message={paymentAlert} on:alertClosed={() => (paymentAlert = null)} />
  {/if}
  {#if alert}
    <Alert message={alert} on:alertClosed={() => (alert = null)} />
  {/if}
  