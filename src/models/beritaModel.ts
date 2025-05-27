import { Prisma } from "@prisma/client";
import prisma from "../config/db";

export const getAllDataBerita = async () => {
  return await prisma.berita.findMany();
};

export const getDataBeritaById = async (id: number) => {
  return await prisma.berita.findUnique({
    where: { id }
  });
};

export const createDataBerita = async (newData: Prisma.BeritaCreateInput) => {
  return await prisma.berita.create({
    data: newData
  });
};

export const deleteDataBerita = async (id: number) => {
  return await prisma.berita.delete({
    where: { id }
  });
};

export const updateDataBerita = async (id: number, newData: Prisma.BeritaCreateInput) => {
  return await prisma.berita.update({
    where: { id },
    data: newData
  });
};

