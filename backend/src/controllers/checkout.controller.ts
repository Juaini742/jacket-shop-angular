import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY as string);

export const checkout = async (req: Request, res: Response): Promise<void> => {
  try {
    const { products } = req.body;

    const { id } = (req as any).User;

    if (!Array.isArray(products)) {
      res.status(400).json({ error: "Products must be an array" });
      return;
    }

    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const lineItems: any[] = products.map((product: any) => ({
      price_data: {
        currency: "USD",
        product_data: {
          name: product.product.name,
          images: [product.product.image],
        },
        unit_amount: product.product.price * 100,
      },
      quantity: product.quantity,
    }));

    console.log(lineItems);

    console.log(user);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:4200/success",
      cancel_url: "http://localhost:4200/",
      customer_email: user?.email,
      client_reference_id: user?.id,
      metadata: {
        name: user?.username,
        phone: user?.phone,
      },
    });

    res.json({ id: session.id });
  } catch (error) {
    res.status(500).json({ error: error, msg: "internal server error" });
  }
};
