import express from "express";
import { login, register } from "../controllers/user.controller";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

module.exports = router;
