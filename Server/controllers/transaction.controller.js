import Transaction from "../models/transaction.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createError } from "../utils/createError.js";
import mongoose from "mongoose";

export const reserve = async (req, res, next) => {
  const newTransaction = new Transaction(req.body);

  try {
    const saveTransaction = await newTransaction.save();
    res.status(200).json(saveTransaction);
  } catch (err) {
    next(err);
  }
};

export const getTransactions = async (req, res, next) => {
  try {
    const transaction = await Transaction.find();
    res.status(200).json(transaction);
  } catch (err) {
    next(err);
  }
};
