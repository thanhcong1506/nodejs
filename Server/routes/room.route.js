import express from "express";
import {
  createRoom,
  deleteRoom,
  deleteRooms,
  getAllRooms,
  getRoom,
  updateRoom,
  updateRoomAvailability,
} from "../controllers/room.controller.js";
import { verifyAdmin } from "../middleware/verifyToken.js";

const router = express.Router();

//CREATE
router.post("/:hotelid", createRoom);

//UPDATE
router.put("/:id", updateRoom);
router.put("/availability/:id", updateRoomAvailability);

//DELETE
router.delete("/:id", deleteRooms);
router.delete("/:id/:hotelid", deleteRoom);

//GET Room
router.get("/:id", getRoom);

//GET ALL RoomS
router.get("/", getAllRooms);

export default router;
