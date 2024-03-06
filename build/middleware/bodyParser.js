"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonParser = (req, res, next) => {
    try {
        const { dueDate } = req.body;
        if (dueDate && typeof dueDate === "string") {
            req.body.dueDate = new Date(dueDate);
        }
        next();
    }
    catch (error) {
        console.error("Error in convertDueDate middleware:", error);
        return res.status(500).send("Internal Server Error");
    }
};
exports.default = jsonParser;
//# sourceMappingURL=bodyParser.js.map