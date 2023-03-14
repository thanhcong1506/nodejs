import express from "express";
import {
  getTransactions,
  reserve,
} from "../controllers/transaction.controller.js";

const router = express.Router();

router.post("/", reserve);
router.get("/", getTransactions);

export default router;
