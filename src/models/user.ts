import { admin } from "../db/firebase";

export interface User {
  uid: string;
  email?: string;
  password?: string;
  phoneNumber?: string;
  displayName?: string;
}