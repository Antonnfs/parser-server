import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import * as express from "express";
import * as cors from "cors";
import { onSchedule } from "firebase-functions/v2/scheduler";
import { grabNewPostsToDB } from "./utils/grabNewPostsToDB";
import router from "./routes";

const firebaseApp = admin.initializeApp();

export const db = admin.firestore(firebaseApp);

const app = express();

app.use(cors({ origin: true }));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use("/", router);

export const api = functions.region("europe-west1").https.onRequest(app);

export const parseUrlOnSchedule = onSchedule("0 0 * * *", async () => {
   await grabNewPostsToDB();
});
