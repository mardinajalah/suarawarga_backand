import { Router } from 'express';
import { getAllBerita, getBeritaById, createBerita } from '../controllers/beritaController';
import upload from '../middlewares/uploadFile';

const router = Router();

router.get('/', getAllBerita);
router.get('/:id', getBeritaById);
router.post('/', upload.single('gambar'), createBerita);

export default router;