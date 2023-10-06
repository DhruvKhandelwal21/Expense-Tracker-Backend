import express from "express";
import {
  findExpense,
  addExpense,
  updateExpense,
  deleteExpense,
} from "./expense_controller";
import auth from "../../auth/auth";
const router = express.Router();
router.get("/find", auth(), findExpense);
router.post("/create", auth(), addExpense);
router.put("/update/:id", updateExpense);
router.put("/delete/:id", auth(), deleteExpense);
export default router;
