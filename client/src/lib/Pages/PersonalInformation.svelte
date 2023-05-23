<script>
  import Fa from "svelte-fa";
  import {
    faEdit,
    faTrash,
    faPlusCircle,
  } from "@fortawesome/free-solid-svg-icons";
</script>

<div class="p-3 mt-5 lg:ml-40 lg:mr-40 mb-3 rounded-lg shadow-2xl">
  <div class="text-xs lg:text-base  xl:text-base 2xl:text-base ">
    <div class="flex flex-col bg-indigo-50 h-auto ml-4 mr-4 mt-3 rounded-lg ">
      <div
        class="flex flex-row bg-indigo-600 text-white text-2xl font-bold p-2 rounded-t-lg capitalize"
      >
        Personal Information maheshwar
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-1 ">
        <div
          class="m-4 p-4 bg-indigo-50 rounded p-2 shadow-lg grid grid-cols-1"
        >
          <lable class="font-semibold text-xs">Full Name </lable>
          <input
            placeholder="Full Name"
            class=" text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-indigo-200 rounded border"
            type="text"
          />
        </div>
        <div
          class="m-4 p-4 bg-indigo-50 rounded p-2 shadow-lg grid grid-cols-1"
        >
          <lable class="font-semibold text-xs"
            >Father's / Husband's Name
          </lable>
          <input
            placeholder="Father's / Husband's Name"
            class=" text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded border"
            type="text"
          />
        </div>
        <div
          class="m-4 p-4 bg-indigo-50 rounded p-2 shadow-lg grid grid-cols-1 lg:grid-cols-3"
        >
          <div class="col-span-1  px-2">
            <div class="relative">
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
              >
                <svg
                  class="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  ><path
                    fill-rule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clip-rule="evenodd"
                  /></svg
                >
              </div>
              <!-- datepicker -->
              <input
                type="text"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Select date"
              />
            </div>
          </div>
          <div class="col-span-1  px-2">
            <lable class="font-semibold text-xs">Nationality</lable>
            <input
              placeholder="Nationality"
              class=" w-full text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out  border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded border"
              type="text"
            />
          </div>
          <div class="col-span-1 px-2">
            <lable class="font-semibold text-xs">Religion</lable>
            <input
              placeholder="Religion"
              class="w-full text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out  border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded border"
              type="text"
            />
          </div>
        </div>
        <div
          class="m-4 p-4 bg-indigo-50 rounded p-2 shadow-lg grid grid-cols-1 lg:grid-cols-3"
        >
          <div class="col-span-1  px-2">
            <lable class="font-semibold text-xs">Category</lable>
            <input
              placeholder="Category"
              class=" w-full text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded border"
              type="text"
            />
            
          </div>

          <div class="col-span-1  px-2">
            <lable class="font-semibold text-xs">E-mail ID</lable>
            <input
              placeholder="E-mail Id"
              class=" w-full text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded border"
              type="text"
            />
          </div>
          <div class="col-span-1 px-2">
            <lable class="font-semibold text-xs">Mobile No</lable>
            <input
              placeholder="Mobile No"
              class="w-full text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded border"
              type="text"
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="flex flex-row justify-center mt-4">
    <button
      type="submit"
      class="mt-5 w-48  text-center bg-yellow-400 hover:bg-yellow-500  shadow-lg text-white font-bold py-2 px-4 rounded"
    >
      NEXT
    </button>
  </div>
</div>

<div class="p-3 mt-5 lg:ml-40 lg:mr-40 mb-3 rounded-lg shadow-2xl">
  <div class="flex flex-col bg-indigo-50 h-auto ml-4 mr-4 mt-3 rounded-lg ">
    <div
      class="flex flex-row bg-indigo-600 text-white text-2xl font-bold p-2 rounded-t-lg capitalize"
    >
      Correspondence Address
    </div>
    <div
      class="m-4 p-4 bg-indigo-50 rounded p-2 shadow-lg grid grid-cols-1 lg:grid-cols-4"
    >
      <div class="col-span-4 lg:col-span-2  px-2">
        <lable class="font-semibold text-xs">
          
        />
      </div>
      <div class="col-span-4 lg:col-span-2  px-2">
        <lable class="font-semibold text-xs">Address Line 2</lable>
        <input
          placeholder="Nationality"
          class=" w-full text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded border"
          type="text"
        />
      </div>
      <div class="col-span-4 lg:col-span-1 px-2">
        <lable class="font-semibold text-xs">State</lable>
        <input
          placeholder="State"
          class="w-full text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded border"
          type="text"
        />
      </div>
      <div class="col-span-4 lg:col-span-1 px-2">
        <lable class="font-semibold text-xs">District</lable>
        <input
          placeholder="District"
          class="w-full text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded border"
          type="text"
        />
      </div>
      <div class="col-span-4 lg:col-span-1 px-2">
        <lable class="font-semibold text-xs">Taluka</lable>
        <input
          placeholder="Taluka"
          class="w-full text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded border"
          type="text"
        />
      </div>
      <div class="col-span-4 lg:col-span-1 px-2Nationality">
        <lable class="font-semibold text-xs">Village</lable>
        <input
          placeholder="Village"
          class="w-full text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded border"
          type="text"
        />
      </div>
      <div class="col-span-4 lg:col-span-1 px-2">
        <lable class="font-semibold text-xs">Pin Code</lable>
        <input
          placeholder="Pin Code"
          class="w-full text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded border"
          type="text"
        />
      </div>
    </div>
  </div>
  <div class="flex flex-col bg-indigo-50 h-auto ml-4 mr-4 mt-3 rounded-lg ">
    <div
      class="flex flex-row bg-indigo-600 text-white text-2xl font-bold p-2 rounded-t-lg capitalize"
    >
      Permanent Address
    </div>
    <div
      class="m-4 p-4 bg-indigo-50 rounded p-2 shadow-lg grid grid-cols-1 lg:grid-cols-4"
    >
      <div class="col-span-4 lg:col-span-2  px-2">
        <lable class="font-semibold text-xs">Address Line 1</lable>
        <input
          placeholder="Nationality"
          class=" w-full text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded border"
          type="text"
        />
      </div>Nationality
          placeholder="Nationality"
          class=" w-full text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded border"
          type="text"
        />
      </div>
      <div class="col-span-4 lg:col-span-1 px-2">
        <lable class="font-semibold text-xs">State</lable>
        <input
          placeholder="State"
          class="w-full text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded border"
          type="text"
        />
      </div>
      <div class="col-span-4 lg:col-span-1 px-2">
        <lable class="font-semibold text-xs">District</lable>
        <input
          placeholder="District"
          class="w-full text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded border"
          type="text"
        />
      </div>
      <div class="col-span-4 lg:col-span-1 px-2">
        <lable class="font-semibold text-xs">Taluka</lable>
        <input
          placeholder="Taluka"
          class="w-full text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded border"
          type="text"
        />
      </div>
      <div class="col-span-4 lg:col-span-1 px-2">
        <lable class="font-semibold text-xs">Village</lable>
        <input
          placeholder="Village"
          class="w-full text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded border"
          type="text"
        />
      </div>
      <div class="col-span-4 lg:col-span-1 px-2">
        <lable class="font-semibold text-xs">Pin Code</lable>
        <input
          placeholder="Pin Code"
          class="w-full text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded border"
          type="text"
        />
      </div>
    </div>
  </div>

  <div class="flex flex-row justify-center mt-4">
    <button
      type="submit"
      class="mt-5 w-48 text-center bg-indigo-50 hover:bg-white shadow-lg text-gray-500 font-bold py-2 px-4 rounded"
    >
      PREVIOUS
    </button>
    <button
      type="submit"
      class="mt-5 w-48  text-center bg-yellow-600 hover:bg-yellow-500  shadow-lg text-white font-bold py-2 px-4 rounded"
    >
      NEXT
    </button>
  </div>


<div class="flex flex-col justify-center mx-2 lg:mx-20 mt-5">
  <div class="grid grid-cols-7 bg-indigo-600 w-full rounded-t-lg">
    <div
      class="col-span-7 lg:col-span-6 text-white rounded-t-lg m-2 p-1 font-bold text-center lg:text-xl"
    >
      Essential Qualification
    </div>
    <div
      class="col-span-7 lg:col-span-1 flex justify-center rounded-t-lg items-center h-12 bg-indigo-600 font-bold "
    >
      <span class="text-white">Add </span>
      <div
        on:click={() => {}}
        class="flex justify-center items-center flex-inline ml-2 text-yellow-600 hover:text-yellow-500  text-3xl cursor-pointer"
      >
        <Fa icon={faPlusCircle} />
      </div>
    </div>
  </div>
  <div>
    <div class="grid grid-cols-6 w-full bg-gray-200 mx-1 my-2 p-1 rounded-lg ">
      <div
        class="col-span-7 flex justify-center rounded-lg font-bold text-xl bg-indigo-50"
      >
        Sr.No.
      </div>
      <div
        class="col-span-7  border-2 mr-1 mt-1 rounded-lg shadow-2xl bg-indigo-50 "
      >
        <div class="grid grid-cols-7 ">
          <div class="col-span-7 lg:col-span-1 p-2 bg-white m-2 rounded-lg">
            <div class="row-span-1 flex justify-center text-center text-sm">
              Exam Passed
            </div>
            <div class="row-span-1 flex justify-center text-center font-bold">
              MCA
            </div>
          </div>
          <div class="col-span-7 lg:col-span-1 p-2 bg-white m-2 rounded-lg">
            <div class="row-span-1 flex justify-center text-center text-sm">
              Year Of Passing
            </div>
            <div
              class="row-span-1 flex t justify-center text-center font-bold"
            >
              2009
            </div>
          </div>
          <div class="col-span-7 lg:col-span-1 p-2 bg-white m-2 rounded-lg">
            <div class="row-span-1 flex justify-center text-center text-sm">
              University/Board
            </div>
            <div class="row-span-1 flex justify-center text-center font-bold">
              Shivaji Univercity Kolhapur
            </div>
          </div>
          <div class="col-span-7 lg:col-span-1 p-2 bg-white m-2 rounded-lg">
            <div class="row-span-1 flex justify-center text-center text-sm">
              Subject
            </div>
            <div class="row-span-1 flex justify-center text-center font-bold">
              English
            </div>
          </div>
          <div class="col-span-7 lg:col-span-1 p-2 bg-white m-2 rounded-lg">
            <div class="row-span-1 flex justify-center text-center text-sm">
              Marks
            </div>
            <div class="row-span-1 flex justify-center text-center font-bold">
              680
            </div>
          </div>
          <div class="col-span-7 lg:col-span-1 p-2 bg-white m-2 rounded-lg">
            <div class="row-span-1 flex justify-center text-center text-sm">
              Percentage of Marks
            </div>
            <div class="row-span-1 flex justify-center text-center font-bold">
              78
            </div>
          </div>
          <div class="col-span-7 lg:col-span-1 p-2 bg-white m-2 rounded-lg">
            <div class="flex justify-center items-center p-1 ">
              <div
                on:click={() => {}}
                class="ml-3 inline-flex text-gray-600 hover:text-gray-900 cursor-pointer"
              >
                <Fa icon={faEdit} />
              </div>
              <div
                on:click={() => {}}
                class="ml-3 inline-flex text-gray-600 hover:text-gray-800 cursor-pointer"
              >
                <Fa icon={faTrash} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="flex flex-row justify-center m-4">
  <button
    type="submit"
    class="mt-5 w-48 text-center bg-indigo-50 hover:bg-white shadow-lg text-gray-500 font-bold py-2 px-4 rounded"
  >
    PREVIOUS
  </button>
  <button
    type="submit"
    class="mt-5 w-48  text-center bg-yellow-600 hover:bg-yellow-500  shadow-lg text-white font-bold py-2 px-4 rounded"
  >
    NEXT
  </button>
</div>

<div class="flex flex-col justify-center mx-2 lg:mx-20 mt-5">
  <div class="grid grid-cols-7 bg-indigo-600 w-full rounded-t-lg">
    <div
      class="col-span-7 lg:col-span-6 text-white rounded-t-lg m-2 p-1 font-bold text-center lg:text-xl"
    >
      Other Qualifications
      <span class="text-sm"
        >(in chronological order starting with 10th onwords)</span
      >
    </div>
    <div
      class="col-span-7 lg:col-span-1 flex justify-center rounded-t-lg items-center h-12 bg-indigo-600 font-bold "
    >
      <span class="text-white">Add </span>
      <div
        on:click={() => {}}
        class="flex justify-center items-center flex-inline ml-2 text-yellow-600 hover:text-yellow-500  text-3xl cursor-pointer"
      >
        <Fa icon={faPlusCircle} />
      </div>
    </div>
  </div>
  <div>
    <div class="grid grid-cols-6 w-full bg-gray-200 mx-1 my-2 p-1 rounded-lg ">
      <div
        class="col-span-7 flex justify-center rounded-lg font-bold text-xl bg-indigo-50"
      >
        Sr.No.
      </div>
      <div
        class="col-span-7  border-2 mr-1 mt-1 rounded-lg shadow-2xl bg-indigo-50 "
      >
        <div class="grid grid-cols-7 ">
          <div class="col-span-7 lg:col-span-1 p-2 bg-white m-2 rounded-lg">
            <div class="row-span-1 flex justify-center text-center text-sm">
              Exam Passed
            </div>
            <div class="row-span-1 flex justify-center text-center font-bold">
              MCA
            </div>
          </div>
          <div class="col-span-7 lg:col-span-1 p-2 bg-white m-2 rounded-lg">
            <div class="row-span-1 flex justify-center text-center text-sm">
              Year Of Passing
            </div>
            <div
              class="row-span-1 flex  justify-center text-center font-bold"
            >
              2009
            </div>
          </div>
          <div class="col-span-7 lg:col-span-1 p-2 bg-white m-2 rounded-lg">
            <div class="row-span-1 flex justify-center text-center text-sm">
              University/Board
            </div>
            <div class="row-span-1 flex justify-center text-center font-bold">
              Shivaji Univercity Kolhapur
            </div>
          </div>
          <div class="col-span-7 lg:col-span-1 p-2 bg-white m-2 rounded-lg">
            <div class="row-span-1 flex justify-center text-center text-sm">
              Subject
            </div>
            <div class="row-span-1 flex justify-center text-center font-bold">
              English
            </div>
          </div>
          <div class="col-span-7 lg:col-span-1 p-2 bg-white m-2 rounded-lg">
            <div class="row-span-1 flex justify-center text-center text-sm">
              Marks
            </div>
            <div class="row-span-1 flex justify-center text-center font-bold">
              680
            </div>
          </div>
          <div class="col-span-7 lg:col-span-1 p-2 bg-white m-2 rounded-lg">
            <div class="row-span-1 flex justify-center text-center text-sm">
              Percentage of Marks
            </div>
            <div class="row-span-1 flex justify-center text-center font-bold">
              78
            </div>
          </div>
          <div class="col-span-7 lg:col-span-1 p-2 bg-white m-2 rounded-lg">
            <div class="flex justify-center flex items-center p-1 ">
              <div
                on:click={() => {}}
                class="ml-3 inline-flex text-gray-600 hover:text-gray-900 cursor-pointer"
              >
                <Fa icon={faEdit} />
              </div>
              <div
                on:click={() => {}}
                class="ml-3 inline-flex text-gray-600 hover:text-gray-800 cursor-pointer"
              >
                <Fa icon={faTrash} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="flex flex-row justify-center m-4">
  <button
    type="submit"
    class="mt-5 w-48 text-center bg-indigo-50 hover:bg-white shadow-lg text-gray-500 font-bold py-2 px-4 rounded"
  >
    PREVIOUS
  </button>
  <button
    type="submit"
    class="mt-5 w-48  text-center bg-yellow-600 hover:bg-yellow-500  shadow-lg text-white font-bold py-2 px-4 rounded"
  >
    NEXT
  </button>
</div>
<div class="flex flex-col justify-center mx-2 lg:mx-20 mt-5">
  <div class="grid grid-cols-7 bg-indigo-600 w-full rounded-t-lg">
    <div
      class="col-span-7 lg:col-span-6 text-white rounded-t-lg m-2 p-1 font-bold text-center lg:text-xl"
    >
      Details of Experience
      <div class="col-span-7 text-white text-base font-bold ">
        If any ( particulars of all previous and present employment ) ( Starting
        with the most recent including visit abroad )
      </div>
    </div>
    <div
      class="row-span-2 col-span-7 lg:col-span-1 flex justify-center rounded-t-lg items-center h-12 bg-indigo-600 font-bold "
    >
      <span class="text-white">Add </span>
      <div
        on:click={() => {}}
        class="flex justify-center items-center flex-inline ml-2 text-yellow-600 hover:text-yellow-500  text-3xl cursor-pointer"
      >
        <Fa icon={faPlusCircle} />
      </div>
    </div>
  </div>
  <div>
    <div class="grid grid-cols-6 w-full bg-gray-200 mx-1 my-2 p-1 rounded-lg ">
      <div
        class="col-span-7 flex justify-center rounded-lg font-bold text-xl bg-indigo-50"
      >
        Sr.No.
      </div>
      <div
        class="col-span-7  border-2 mr-1 mt-1 rounded-lg shadow-2xl bg-indigo-50 "
      >
        <div class="grid grid-cols-7 ">
          <div class="col-span-7 lg:col-span-1 p-2 bg-white m-2 rounded-lg">
            <div class="row-span-1 flex justify-center text-center text-sm">
              Name of the Organization / Institute
            </div>
            <div
              class="row-span-1  justify-center text-center flex items-center font-bold"
            >
              Chanakya Software Services pvt ltd
            </div>
          </div>
          <div class="col-span-7 lg:col-span-1 p-2 bg-white m-2 rounded-lg">
            <div class="row-span-1 flex justify-center text-center text-sm">
              Post Held
            </div>
            <div
              class="row-span-1 flex  justify-center text-center font-bold"
            >
              Software Engineer
            </div>
          </div>
          <div class="col-span-7 lg:col-span-1 p-2 bg-white m-2 rounded-lg">
            <div class="row-span-1 flex justify-center text-center text-sm">
              Duration From
            </div>
            <div class="row-span-1 flex justify-center text-center font-bold">
              dd/mm/yyyy
            </div>
          </div>
          <div class="col-span-7 lg:col-span-1 p-2 bg-white m-2 rounded-lg">
            <div class="row-span-1 flex justify-center text-center text-sm">
              Duration To
            </div>
            <div class="row-span-1 flex justify-center text-center font-bold">
              dd/mm/yyyy
            </div>
          </div>
          <div class="col-span-7 lg:col-span-1 p-2 bg-white m-2 rounded-lg">
            <div class="row-span-1 flex justify-center text-center text-sm">
              Salary
            </div>
            <div class="row-span-1 flex justify-center text-center font-bold">
              00000
            </div>
          </div>
          <div class="col-span-7 lg:col-span-1 p-2 bg-white m-2 rounded-lg">
            <div class="row-span-1 flex justify-center text-center text-sm">
              Detailed nature of duties performed
            </div>
            <div class="row-span-1 flex justify-center text-center font-bold">
              NA
            </div>
          </div>
          <div class="col-span-7 lg:col-span-1 p-2 bg-white m-2 rounded-lg">
            <div class="flex justify-center  items-center p-1 ">
              <div
                on:click={() => {}}
                class="ml-3 inline-flex text-gray-600 hover:text-gray-900 cursor-pointer"
              >
                <Fa icon={faEdit} />
              </div>
              <div
                on:click={() => {}}
                class="ml-3 inline-flex text-gray-600 hover:text-gray-800 cursor-pointer"
              >
                <Fa icon={faTrash} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="flex flex-row justify-center m-4">
  <button
    type="submit"
    class="mt-5 w-48 text-center bg-indigo-50 hover:bg-white shadow-lg text-gray-500 font-bold py-2 px-4 rounded"
  >
    PREVIOUS
  </button>
  <button
    type="submit"
    class="mt-5 w-48  text-center bg-yellow-600 hover:bg-yellow-500  shadow-lg text-white font-bold py-2 px-4 rounded"
  >
    NEXT
  </button>
</div>
<div class="flex flex-col justify-center mx-2 lg:mx-20 mt-5">
  <div class="grid grid-cols-7 bg-indigo-600 w-full rounded-t-lg">
    <div
      class="col-span-7 lg:col-span-6 text-white rounded-t-lg m-2 p-1 font-bold text-center lg:text-xl"
    >
      References
      <div class="col-span-7 text-white text-base font-bold ">
        This referees should be residents in India and holders of responsible
        positions, They should be intimately acquainted with the applicant's
        character and work but must not be relations, When the candidate has
        been in employment, he/she should either give his/her present or most
        recent employer or immediate superior as a referee or produce a
        testimonial from him in regard to the candidate's fitness for the post
        for which he/she is an applicant
      </div>
    </div>
    <div
      class="row-span-2 col-span-7 lg:col-span-1 flex justify-center rounded-t-lg items-center h-12 bg-indigo-600 font-bold "
    >
      <span class="text-white">Add </span>
      <div
        on:click={() => {}}
        class="flex justify-center items-center flex-inline ml-2 text-yellow-600 hover:text-yellow-500  text-3xl cursor-pointer"
      >
        <Fa icon={faPlusCircle} />
      </div>
    </div>
  </div>
  <div>
    <div class="grid grid-cols-6 w-full bg-gray-200 mx-1 my-2 p-1 rounded-lg ">
      <div
        class="col-span-7 flex justify-center rounded-lg font-bold text-xl bg-indigo-50"
      >
        Sr.No.
      </div>
      <div
        class="col-span-7  border-2 mr-1 mt-1 rounded-lg shadow-2xl bg-indigo-50 "
      >
        <div class="grid grid-cols-7 ">
          <div class="col-span-7 lg:col-span-1 p-2 bg-white m-2 rounded-lg">
            <div class="flex justify-center text-center text-sm">Name</div>
            <span
              class=" flex justify-center text-center  items-center font-bold"
            >
              Chanakya Software Services pvt ltd
            </span>
          </div>
          <div class="col-span-7 lg:col-span-1 p-2 bg-white m-2 rounded-lg">
            <div class="row-span-1 flex justify-center text-center text-sm">
              Occupation or position
            </div>
            <div
              class="row-span-1 flex  justify-center text-center font-bold"
            >
              Software Engineer
            </div>
          </div>
          <div class="col-span-7 lg:col-span-2 p-2 bg-white m-2 rounded-lg">
            <div class="row-span-1 flex justify-center text-center text-sm">
              Address
            </div>
            <div class="row-span-1 flex justify-center text-center font-bold">
              B7/1 Meghdhoot Hsg Society, Venunagar, Wakad, Pune 411057
            </div>
          </div>
          <div class="col-span-7 lg:col-span-1 p-2 bg-white m-2 rounded-lg">
            <div class="row-span-1 flex justify-center text-center text-sm">
              Email Id
            </div>
            <div
              class="row-span-1 flex justify-center break-all text-center font-bold"
            >
              abcd@chanakyasoft.com
            </div>
          </div>
          <div class="col-span-7 lg:col-span-1 p-2 bg-white m-2 rounded-lg">
            <div class="row-span-1 flex justify-center text-center text-sm">
              Mobile No
            </div>
            <div class="row-span-1 flex justify-center text-center font-bold">
              8888888888
            </div>
          </div>

          <div class="col-span-7 lg:col-span-1 p-2 bg-white m-2 rounded-lg">
            <div class="flex justify-center  items-center p-1 ">
              <div
                on:click={() => {}}
                class="ml-3 flex items-center inline-flex text-gray-600 hover:text-gray-900 cursor-pointer"
              >
                <Fa icon={faEdit} />
              </div>
              <div
                on:click={() => {}}
                class="ml-3 inline-flex text-gray-600 hover:text-gray-800 cursor-pointer"
              >
                <Fa icon={faTrash} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="flex flex-row justify-center m-4">
  <button
    type="submit"
    class="mt-5 w-48 text-center bg-indigo-50 hover:bg-white shadow-lg text-gray-500 font-bold py-2 px-4 rounded"
  >
    PREVIOUS
  </button>
  <button
    type="submit"
    class="mt-5 w-48  text-center bg-yellow-600 hover:bg-yellow-500  shadow-lg text-white font-bold py-2 px-4 rounded"
  >
    NEXT
  </button>
</div>
<div class="flex flex-col justify-center mx-2 lg:mx-20 mt-5">
  <div class="grid grid-cols-7 bg-indigo-600 w-full rounded-t-lg">
    <div
      class="col-span-7 lg:col-span-6 text-white rounded-t-lg m-2 p-1 font-bold text-center lg:text-xl"
    >
      Photo and Sign Upload
      <div class="col-span-7 text-white text-base font-bold " />
    </div>
  </div>
  <div>
    <div
      class="grid grid-cols-6 grid-flow-row h-full w-full bg-gray-200 xl:bg-white mx-1 my-2 p-1 rounded-lg "
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
              <span class="block text-blue-400 font-normal">Browse files</span>
            </div>
          </div>
          <input type="file" class="h-full w-full opacity-0" name="" />
        </div>
        <p class="text-red-600 text-normal text-sm ml-2">
          (Passport size colour photo 4.5cm x 3.5cn)
        </p>
        <p class="text-red-600 text-sm ml-2">
          Note: Upload Image to be less than 200kb
        </p>
      </div>

      <div
        class="col-span-6 lg:col-span-3 md:mx-32 lg:mx-20 xl:mx-40  mt-6 lg:mt-0  border border-white h-40 lg:h-48 justify-center rounded-lg  bg-indigo-50"
      >
        <span class="flex justify-center font-bold  text-xl ">Sign</span>

        <div
          class="m-2 rounded-lg h-24   border-dashed border-2 border-gray-200 bg-white flex justify-center items-center hover:cursor-pointer"
        >
          <div class="absolute">
            <div class="flex flex-col items-center ">
              <i class="fa fa-cloud-upload fa-3x text-gray-200" />
              <span class="block text-gray-400 font-normal"
                >Attach you files here</span
              > <span class="block text-gray-400 font-normal">or</span>
              <span class="block text-blue-400 font-normal">Browse files</span>
            </div>
          </div>
          <input type="file" class="h-full w-full opacity-0" name="" />
        </div>
        <p class="text-red-600 text-normal text-sm ml-2">
          Note: Upload Image to be less than 100kb
        </p>
      </div>

      <div
        class=" col-span-6 lg:col-span-3  text-gray-400 text-red-600 lg:mx-40"
      />
    </div>
  </div>
</div>

<div class="flex flex-row justify-center m-4">
  <button
    type="submit"
    class="mt-5 w-48 text-center bg-indigo-50 hover:bg-white shadow-lg text-gray-500 font-bold py-2 px-4 rounded"
  >
    PREVIOUS
  </button>
  <button
    type="submit"
    class="mt-5 w-48  text-center bg-yellow-500 hover:bg-yellow-300  shadow-lg text-white font-bold py-2 px-4 rounded"
  >
    NEXT
  </button>
</div>
