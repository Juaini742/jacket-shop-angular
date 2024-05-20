import express from "express";
import { protectedRoute } from "../middleware/protectedRoute";
import { getOneUser, updateUser } from "../controllers/user.controller";
import { getProducts } from "../controllers/product.controller";
const router = express.Router();
const userRouter = require("./user.router");
const categoryRouter = require("./category.router");
// const productRouter = require("./product.router");
const addressRouter = require("./address.router");
const cartRouter = require("./cart.router");

router.use("/public/user", userRouter);
router.use("/public/category", categoryRouter);
router.get("/public/product", getProducts);

router.use([protectedRoute]);
router.get("/secured/user", getOneUser);
// router.use("/secured/product", productRouter);
router.put("/secured/user", updateUser);
router.use("/secured/address", addressRouter);
router.use("/secured/cart", cartRouter);

export default router;