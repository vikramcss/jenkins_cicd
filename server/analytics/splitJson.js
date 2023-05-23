let fs = require("fs");

let data = fs.readFileSync("./notFilledForm.json", "utf8");
let emailList = JSON.parse(data);
console.log("emailList", emailList);
let list1 = emailList.filter((email, i) => i < 1500);
let list2 = emailList.filter((email, i) => i >= 1500 && i < 3000);
let list3 = emailList.filter((email, i) => i >= 3000 && i < 4500);
let list4 = emailList.filter((email, i) => i >= 4500 && i < 6000);

console.log("list1: ", list1.length);
console.log("list2: ", list2.length);
console.log("list3: ", list3.length);
console.log("list4: ", list4.length);

fs.writeFileSync("./list1.json", JSON.stringify(list1, null, 2));
fs.writeFileSync("./list2.json", JSON.stringify(list2, null, 2));
fs.writeFileSync("./list3.json", JSON.stringify(list3, null, 2));
fs.writeFileSync("./list4.json", JSON.stringify(list4, null, 2));
