import { Request, NextFunction, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import path from "path";
dotenv.config({
  path: path.join(__dirname, "../../.env"),
});
export const getUser = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  const { db } = req.app.locals;
  const data = req.body;
  try {
    const { userName, password } = req.body;
    const findUser = await db.collection("user").findOne({ userName });
    if (!findUser) {
      throw new Error("User not found please login!");
    }
    const matchPassword = await bcrypt.compare(
      password,
      findUser.encryptedPassword
    );
    if (findUser && matchPassword) {
      const token = jwt.sign(
        { user_id: findUser._id, userName },
        process.env.TOKEN_KEY as string,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      findUser.token = token;
      res.send({ status: 200, message: "Login Successful", data: findUser });
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (e) {
    next(e);
  }
};

export const addUser = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  const { db } = req.app.locals;
  const data = req.body;
  try {
    const { userName, email, password } = req.body;
    const userExist = await db.collection("user").findOne({ email });
    const userNameExist = await db.collection("user").findOne({ userName });
    if (userExist) {
      throw new Error("User already exists");
    }
    if (userNameExist) {
      throw new Error("Username already exists");
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.collection("user").insertOne({
      userName,
      email,
      encryptedPassword,
    });
    const token = jwt.sign(
      { user_id: newUser._id, userName },
      process.env.TOKEN_KEY as string,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    newUser.token = token;
    res.send({ status: 200, newUser, message: "New user created" });
  } catch (e) {
    console.log(e);
  }
};
