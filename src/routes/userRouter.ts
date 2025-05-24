import { Router } from 'express';
import { createUser, deleteUser, getAllUser, getUserById, updateUser } from '../controllers/usersController';

const router = Router();

router.get('/', getAllUser);
router.get('/:id', getUserById);
router.post('/', createUser);
router.delete('/:id', deleteUser);
router.put('/:id', updateUser);

export default router;
