const {DateTime}= require ('luxon')

let formattedDt = DateTime.now().setZone('Asia/Calcutta').toFormat('dd-MM-yyyy tt')
console.log(formattedDt)
