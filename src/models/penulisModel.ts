import prisma from "../config/db";

export const getAllDataPenulis = async () => {
  try {
    const data = await prisma.penulis.findMany()
    return data
  } catch {
    return false
  }
}