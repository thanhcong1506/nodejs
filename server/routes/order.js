import express from "express";
import {
  createOrder,
  deleteOrder,
  getAdminOrders,
  getDetailedHistory,
  getOrders,
} from "../controllers/order.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.post("/", verifyToken, createOrder);
router.get("/:userId", verifyToken, getOrders);
router.get("/", verifyToken, getAdminOrders);
router.delete("/:id", verifyToken, deleteOrder);
router.get("/history/:orderId", verifyToken, getDetailedHistory);
export default router;
