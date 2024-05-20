import express from "express";
import {
  addAddress,
  getAddressByUser,
  updateAddress,
} from "../controllers/address.controller";

const router = express.Router();

router.post("/", addAddress);
router.put("/:id", updateAddress);
router.get("/", getAddressByUser);

module.exports = router;
