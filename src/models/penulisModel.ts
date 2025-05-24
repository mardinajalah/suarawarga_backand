import { Prisma } from "@prisma/client";
import prisma from "../config/db";


export const getAllDataPenulis = async () => {
  return await prisma.penulis.findMany();
};

export const getDataPenulisById = async (id: number) => {
  return await prisma.penulis.findUnique({
    where: { id }
  })
}

export const createDataPenulis = async (newData: Prisma.PenulisCreateInput) => {
  return await prisma.penulis.create({
    data: newData
  })
}

export const deleteDataPenulis = async (id: number) => {
  return await prisma.penulis.delete({
    where: { id }
  })
}

export const updateDataPenulis = async (id: number, newData: Prisma.PenulisCreateInput) => {
  return await prisma.penulis.update({
    where: { id },
    data: newData
  })
}