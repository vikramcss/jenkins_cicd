
const fs = require('fs');
const csv = require('csv-parser');
const dbURI = 'mongodb+srv://smbarge:csswakad%408782@cluster0.9ufne.mongodb.net/cmet-sa3-2022'
const dbName = 'cmet-sa3-2022';
const MongoClient = require('mongodb').MongoClient;
let paymentRecords = [];
let db
let ordersInitiated = [];
let paymentDoneInsa3 = []
const getOrdersInitiated = async () => {
    let client = await MongoClient.connect(dbURI);
    db = client.db(dbName);
    const query = {};
    return await db.collection('fees').find(query).toArray()
}


const runTestx = async () => {
    let ordersInitiated = [];
    ordersInitiated = await getOrdersInitiated()
    console.log('orders initiated is: ', ordersInitiated);
}

let sa3_payments = [];
const sa3Payments = async (ordersInitiated, paymentRecords) => {
    paymentRecords = paymentRecords.filter(({ status }) => status == 'captured')
    paymentRecords.forEach((p) => {
        let found = ordersInitiated.find(({ order }) => order.id == p.order_id)
        if (!found) {
            // console.log('order_id: ', p.order_id, ' is not sa3 payment', JSON.stringify(p, null, 2))
        } else {
            found.status = p.status
            sa3_payments = [...sa3_payments, found]
        }
    })
}
const doublePayments = (distinctPayments) => {
    let double_payments = {}
    const captured_sa3_payments = sa3_payments.filter(({ status }) => status == 'captured')
    distinctPayments.forEach((login) => {
        const matched = captured_sa3_payments.filter(({ login: sa3_login }) => sa3_login == login)
        if (matched.length > 1) {
            double_payments[login] = [...matched]
            console.log(`has made payment ${matched.length} times user ${login} `)
        }
    })
    return double_payments;
}
const paymentsDoneInRazorPayButNotInsa3db = async (distinctPayments) => {
    const query = { $or: [{ confirmation_client: { $exists: true } }, { confirmation_server: { $exists: true } }] }
    paymentDoneInsa3 = await db.collection('applications').find(query).toArray()
    console.log('payments done is sa3 is: ', paymentDoneInsa3.length)
    distinctPayments.forEach(login => {
        const found = paymentDoneInsa3.find(({ personalInfo }) => personalInfo.email == login)
        if (!found) {
            console.log('payment for :', login, ' is not recorded')
        }
    })
}
let return_payments = {}
const returnPayment = (double_payments) => {
    for (const [login, ordersInitiated] of Object.entries(double_payments)) {
        return_payments[login] = [];
        ordersInitiated.forEach(o => {
            const found = paymentDoneInsa3.find(a => {
                if (a.confirmation_client && o.order.id == a.confirmation_client.razorpay_order_id) {
                    return true
                } else if (a.confirmation_server && o.order.id == a.confirmation_server.razorpay_order_id) {
                    return true
                }
                return false
            })
            if (!found) {
                return_payments[login] = [...return_payments[login], o];
            }
        })
    }
}
const runTest = async () => {
    ordersInitiated = await getOrdersInitiated()

    fs.createReadStream('./payments.csv')
        .pipe(csv())
        .on('data', ({ id, amount, currency, status, order_id, invoice_id, international, method, amount_refunded, amount_transferred, refund_status, captured, description, card_id, card, bank, wallet, vpa, email, contact, notes, fee, tax, error_code, error_description, created_at, card_type, card_network }) => {
            paymentRecords.push(
                {
                    id,
                    amount,
                    currency,
                    status,
                    order_id,
                    invoice_id,
                    international,
                    method,
                    amount_refunded,
                    amount_transferred,
                    refund_status,
                    captured,
                    description,
                    card_id,
                    card,
                    bank,
                    wallet,
                    vpa,
                    email,
                    contact,
                    notes,
                    fee,
                    tax,
                    error_code,
                    error_description,
                    created_at,
                    card_type,
                    card_network
                }
            )
        })
        .on('end', async () => {
            // console.log('payment records are: ', paymentRecords)
            // console.log('CSV file successfully processed count: ', paymentRecords.length);
            await sa3Payments(ordersInitiated, paymentRecords)
            // console.log('sa3 payemnts are: ', sa3_payments)
            console.log('total sa3 payemnts are: ', sa3_payments.length)
            console.log('total captured sa3 payemnts are: ', sa3_payments.filter(({ status }) => status == 'captured').length)
            let distinctPayments = [...new Set(sa3_payments.filter(({ status }) => status == 'captured').map(({ login }) => login))]
            console.log('distinct sa3 payments are: ', distinctPayments.length)
            let double_payments = doublePayments(distinctPayments)
            console.log('double payments is: ', JSON.stringify(double_payments, null, 2))
            await paymentsDoneInRazorPayButNotInsa3db(distinctPayments)
            await returnPayment(double_payments)
            console.log('return payments: ', JSON.stringify(return_payments, null, 2))
        });
}

runTest();
