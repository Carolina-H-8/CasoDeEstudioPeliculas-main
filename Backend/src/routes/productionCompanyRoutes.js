import { Router } from "express";
import {
  createProductionCompany,
  getProductionCompany,
  updateProductionCompany,
  deleteProductionCompany,
} from "../controllers/productionController.js";

const router = Router();

router.post("/", createProductionCompany);
router.get("/", getProductionCompany);
router.put("/:id", updateProductionCompany);
router.delete("/:id", deleteProductionCompany);

export default router;
