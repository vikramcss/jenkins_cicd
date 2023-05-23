const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://smbarge:csswakad%408782@cluster0.9ufne.mongodb.net/cb-01-2022?retryWrites=true&w=majority";
const client = new MongoClient(uri);

const init = async () => {
    await client.connect();    
}


const doit = async () => {
    await init()
    console.log('db connected')
    let userSchema = client.db("cb-01-2022").collection("users");
    let email = 'MaheshVarmandale@gmail.com'
    let emailregex = `/${email}/i`
    const found = await userSchema.findOne({ login: {$regex: email, $options: "i"} })
    if (found) {
      console.log('oops the user is already present');
      return { error: -1, errorMsg: 'user is already registered do you want to signin' };
    } else {
      console.log('user for email not found: ', email, ' in user schema, will go ahead and send verificaiton code' )
    }
    
}
doit ()