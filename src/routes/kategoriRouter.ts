import { Router } from 'express';
import { getAllKategori, getKategoriById, createKategori, deleteKategori, updateKategori } from '../controllers/kategoriController';

const router = Router();

router.get('/', getAllKategori);
router.get('/:id', getKategoriById);
router.post('/', createKategori);
router.delete('/:id', deleteKategori);
router.put('/:id', updateKategori);

export default router;