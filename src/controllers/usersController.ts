import { Request, Response } from 'express';
import { createDataUser, deleteDataUser, getAllDataUser, getDataUserById, updateDataUser } from '../models/userModel';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

const userSchema = z.object({
  nama: z.string().min(1),
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['ADMIN', 'USER']).optional()
});

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const user = await getAllDataUser();

    if (!user || user.length === 0) {
      res.status(404).json({
        status: false,
        message: 'tidak ada data user',
        data: [],
      });
      return;
    }

    res.status(200).json({
      status: true,
      message: 'berhasil mengambil data',
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'data gagal diambil',
      data: null,
    });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await getDataUserById(Number(id));

    if (!user) {
      res.status(400).json({
        status: false,
        message: 'data ini tidak di temukan',
        data: {},
      });
      return;
    }

    res.status(200).json({
      status: true,
      message: 'berhasil mengambil data',
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'data gagal diambil',
      data: null,
    });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const parsed = userSchema.parse(req.body);
    const hashedPassword = await bcrypt.hash(parsed.password, 10);
    const userToSave = {
      ...parsed,
      password: hashedPassword,
    };
    const user = await createDataUser(userToSave);

    res.status(200).json({
      status: true,
      message: 'data berhasil ditambahkan',
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'data gagal ditambahkan',
      data: null,
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await deleteDataUser(Number(id));

    if (!user) {
      res.status(400).json({
        status: false,
        message: 'data ini tidak ada',
        data: [],
      });
      return;
    }

    res.status(200).json({
      status: true,
      message: 'berhasil menghapus data',
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'data gagal dihapus',
      data: null,
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const parsedData = userSchema.parse(req.body);

    let updatedData = { ...parsedData };

    if (parsedData.password && parsedData.password.trim() !== '') {
      const hashedPassword = await bcrypt.hash(parsedData.password, 10);
      updatedData.password = hashedPassword;
    }

    const user = await updateDataUser(Number(id), updatedData);
    
    if (!user) {
      res.status(400).json({
        status: false,
        message: 'data ini tidak ada',
        data: [],
      });
      return;
    }

    res.status(200).json({
      status: true,
      message: 'berhasil mengubah data',
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: 'data gagal diubah',
      data: null,
    });
  }
};
