import express from "express";
import {
  addCartItem,
  deleteCartItem,
  getCartItemByUser,
  updateCartItem,
} from "../controllers/cart.controller";
const router = express.Router();

router.get("/", getCartItemByUser);
router.post("/", addCartItem);
router.put("/:id", updateCartItem);
router.delete("/:id", deleteCartItem);

module.exports = router;
