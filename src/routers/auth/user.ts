import bodyParser from "body-parser";
import express from "express";
import { auth } from "firebase-admin";
import { admin } from "../../db/firebase";
// import db from "../../db/firebase";
import * as bcrypt from "bcrypt";
import generateCustomToken from "../../middleware/jsonWebToken";
import authMiddleware from "../../middleware/auth";

const router = express.Router();
const jsonParser = bodyParser.json();
console.log("=> masuk src/routers/auth/user");
const firebaseAuth = admin.auth();

//Auth
router.post("/user/register", jsonParser, async (req, res) => {
  try {
    console.log("ini reqbody /user/register", req.body);
    const { email, phoneNumber, password, displayName, photoURL } = req.body;

    // Validate email and password
    if (!email || !password) {
      return res.status(400).send({ error: "Email and password are required" });
    }

    // Validate and clean the phone number
    const cleanedPhoneNumber = cleanPhoneNumber(phoneNumber);

    if (!cleanedPhoneNumber) {
      console.log("Invalid phone number:", phoneNumber);
      return res.status(400).send({ error: "Invalid phone number" });
    }
    console.log("Cleaned phone number:", cleanedPhoneNumber);

    const hashedPassword: string = await hashPassword(password);
    console.log("Hashed password:", hashedPassword);

    const userRecord = await firebaseAuth.createUser({
      email: email,
      phoneNumber: cleanedPhoneNumber,
      password: hashedPassword,
      displayName: displayName,
      photoURL: photoURL,
    });
    console.log("User record:", userRecord);
    if (!userRecord) {
      return res.status(400).send({ error: "Invalid user" });
    }

    const customToken = await generateCustomToken(userRecord.uid);

    res.status(201).send({
      message: "Success!",
      uid: userRecord.uid,
      customToken: customToken,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(400).send(error);
  }
});

router.post("/user/login", jsonParser, async (req, res) => {
  try {
    console.log("ini reqbody /user/login", req.body);

    const { idToken } = req.body;

    const decodedToken = await firebaseAuth.verifyIdToken(idToken);

    const uid = decodedToken.uid;
    const email = decodedToken.email;

    res
      .status(200)
      .send({ message: `${email} with id ${uid} has sign In Successfully` });
  } catch (error: any) {
    console.error("Sign-in error:", error.message);
    res.status(500).json({ error: "Sign-in failed" });
  }
});

router.put(
  "/user/update",
  jsonParser,
  // authMiddleware,
  async (req, res) => {
    try {
      console.log("ini reqbody /user/update", req.body);

      const { uid, email, phoneNumber, password, displayName } = req.body;

      // if (!email || !phoneNumber || !displayName || !password) {
      //   return res.status(400).json({ error: 'At least one property should be provided for update.' });
      // }

      const cleanedPhoneNumber = cleanPhoneNumber(phoneNumber);

      if (!cleanedPhoneNumber) {
        console.log("Invalid phone number:", phoneNumber);
        return res.status(400).send({ error: "Invalid phone number" });
      }
      console.log("Cleaned phone number:", cleanedPhoneNumber);

      const updatedData: admin.auth.UpdateRequest = {};

      if (email) {
        updatedData.email = email;
      }

      if (password) {
        updatedData.password = password;
      }

      if (phoneNumber) {
        updatedData.phoneNumber = cleanedPhoneNumber;
      }

      if (displayName) {
        updatedData.displayName = displayName;
      }

      const userRecord = await firebaseAuth.updateUser(uid, updatedData);

      res.status(200).send({
        message: `id ${uid} has Updated Successfully`,
        user: userRecord,
      });
    } catch (error: any) {
      console.error("Error updating user:", error);

      if (error.code === "auth/user-not-found") {
        return res.status(404).json({ error: "User not found." });
      }

      res.status(500).json({ error: "Error updating user." });
    }
  }
);

router.delete(
  "/user/delete",
  jsonParser,
  // authMiddleware,
  async (req, res) => {
    try {
      console.log("ini reqbody /user/delete", req.body);
      const { email } = req.body;
      if (!email) {
        return res
          .status(400)
          .send({ error: "Email and password are required" });
      }

      const userRecord = await firebaseAuth.getUserByEmail(email);
      // console.log("ini userRecord", userRecord);
      if (userRecord.uid) {
        await firebaseAuth.deleteUser(userRecord.uid);
      } else {
        return res.status(400).send({ error: "uid Null" });
      }

      res.status(200).json({
        message: `Account by email ${userRecord.email} deleted successfully`,
      });
    } catch (error) {
      res.status(400).send({ error: `Failed to delete account` });
    }
  }
);

function cleanPhoneNumber(phoneNumber: any): string | null {
  const phoneNumberString =
    typeof phoneNumber === "string" ? phoneNumber : String(phoneNumber);
  console.log("ini phoneNumberString", phoneNumberString);

  // Remove any non-numeric characters
  const cleanedPhoneNumber = phoneNumberString.replace(/\D/g, "");
  console.log("ini cleanedPhoneNumber", cleanedPhoneNumber);

  // Ensure the phone number starts with the country code
  const countryCode = "+62"; // Change this to the appropriate country code

  if (cleanedPhoneNumber.startsWith("0")) {
    return countryCode + cleanedPhoneNumber.substring(1);
  }
  console.log("ini phoneNumber di if cleaned 0", cleanedPhoneNumber);

  if (!cleanedPhoneNumber.startsWith(countryCode)) {
    console.log("ini phoneNumber di if cleaned not 62", cleanedPhoneNumber);

    return null; // Invalid phone number
  }

  return cleanedPhoneNumber;
}

async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}
//End Auth

export { router };
