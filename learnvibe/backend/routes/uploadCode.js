import express from "express";
import { code } from "../controllers/CodeController.js";

const router = express.Router();

router.post("/uploadCode",code);

export default router;