import bodyParser from "body-parser";
import express from "express";
import { Request, Response, NextFunction } from "express";

const jsonParser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { dueDate } = req.body;

    if (dueDate && typeof dueDate === "string") {
      req.body.dueDate = new Date(dueDate);
    }

    next();
  } catch (error) {
    console.error("Error in convertDueDate middleware:", error);
    return res.status(500).send("Internal Server Error");
  }
};

export default jsonParser;
