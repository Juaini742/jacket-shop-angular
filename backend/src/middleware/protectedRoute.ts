import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const protectedRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies["tokenID"];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    let decodedToken;
    try {
      decodedToken = jwt.verify(token, "secret", {
        ignoreExpiration: false,
      }) as { userId?: string };
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        res.cookie("tokenID", "", { expires: new Date(0) });
        return res.status(401).json({ message: "Unauthorized: Token expired" });
      }
      throw error;
    }

    const user = await prisma.user.findUnique({
      where: {
        id: decodedToken.userId,
      },
    });

    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    (req as any).User = {
      id: user.id,
    };

    next();
  } catch (error) {
    return next(error);
  }
};
