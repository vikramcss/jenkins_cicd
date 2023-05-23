var qs = require("querystring");
var http = require("https");

var options = {
  method: "POST",
  hostname: "https://m1.sarv.com",
  port: null,
  path: "/api/V2.0/sms_campaign",
  headers: {
    "content-type": "application/x-www-form-urlencoded",
    "cache-control": "no-cache",
  },
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});
let verificationCode = "123456";
let advDate = "22-Jan-2022";
let posts = "21-Various-Posts";

req.write(
  qs.stringify({
    userId: "81771211",
    route:"OT",
    senderId: "PCBJOB",
    contact_numbers:'9049269787',
    // mobile: "918805027292",
    // msg: `Your 6 digit mobile verification code for "Kirkee Cantonment Board, Pune,(Application for post of {#var#} and advertisement dated {#var#})" is: {#var#} ITSYST`,
    // msg: `Your 6 digit mobile verification code for "Kirkee Cantonment Board,Pune,(Application for post of Jr.Clerk)" is:${verificationCode} ITSYST`,

    msg: `Your+6+digit+mobile+verification+code+for+"Pune+Cantonment+Board%2C+Pune%2C(Application+for+post+of+${"34-posts"}+and+advertisement+dated+${04/03/2023}"+is%3A+${416801}+PCBJOB`,
    // msg: `Your 6 digit mobile verification code for "Kirkee Cantonment Board, Pune, (Application for post of Clerk and advertisement dated 1-Jan-2023)" is: 123400 ITSYST`,
    token: "210798033864006fa847b300.99120145",
    template_id: "11245",
    language:"EN",
    format: "json",
  })
);
req.end();
