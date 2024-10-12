import * as admin from "firebase-admin";
import { getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

const serviceAccount = require("../service-account.json");

const adminApp =
  getApps().length <= 0
    ? admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: "gs://nettby-b881b.appspot.com",
      })
    : getApps()[0];

export const adminAuth = getAuth(adminApp);

export const adminDb = getFirestore(adminApp);

export const adminStorage = getStorage(adminApp);
