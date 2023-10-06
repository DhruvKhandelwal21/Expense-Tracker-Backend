import express from "express";
import { findIncome, addIncome, updateIncome, deleteIncome } from "./income_controller";
import auth from "../../auth/auth";
const router = express.Router();
router.get("/find", auth(), findIncome);
router.post("/create", auth(), addIncome);
router.put("/update/:id", updateIncome);
router.put("/delete/:id", auth(), deleteIncome);
export default router;