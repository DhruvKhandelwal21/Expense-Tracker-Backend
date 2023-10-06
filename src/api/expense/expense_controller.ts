import { Request, NextFunction, Response } from "express";
import { ObjectId } from "mongodb";
export const findExpense = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  const { db } = req.app.locals;
  const user = new ObjectId(req?.user);
  try {
    const expenses = await db
      .collection("expense")
      .find({ user })
      .sort({ date: -1 })
      .toArray();
    res.send({ status: 200, expenses, message: "All expenses" });
  } catch (e) {
    next(e);
  }
};
export const addExpense = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  const { db } = req.app.locals;
  const data = req.body;
  const user = new ObjectId(req?.user);
  try {
    const createExpense = await db
      .collection("expense")
      .insertOne({ ...data, user });
    res.send({ status: 200, createExpense, message: "Create expenses" });
  } catch (e) {
    next(e);
  }
};
export const updateExpense = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  const { db } = req.app.locals;
  const data = req.body;
  const _id = req.params;
  try {
    // const newId = new ObjectId(_id)
    // delete data._id;
    // const res = await db.collection('expense').findOneAndUpdate({_id},{data});
    // res.send({status: 200, res, message: "Update expenses"})
  } catch (e) {
    next(e);
  }
};
export const deleteExpense = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  const { db } = req.app.locals;
  const tempId = req.params.id;
  const id = new ObjectId(tempId);
  try {
    const deleteItem = await db.collection("expense").deleteOne({ _id: id });
    res.send({ status: 200, message: "Expense item deleted" });
  } catch (e) {
    next(e);
  }
};
