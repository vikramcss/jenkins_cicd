const fs = require("fs");
const path = require("path");
const csv = require("@fast-csv/parse");
let rows = [];
fs.createReadStream(path.resolve(__dirname, "feeIssueCandidates.csv"))
  .pipe(csv.parse({ headers: true }))
  .on("error", (error) => console.error(error))
  .on("data", (row) => (rows = [...rows, row]))
  .on("end", (rowCount) => processRows());

const processRows = () => {
  // console.log("rows: ", rows);
  let appids = rows.map((e) => e.appid);
  appids = appids.sort();
  console.log("appids are: ", appids);
  console.log("length of appids is: ", appids.length);
  let uAppIds = [...new Set(appids)];

  let feeImpactedCandidates = uAppIds.map((uAppId) => {
    let applications = rows
      .filter((r) => r.appid == uAppId)
      .map((a) => {
        return {
          ...a,
          post_appid: Number(a.post_appid),
          appid: Number(a.appid),
        };
      });

    return {
      appid: Number(uAppId),
      applicationCount: applications.length,
      applications,
    };
  });
  console.log(
    "uAppIds and their applications are :",
    JSON.stringify(feeImpactedCandidates, null, 2)
  );
  console.log("Impacted unique candidates are: ", feeImpactedCandidates.length);
  fs.writeFileSync(
    "./feeImpactedCandidates.json",
    JSON.stringify(feeImpactedCandidates, null, 2)
  );
};
