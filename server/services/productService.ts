import { Product } from "../../shared/types/product.js";

// Mock 数据，后续可以替换为数据库查询
const mockProducts: Product[] = [
  {
    id: "single-shaft",
    name: "Single Shaft Shredder Blades",
    description: "High-performance single shaft shredder blades",
    category: "single-shaft",
    image:
      "https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=800&q=80",
  },
  {
    id: "metal",
    name: "Metal Shredder Blades",
    description: "Heavy-duty metal recycling blades",
    category: "metal",
    image:
      "https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=800&q=80",
  },
  {
    id: "plastic",
    name: "Plastic Shredder Blades",
    description: "Specialized plastic recycling blades",
    category: "plastic",
    image:
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&q=80",
  },
];

export const getAllProducts = async (): Promise<Product[]> => {
  return mockProducts;
};

export const getProductById = async (
  id: string
): Promise<Product | undefined> => {
  return mockProducts.find(p => p.id === id);
};
