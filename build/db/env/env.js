"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.firebaseConfig = void 0;
// Import the functions you need from the SDKs you need
const app_1 = require("firebase/app");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD631vB6fJNYAyIVPbkNYjoTzYhdDYY8Io",
    authDomain: "learn-nodejs-1302a.firebaseapp.com",
    databaseURL: "https://learn-nodejs-1302a-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "learn-nodejs-1302a",
    storageBucket: "learn-nodejs-1302a.appspot.com",
    messagingSenderId: "271944683120",
    appId: "1:271944683120:web:f04b0353e00509b54b6eb5"
};
exports.firebaseConfig = firebaseConfig;
// Initialize Firebase
const app = (0, app_1.initializeApp)(firebaseConfig);
//# sourceMappingURL=env.js.map