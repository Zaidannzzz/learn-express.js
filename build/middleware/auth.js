"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const fixToken = process.env.SuperUserToken;
const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer", "");
        console.log(token);
        if (fixToken) {
            const isMatch = await bcrypt_1.default.compare(fixToken, token);
            if (!isMatch) {
                throw new Error("Invalid token");
            }
        }
        else {
            throw new Error("Invalid token");
        }
        next();
    }
    catch (error) {
        res.status(401).send({ error: "Please authenticate." });
    }
};
exports.default = authMiddleware;
//# sourceMappingURL=auth.js.map