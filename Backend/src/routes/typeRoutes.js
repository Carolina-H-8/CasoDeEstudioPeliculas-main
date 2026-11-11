import { Router } from "express";
import {
  createType,
  getType,
  updateType,
  deleteType,
} from "../controllers/typeController.js";

const router = Router();

router.post("/", createType);
router.get("/", getType);
router.put("/:id", updateType);
router.patch("/:id", updateType);
router.delete("/:id", deleteType);

export default router;
