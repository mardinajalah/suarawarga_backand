import { Request, Response } from 'express';
import { getAllDataPenulis, getDataPenulisById, createDataPenulis, deleteDataPenulis, updateDataPenulis } from '../models/penulisModel';
import z from 'zod';

const penulisSchema = z.object({
  id_user: z.number().min(1),
  krator: z.string().min(1),
});

export const getAllPenulis = async (req: Request, res: Response) => {
  try {
    const penulis = await getAllDataPenulis();

    if (!penulis || penulis.length === 0) {
      res.status(404).json({
        status: false,
        message: 'tidak ada data penulis',
        data: [],
      });
      return;
    }

    res.status(200).json({
      status: true,
      message: 'berhasil mengambil data',
      data: penulis,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'data gagal diambil',
      data: null,
    });
  }
};

export const getPenulisById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const penulis = await getDataPenulisById(Number(id));

    if (!penulis) {
      res.status(400).json({
        status: false,
        message: 'data ini tadak ada',
        data: {},
      });
      return;
    }

    res.status(200).json({
      status: true,
      message: 'berhasil mengambil data',
      data: penulis,
    });
  } catch (error) {
    res.status(200).json({
      status: false,
      message: 'gagal mengambil data',
      data: null,
    });
  }
};

export const createPenulis = async (req: Request, res: Response) => {
  try {
    const parsed = penulisSchema.parse(req.body);

    const dataToCreate = {
      krator: parsed.krator,
      user: {
        connect: { id: parsed.id_user },
      },
    };

    const penulis = await createDataPenulis(dataToCreate);

    res.status(200).json({
      status: true,
      message: 'berhasil menambahkan data',
      data: penulis,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'gagal menambahkan data',
      data: null,
    });
  }
};

export const deletePenulis = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const penulis = await deleteDataPenulis(Number(id));

    if (!penulis) {
      res.status(400).json({
        status: false,
        message: 'data ini tadak ada',
        data: {},
      });
      return;
    }

    res.status(200).json({
      status: false,
      message: 'berhasil mengahpus data',
      data: penulis,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'gagal mengahpus data',
      data: null,
    });
  }
};

export const updatePenulis = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const parsed = penulisSchema.parse(req.body);

    const dataToCreate = {
      krator: parsed.krator,
      user: {
        connect: { id: parsed.id_user },
      },
    };

    const penulis = await updateDataPenulis(Number(id), dataToCreate);

    if (!penulis) {
      res.status(400).json({
        status: false,
        message: 'data ini tadak ada',
        data: {},
      });
      return;
    }

    res.status(200).json({
      status: false,
      message: 'berhasil mengubah data',
      data: penulis,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'gagal mengubah data',
      data: null,
    });
  }
};
