import { writable } from "svelte/store";
import { browser } from "$app/env";
import { readable } from "svelte/store";
import { api } from "../api/api";
import { DateTime } from "luxon";

export const token = writable("");
export const adminToken = writable("");
export const application = writable(null);
export let currentDate = writable("");
export let startApplications = writable(false);
export let endApplications = writable(false);
export let availablePosts = writable([]);
export let user = writable({ login: "", mobile: "" });
export let postAppId = writable("");
export let impactedRecord = writable({});

if (browser) {
  token.set(localStorage.getItem("token") ? localStorage.getItem("token") : "");
}
token.subscribe((val) => browser && localStorage.setItem("token", val));

if (browser) {
  adminToken.set(
    localStorage.getItem("adminToken") ? localStorage.getItem("adminToken") : ""
  );
}
adminToken.subscribe(
  (val) => browser && localStorage.setItem("adminToken", val)
);

export const time = readable(new Date(), function start(set) {
  const interval = setInterval(() => {
    set(new Date());
  }, 1000);

  return function stop() {
    clearInterval(interval);
  };
});
export const validTime = readable(false, (set) => {
  let startDatetime;
  let endDatetime;
  let currentDate;
  let registrationStarted = false;
  let registrationEnded = false;
  const RECALL_CURRENT_DATE_TIMEINSECS = 300; // every five minutes

  let diffSecondsStart = { values: { seconds: 0 } };
  let diffSecondsEnd = { values: { seconds: 0 } };
  let intervalExamStarted = setInterval(async () => {
    if (!startDatetime) {
      const {
        error: error_2,
        startDatetime: utcStartDatetime,
        endDatetime: utcEndDatetime,
      } = await api.getFormSchedule();
      startDatetime = DateTime.fromISO(utcStartDatetime);
      endDatetime = DateTime.fromISO(utcEndDatetime);
    }
    if (
      !registrationStarted &&
      Math.floor(diffSecondsStart.values.seconds) %
        RECALL_CURRENT_DATE_TIMEINSECS ===
        0
    ) {
      let { error, errorMsg, currentDate: cdate } = await api.getCurrentDate();
      currentDate = DateTime.fromISO(cdate);
    } else if (
      !registrationEnded &&
      Math.floor(diffSecondsEnd.values.seconds) %
        RECALL_CURRENT_DATE_TIMEINSECS ===
        0
    ) {
      let { error, errorMsg, currentDate: cdate } = await api.getCurrentDate();
      currentDate = DateTime.fromISO(cdate);
    } else {
      currentDate = currentDate.plus({ seconds: 1 });
    }
    diffSecondsStart = startDatetime.diff(currentDate, ["seconds"]);
    diffSecondsEnd = endDatetime.diff(currentDate, ["seconds"]);
    // Set Times

    if (diffSecondsStart.values.seconds < 0) {
      registrationStarted = true;
      if (registrationStarted && registrationEnded) {
        clearInterval(intervalExamStarted);
      }
    }
    if (diffSecondsEnd.values.seconds < 0) {
      registrationEnded = true;
      if (registrationStarted && registrationEnded) {
        clearInterval(intervalExamStarted);
      }
    }
    set(registrationStarted && !registrationEnded ? true : false);
  }, 1000);

  return function stop() {
    if (!registrationStarted) clearInterval(intervalExamStarted);
  };
});
