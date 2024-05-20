import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const addAddress = async (req: Request, res: Response) => {
  try {
    const { id } = (req as any).User;

    const { prov, regency, subdistrict, district, completeAddress } = req.body;

    if (!prov || !regency || !subdistrict || !district || !completeAddress) {
      res.status(400).json({ message: "Some credentials is missing" });
      return;
    }

    const address = await prisma.address.create({
      data: {
        user_id: id,
        prov,
        regency,
        subdistrict,
        district,
        completeAddress,
      },
    });
    res.status(200).json({ message: "success", address });
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Internal Server Error");
  }
};

export const updateAddress = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const { prov, regency, subdistrict, district, completeAddress } = req.body;

    if (!prov || !regency || !subdistrict || !district || !completeAddress) {
      res.status(400).json({ message: "Some credentials is missing" });
      return;
    }

    const address = await prisma.address.update({
      where: {
        id,
      },
      data: {
        prov,
        regency,
        subdistrict,
        district,
        completeAddress,
      },
    });

    res.status(200).json(address);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Internal Server Error");
  }
};

export const getAddressByUser = async (req: Request, res: Response) => {
  try {
    const { id } = (req as any).User;

    const address = await prisma.address.findFirst({
      where: {
        user_id: id,
      },
      include: {
        user: {
          select: {
            email: true,
            username: true,
            gender: true,
            born: true,
            job: true,
            phone: true,
          },
        },
      },
    });

    if (!address) {
      res.status(400).json({ message: "Address data not found" });
      return;
    }

    res.status(200).json(address);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Internal Server Error");
  }
};
