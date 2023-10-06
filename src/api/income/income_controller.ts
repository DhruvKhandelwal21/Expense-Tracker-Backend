import { Request, NextFunction, Response } from "express";
import { ObjectId } from "mongodb";
export const findIncome = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  const { db } = req.app.locals;
  const user = new ObjectId(req?.user);
  try {
    const incomes = await db
      .collection("income")
      .find({ user })
      .sort({ date: -1 })
      .toArray();
    res.send({ status: 200, incomes, message: "All Incomes" });
  } catch (e) {
    next(e);
  }
};
export const addIncome = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  const { db } = req.app.locals;
  const data = req.body;
  const user = new ObjectId(req?.user);
  try {
    const createExpense = await db
      .collection("income")
      .insertOne({ ...data, user });
    res.send({ status: 200, createExpense, message: "Create Income" });
  } catch (e) {
    next(e);
  }
};
export const updateIncome = async (
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
export const deleteIncome = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  const { db } = req.app.locals;
  const tempId = req.params.id;
  const id = new ObjectId(tempId);
  try {
    const deleteItem = await db.collection("income").deleteOne({ _id: id });
    res.send({ status: 200, message: "Income item deleted" });
  } catch (e) {
    next(e);
  }
};
