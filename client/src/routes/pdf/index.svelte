
<script>
    import { goto } from "$app/navigation";
    import { createEventDispatcher } from "svelte";
    import { api } from "../../api/api";
    import { token } from "../../stores/stores";
    import Razorpay from "../../components/Razorpay.svelte";
    import Alert from "../../common/Alert.svelte";
  
    export let personalInfo;
    export let correspondenceAddress;
    export let permanentAddress;
    export let essentialQualifications;
    export let experiences;
    export let achievements;
    export let uploads;
    export let addressOutsideIndia;
    export let permanentIsCorrespondence;
    export let otherQualifications;
    export let references;
    export let additionalInformation;
    export let applciation;
  
    let submitverified = false;
    let logourl = "http://localhost:3000/STP-logo.jpg";
    const dispatch = createEventDispatcher();
    // begin
    let order_id;
    let initiatePayment = false;
    let paymentAlert = null;
    let reinitiatePayment = null;
    let applicantInfo = {}
  
    const paymentDone = (response, confirmation_client ) => {
      console.log(confirmation_client)
      dispatch('preview', {action: 'paymentDone', confirmation_client})
    }
    const makePayment = async () => {
      paymentAlert = null;
      console.log("makePayment called");
      const { error, errorMsg, orderid , applicantInfo:lapplicantInfo} = await api.getPaymentId({
        token: $token,
        amount: 800 * 100,
      });
      applicantInfo = lapplicantInfo;
  
      if (error == 0) {
        order_id = orderid;
        if (!initiatePayment) initiatePayment = true;
        else if(reinitiatePayment) reinitiatePayment();
      } else {
        paymentAlert = "Error in initiating payment";
      }
  
      console.log("order_id is:", order_id, " error is:", error);
    };
    const scriptLoaded = () =>{
      console.log('script loaded')
    }
  </script>
  <svelte:head>
    <script
      src="https://checkout.razorpay.com/v1/checkout.js"
      on:load={scriptLoaded}>
    </script>
  </svelte:head>
  <main>
    <div class="text-xs lg:text-base ">
      <div class="flex justify-center mt-5 ">
        <div class="w-11/12 grid rounded-lg shadow-lg grid-cols-3 grid-flow-row">
          <div class="col-span-3">
            <div
              class="flex  bg-gray-700 text-white tracking-wider text-lg font-semibold p-2 rounded-t-lg"
            >
              Personal Information
            </div>
          </div>
          <div class="col-span-3">
            <div class="grid grid-cols-6 p-4">
              <div class="col-span-3 md:col-span-1 text-right">Full Name :</div>
              <div class="col-span-3 md:col-span-5 text-left ml-2 font-bold">
                {personalInfo.name}
              </div>
  
              <div class="col-span-3 md:col-span-1   text-right">
                Father's/Husband's Name :
              </div>
              <div class="col-span-3 md:col-span-5   text-left ml-2 font-bold">
                {personalInfo.fathersName}
              </div>
              <div class="col-span-3 md:col-span-1   text-right">
                Date Of Birth :
              </div>
              <div class="col-span-3 md:col-span-1   text-left ml-2 font-bold">
                {personalInfo.dob}
              </div>
  
              <div class="col-span-3 md:col-span-1   text-right">
                Nationality :
              </div>
              <div class="col-span-3 md:col-span-1 text-left ml-2 font-bold">
                {personalInfo.nationality}
              </div>
              <div class="col-span-3 md:col-span-1 text-right">Religion :</div>
              <div class="col-span-3 md:col-span-1 text-left ml-2 font-bold">
                {personalInfo.religion}
              </div>
              <div class="col-span-3 md:col-span-1 text-right">Category :</div>
              <div class="col-span-3 md:col-span-1 text-left ml-2 font-bold">
                {personalInfo.category}
              </div>
              <div class="col-span-3 md:col-span-1 text-right">Gender :</div>
              <div class="col-span-3 md:col-span-1 text-left ml-2 font-bold">
                {personalInfo.gender}
              </div>
              <div class="col-span-3 md:col-span-1 text-right">PWD :</div>
              <div class="col-span-3 md:col-span-1 text-left ml-2 font-bold">
                {personalInfo.pwd == "No" ? "No" : personalInfo.PWDType}
              </div>
              <div class="col-span-3 md:col-span-1 text-right">Email ID :</div>
              <div class="col-span-3 md:col-span-1 text-left ml-2 font-bold">
                {personalInfo.email}
              </div>
              <div class="col-span-3 md:col-span-1 text-right">Mobile No :</div>
              <div class="col-span-3 md:col-span-3 text-left ml-2 font-bold">
                {personalInfo.mobile}
              </div>
              <div class="col-span-3 md:col-span-1 text-right">
                Correspondance Address :
              </div>
              <div class="col-span-3 md:col-span-5 text-left ml-2 font-bold">
                {#if addressOutsideIndia == "No"}
                  {correspondenceAddress.withinIndia.addressLine1}
                  {correspondenceAddress.withinIndia.addressLine2}
                  {correspondenceAddress.withinIndia.district}
                  {correspondenceAddress.withinIndia.state}
                  {correspondenceAddress.withinIndia.pin}
                {:else}
                  {correspondenceAddress.outOfIndia.addressLine}
                  {correspondenceAddress.outOfIndia.state}
                  {correspondenceAddress.outOfIndia.zip}
                  {correspondenceAddress.outOfIndia.country}
                {/if}
              </div>
              <div class="col-span-3 md:col-span-1 text-right">
                Permanent Address :
              </div>
              <div class="col-span-3 md:col-span-5 text-left ml-2 font-bold">
                {#if permanentIsCorrespondence}
                  {correspondenceAddress.withinIndia.addressLine1}
                  {correspondenceAddress.withinIndia.addressLine2}
                  {correspondenceAddress.withinIndia.district}
                  {correspondenceAddress.withinIndia.state}
                  {correspondenceAddress.withinIndia.pin}
                {:else}
                  {correspondenceAddress.addressLine1}
                  {correspondenceAddress.addressLine2}
                  {correspondenceAddress.district}
                  {correspondenceAddress.state}
                  {correspondenceAddress.pin}
                {/if}
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <div class="flex justify-center">
        <div class="flex flex-col h-auto w-11/12 mt-3 rounded-lg shadow-2xl ">
          <div class=" ">
            <div
              class="flex flex-row  bg-gray-700 text-white tracking-wider text-lg font-bold p-2 rounded-t-lg"
            >
              Essential Qualification
            </div>
          </div>
          <div class="bg-white p-2 flex flex-col">
            <div class="grid grid-cols-5 grid-flow-row  ">
              <div class=" col-span-5   rounded-lg shadow-lg">
                <div class="grid grid-cols-10 ">
                  <div class="col-span-10 lg:col-span-1 border border-gray-400 ">
                    <div class="font-bold text-sm border text-center p-2">
                      Sr.No.
                    </div>
                    {#each essentialQualifications as q, i}
                      <div class="font-semibold text-sm border text-center p-2">
                        {i + 1}
                      </div>
                    {/each}
                  </div>
                  <div class="col-span-10 lg:col-span-2 border border-gray-400 ">
                    <div class="font-bold text-sm border text-center p-2">
                      University/Board
                    </div>
                    {#each essentialQualifications as q, i}
                      <div class="font-semibold text-sm border text-center p-2">
                        {#if q.qualification != "Ph.d"}
                          {q.mtechME ? q.mtechME.university : ""}
                        {:else}
                          {q.phD.university}
                        {/if}
                      </div>
                    {/each}
                  </div>
                  <div class="col-span-10 lg:col-span-2 border border-gray-400 ">
                    <div class="font-bold text-sm border text-center p-2">
                      Qualification
                    </div>
                    {#each essentialQualifications as q, i}
                      <div class="font-semibold  text-sm border text-center p-2">
                        {#if q.qualification == "M.Tech" || q.qualification == "M.E."}
                        {q.qualification}
                       
                      {:else}
                        {q.qualification}
                       
                      {/if}
                      </div>
                    {/each}
                  </div>
                  <div class="col-span-10 lg:col-span-2 border border-gray-400 ">
                    <div class="font-bold text-sm border text-center p-2">
                      Subject
                    </div>
                    {#each essentialQualifications as q, i}
                      <div class="font-semibold  text-sm border text-center p-2">
                        {#if q.qualification == "M.Tech" || q.qualification == "M.E."}
                    
                    {q.mtechME.subject}
                   
                  {:else}
                    
                    {q.phD.subject}
                    
                  {/if}
                      </div>
                    {/each}
                  </div>
                  <div class="col-span-10 lg:col-span-1 border border-gray-400 ">
                    <div class="font-bold text-sm border text-center p-2">
                      Year of Passing
                    </div>
                    {#each essentialQualifications as q, i}
                      <div class="font-semibold  text-sm border text-center p-2">
                        {#if q.qualification == "M.Tech" || q.qualification == "M.E."}
                    
                        {q.mtechME.yearOfPassing}
                      {:else}
                        
                        {q.phD.yearOfPassing}
                      {/if}
                      </div>
                    {/each}
                  </div>
                  <div class="col-span-10 lg:col-span-1 border border-gray-400 ">
                    <div class="font-bold text-sm border text-center p-2">
                      Marks/CGPA
                    </div>
                    {#each essentialQualifications as q, i}
                      <div class="font-semibold  text-sm border text-center p-2">
                        {#if q.qualification != "Ph.d"}
                          {q.mtechME.marksType == "CGPA"
                            ? q.mtechME.cgpa.gpa
                            : q.mtechME.percentage.marks}
                        {:else}
                          {q.phD.dateOfAward}
                        {/if}
                      </div>
                    {/each}
                  </div>
                  <div class="col-span-10 lg:col-span-1 border border-gray-400 ">
                    <div class="font-bold text-sm border text-center p-2">
                      Percentage (%)
                    </div>
                    {#each essentialQualifications as q, i}
                      <div class="font-semibold  text-sm border text-center p-2">
                        {#if q.qualification != "Ph.d"}
                          {q.mtechME.marksType == "CGPA"
                            ? "--"
                            : q.mtechME.percentage.percentage}
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
        <div class="flex flex-col h-auto w-11/12 mt-3 rounded-lg shadow-2xl ">
          <div class=" ">
            <div
              class="flex flex-row  bg-gray-700 text-white text-lg font-bold tracking-wider p-2 rounded-t-lg"
            >
              Other Qualification 10th onwards
            </div>
          </div>
  
          <div class="bg-white p-2 flex flex-col">
            <div class="grid grid-cols-5 grid-flow-row  ">
              <div class=" col-span-5   rounded-lg shadow-lg">
                <div class="grid grid-cols-10 ">
                  <div class="col-span-10 lg:col-span-1 border border-gray-400 ">
                    <div class="font-bold text-sm border text-center p-2">
                      Sr.No.
                    </div>
                    {#each otherQualifications as q, i}
                      <div class="font-semibold text-sm border text-center p-2">
                        {i + 1}
                      </div>
                    {/each}
                  </div>
                  <div class="col-span-10 lg:col-span-2 border border-gray-400 ">
                    <div class="font-bold text-sm border text-center p-2">
                      University/Board
                    </div>
                    {#each otherQualifications as q, i}
                      <div class="font-semibold text-sm border text-center p-2">
                        {q.university}
                      </div>
                    {/each}
                  </div>
                  <div class="col-span-10 lg:col-span-2 border border-gray-400 ">
                    <div class="font-bold text-sm border text-center p-2">
                      Qualification
                    </div>
                    {#each otherQualifications as q, i}
                      <div class="font-semibold  text-sm border text-center p-2">
                        {q.qualification}
                        
                      </div>
                    {/each}
                  </div>
                  <div class="col-span-10 lg:col-span-2 border border-gray-400 ">
                    <div class="font-bold text-sm border text-center p-2">
                     Subject
                    </div>
                    {#each otherQualifications as q, i}
                      <div class="font-semibold  text-sm border text-center p-2">
                      
                        {q.subject}
                      </div>
                    {/each}
                  </div>
                  <div class="col-span-10 lg:col-span-1 border border-gray-400 ">
                    <div class="font-bold text-sm border text-center p-2">
                    Year Of Passing
                    </div>
                    {#each otherQualifications as q, i}
                      <div class="font-semibold  text-sm border text-center p-2">
                        
                        {q.yearOfPassing}
                        
                      </div>
                    {/each}
                  </div>
                  
                  <div class="col-span-10 lg:col-span-1 border border-gray-400 ">
                    <div class="font-bold text-sm border text-center p-2">
                      Marks
                    </div>
                    {#each otherQualifications as q, i}
                      <div class="font-semibold  text-sm border text-center p-2">
                        {q.marks}
                      </div>
                    {/each}
                  </div>
                  <div class="col-span-10 lg:col-span-1 border border-gray-400 ">
                    <div class="font-bold text-sm border text-center p-2">
                      Percentage (%)
                    </div>
                    {#each otherQualifications as q, i}
                      <div class="font-semibold  text-sm border text-center p-2">
                        {q.percentage}
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
        <div class="flex flex-col h-auto w-11/12 mt-3 rounded-lg shadow-2xl ">
          <div class=" ">
            <div
              class="flex flex-row  bg-gray-700 text-white text-lg font-bold tracking-wider p-2 rounded-t-lg"
            >
              Experience
            </div>
          </div>
  
          <div class="bg-white p-2 flex flex-col">
            <div class="grid grid-cols-5 grid-flow-row  ">
              <div class=" col-span-5   rounded-lg shadow-lg">
                <div class="grid grid-cols-10 ">
                  <div class="col-span-10 lg:col-span-2 border border-gray-400 ">
                    <div class="font-bold text-sm border text-center p-2">
                      Sr.No.
                    </div>
                    {#each experiences as e, i}
                      <div class="font-semibold text-sm border text-center p-2">
                        {i + 1}
                      </div>
                    {/each}
                  </div>
                  <div class="col-span-10 lg:col-span-2 border border-gray-400 ">
                    <div class="font-bold text-sm border text-center p-2">
                      Name of Organization
                    </div>
                    {#each experiences as e, i}
                      <div class="font-semibold text-sm border text-center p-2">
                        {e.nameOfOrganization}
                      </div>
                    {/each}
                  </div>
                  <div class="col-span-10 lg:col-span-2 border border-gray-400 ">
                    <div class="font-bold text-sm border text-center p-2">
                      Post Held
                    </div>
                    {#each experiences as e, i}
                      <div class="font-semibold  text-sm border text-center p-2">
                        {e.postHeld}
                      </div>
                    {/each}
                  </div>
                  <div class="col-span-10 lg:col-span-2 border border-gray-400 ">
                    <div class="font-bold text-sm border text-center p-2">
                      Duration
                    </div>
                    {#each experiences as e, i}
                      <div class="font-semibold  text-sm border text-center p-2">
                        {e.experienceFrom} To {e.experienceTo}
                      </div>
                    {/each}
                  </div>
                  <div class="col-span-10 lg:col-span-2 border border-gray-400 ">
                    <div class="font-bold text-sm border text-center p-2">
                      Salary
                    </div>
                    {#each experiences as e, i}
                      <div class="font-semibold  text-sm border text-center p-2">
                        {e.salary}
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
        <div class="flex flex-col h-auto w-11/12 mt-3 rounded-lg shadow-2xl ">
          <div class=" ">
            <div
              class="flex flex-row  bg-gray-700 text-white text-lg font-bold tracking-wider p-2 rounded-t-lg"
            >
              Achievement
            </div>
          </div>
  
          <div class="bg-white p-2 flex flex-col">
            <div class="grid grid-cols-5 grid-flow-row  ">
              <div class=" col-span-5   rounded-lg shadow-lg">
                <div class="grid grid-cols-10 ">
                  <div class="col-span-10 lg:col-span-2 border border-gray-400 ">
                    <div class="font-bold text-sm border text-center p-2">
                      Sr.No.
                    </div>
                    {#if achievements.publishedPapers && achievements.publishedPapers.length > 0}
                      {#each achievements.publishedPapers as p, i}
                        <div class="font-semibold text-sm border text-center p-2">
                          {i + 1}
                        </div>
                      {/each}
                    {/if}
                  </div>
                  <div class="col-span-10 lg:col-span-2 border border-gray-400 ">
                    <div class="font-bold text-sm border text-center p-2">
                      Type of Achievement
                    </div>
                    {#if achievements.publishedPapers && achievements.publishedPapers.length > 0}
                      {#each achievements.publishedPapers as p, i}
                        <div class="font-semibold text-sm border text-center p-2">
                          Published Paper
                        </div>
                      {/each}
                    {/if}
                  </div>
                  <div class="col-span-10 lg:col-span-2 border border-gray-400 ">
                    <div class="font-bold text-sm border text-center p-2">
                      Title
                    </div>
                    {#if achievements.publishedPapers && achievements.publishedPapers.length > 0}
                      {#each achievements.publishedPapers as p, i}
                        <div
                          class="font-semibold  text-sm border text-center p-2"
                        >
                          {p.title}
                        </div>
                      {/each}
                    {/if}
                  </div>
                  <div class="col-span-10 lg:col-span-4 border border-gray-400 ">
                    <div class="font-bold text-sm border text-center p-2">
                      Details
                    </div>
                    {#if achievements.publishedPapers && achievements.publishedPapers.length > 0}
                      {#each achievements.publishedPapers as p, i}
                        <div
                          class="font-semibold  text-sm border text-center p-2"
                        >
                          {p.nameOfJournal}
                          {p.author}
                          {p.year}
                        </div>
                      {/each}
                    {/if}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-center">
        <div class="flex flex-col h-auto w-11/12 mt-3 rounded-lg shadow-2xl ">
          <div class=" ">
            <div
              class="flex flex-row  bg-gray-700 text-white text-lg font-bold tracking-wider p-2 rounded-t-lg"
            >
              References
              <span class="ml-5 mt-1 mr-5 text-sm "
                >(*No Blood Relation) Testimonials to be sought in 1pdf</span
              >
            </div>
          </div>
  
          <div class="bg-white p-2 flex flex-col">
            <div class="grid grid-cols-5 grid-flow-row  ">
              <div class=" col-span-5   rounded-lg shadow-lg">
                <div class="grid grid-cols-11 ">
                  <div class="col-span-11 lg:col-span-1 border border-gray-400 ">
                    <div class="font-bold text-sm border text-center p-2">
                      Sr.No.
                    </div>
                    {#each references as r, i}
                      <div class="font-semibold text-sm border text-center p-2">
                        {i + 1}
                      </div>
                    {/each}
                  </div>
                  <div class="col-span-11 lg:col-span-2 border border-gray-400 ">
                    <div class="font-bold text-sm border text-center p-2">
                      Name 
                    </div>
                    {#each references as r, i}
                      <div class="font-semibold text-sm border text-center p-2">
                        {r.refName}
                       
                      </div>
                     
                       
                    
                    {/each}
                  </div>
  
                  <div class="col-span-11 lg:col-span-2 border border-gray-400 ">
                    <div class="font-bold text-sm border text-center p-2">
                     Designation
                    </div>
                    {#each references as r, i}
                      <div class="font-semibold text-sm border text-center p-2">
                        
                        {r.refOccupation}
                      </div>
                     
                       
                    
                    {/each}
                  </div>
                  <div class="col-span-11 lg:col-span-2 border border-gray-400 ">
                    <div class="font-bold text-sm border text-center p-2">
                      Address
                    </div>
                    {#each references as r, i}
                      <div class="font-semibold  text-sm border text-center p-2">
                        {r.refAddress}
                      </div>
                    {/each}
                  </div>
                  <div class="col-span-11 lg:col-span-2 border border-gray-400 ">
                    <div class="font-bold text-sm border text-center p-2">
                     Email
                    </div>
                    {#each references as r, i}
                      <div class="font-semibold  text-sm border text-center p-2">
                        
                        {r.refEmail}
                      </div>
                    {/each}
                  </div>
                  <div class="col-span-11 lg:col-span-2 border border-gray-400 ">
                    <div class="font-bold text-sm border text-center p-2">
                      Mobile
                    </div>
                    {#each references as r, i}
                      <div class="font-semibold  text-sm border text-center p-2">
                       
                        {r.refMobile}
                      </div>
                    {/each}
                  </div>
                  <div class="col-span-11  border border-gray-400 ">
                    <div class="font-bold text-sm border text-left p-2">
                      Additional Information
                    </div>
                    <div class="font-semibold  text-sm border  p-2">
                      {additionalInformation}
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
          class="grid w-11/12 md:w-7/12 bg-white rounded-lg shadow-lg grid-cols-3 grid-flow-row"
        />
      </div>
    </div>
    <div class="mx-10 px-5 py-4 font-semibold text-lg">
      <label class="px-3">
        <input type="checkbox" bind:checked={submitverified} class="mx-4"/>
        <div>I hereby declare that I have carefully read and fully understood all the instructions and details pertaining to the post being applied by me and all statements made and information furnished in this application are true and complete to the best of my knowledge and belief.</div>
  
       <div> I also declare that I have not concealed any material information which may debar my candidature for the post applied for. In the event of suppression or distortion of any fact including category, age or educational qualification, experience etc. made in my application form, I understand that I will be denied any employment in the organization and if already employed on any of the posts in the Institute, my services will be terminated forthwith without notice.</div>
         
      </label>
    </div>
    {#if paymentAlert}
      <Alert
        message={paymentAlert}
        on:alertClosed={() => (paymentAlert = null)}
      />
    {/if}
    <div class="flex flex-row justify-center gap-2 mx-4 mb-5">
      <button
        type="submit"
        class="mt-5 w-48 text-center bg-indigo-100 hover:bg-white shadow-lg text-gray-500 hover:text-gray-700 font-bold py-2 px-4 rounded"
        on:click={() => {
          dispatch("preview", { action: "previous", data: {} });
        }}
      >
        PREVIOUS
      </button>
      {#if submitverified}
        <button
          type="submit"
          class="mt-5 w-48  text-center bg-indigo-600 hover:bg-indigo-500  shadow-lg text-white font-bold py-2 px-4 rounded"
          on:click={() => {
            makePayment();
          }}
        >
          PAY FEES
        </button>
      {:else}
        <button
          type="submit"
          class="mt-5 w-48  text-center bg-gray-600 hover:bg-gray-500  shadow-lg text-white font-bold py-2 px-4 rounded"
        >
          PAY FEES
        </button>
      {/if}
    </div>
  </main>
  {#if initiatePayment}
    <Razorpay
      {order_id}
      name={applicantInfo.name},
      email={applicantInfo.email}
      contact={applicantInfo.mobile}
      amount={applicantInfo.amount}
      paymentDone={paymentDone}
    />
  {/if}
  