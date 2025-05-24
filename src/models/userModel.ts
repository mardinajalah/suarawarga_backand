import { Prisma } from '@prisma/client';
import prisma from '../config/db';

export const getAllDataUser = async () => {
  return await prisma.user.findMany();
};

export const getDataUserById = async (id: number) => {
  return await prisma.user.findUnique({
    where: { id },
  });
};

export const createDataUser = async (newData: Prisma.UserCreateInput) => {
  return await prisma.user.create({
    data: newData,
  });
};

export const deleteDataUser = async (id: number) => {
  return await prisma.user.delete({
    where: { id },
  });
};

export const updateDataUser = async (id: number, newData: Prisma.UserCreateInput) => {
  return await prisma.user.update({
    where: { id },
    data: newData,
  });
};