import * as admin from "firebase-admin";
import { onSchedule } from "firebase-functions/v2/scheduler";
import { grabNewPostsToDB } from "./utils/grabNewPostsToDB";

const firebaseApp = admin.initializeApp();

export const db = admin.firestore(firebaseApp);

export const parseUrlOnSchedule = onSchedule("every 55 minutes", async () => {
   await grabNewPostsToDB();
});

