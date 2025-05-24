import prisma from '../config/db';

enum RoleType {
  user = 'USER',
  admin = 'ADMIN',
}

export default interface ReqBodyType {
  nama: string;
  username: string;
  email: string;
  password: string;
  role?: RoleType;
}

export const getAllDataUser = async () => {
  try {
    const data = await prisma.user.findMany();
    return data;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getDataUserById = async (id: number) => {
  try {
    const data = await prisma.user.findUnique({
      where: { id },
    });
    return data;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const createDataUser = async (newData: ReqBodyType) => {
  try {
    const data = await prisma.user.create({
      data: newData,
    });
    return data;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const deleteDataUser = async (id: number) => {
  try {
    const data = await prisma.user.delete({
      where: { id },
    });
    return data;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const updateDataUser = async (id: number, newData: ReqBodyType) => {
  try {
    const data = await prisma.user.update({
      where: { id },
      data: newData,
    });

    return data
  } catch (err) {
    console.log(err);
    return false;
  }
};
