import firebase from "firebase/compat/app";
import db from "../db/firebase";
import { converter2 } from "../db/converter";
import { Task } from "../models/todo";

export const createTask = async (
  title: string,
  description: string,
  dueDate: Date,
  isProgress: boolean,
  isCompleted: boolean
) => {
  console.log("ini masuk createTask");
  console.log("ini dueDate: ", dueDate, `${typeof dueDate}`);

  if (!(dueDate instanceof Date) || isNaN(dueDate.getTime())) {
    throw new Error("Invalid dueDate");
  }

  const dueDateTimestamp = firebase.firestore.Timestamp.fromDate(dueDate);
  console.log("ini dueDateTimestamp: " + dueDateTimestamp);

  return await db
    .collection("todo")
    .add({
      title: title,
      description: description,
      dueDate: dueDateTimestamp,
      isProgress: isProgress,
      isCompleted: isCompleted,
      createdAt: firebase.firestore.Timestamp.now(),
    })
    .then((ref) => {
      console.log("Success Created Todo ", ref.id);
      return ref.id;
    })
    .catch((err) => {
      console.error("Error Create Todo ", err);
      throw err;
    });
};

export const getTasks = async () => {
  console.log("ini masuk getTasks");

  return await db
    .collection("todo")
    .withConverter(converter2<Task>())
    .get()
    .then((snaps: { docs: any[] }) => {
      return snaps.docs.map((snap: { data: () => any; id: any }) => ({
        data: snap.data(),
        id: snap.id,
      }));
    })
    .catch((error: any) => {
      console.error("Error Get Task", error);
      throw error;
    });
};

export const updateTask = async (id: string, updatedFields: Partial<Task>) => {
  console.log("ini masuk updateTasks");
  try {
    const updatingTask = db.collection("todo").doc(id);
    await updatingTask.update(updatedFields);
    console.log("Success Updating Task ", id, updatedFields);
    return id;
  } catch (error) {
    console.error("Error Updating Task", error);
    throw error;
  }
};

export const deleteTask = async (id: string) => {
  console.log("ini masuk updateTasks");
  try {
    const updatingTask = db.collection("todo").doc(id);
    await updatingTask.delete();
    console.log("Success Updating Task ", id);
    return id;
  } catch (error) {
    console.error("Error Delete Task", error);
    throw error;
  }
};
