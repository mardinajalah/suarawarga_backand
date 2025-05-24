import { Request, Response } from 'express';
import { getAllDataPenulis } from '../models/penulisModel';

export const getAllPenulis = async (req: Request, res: Response) => {
  try {
    const penulis = await getAllDataPenulis();

    if (!penulis) {
      res.status(400).json({
        status: false,
        message: 'gagal mengambil data',
        data: 'not found',
      });
    }

    res.status(200).json({
      status: true,
      message: 'berhasil mengambil data',
      data: penulis,
    });
  } catch {
    res.status(404).json({
      status: false,
      message: 'data gagal di ambil',
      data: null,
    });
  }
};
