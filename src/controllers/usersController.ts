import { Request, Response } from 'express';
import { createDataUser, deleteDataUser, getAllDataUser, getDataUserById, updateDataUser } from '../models/userModel';
import ReqBodyType from '../models/userModel';
import bcrypt from 'bcryptjs';

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const user = await getAllDataUser();

    if (!user) {
      res.status(400).json({
        status: false,
        message: 'gagal mengambil data',
        data: 'not found',
      });
    }

    res.status(200).json({
      status: true,
      message: 'berhasil mengambil data',
      data: user,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: false,
      message: 'Terjadi kesalahan server',
      data: 'not found',
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
        message: 'gagal mengambil data',
        data: 'not found',
      });
    }

    res.status(200).json({
      status: true,
      message: 'berhasil mengambil data',
      data: user,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: false,
      message: 'Terjadi kesalahan server',
      data: 'not found',
    });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const newData: ReqBodyType = req.body;
  const { password } = newData;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userToSave = { ...newData, password: hashedPassword };
    const user = await createDataUser(userToSave);

    if (!user) {
      res.status(400).json({
        status: user,
        message: 'data gagal ditambahkan',
      });
    }

    res.status(201).json({
      status: true,
      message: 'data berhasil ditambahkan',
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: false,
      message: 'Terjadi kesalahan server',
      data: 'not found',
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
        message: 'gagal menghapus data',
        data: 'not found',
      });
    }

    res.status(200).json({
      status: true,
      message: 'berhasil menghapus data',
      data: user,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: false,
      message: 'Terjadi kesalahan server',
      data: 'not found',
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  let newData = req.body;

  try {
    if (newData.password && newData.password.trim() !== '') {
      const hashedPassword = await bcrypt.hash(newData.password, 10);
      newData = { ...newData, password: hashedPassword };
    } else {
      delete newData.password;
    }

    const user = await updateDataUser(Number(id), newData);
    if (!user) {
      res.status(400).json({
        status: false,
        message: 'gagal mengubah data',
        data: 'not found',
      });
    }

    res.status(201).json({
      status: true,
      message: 'berhasil mengubah data',
      data: user,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: false,
      message: 'Terjadi kesalahan server',
      data: 'not found',
    });
  }
};
