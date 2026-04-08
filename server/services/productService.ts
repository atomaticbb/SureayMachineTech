import { prisma } from "../db/client.js";
import type { Product } from "../../shared/types/product.js";

export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const products = await prisma.product.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
    });

    return products.map((p) => ({
      id: p.id,
      name: p.name,
      nameEn: p.name,
      slug: p.id,
      description: p.description,
      mainCategory: "blades" as const,
      subCategory: (p.category || "alloy-blades") as Product["subCategory"],
      image: p.image,
      specs: p.specs ? JSON.parse(p.specs) : undefined,
      applications: p.applications ? JSON.parse(p.applications) : undefined,
    }));
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
};

export const getProductById = async (
  id: string
): Promise<Product | undefined> => {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return undefined;
    }

    return {
      id: product.id,
      name: product.name,
      nameEn: product.name,
      slug: product.id,
      description: product.description,
      mainCategory: "blades" as const,
      subCategory: (product.category ||
        "alloy-blades") as Product["subCategory"],
      image: product.image,
      specs: product.specs ? JSON.parse(product.specs) : undefined,
      applications: product.applications
        ? JSON.parse(product.applications)
        : undefined,
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    throw new Error("Failed to fetch product");
  }
};
