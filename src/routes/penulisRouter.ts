import { Router } from "express";
import { getAllPenulis, getPenulisById, createPenulis, deletePenulis, updatePenulis } from "../controllers/penulisController";

const router = Router();

router.get('/', getAllPenulis);
router.get('/:id', getPenulisById);
router.post('/', createPenulis);
router.delete('/:id', deletePenulis);
router.put('/:id', updatePenulis);

export default router