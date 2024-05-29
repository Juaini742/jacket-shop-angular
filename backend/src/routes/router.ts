import express from "express";
import { protectedRoute } from "../middleware/protectedRoute";
import { getOneUser, logout, updateUser } from "../controllers/user.controller";
import { getOneProduct, getProducts } from "../controllers/product.controller";
import { checkout } from "../controllers/checkout.controller";
const router = express.Router();
const userRouter = require("./user.router");
const categoryRouter = require("./category.router");
const addressRouter = require("./address.router");
const cartRouter = require("./cart.router");

router.use("/public/user", userRouter);
router.use("/public/category", categoryRouter);
router.get("/public/product", getProducts);
router.get("/public/product/:id", getOneProduct);

router.use([protectedRoute]);
router.get("/secured/user", getOneUser);
router.put("/secured/user", updateUser);
router.post("/secured/user", logout);
router.use("/secured/address", addressRouter);
router.use("/secured/cart", cartRouter);
router.post("/secured/checkout", checkout);

export default router;
