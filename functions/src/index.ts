import * as admin from "firebase-admin";
// import * as functions from "firebase-functions";
// import { onRequest } from "firebase-functions/v2/https";
import { onSchedule } from "firebase-functions/v2/scheduler";
import { grabNewPostsToDB } from "./utils/grabNewPostsToDB";

const firebaseApp = admin.initializeApp();

export const db = admin.firestore(firebaseApp);

export const parseUrlOnSchedule = onSchedule("every 55 minutes", async () => {
   await grabNewPostsToDB();
});

// export const helloWorld = onRequest(async (request, response) => {
//    const posts = await getNewPostsToDB();
//    response.send(posts);
// });
