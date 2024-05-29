import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      res.status(400).json({ message: "some credential is missing" });
      return;
    }

    const userData = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (userData) {
      res.status(400).json({ message: "Email already in use" });
      return;
    }

    const salt = bcrypt.genSaltSync(8);
    const hashingPassword = bcrypt.hashSync(password, salt);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashingPassword,
      },
    });

    await prisma.address.create({
      data: {
        user_id: user.id,
        prov: "",
        regency: "",
        subdistrict: "",
        district: "",
        completeAddress: "",
      },
    });

    const token = jwt.sign({ userId: user.id }, "secret", {
      expiresIn: "1d",
    });

    res.cookie("tokenID", token, {
      httpOnly: true,
      secure: true,
      maxAge: 86400000,
    });

    res.status(200).json({ message: "success" });
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "some credential is missing" });
      return;
    }

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      res.status(400).json({ message: "User not found" });
      return;
    }

    const passwordCompare = bcrypt.compareSync(password, user.id);

    if (passwordCompare) {
      res.status(400).json({ message: "Something going wrong" });
      return;
    }

    const token = jwt.sign({ userId: user.id }, "secret", {
      expiresIn: "1d",
    });

    res.cookie("tokenID", token, {
      httpOnly: true,
      secure: true,
      maxAge: 86400000,
    });

    res.status(200).json({ message: "success" });
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
};

export const getOneUser = async (req: Request, res: Response) => {
  try {
    const { id } = (req as any).User;

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        username: true,
        email: true,
        gender: true,
        born: true,
        job: true,
        phone: true,
        createdAt: true,
      },
    });

    if (!user) {
      res.status(404).json({ error: "User is not found" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = (req as any).User;

    const { username, born, gender, job, phone } = req.body;

    if (!username || !born || !gender || !job || !phone) {
      res.status(400).json({ message: "Some credentials is missing" });
      return;
    }

    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        username,
        born,
        gender,
        job,
        phone,
      },
      select: {
        id: true,
        username: true,
        email: true,
        born: true,
        gender: true,
        phone: true,
        job: true,
      },
    });

    res.status(200).json({ message: "success", user });
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Internal Server Error");
  }
};

export const logout = (_req: Request, res: Response) => {
  res.cookie("tokenID", "", {
    expires: new Date(0),
  });

  res.status(200).json({ message: "Success" });
};
