import bodyParser from "body-parser";
import express from "express";
import { createTask, deleteTask, getTasks, updateTask } from "../../api/todo";
import { Task } from "../../models/todo";
import jsonParser from "../../middleware/bodyParser";
import { validateTodo } from "../../validation/todoValidation";

const todoRouter = express.Router();

todoRouter.post("/createtask", jsonParser, async (req, res) => {
  console.log("ini router todo /createtask");

  try {
    const { title, description, dueDate, isProgress, isCompleted } = req.body;
    console.log("ini req.body", req.body);
    console.log("ini req.body dueDate", req.body.dueDate, `${typeof dueDate}`);
    const validationError = validateTodo(req.body);

    if (validationError) {
      return res.status(400).send(validationError);
    }

    if (!dueDate || !(dueDate instanceof Date) || isNaN(dueDate.getTime())) {
      return res.status(400).send("Invalid dueDate format");
    }

    const createDataTodo = await createTask(
      title,
      description,
      dueDate,
      isProgress,
      isCompleted
    );
    return res.status(201).send({ message: "Success!", createDataTodo });
  } catch (error) {
    console.log(`error create todo : ${error}`);
    return res.status(403).send(error);
  }
});

todoRouter.get("/gettasks", jsonParser, async (req, res) => {
  console.log("ini router todo /gettasks");

  try {
    const snapshot = await getTasks();
    const tasks: Task[] = [];
    console.log("ini snapshot", snapshot);

    snapshot?.forEach((doc: any) => {
      console.log("doc snapshot", doc);
      tasks.push({
        id: doc.id,
        ...doc.data,
      });
      console.log("ini tasks", tasks);
    });

    res.status(201).json({ message: "Success!", tasks });
  } catch (error) {
    console.log(`error get task : ${error}`);
    return res.status(403).send(error);
  }
});

todoRouter.put("/updatetask/:id", jsonParser, async (req, res) => {
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

    await updateTask(id, updatedFields);

    res.status(201).json({ message: "Success!", taskId: id });
  } catch (error) {
    console.log(`error update task : ${error}`);
    return res.status(500).send(error);
  }
});

todoRouter.delete("/deletetask/:id", jsonParser, async (req, res) => {
  console.log("ini router todo /deletetask/:id");

  try {
    const { id } = req.params;
    console.log("ini id", id);

    if (!id) {
      return res.status(400).send("ID is required");
    }

    await deleteTask(id);

    res.status(201).json({ message: "Success!", taskId: id });
  } catch (error) {
    console.log(`error delete task : ${error}`);
    return res.status(500).send(error);
  }
});

export default todoRouter;
