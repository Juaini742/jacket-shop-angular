import { PrismaClient } from "@prisma/client";
const dataMap = require("./db.json");
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL_PRODUCTION,
    },
  },
});

async function main() {
  // Create all categories and store their IDs
  const createdCategories = await Promise.all(
    dataMap.categories.map(async (category: any) => {
      return await prisma.category.create({
        data: category,
      });
    })
  );

  const categoryIds = createdCategories.map((category) => category.id);

  for (const product of dataMap.products) {
    const randomCategoryId =
      categoryIds[Math.floor(Math.random() * categoryIds.length)];
    const productData = await prisma.product.create({
      data: {
        ...product,
        category_id: randomCategoryId,
      },
    });

    for (const size of dataMap.sizes) {
      await prisma.size_Product.create({
        data: {
          name: size,
          productId: productData.id,
        },
      });
    }

    for (const color of dataMap.colors) {
      await prisma.color_Product.create({
        data: {
          name: color,
          productId: productData.id,
        },
      });
    }
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
