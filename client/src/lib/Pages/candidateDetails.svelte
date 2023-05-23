<script>
import Image from "../../common/Image.svelte";
    
  
    // import InputRadioGroup from "../../common/InputRadioGroup.svelte";
  export let application = [];
    let candidate = [
      { name: "indraji shiavji patil", appid: "1234" },
      { name: "karansinh prakash raorane", appid: "112" },
      { name: "aniket nitin kate", appid: "222" },
      { name: "vikramsigh p patil", appid: "2344" },
      { name: "harshad s mehta", appid: "2334" },
    ];
    let selectedApplication = null
  </script>
  
  <!-- {JSON.stringify(application,null,2)} -->
  <div class="grid grid-cols-12 mt-2">
    <div class="col-span-1">
      <div class="grid grid-cols-1">
        {#each application as app}
        <button
          class="col-span-1 bg-gray-500 rounded font-bold text-white m-1 p-1 flex justify-center"
          on:click={()=> selectedApplication = app}
        >
        {app.appid} 
        
        </button>
      {/each}
      </div>
    </div>
    <!-- <div class="col-span-12">
      <div class="grid grid-cols-12">
        <div class="col-span-12 border">candidate Name</div>
        <div class=" col-span-2 flex justify-center text-md p-2 border">srNo</div>
        <div class="col-span-7 flex justify-center text-md p-2 border">
          Candidate Name
        </div>
        <div class="col-span-3 flex justify-center text-md p-2 border text-md ">
          Verified
        </div>
  
        {#each candidate as candi, i}
          <div
            class="col-span-2 flex justify-center text-md p-1 border font-bold text-gray-700"
          >
            {i + 1}
          </div>
          <div
            class="col-span-7 flex justify-center text-md p-1 border font-semibold text-sm break-words text-gray-700"
          >
            {candi.name}
          </div>
          <div
            class="col-span-3 flex justify-center text-md p-1 border font-bold"
          >
            <div class="grid grid-cols-3">
              <div class="col-span-2 text-gray-700 font-semibold text-sm">
                {candi.appid}
              </div>
              <div class=" text-green-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                  />
                </svg>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div> -->
    <!-- 1st end -->
    <!-- 2nd -->
    <div class="col-span-4 ">
      <div class="grid grid-cols-6 ">
        <div class="col-span-6 ml-4 bg-gray-200 rounded-md p-2 mx-2 text-gray-800">Candidate Details <span class="font-bold flex justify-end text-gray-700 bg-gray-400 ">{application.length}</span></div>
        <div class="col-span-6 ml-4">
          <div class="grid grid-cols-12">
            <div class="col-span-6 bg-gray-200 rounded-md mb-2 mt-2">
              <div class="grid grid-cols-2">
                <div class="col-span-2 flex items-center justify-center mt-2 ">
                  <Image
                  src={"static/user.jpeg"}
                  cssclass=""
                />
                </div>
                <div class="col-span-2 ">
                  <div class="grid grid-cols-2 items-center ">
                    <div class="col-span-1 m-2  flex justify-center items-center">
                       <input
                      id="yellow-radio"
                      type="radio"
                      value=""
                      name="colored-radio"
                      class="w-4 h-4 text-yellow-400 bg-gray-100 border-gray-300 focus:ring-yellow-500 dark:focus:ring-yellow-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      for="yellow-radio"
                      class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >Yes</label
                    >
  
                    </div>
                    <div class="col-span-1">
                      <input
                     id="yellow-radio"
                     type="radio"
                     value=""
                     name="colored-radio"
                     class="w-4 h-4 text-yellow-400 bg-gray-100 border-gray-300 focus:ring-yellow-500 dark:focus:ring-yellow-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                   />
                   <label
                     for="yellow-radio"
                     class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                     >No</label
                   >
  
                   </div>
                   
                  
                  </div>
                </div>
              </div>
            </div>
            <div class="col-span-6 p-1 bg-gray-100 rounded-lg m-2 ">
              <div class="grid grid-cols-2  gap-10 ">
                
                <div class="col-span-2 row-start-2 mb-2">
                  <Image src={"static/sign.png"} cssclass="object-cover " />
                </div>
                <div class="col-span-1 row-start-4 flex justify-center">
                  <input
                  id="yellow-radio"
                  type="radio"
                  value=""
                  name="colored-radio"
                  class="w-4 h-4 text-yellow-400 bg-gray-100 border-gray-300 focus:ring-yellow-500 dark:focus:ring-yellow-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="yellow-radio"
                  class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >Yes</label
                >
                </div>
                <div class="col-span-1 row-start-4 flex justify-center">
                  <input
                  id="yellow-radio"
                  type="radio"
                  value=""
                  name="colored-radio"
                  class="w-4 h-4 text-yellow-400 bg-gray-100 border-gray-300 focus:ring-yellow-500 dark:focus:ring-yellow-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="yellow-radio"
                  class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >No</label
                >
                </div>
              </div>
              <!-- <div class="w-48 m-2">
                <Image src={"static/sign.png"} cssclass="object-cover " />
              </div> -->
              
              <!-- <div class="flex items-center ml-2">
                <input
                  id="yellow-radio"
                  type="radio"
                  value=""
                  name="colored-radio"
                  class="w-4 h-4 text-yellow-400 bg-gray-100 border-gray-300 focus:ring-yellow-500 dark:focus:ring-yellow-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="yellow-radio"
                  class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >Yes</label
                >
                <input
                  id="yellow-radio"
                  type="radio"
                  value=""
                  name="colored-radio"
                  class="w-4 h-4 text-yellow-400 bg-gray-100 border-gray-300 focus:ring-yellow-500 dark:focus:ring-yellow-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="yellow-radio"
                  class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >No</label
                >
              </div> -->
            </div>
          </div>
        </div>
  
        <div class="col-span-6 mr-2">
          <div
            class="grid grid-cols-7 justify-center bg-gray-100 p-2 rounded-md ml-2"
          >
            <div class="col-span-4">
              Name:<span class="font-semibold ml-2">{selectedApplication?selectedApplication.personalInfo.name:''}</span>
            </div>
            <div class="col-span-1 text-blue-500">view</div>
            <div class="col-span-2 flex flex-wrap">
              <div class="flex items-center ml-2">
                <input
                  id="yellow-radio"
                  type="radio"
                  value=""
                  name="colored-radio"
                  class="w-4 h-4 text-yellow-400 bg-gray-100 border-gray-300 focus:ring-yellow-500 dark:focus:ring-yellow-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="yellow-radio"
                  class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >Yes</label
                >
              </div>
              <div class="flex items-center ml-2">
                <input
                  id="yellow-radio"
                  type="radio"
                  value=""
                  name="colored-radio"
                  class="w-4 h-4 text-yellow-400 bg-gray-100 border-gray-300 focus:ring-yellow-500 dark:focus:ring-yellow-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="yellow-radio"
                  class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >No</label
                >
              </div>
            </div>
          </div>
        </div>
        <!-- DOB Start -->
        <div class="col-span-6 mt-2 mr-2">
          <div
            class="grid grid-cols-7 justify-center bg-gray-100 p-2 rounded-md ml-2"
          >
            <div class="col-span-4 flex  items-center">
              DOB:
              <input
                type="text"
                id="first_name"
                class=" ml-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block h-10 w-32 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter DOB "
                required
              />
  
            </div>
            <div class="col-span-1 text-blue-500">view</div>
            <div class="col-span-2 flex flex-wrap">
              <div class="flex items-center ml-2">
                <input
                  id="yellow-radio"
                  type="radio"
                  value=""
                  name="colored-radio"
                  class="w-4 h-4 text-yellow-400 bg-gray-100 border-gray-300 focus:ring-yellow-500 dark:focus:ring-yellow-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="yellow-radio"
                  class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >Yes</label
                >
              </div>
              <div class="flex items-center ml-2">
                <input
                  id="yellow-radio"
                  type="radio"
                  value=""
                  name="colored-radio"
                  class="w-4 h-4 text-yellow-400 bg-gray-100 border-gray-300 focus:ring-yellow-500 dark:focus:ring-yellow-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="yellow-radio"
                  class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >No</label
                >
              </div>
            </div>
          </div>
        </div>
        <!-- DOB end -->
        <div class="col-span-6 mt-2 mr-2">
          <div
            class="grid grid-cols-7 justify-center bg-gray-100 p-2 rounded-md ml-2"
          >
            <div class="col-span-4">
              Qualifaction:<span class="font-semibold ml-2">{selectedApplication ? selectedApplication.essentialQualifications ? selectedApplication.essentialQualifications.find(e=>e.qualification == "Graduation").degree:"":""}</span>
            </div>
            <div class="col-span-1 text-blue-500">view</div>
            <div class="col-span-2 flex flex-wrap">
              <div class="flex items-center ml-2">
                <input
                  id="yellow-radio"
                  type="radio"
                  value=""
                  name="colored-radio"
                  class="w-4 h-4 text-yellow-400 bg-gray-100 border-gray-300 focus:ring-yellow-500 dark:focus:ring-yellow-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="yellow-radio"
                  class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >Yes</label
                >
              </div>
              <div class="flex items-center ml-2">
                <input
                  id="yellow-radio"
                  type="radio"
                  value=""
                  name="colored-radio"
                  class="w-4 h-4 text-yellow-400 bg-gray-100 border-gray-300 focus:ring-yellow-500 dark:focus:ring-yellow-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="yellow-radio"
                  class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >No</label
                >
              </div>
            </div>
          </div>
        </div>
        <!-- emp of kbc -->
        <div class="col-span-6 mt-2 mr-2">
          <div
            class="grid grid-cols-7 justify-center bg-gray-100 p-2 rounded-md ml-2"
          >
            <div class="col-span-4">
              Typinng Hindi 30:<span class="font-semibold ml-2"></span>
            </div>
            <div class="col-span-1 text-blue-500">view</div>
            <div class="col-span-2 flex flex-wrap">
              <div class="flex items-center ml-2">
                <input
                  id="yellow-radio"
                  type="radio"
                  value=""
                  name="colored-radio"
                  class="w-4 h-4 text-yellow-400 bg-gray-100 border-gray-300 focus:ring-yellow-500 dark:focus:ring-yellow-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="yellow-radio"
                  class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >Yes</label
                >
              </div>
              <div class="flex items-center ml-2">
                <input
                  id="yellow-radio"
                  type="radio"
                  value=""
                  name="colored-radio"
                  class="w-4 h-4 text-yellow-400 bg-gray-100 border-gray-300 focus:ring-yellow-500 dark:focus:ring-yellow-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="yellow-radio"
                  class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >No</label
                >
              </div>
            </div>
          </div>
        </div>
        <!-- emp of kbc end -->
        <!-- CAST -->
        <div class="col-span-6 mt-2 mr-2">
          <div
            class="grid grid-cols-7 justify-center bg-gray-100 p-2 rounded-md ml-2"
          >
            <div class="col-span-4">
              Typinng English 40:<span class="font-semibold ml-2"></span>
            </div>
            <div class="col-span-1 text-blue-500">view</div>
            <div class="col-span-2 flex flex-wrap">
              <div class="flex items-center ml-2">
                <input
                  id="yellow-radio"
                  type="radio"
                  value=""
                  name="colored-radio"
                  class="w-4 h-4 text-yellow-400 bg-gray-100 border-gray-300 focus:ring-yellow-500 dark:focus:ring-yellow-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="yellow-radio"
                  class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >Yes</label
                >
              </div>
              <div class="flex items-center ml-2">
                <input
                  id="yellow-radio"
                  type="radio"
                  value=""
                  name="colored-radio"
                  class="w-4 h-4 text-yellow-400 bg-gray-100 border-gray-300 focus:ring-yellow-500 dark:focus:ring-yellow-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="yellow-radio"
                  class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >No</label
                >
              </div>
            </div>
          </div>
        </div>
        <!-- cast end -->
        <div class="col-span-6 mt-2 mr-2">
          <div
            class="grid grid-cols-7 justify-center bg-gray-100 p-2 rounded-md ml-2"
          >
            <div class="col-span-4">
            Cast :<span class="font-semibold ml-2">{selectedApplication ? selectedApplication.personalInfo.category :''}</span>
            </div>
            <div class="col-span-1 text-blue-500">view</div>
            <div class="col-span-2 flex flex-wrap">
              <div class="flex items-center ml-2">
                <input
                  id="yellow-radio"
                  type="radio"
                  value=""
                  name="colored-radio"
                  class="w-4 h-4 text-yellow-400 bg-gray-100 border-gray-300 focus:ring-yellow-500 dark:focus:ring-yellow-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="yellow-radio"
                  class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >Yes</label
                >
              </div>
              <div class="flex items-center ml-2">
                <input
                  id="yellow-radio"
                  type="radio"
                  value=""
                  name="colored-radio"
                  class="w-4 h-4 text-yellow-400 bg-gray-100 border-gray-300 focus:ring-yellow-500 dark:focus:ring-yellow-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="yellow-radio"
                  class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >No</label
                >
              </div>
            </div>
          </div>
        </div>
  
  
  
        <div class="col-span-6 mt-2 mr-2">
          <div
            class="grid grid-cols-7 justify-center bg-gray-100 p-2 rounded-md ml-2"
          >
            <div class="col-span-4">
            EMP of KCB :<span class="font-semibold ml-2">{selectedApplication ? selectedApplication.personalInfo.KCBrelatedEmployee :''}</span>
            </div>
            <div class="col-span-1 text-blue-500">view</div>
            <div class="col-span-2 flex flex-wrap">
              <div class="flex items-center ml-2">
                <input
                  id="yellow-radio"
                  type="radio"
                  value=""
                  name="colored-radio"
                  class="w-4 h-4 text-yellow-400 bg-gray-100 border-gray-300 focus:ring-yellow-500 dark:focus:ring-yellow-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="yellow-radio"
                  class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >Yes</label
                >
              </div>
              <div class="flex items-center ml-2">
                <input
                  id="yellow-radio"
                  type="radio"
                  value=""
                  name="colored-radio"
                  class="w-4 h-4 text-yellow-400 bg-gray-100 border-gray-300 focus:ring-yellow-500 dark:focus:ring-yellow-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="yellow-radio"
                  class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >No</label
                >
              </div>
            </div>
          </div>
        </div>
  
        <div class="col-span-6 mt-2 mr-2">
          <div
            class="grid grid-cols-7 justify-center bg-gray-100 p-2 rounded-md ml-2"
          >
            <div class="col-span-4 ">
              EWS : <span class="font-semibold ml-2">EWS</span>
            </div>
            <div class="col-span-1 text-blue-500">view</div>
            <div class="col-span-2 flex flex-wrap">
              <div class="flex items-center ml-2">
                <input
                  id="yellow-radio"
                  type="radio"
                  value=""
                  name="colored-radio"
                  class="w-4 h-4 text-yellow-400 bg-gray-100 border-gray-300 focus:ring-yellow-500 dark:focus:ring-yellow-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="yellow-radio"
                  class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >Yes</label
                >
              </div>
              <div class="flex items-center ml-2">
                <input
                  id="yellow-radio"
                  type="radio"
                  value=""
                  name="colored-radio"
                  class="w-4 h-4 text-yellow-400 bg-gray-100 border-gray-300 focus:ring-yellow-500 dark:focus:ring-yellow-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="yellow-radio"
                  class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >No</label
                >
              </div>
            </div>
          </div>
        </div>
        <div class="col-span-6 mt-2 mr-2">
          <div
            class="grid grid-cols-7 justify-center bg-gray-100 p-2 rounded-md ml-2"
          >
            <div class="col-span-4">
              PWD :<span class="font-semibold ml-2">{selectedApplication ? selectedApplication.personalInfo.pwd :''}</span>
            </div>
            <div class="col-span-1 text-blue-500">view</div>
            <div class="col-span-2 flex flex-wrap">
              <div class="flex items-center ml-2">
                <input
                  id="yellow-radio"
                  type="radio"
                  value=""
                  name="colored-radio"
                  class="w-4 h-4 text-yellow-400 bg-gray-100 border-gray-300 focus:ring-yellow-500 dark:focus:ring-yellow-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="yellow-radio"
                  class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >Yes</label
                >
              </div>
              <div class="flex items-center ml-2">
                <input
                  id="yellow-radio"
                  type="radio"
                  value=""
                  name="colored-radio"
                  class="w-4 h-4 text-yellow-400 bg-gray-100 border-gray-300 focus:ring-yellow-500 dark:focus:ring-yellow-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="yellow-radio"
                  class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >No</label
                >
              </div>
            </div>
          </div>
        </div>
  
        <div class="col-span-6 mt-2 mr-2">
          <div
            class="grid grid-cols-7 justify-center bg-gray-100 p-2 rounded-md ml-2"
          >
            <div class="col-span-4">
              Ex-Ser:<span class="font-semibold ml-2">{selectedApplication ? selectedApplication.personalInfo.exserviceman :''}</span>
            </div>
            <div class="col-span-1 text-blue-500">view</div>
            <div class="col-span-2 flex flex-wrap">
              <div class="flex items-center ml-2">
                <input
                  id="yellow-radio"
                  type="radio"
                  value=""
                  name="colored-radio"
                  class="w-4 h-4 text-yellow-400 bg-gray-100 border-gray-300 focus:ring-yellow-500 dark:focus:ring-yellow-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="yellow-radio"
                  class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >Yes</label
                >
              </div>
              <div class="flex items-center ml-2">
                <input
                  id="yellow-radio"
                  type="radio"
                  value=""
                  name="colored-radio"
                  class="w-4 h-4 text-yellow-400 bg-gray-100 border-gray-300 focus:ring-yellow-500 dark:focus:ring-yellow-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="yellow-radio"
                  class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >No</label
                >
              </div>
            </div>
          </div>
        </div>
  
        <div class="col-span-6 mt-2 mr-2">
          <div
            class="grid grid-cols-7 justify-center bg-gray-100 p-2 rounded-md ml-2"
          >
            <div class="col-span-4">
              Gender:<span class="font-semibold ml-2">{selectedApplication ? selectedApplication.personalInfo.gender :''}</span>
            </div>
            <div class="col-span-1 text-blue-500">view</div>
            <div class="col-span-2 flex flex-wrap">
              <div class="flex items-center ml-2">
                <input
                  id="yellow-radio"
                  type="radio"
                  value=""
                  name="colored-radio"
                  class="w-4 h-4 text-yellow-400 bg-gray-100 border-gray-300 focus:ring-yellow-500 dark:focus:ring-yellow-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="yellow-radio"
                  class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >Yes</label
                >
              </div>
              <div class="flex items-center ml-2">
                <input
                  id="yellow-radio"
                  type="radio"
                  value=""
                  name="colored-radio"
                  class="w-4 h-4 text-yellow-400 bg-gray-100 border-gray-300 focus:ring-yellow-500 dark:focus:ring-yellow-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="yellow-radio"
                  class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >No</label
                >
              </div>
            </div>
          </div>
        </div>
  
        <div class="col-span-6 mt-2 mr-2">
          <div
            class="grid grid-cols-7 justify-center bg-gray-100 p-2 rounded-md ml-2"
          >
            <div class="col-span-2">
              Sataus<span class="font-semibold ml-2"></span>
            </div>
            <!-- <div class="col-span-1 text-blue-500">
              view
            </div> -->
            <div class="col-span-5 flex flex-wrap">
              <div class="flex items-center ml-2">
                <input
                  id="yellow-radio"
                  type="radio"
                  value=""
                  name="colored-radio"
                  class="w-4 h-4 text-yellow-400 bg-gray-100 border-gray-300 focus:ring-yellow-500 dark:focus:ring-yellow-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="yellow-radio"
                  class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >Verified</label
                >
              </div>
              <div class="flex items-center ml-2">
                <input
                  id="yellow-radio"
                  type="radio"
                  value=""
                  name="colored-radio"
                  class="w-4 h-4 text-yellow-400 bg-gray-100 border-gray-300 focus:ring-yellow-500 dark:focus:ring-yellow-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="yellow-radio"
                  class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >Disqualifed</label
                >
              </div>
              <div class="flex items-center ml-2">
                <input
                  id="yellow-radio"
                  type="radio"
                  value=""
                  name="colored-radio"
                  class="w-4 h-4 text-yellow-400 bg-gray-100 border-gray-300 focus:ring-yellow-500 dark:focus:ring-yellow-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="yellow-radio"
                  class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >Not Sure</label
                >
              </div>
            </div>
          </div>
        </div>
  
        <div class="col-span-6 mt-2 mr-2">
          <div
            class="grid grid-cols-7 justify-center bg-gray-100 p-2 rounded-md ml-2 "
          >
            <div class="col-span-4 flex items-center">
            <div class="flex justify-center">
                <div class="mb-3 xl:w-96">
                  <label for="exampleFormControlTextarea1" class="form-label inline-block mb-2 text-gray-700"
                    >Remark</label
                  >
                  <textarea
                    class="
                      form-control
                      block
                      w-full
                      px-3
                      py-1.5
                      text-base
                      font-normal
                      text-gray-700
                      bg-white bg-clip-padding
                      border border-solid border-gray-300
                      rounded
                      transition
                      ease-in-out
                      m-0
                      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                    "
                    id="exampleFormControlTextarea1"
                    rows="3"
                    placeholder="Your message"
                  ></textarea>
                </div>
              </div>
              <div class="p-2 bg-yellow-600 text-white h-10 w-18 rounded-md ml-2 hover:bg-yellow-500 cursor-pointer">Submit</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 2nd end -->
  
    <!-- 3rd preview -->
    <div class="col-span-7 border mr-2">
      
      <div>preview</div>
    </div>
    <!-- preview end -->
  </div>
  