import { Timestamp } from "firebase/firestore";

export const secondsToMilliseconds = (seconds: number) => seconds * 1000;
export const minutesToMilliseconds = (minutes: number) => minutes * 60 * 1000;

export const firebaseTime = (time: Timestamp) =>
  new Date(time.seconds * 1000 + time.nanoseconds / 1000000);
