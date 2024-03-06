import firebase from "firebase/compat/app";

export interface Task {
  id?: string;
  title?: string;
  description?: string;
  dueData?: firebase.firestore.Timestamp;
  isProgress: boolean;
  isCompleted: boolean;
  createdAt?: firebase.firestore.Timestamp;
}