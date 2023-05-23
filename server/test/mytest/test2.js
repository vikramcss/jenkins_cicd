"use strict";
let postIdMap = [
  { postId: "11", record: "mazdoor" }, //NIH
  { postId: "12", record: "sweeper" }, // OA,LC,AAV
  { postId: "13", record: "wardAya" }, //AAV,Dwf
  { postId: "14", record: "wardBoy" }, //AAV,Dwf
  { postId: "15", record: "pondkeeper" }, //NIH
  { postId: "16", record: "watchman" }, //LC,AAV
  { postId: "17", record: "peon" }, // LV,OA,OL,LC,AAV,Dwf
  { postId: "21", record: "mali" }, //HH,OL,OA,AAV
  { postId: "22", record: "pharmacist" }, // OL,Dwf,AAV
  { postId: "23", record: "dresser" }, // NIH

  { postId: "24", record: "carpenter" }, // NIH
  { postId: "25", record: "wireman" }, // NIH
  { postId: "26", record: "fireman" }, // NIH
  { postId: "27", record: "mason" }, // NIH

  { postId: "31", record: "physiotherapist" }, //NIH
  { postId: "32", record: "stenographer" }, // NIH
  { postId: "33", record: "sanitaryInspector" }, //OA,OL,AAv

  { postId: "41", record: "xRayTechnician" }, // NIH

  { postId: "51", record: "registrar" }, //NIH
  { postId: "52", record: "pediatrician" }, //NIH
  { postId: "53", record: "asstMedicalOfficer" }, //NIH
];

postIdMap.map(async ({ record }) => {
  let filter = {
    $or: [{}, {}],
  };

  filter["$or"][0][`${record}.confirmation_client`] = { $exists: true };
  filter["$or"][1][`${record}.confirmation_server`] = { $exists: true };
  filter[record] = { $exists: true };
  console.log("filter is : ", JSON.stringify(filter, null, 2));
});
