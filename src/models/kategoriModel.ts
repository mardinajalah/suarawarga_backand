import { Prisma } from "@prisma/client";
import prisma from "../config/db";

export const getAllDataKategori = async () => {
  return await prisma.kategori.findMany();
};

export const getDataKategoriById = async (id: number) => {
  return await prisma.kategori.findUnique({
    where: { id }
  });
};


export const createDataKategori = async (newData: Prisma.KategoriCreateInput) => {
  return await prisma.kategori.create({
    data: newData
  });
};

export const deleteDataKategori = async (id: number) => {
  return await prisma.kategori.delete({
    where: { id }
  });
};

export const updateDataKategori = async (id: number, newData: Prisma.KategoriCreateInput) => {
  return await prisma.kategori.update({
    where: { id },
    data: newData
  });
};