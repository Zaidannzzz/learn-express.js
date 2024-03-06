"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.getTasks = exports.createTask = void 0;
const app_1 = __importDefault(require("firebase/compat/app"));
const firebase_1 = __importDefault(require("../db/firebase"));
const converter_1 = require("../db/converter");
const createTask = async (title, description, dueDate, isProgress, isCompleted) => {
    console.log("ini masuk createTask");
    console.log("ini dueDate: ", dueDate, `${typeof dueDate}`);
    if (!(dueDate instanceof Date) || isNaN(dueDate.getTime())) {
        throw new Error("Invalid dueDate");
    }
    const dueDateTimestamp = app_1.default.firestore.Timestamp.fromDate(dueDate);
    console.log("ini dueDateTimestamp: " + dueDateTimestamp);
    return await firebase_1.default
        .collection("todo")
        .add({
        title: title,
        description: description,
        dueDate: dueDateTimestamp,
        isProgress: isProgress,
        isCompleted: isCompleted,
        createdAt: app_1.default.firestore.Timestamp.now(),
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
exports.createTask = createTask;
const getTasks = async () => {
    console.log("ini masuk getTasks");
    return await firebase_1.default
        .collection("todo")
        .withConverter((0, converter_1.converter2)())
        .get()
        .then((snaps) => {
        return snaps.docs.map((snap) => ({
            data: snap.data(),
            id: snap.id,
        }));
    })
        .catch((error) => {
        console.error("Error Get Task", error);
        throw error;
    });
};
exports.getTasks = getTasks;
const updateTask = async (id, updatedFields) => {
    console.log("ini masuk updateTasks");
    try {
        const updatingTask = firebase_1.default.collection("todo").doc(id);
        await updatingTask.update(updatedFields);
        console.log("Success Updating Task ", id, updatedFields);
        return id;
    }
    catch (error) {
        console.error("Error Updating Task", error);
        throw error;
    }
};
exports.updateTask = updateTask;
const deleteTask = async (id) => {
    console.log("ini masuk updateTasks");
    try {
        const updatingTask = firebase_1.default.collection("todo").doc(id);
        await updatingTask.delete();
        console.log("Success Updating Task ", id);
        return id;
    }
    catch (error) {
        console.error("Error Delete Task", error);
        throw error;
    }
};
exports.deleteTask = deleteTask;
//# sourceMappingURL=todo.js.map