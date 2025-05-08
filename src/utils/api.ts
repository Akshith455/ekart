
import axios from 'axios';

export const API_URL = 'https://fakestoreapi.com';

export const formatPrice = (price: number): string => {
  return `₹${(price * 83).toFixed(2)}`;
};

export const api = axios.create({
  baseURL: API_URL
});

export const fetchProducts = async () => {
  const response = await api.get('/products');
  return response.data;
};

export const fetchProductById = async (id: string | undefined) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const fetchCategories = async () => {
  const response = await api.get('/products/categories');
  return response.data;
};

export const fetchProductsByCategory = async (category: string) => {
  const response = await api.get(`/products/category/${category}`);
  return response.data;
};
