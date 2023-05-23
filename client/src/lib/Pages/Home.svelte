<script>
  import { goto } from "$app/navigation";
  import DashbordCard from "../../components/cards/JobCard5.svelte";
  import ReverseTimer from "../../components/ReverseTimer.svelte";
  export let startDatetime;
  export let endDatetime;
</script>

<div class="mx-10 text-gray-700  ">
  <div class="grid md:grid-cols-10 lg:ml-18 mt-5 ">
    <div class="col-span-10 md:col-span-1 p-1 flex justify-center">
      <img class="w-20 md:h-24 h-20 md:w-24" src="/PCBlogo.png" alt="" />
    </div>
    <div
      class=" p-5 rounded-sm font-semibold md:col-span-8 col-span-8 text-md text-center  justify-center"
    >
      Pune Cantonment Board, Ministry of Defence, Government of India invites
      online applications for 34 various Posts
      <span class="text-blue-600 uppercase" />
      <p>
        Advertisement No : Recruitment/P-168 Dated(Employment News) : 04<sup
          >th</sup
        > March 2023
      </p>

      <p class="text-sm font-normal">
        Application forms are being collected online by Science and Technology
        Park, Pune on behalf of Pune Cantonment Board.
      </p>
    </div>
    <div class="col-span-10  md:col-span-1 p-1  flex justify-center">
      <img class="w-20 md:h-24 h-20 md:w-24" src="/STP-logo.jpg" alt="" />
    </div>
  </div>

  <!-- <div class="grid grid-cols-2 gap-4 w-full">
    <div
      class="bg-white p-5 rounded-sm font-semibold col-span-2 text-lg text-center"
    >
      KCB invites online applications for <span class="text-blue-600">Scientists and Finance Post</span>

      <p class="text-sm font-normal">
        Application forms are being collected online by Science and Technology
        Park on behalf of C-MET
      </p>
    </div>
  </div> -->
  <ReverseTimer {startDatetime} {endDatetime} />
  <div class="grid grid-cols-5 rounded-xl pt-2 p-2 bg-gray-600 mt-5">
    <div class="col-span-5 mt-5 ">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 ">
        <div
          class="col-span-5 md:col-span-2 lg:col-span-5 mb-3 md:mb-6 mx-4 md:mx-10 rounded  text-base border-2 border-white  bg-gray-700 text-white pb-1 text-center"
        >
          See advertisement for more details, Online application form reception
          from <span class="text-orange-400 font-semibold"
            >04<sup>th</sup> March 2023 11:00 AM</span
          >
          to
          <span class="text-orange-400 font-semibold"
            >04<sup>th</sup> April 2023 06:00 PM</span
          >
        </div>
        <div class="col-span-5 md:col-span-1 m-2 mt-4  ">
          <div class=" grid grid-cols-1 gap-1 border-2 rounded-lg  ">
            <div
              class="col-span-5 lg:col-span-1 -mt-5 bg-gray-700 text-white border-2 border-white text-center mx-2 font-bold rounded-lg"
            >
              7<sup>th</sup>
            </div>
            <DashbordCard
              postName="Disinfector "
              payscale="15000-47600"
              payscaleno="(S-1)"
              nop="(01-UR)"
              age="21-30"
            />

            <DashbordCard
              postName="Ayah "
              payscale="15000-47600"
              payscaleno="(S-1)"
              nop="(01-UR)(01-OBC)"
              age="21-30"
            />
            <DashbordCard
              postName="Store coolie "
              payscale="15000-47600"
              payscaleno="(S-1)"
              nop="(01-UR)(01-OBC)"
              age="21-30"
            />
            <DashbordCard
              postName="Mazdoor "
              payscale="15000-47600"
              payscaleno="(S-1)"
              nop="(04-UR)(02-OBC)(2-EWS)"
              age="21-30"
            />
            <DashbordCard
              postName="SafaiKarmachari"
              payscale="15000-47600"
              payscaleno="(S-1)"
              nop="(29-UR)(9-ST)(25-OBC)(6-EWS)"
              age="21-30"
            />
          </div>
        </div>

        <div class="col-span-5 md:col-span-1 m-2 mt-4  ">
          <div class=" grid grid-cols-1 gap-1 border-2 rounded-lg  ">
            <div
              class="col-span-5 lg:col-span-1 -mt-4 bg-gray-700 text-white border-2 border-white text-center mx-2 font-bold rounded-lg"
            >
              10<sup>th</sup>
            </div>

            <DashbordCard
              postName="Peon "
              payscale="15000-47600"
              payscaleno="(S-1)"
              nop="(01-EWS)"
              age="21-30"
            />
            <DashbordCard
              postName="Driver "
              payscale="19900-63200"
              payscaleno="(S-6)"
              nop="(02-UR)(1-ST)(01-OBC)(1-EWS)"
              age="21-30"
            />
            <DashbordCard
              postName="Watchman "
              payscale="15000-47600"
              payscaleno="(S-1)"
              nop="(05-UR)(02-OBC)"
              age="21-30"
            />
            <DashbordCard
              postName="Nursing Orderly "
              payscale="15000-47600"
              payscaleno="(S-1)"
              nop="(01-UR)"
              age="21-30"
            />
            <DashbordCard
              postName="Lab Attendant (Hospital) "
              payscale="19900-63200"
              payscaleno="(S-6)"
              nop="(01-UR)"
              age="21-30"
            />

            <div
              class="col-span-5 lg:col-span-1 border-t-4 mt-4 border-white rounded"
            />
            <div
              class="col-span-5 lg:col-span-1 -mt-5 bg-gray-700 text-white border-2 border-white text-center mx-2 font-bold rounded-lg"
            >
              10<sup>th</sup> & certificate
            </div>

            <DashbordCard
              postName="Mason "
              payscale="19900-63200"
              payscaleno="(S-6)"
              nop="(01-UR)"
              age="21-30"
            />
            <DashbordCard
              postName="Pump Attendant "
              payscale="16600-52400"
              payscaleno="(S-3)"
              nop="(01-UR)"
              age="21-30"
            />
            <DashbordCard
              postName="Malies "
              payscale="18000-56900"
              payscaleno="(S-5)"
              nop="(01-SC)(1-ST)(1-OBC)(01-EWS)"
              age="21-30"
            />
            <DashbordCard
              postName="Dresser "
              payscale="18000-56900"
              payscaleno="(S-5)"
              nop="(01-UR)"
              age="21-30"
            />
            <DashbordCard
              postName="Auto Mechanic "
              payscale="19900-63200"
              payscaleno="(S-6)"
              nop="(01-UR)"
              age="21-30"
            />
            <DashbordCard
              postName="Fitter "
              payscale="19900-63200"
              payscaleno="(S-6)"
              nop="(01-UR)"
              age="21-30"
            />
            <DashbordCard
              postName="Fire Brigade Lascar "
              payscale="16600-52400"
              payscaleno="(S-3)"
              nop="(01-SC)(01-ST)(01-EWS)"
              age="21-30"
            />
          </div>
        </div>

        <div class="md:col-span-1 col-span-5  m-2 mt-4  ">
          <div class="  grid grid-cols-1 gap-1 border-2 rounded-lg  ">
            <div
              class="col-span-5 lg:col-span-1 -mt-4 bg-gray-700 text-white border-2 border-white text-center mx-2 font-bold rounded-lg"
            >
              12<sup>th</sup> & Certification
            </div>

            <DashbordCard
              postName="Lab Assistant "
              payscale="21700-69100"
              payscaleno="(S-7)"
              nop="(01-UR)"
              age="21-30 "
            />
          </div>
        </div>

        <div class="col-span-2 m-2 mt-4  ">
          <div class="  grid grid-cols-2 gap-1 border-2 rounded-lg  ">
            <div
              class="col-span-5 lg:col-span-2 -mt-4 bg-gray-700 text-white border-2 border-white text-center mx-2 font-bold rounded-lg"
            >
              Diploma/Degree
            </div>
            <div class="col-span-2">
              <div class="grid grid-cols-2">
                <DashbordCard
                  postName="Computer Programmer "
                  payscale="41800-132300"
                  payscaleno="(S-15)"
                  nop="(01-UR)"
                  age="21-30 "
                /><DashbordCard
                  postName="Work Shop Superintendent "
                  payscale="38600-122800"
                  payscaleno="(S-14)"
                  nop="(01-UR)"
                  age="21-30 "
                /><DashbordCard
                  postName="Fire Brigade Superintendent "
                  payscale="38600-122800"
                  payscaleno="(S-14)"
                  nop="(01-UR)"
                  age="21-30 "
                /><DashbordCard
                  postName="Assistant Market Superintendent "
                  payscale="19900-63200"
                  payscaleno="(S-13)"
                  nop="(01-UR)"
                  age="21-30 "
                /><DashbordCard
                  postName="Health Supervisor "
                  payscale="35400-112400"
                  payscaleno="(S-13)"
                  nop="(01-UR)"
                  age="21-30 "
                /><DashbordCard
                  postName="Assistant Medical Officer "
                  payscale="56100-177500"
                  payscaleno="(S-20)"
                  nop="(02-UR)(01-OBC)(01-ST)(1-EWS)"
                  age="23-35 "
                /><DashbordCard
                  postName="High School Teacher (B.Ed) "
                  payscale="38600-122800"
                  payscaleno="(S-14)"
                  nop="(02-UR)(01-OBC)(01-ST)(1-EWS)(1-SC)"
                  age="21-30 "
                /><DashbordCard
                  postName="Health Inspector "
                  payscale="25500-81100"
                  payscaleno="(S-8)"
                  nop="(01-UR)(01-OBC)(1-EWS)(1-SC)"
                  age="21-30 "
                /><DashbordCard
                  postName="Jr.Engineer (Electrical) "
                  payscale="38600-122800"
                  payscaleno="(S-14)"
                  nop="(01-UR)"
                  age="21-30 "
                /><DashbordCard
                  postName="Jr.Engineer (Civil) "
                  payscale="38600-122800"
                  payscaleno="(S-14)"
                  nop="(01-UR)(01-OBC)(1-EWS)"
                  age="21-30 "
                /><DashbordCard
                  postName="Lab Technician "
                  payscale="35400-112400"
                  payscaleno="(S-13)"
                  nop="(01-UR)"
                  age="21-30 "
                /><DashbordCard
                  postName="Staff Nurse "
                  payscale="35400-112400"
                  payscaleno="(S-13)"
                  nop="(01-UR)(01-OBC)(1-EWS)"
                  age="21-30 "
                /><DashbordCard
                  postName="D.Ed Teacher "
                  payscale="29200-92300"
                  payscaleno="(S-10)"
                  nop="(03-UR)(02-OBC)(1-SC)(1-ST)(1-EWS)"
                  age="21-30 "
                /><DashbordCard
                  postName="Hindi Typist "
                  payscale="19900-63200"
                  payscaleno="(S-6)"
                  nop="(01-UR)"
                  age="21-30 "
                /><DashbordCard
                  postName="Jr.Clerk "
                  payscale="19900-63200"
                  payscaleno="(S-6)"
                  nop="(08-UR)(03-OBC)(1-SC)(1-ST)(1-EWS)"
                  age="21-30 "
                /><DashbordCard
                  postName="Ledger Clerk "
                  payscale="19900-63200"
                  payscaleno="(S-6)"
                  nop="(01-UR)"
                  age="21-30 "
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="text-center bg-gray-700 text-gray-100 p-3 rounded-lg m-4">
    <p class="font-semibold text-lg">
      The last date of application form reception is 04-April-2023 till 06:00 PM
      <!-- {endDatetime.toFormat(
        "dd-MMM-yyyy"
      )} till {endDatetime.toFormat("t")} -->
    </p>
    If you need any technical help in filling<span
      class="mx-1 font-bold text-white">'online application form'</span
    >
    help is available at :
    <span class="mx-1 font-bold text-white">9028947883</span> between 11 am and
    5 pm Monday to Friday till 04/04/2023 , you can also reach out to us via
    email at :
    <span class="mx-1 font-bold text-white">parikshaworld.help@gmail.com</span>
    <span class="text-sm">(Kindly mention the advertisement number, cantonment board and post for which you are applying in your email.)
    </span>
  </div>
  <div class="border-t-4 border-gray-300 rounded m-4" />
</div>
