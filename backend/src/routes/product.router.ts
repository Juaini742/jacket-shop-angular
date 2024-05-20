import express from "express";
import { getOneProduct, getProducts } from "../controllers/product.controller";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getOneProduct);

module.exports = router;
