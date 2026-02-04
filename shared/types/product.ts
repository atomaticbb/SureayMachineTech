export type ProductCategory = "single-shaft" | "metal" | "plastic" | "other";

export interface ProductSpecs {
  dimensions?: string;
  material?: string;
  hardness?: string;
  weight?: string;
  [key: string]: any;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: ProductCategory;
  image: string;
  specs?: ProductSpecs;
  features?: string[];
  applications?: string[];
}
