"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_1 = require("../db/firebase");
const firebaseAuth = firebase_1.admin.auth();
const generateCustomToken = async (uid) => {
    try {
        const customToken = await firebaseAuth.createCustomToken(uid);
        return customToken;
    }
    catch (error) {
        console.error("Error generating custom token:", error);
        throw error;
    }
};
exports.default = generateCustomToken;
//# sourceMappingURL=jsonWebToken.js.map