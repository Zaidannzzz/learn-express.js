"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("./routers/auth/user");
const todo_1 = __importDefault(require("./routers/todo/todo"));
const bodyParser_1 = __importDefault(require("./middleware/bodyParser"));
const app = (0, express_1.default)();
exports.app = app;
app.use(express_1.default.json());
// admin.initializeApp();
console.log("=> masuk src/app");
app.use(bodyParser_1.default);
app.use(user_1.router);
app.use(todo_1.default);
// const auth = admin.auth();
app.get("/", (req, res) => {
    res.send("Asalamualaikum mamang");
});
//# sourceMappingURL=app.js.map