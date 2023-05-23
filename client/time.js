
    import {DateTime} from "luxon";

    let startApplications = false;
    let endApplications = false;

    let startDatetime = '2022-05-27T09:00:00.000+05:30'
    let endDatetime = '2022-06-28T17:30:00.000+05:30'

    let currentDatetime = '2022-06-28T17:31:00.000+05:30'

    let lstartDatetime = DateTime.fromISO(startDatetime)
    let lendDatetime = DateTime.fromISO(endDatetime)
    let lcurrentDatetime = DateTime.fromISO(currentDatetime)

    startApplications = lcurrentDatetime >= lstartDatetime ? true: false;
    endApplications = lcurrentDatetime >= lendDatetime ? true: false;

    console.log(`startApplications: ${startApplications} endApplications: ${endApplications}`)
    console.log(`currentDate is: ${currentDatetime}`);

    if(startApplications && !endApplications) {
        console.log('you can apply and fillup application forms')
    } else {
        console.log('you can NOT apply and fillup application forms')
    }