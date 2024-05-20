import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getCartItemByUser = async (req: Request, res: Response) => {
  try {
    const { id } = (req as any).User;

    const carts = await prisma.cart.findMany({
      where: {
        user_id: id,
      },
      include: {
        product: true,
      },
    });

    res.status(200).json(carts);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Internal Server Error");
  }
};

export const addCartItem = async (req: Request, res: Response) => {
  try {
    const { id } = (req as any).User;

    const { quantity, product_id } = req.body;

    if (!quantity || !product_id) {
      res.status(400).json({ message: "Some credentials is missing" });
      return;
    }

    const cartProductId = await prisma.cart.findFirst({
      where: {
        product_id,
      },
    });

    if (cartProductId) {
      res.status(400).json({ message: "Your product already saved" });
      return;
    }

    const cart = await prisma.cart.create({
      data: {
        user_id: id,
        quantity,
        product_id,
      },
    });

    res.status(200).json({ message: "success", cart });
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Internal Server Error");
  }
};

export const updateCartItem = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    if (!id) {
      res.status(400).json({ message: "Some credentials is missing" });
      return;
    }

    const { quantity } = req.body;

    if (!quantity) {
      res.status(400).json({ message: "Some credentials is missing" });
      return;
    }

    const cart = await prisma.cart.update({
      where: {
        id,
      },
      data: {
        quantity,
      },
    });

    res.status(200).json(cart);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Internal Server Error");
  }
};

export const deleteCartItem = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    if (!id) {
      res.status(400).json({ message: "Some credentials is missing" });
      return;
    }

    const cart = await prisma.cart.delete({
      where: {
        id,
      },
    });

    res.status(200).json(cart);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Internal Server Error");
  }
};
