import admin from "firebase-admin";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import admindev from "./dev.json";
import { firebaseConfig } from "./env/env";
import dotenv from "dotenv";

dotenv.config();

console.log("=> masuk src/db/firebase");

// firebase.initializeApp(firebaseConfig);
// console.log("ini firebaseConfig", firebaseConfig);

// admin.initializeApp({
//   credential: admin.credential.cert(admindev as admin.ServiceAccount),
//   databaseURL: "https://learn-nodejs-1302a-default-rtdb.asia-southeast1.firebasedatabase.app"
// });
// if (!admin.apps.length) {
firebase.initializeApp(firebaseConfig);
admin.initializeApp({
  credential: admin.credential.cert(admindev as admin.ServiceAccount),
  databaseURL: firebaseConfig.databaseURL,
  projectId: firebaseConfig.projectId,
});
// };
const db = firebase.firestore();

// const realtimeDB = firebase.database();
// const storage = firebase.storage();
// const { Timestamp } = firebase.firestore;

// const DocumentReference = firebase.firestore.DocumentReference;

// const createRef = (collection: string, docId: string) =>
// db.doc(`${collection}/` + docId);

export default db;
export {
  // Timestamp,
  admin,
  // createRef,
  db,
  firebase,
  // realtimeDB,
  // storage,
  // DocumentReference,
};
