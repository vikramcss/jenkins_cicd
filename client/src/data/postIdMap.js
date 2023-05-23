export let postIdMap = [
  {
    record: "mazdoor",
    postId: "11",
  },
  {
    record: "disinfector",
    postId: "12",
  },
  {
    record: "ayah",
    postId: "13",
  },
  {
    record: "storeCoolie",
    postId: "14",
  },
  {
    record: "safaikarmachari",
    postId: "15",
  },
  {
    record: "driver",
    postId: "21",
  },
  {
    record: "labAttendent",
    postId: "22",
  },
  {
    record: "nursingOrderly",
    postId: "23",
  },

  {
    record: "peon",
    postId: "24",
  },

  {
    record: "watchman",
    postId: "25",
  },

  {
    record: "mason",
    postId: "26",
  },
  {
    record: "pumpAttendant",
    postId: "27",
  },
  {
    record: "malies",
    postId: "28",
  },
  { 
    record: "dresser",
    postId: "29",
  },
  {
    record: "autoMechanic",
    postId: "30",
  },
  {
    record: "fitter",
    postId: "31",
  },
  {
    record: "fbsLascar",
    postId: "32",
  },

  {
    record: "labAssistant",
    postId: "41",
  },

  {
    record: "computerProgrammer",
    postId: "601",
  },
  {
    record: "workshopSuperintendent",
    postId: "602",
  },
  {
    record: "firebrigadeSuperintendent",
    postId: "603",
  },
  {
    record: "asstMarketSupdt",
    postId: "604",
  },
  {
    record: "healthSupervisor",
    postId: "605",
  },
  {
    record: "assistantMedicalOfficer",
    postId: "606",
  },
  {
    record: "highSchoolTeacherBEd",
    postId: "607",
  },
  {
    record: "healthInspector",
    postId: "608",
  },
  {
    record: "juniorEngineerElectrical",
    postId: "609",
  },
  {
    record: "juniorEngineerCivil",
    postId: "610",
  },
  {
    record: "juniorClerk",
    postId: "611",
  },
  {
    record: "ledgerClerk",
    postId: "612",
  },
  {
    record: "hindiTypist",
    postId: "613",
  },
  {
    record: "labTechnician",
    postId: "614",
  },
  {
    record: "staffNurse",
    postId: "615",
  },
  {
    record: "dEdTeacher",
    postId: "616",
  },
];
let length = postIdMap.length;
console.log("length", length);

export let postHandicapped = [
  { postId: "11", handicappedApplicable: false },
  {
    postId: "12",
    handicappedApplicable: false,
  },
  {
    postId: "13",
    handicappedApplicable: false,
  },
  {
    postId: "14",
    handicappedApplicable: false,
  },
  { postId: "15", handicappedApplicable: true, handicappedTypes: ["OA","OL","LC","DWF","AAV","HH"], },
  // {
  //   postId: "16",
  //   handicappedApplicable: true,
  //   handicappedTypes: ["LC", "AAV", "HI"],
  // },

  {
    postId: "21",
    handicappedApplicable: false,
    // handicappedTypes: ["LV", "OA"],
  },
  {
    postId: "22",
    handicappedApplicable: false,
  },
  { postId: "23", handicappedApplicable: false },
  { postId: "24", handicappedApplicable: true, handicappedTypes: ["LV"] },
  { postId: "25", handicappedApplicable: false },

  { postId: "26", handicappedApplicable: false },
  // { postId: "32", handicappedApplicable: false },
  {
    postId: "27",
    handicappedApplicable: false,
  },
  {
    postId: "28",
    handicappedApplicable: true, handicappedTypes: ["HH"],
  },
  {
    postId: "29",
    handicappedApplicable: false,
  },
  {
    postId: "30",
    handicappedApplicable: false,
  },
  {
    postId: "31",
    handicappedApplicable: false,
  },

  { postId: "32", handicappedApplicable: false },
  { postId: "41", handicappedApplicable: false },

  { postId: "601", handicappedApplicable: false },
  { postId: "602", handicappedApplicable: false },
  { postId: "603", handicappedApplicable: false },
  {
    postId: "604",
    handicappedApplicable: false,
    // handicappedTypes: ["LC", "AAV"],
  },

  { postId: "605", handicappedApplicable: false },
  { postId: "606", handicappedApplicable: false },
  {
    postId: "607",
    handicappedApplicable: true,
    handicappedTypes: ["LV"],
  },
  { postId: "608", handicappedApplicable: false },
  { postId: "609", handicappedApplicable: false },
  { postId: "610", handicappedApplicable: false },
  {
    postId: "611",
    handicappedApplicable: false,
    // handicappedTypes: ["LC", "AAV", "OL-3"],
  },
  { postId: "612", handicappedApplicable: false },
  { postId: "613", handicappedApplicable: false },
  { postId: "614", handicappedApplicable: false },
  { postId: "615", handicappedApplicable: false },
  {
    postId: "616",
    handicappedApplicable: true,
    handicappedTypes: ["OA", "OL", "LC", "DWF", "AAV"],
  },
];

export let postCategory = [
  {postId:"24",Gen:false,SC:false,ST:false,OBC:false,EWS:true},
  {postId:"28",Gen:false,SC:true,ST:true,OBC:true,EWS:true},
  {postId:"32",Gen:false,SC:true,ST:true,OBC:false,EWS:true},
]