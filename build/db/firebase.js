"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.firebase = exports.db = exports.admin = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
exports.admin = firebase_admin_1.default;
const app_1 = __importDefault(require("firebase/compat/app"));
exports.firebase = app_1.default;
require("firebase/compat/firestore");
const dev_json_1 = __importDefault(require("./dev.json"));
const env_1 = require("./env/env");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
console.log("=> masuk src/db/firebase");
// firebase.initializeApp(firebaseConfig);
// console.log("ini firebaseConfig", firebaseConfig);
// admin.initializeApp({
//   credential: admin.credential.cert(admindev as admin.ServiceAccount),
//   databaseURL: "https://learn-nodejs-1302a-default-rtdb.asia-southeast1.firebasedatabase.app"
// });
// if (!admin.apps.length) {
app_1.default.initializeApp(env_1.firebaseConfig);
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(dev_json_1.default),
    databaseURL: env_1.firebaseConfig.databaseURL,
    projectId: env_1.firebaseConfig.projectId,
});
// };
const db = app_1.default.firestore();
exports.db = db;
// const realtimeDB = firebase.database();
// const storage = firebase.storage();
// const { Timestamp } = firebase.firestore;
// const DocumentReference = firebase.firestore.DocumentReference;
// const createRef = (collection: string, docId: string) =>
// db.doc(`${collection}/` + docId);
exports.default = db;
//# sourceMappingURL=firebase.js.map