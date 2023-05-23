const https = require('https');

  const getMobileVerificationcode = async ({ mobile, verificationCode }) => {
  let promise = new Promise((resolve, reject) => {
    let url = `https://m1.sarv.com/api/v2.0/sms_campaign.php?token=210798033864006fa847b300.99120145&user_id=81771211&route=OT&template_id=11245&sender_id=PCBJOB&language=EN&template=Your+6+digit+mobile+verification+code+for+%22Pune+Cantonment+Board%2C+Pune%2C%28Application+for+post+of+34+Various+Posts+and+advertisement+dated+04-March-2023%22+is%3A+${verificationCode}+PCBJOB&contact_numbers=${mobile}`
    https.get(url, res => {
      let data = [];
      const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
      console.log('Status Code:', res.statusCode);
      console.log('Date in Response header:', headerDate);
      if(res.statusCode != 200) {
        reject({error: -1, errorMsg: 'response code is not 200'})
      }
      res.on('data', chunk => {
        data.push(chunk);
      });

      res.on('end', () => {
        console.log('Response ended: ');
        const resp = JSON.parse(Buffer.concat(data).toString());
        console.log('resp is:', resp);
        if(resp.msg !== 'success') {
          reject({error: -2, errorMsg:`send sms failed with msg ${resp.msg}`})
        } else {
          resolve({error: 0})
        }
      });
    }).on('error', err => {
      console.log('Error: ', err.message);
      reject({error: -1, errorMsg: err.message})
    });
  })
  return promise
}

const doit = async () => {
  try {
  let result = await getMobileVerificationcode ({mobile:'8805027292', verificationCode:'111222'})
  } catch(e) {
    let {error, errorMsg} = e
    console.log('sendSMS failed with error: ', error, 'error Msg: ', errorMsg)
  }
}
doit()
