import { Request, Response } from "express";
import Stripe from "stripe";

// const stripe = require("stripe")(
//   "sk_test_51OpVNxF9OLaL2OugIFVNdqChUJn1XeZPpAsfK3dc8so7GfzYusVWQWSle8xea251IYC2riNAA1g0NIuPsXVis9eL00aa3ZGRc9"
// );

const stripe = new Stripe(
  "sk_test_51OpVNxF9OLaL2OugIFVNdqChUJn1XeZPpAsfK3dc8so7GfzYusVWQWSle8xea251IYC2riNAA1g0NIuPsXVis9eL00aa3ZGRc9"
);

export const checkout = async (req: Request, res: Response): Promise<void> => {
  try {
    const { products } = req.body;

    const { id } = (req as any).User;

    // const lineItems = products.map((product: any) => ({
    //   price_data: {
    //     currency: "IDR",
    //     product_data: {
    //       name: product.product.name,
    //       images: [product.product.image],
    //     },
    //     unit_amount: product.product.price * 10000,
    //   },
    //   quantity: product.quantity,
    // }));

    // const productId = products.map((item: any) => item.id);

    // console.log(lineItems);

    // const session = await stripe.checkout.sessions.create({
    //   payment_method_types: ["card"],
    //   line_items: lineItems,
    //   mode: "payment",
    //   success_url: "http://localhost:4200/",
    //   cancel_url: "http://localhost:4200/",
    // });

    const productID = products.id;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 139,
      currency: "gbp",
      metadata: {
        productID,
        userId: id,
      },
    });

    res.status(200).json(paymentIntent);
  } catch (error) {
    res.status(500).json({ error: error, msg: "internal server error" });
  }
};
