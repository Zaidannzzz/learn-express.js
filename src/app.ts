import express, { Router } from "express";
import admin from "firebase-admin";
import { router } from "./routers/auth/user";
import todoRouter from "./routers/todo/todo";
import jsonParser from "./middleware/bodyParser";

const app = express();
app.use(express.json());
// admin.initializeApp();
console.log("=> masuk src/app");

app.use(jsonParser);
app.use(router);
app.use(todoRouter);
// const auth = admin.auth();

app.get("/", (req, res) => {
  res.send("Asalamualaikum mamang");
});

export { app };
