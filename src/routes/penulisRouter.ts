import { Router } from "express";
import { getAllPenulis } from "../controllers/penulisController";

const router = Router();

router.get('/', getAllPenulis);

export default router