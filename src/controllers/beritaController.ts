import { Request, Response } from 'express';
import { getAllDataBerita, getDataBeritaById, createDataBerita, deleteDataBerita, updateDataBerita } from '../models/beritaModel';
import z from 'zod';
import { Prisma } from '@prisma/client';

const beritaSchema = z.object({
  id_kategori: z.string().transform(Number),
  id_penulis: z.string().transform(Number),
  judul: z.string().min(1),
  desc: z.string().min(1),
  konten: z.string().min(1),
  tanggal: z.string().min(1),
});

export const getAllBerita = async (req: Request, res: Response) => {
  try {
    const berita = await getAllDataBerita();

    if (!berita || berita.length === 0) {
      res.status(404).json({
        status: false,
        message: 'tidak ada data berita',
        data: [],
      });
      return;
    }

    res.status(200).json({
      status: true,
      message: 'berhasil mengambil data',
      data: berita,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'data gagal diambil',
      data: null,
    });
  }
};

export const getBeritaById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const berita = await getDataBeritaById(Number(id));

    if (!berita) {
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
      data: berita,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'gagal mengambil data',
      data: null,
    });
  }
};

export const createBerita = async (req: Request, res: Response) => {
  console.log('BODY:', req.body);
  console.log('FILE:', req.file);
  try {
    const parsedBody = beritaSchema.parse(req.body);

    if (!req.file) {
      res.status(400).json({ status: false, message: 'File gambar tidak ditemukan' });
      return;
    }

    const newData = {
      judul: parsedBody.judul,
      desc: parsedBody.desc,
      konten: parsedBody.konten,
      tanggal: parsedBody.tanggal,
      gambar: req.file.filename,
      kategori: {
        connect: { id: parsedBody.id_kategori },
      },
      penulis: {
        connect: { id: parsedBody.id_penulis },
      },
    };

    const berita = await createDataBerita(newData);

    res.status(201).json({
      status: true,
      message: 'Berhasil membuat berita',
      data: berita,
    });
  } catch (error: any) {
    res.status(500).json({
      status: false,
      message: 'Gagal membuat berita',
      data: null,
    });
  }
};
