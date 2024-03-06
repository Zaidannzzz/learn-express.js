"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todo_1 = require("../../api/todo");
const bodyParser_1 = __importDefault(require("../../middleware/bodyParser"));
const todoValidation_1 = require("../../validation/todoValidation");
const todoRouter = express_1.default.Router();
todoRouter.post("/createtask", bodyParser_1.default, async (req, res) => {
    console.log("ini router todo /createtask");
    try {
        const { title, description, dueDate, isProgress, isCompleted } = req.body;
        console.log("ini req.body", req.body);
        console.log("ini req.body dueDate", req.body.dueDate, `${typeof dueDate}`);
        const validationError = (0, todoValidation_1.validateTodo)(req.body);
        if (validationError) {
            return res.status(400).send(validationError);
        }
        if (!dueDate || !(dueDate instanceof Date) || isNaN(dueDate.getTime())) {
            return res.status(400).send("Invalid dueDate format");
        }
        const createDataTodo = await (0, todo_1.createTask)(title, description, dueDate, isProgress, isCompleted);
        return res.status(201).send({ message: "Success!", createDataTodo });
    }
    catch (error) {
        console.log(`error create todo : ${error}`);
        return res.status(403).send(error);
    }
});
todoRouter.get("/gettasks", bodyParser_1.default, async (req, res) => {
    console.log("ini router todo /gettasks");
    try {
        const snapshot = await (0, todo_1.getTasks)();
        const tasks = [];
        console.log("ini snapshot", snapshot);
        snapshot?.forEach((doc) => {
            console.log("doc snapshot", doc);
            tasks.push({
                id: doc.id,
                ...doc.data,
            });
            console.log("ini tasks", tasks);
        });
        res.status(201).json({ message: "Success!", tasks });
    }
    catch (error) {
        console.log(`error get task : ${error}`);
        return res.status(403).send(error);
    }
});
todoRouter.put("/updatetask/:id", bodyParser_1.default, async (req, res) => {
    console.log("ini router todo /updatetask/:id");
    try {
        const { id } = req.params;
        const { updatedFields } = req.body;
        console.log("ini id", id);
        console.log("ini updatedFields", updatedFields);
        if (!id || !updatedFields) {
            return res.status(400).send("ID and updatedFields are required");
        }
        if (updatedFields.dueDate && typeof updatedFields.dueDate === "string") {
            return res.status(400).send("Invalid dueDate format");
        }
        await (0, todo_1.updateTask)(id, updatedFields);
        res.status(201).json({ message: "Success!", taskId: id });
    }
    catch (error) {
        console.log(`error update task : ${error}`);
        return res.status(500).send(error);
    }
});
todoRouter.delete("/deletetask/:id", bodyParser_1.default, async (req, res) => {
    console.log("ini router todo /deletetask/:id");
    try {
        const { id } = req.params;
        console.log("ini id", id);
        if (!id) {
            return res.status(400).send("ID is required");
        }
        await (0, todo_1.deleteTask)(id);
        res.status(201).json({ message: "Success!", taskId: id });
    }
    catch (error) {
        console.log(`error delete task : ${error}`);
        return res.status(500).send(error);
    }
});
exports.default = todoRouter;
//# sourceMappingURL=todo.js.map