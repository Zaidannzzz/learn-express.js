import { app } from "./app";
import dotenv from "dotenv";
dotenv.config();

console.log("=> masuk src/index");

const port = process.env.PORT;

const http = require("http").createServer(app);

http.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
