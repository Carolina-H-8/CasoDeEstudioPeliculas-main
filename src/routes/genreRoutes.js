import { Router } from "express";
import {
  createGenre,
  getGenre,
  updateGenre,
  deleteGenre,
} from "../controllers/generoController.js";

const router = Router();

router.post("/", createGenre);
router.get("/", getGenre);
router.put("/:id", updateGenre);
router.delete("/:id", deleteGenre);

export default router;
