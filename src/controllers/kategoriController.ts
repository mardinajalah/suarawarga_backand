import { Request, Response } from 'express';
import { getAllDataKategori, getDataKategoriById, createDataKategori, deleteDataKategori, updateDataKategori } from '../models/kategoriModel';
import z from 'zod';

const kategoriSchema = z.object({
  name: z.string().min(1),
});

export const getAllKategori = async (req: Request, res: Response) => {
  try {
    const kategori = await getAllDataKategori();

    if (!kategori || kategori.length === 0) {
      res.status(404).json({
        status: false,
        message: 'tidak ada data kategori',
        data: [],
      });
      return;
    }

    res.status(200).json({
      status: true,
      message: 'berhasil mengambil data',
      data: kategori,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'data gagal diambil',
      data: null,
    });
  }
};

export const getKategoriById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const kategori = await getDataKategoriById(Number(id));

    if (!kategori) {
      res.status(400).json({
        status: false,
        message: 'data ini tidak ditemukan',
        data: {},
      });
      return;
    }

    res.status(200).json({
      status: true,
      message: 'berhasil mengambil data',
      data: kategori,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'gagal mengambil data',
      data: null,
    });
  }
};

export const createKategori = async (req: Request, res: Response) => {
  try {
    const newData = kategoriSchema.parse(req.body);
    const kategori = await createDataKategori(newData);

    res.status(201).json({
      status: true,
      message: 'berhasil membuat data',
      data: kategori,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'gagal membuat data',
      data: null,
    });
  }
};

export const deleteKategori = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const kategori = await deleteDataKategori(Number(id));

    res.status(200).json({
      status: true,
      message: 'berhasil menghapus data',
      data: kategori,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'gagal menghapus data',
      data: null,
    });
  }
};

export const updateKategori = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const newData = kategoriSchema.parse(req.body);
    const kategori = await updateDataKategori(Number(id), newData);

    res.status(200).json({
      status: true,
      message: 'berhasil memperbarui data',
      data: kategori,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'gagal memperbarui data',
      data: null,
    });
  }
};