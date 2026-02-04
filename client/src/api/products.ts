import { apiClient } from './client';
import type { Product, ApiResponse } from '@shared/types';

/**
 * 获取所有产品
 */
export const getProducts = async (): Promise<Product[]> => {
  const response = await apiClient.get<ApiResponse<Product[]>>('/products');
  return response.data.data || [];
};

/**
 * 根据 ID 获取单个产品
 */
export const getProductById = async (id: string): Promise<Product | null> => {
  try {
    const response = await apiClient.get<ApiResponse<Product>>(`/products/${id}`);
    return response.data.data || null;
  } catch (error) {
    return null;
  }
};
