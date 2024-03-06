import jsonwebtoken from "jsonwebtoken";
import { admin } from "../db/firebase";

const firebaseAuth = admin.auth();

const generateCustomToken = async (uid: string): Promise<string> => {
  try {
    const customToken = await firebaseAuth.createCustomToken(uid);
    return customToken;
  } catch (error) {
    console.error("Error generating custom token:", error);
    throw error;
  }
};

export default generateCustomToken;
