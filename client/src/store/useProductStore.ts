import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "axios";
import { toast } from "sonner";

const API_END_POINT = "http://localhost:8002/api/v2/product";
axios.defaults.withCredentials = true;

type Product = {
  _id: string;
  name: string;
  description?: string;
  price: number;
  features?: string[];
  shop: string;
  category: string;
  image?: string;
};

type ProductState = {
  products: Product[];
  productById: Product | null;
  compareList: Product[];
  loading: boolean;
  getProducts: () => Promise<void>;
  getProductById: (id: string) => Promise<void>;
  createProduct: (data: Omit<Product, "_id">) => Promise<void>;
  updateProduct: (id: string, data: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  compareProducts: (ids: string[]) => Promise<void>;
  filterProducts: (params: { shop?: string; category?: string }) => Promise<void>;
};

export const useProductStore = create<ProductState>()(
  persist(
    (set) => ({
      products: [],
      productById: null,
      compareList: [],
      loading: false,

      // Get all products
      getProducts: async () => {
        try {
          set({ loading: true });
          const res = await axios.get(API_END_POINT);
          if (res.data.success) set({ products: res.data.products, loading: false });
        } catch (err: any) {
          toast.error(err.response?.data?.message || "Failed to fetch products");
          set({ loading: false });
        }
      },

      // Get product by ID
      getProductById: async (id) => {
        try {
          set({ loading: true });
          const res = await axios.get(`${API_END_POINT}/${id}`);
          if (res.data.success) {
            set({ productById: res.data.product, loading: false });
          }
        } catch (err: any) {
          toast.error(err.response?.data?.message || "Failed to fetch product");
          set({ loading: false });
        }
      },

      // Create product
      createProduct: async (data) => {
        try {
          set({ loading: true });
          const res = await axios.post(API_END_POINT, data);
          if (res.data.success) {
            toast.success("Product created");
            set((state) => ({ products: [...state.products, res.data.product], loading: false }));
          }
        } catch (err: any) {
          toast.error(err.response?.data?.message || "Failed to create product");
          set({ loading: false });
        }
      },

      // Update product
      updateProduct: async (id, data) => {
        try {
          set({ loading: true });
          const res = await axios.put(`${API_END_POINT}/${id}`, data);
          if (res.data.success) {
            toast.success("Product updated");
            set((state) => ({
              products: state.products.map((p) => p._id === id ? res.data.product : p),
              loading: false
            }));
          }
        } catch (err: any) {
          toast.error(err.response?.data?.message || "Failed to update product");
          set({ loading: false });
        }
      },

      // Delete product
      deleteProduct: async (id) => {
        try {
          set({ loading: true });
          const res = await axios.delete(`${API_END_POINT}/${id}`);
          if (res.data.success) {
            toast.success("Product deleted");
            set((state) => ({
              products: state.products.filter((p) => p._id !== id),
              loading: false
            }));
          }
        } catch (err: any) {
          toast.error(err.response?.data?.message || "Failed to delete product");
          set({ loading: false });
        }
      },

      // Compare products
      compareProducts: async (ids) => {
        try {
          set({ loading: true });
          const res = await axios.post(`${API_END_POINT}/compare`, { ids });
          if (res.data.success) {
            set({ compareList: res.data.products, loading: false });
          }
        } catch (err: any) {
          toast.error(err.response?.data?.message || "Failed to compare products");
          set({ loading: false });
        }
      },

      // Filter products
      filterProducts: async ({ shop, category }) => {
        try {
          set({ loading: true });
          const params = [];
          if (shop) params.push(`shop=${shop}`);
          if (category) params.push(`category=${category}`);
          const res = await axios.get(`${API_END_POINT}/filter${params.length ? "?" + params.join("&") : ""}`);
          if (res.data.success) {
            set({ products: res.data.products, loading: false });
          }
        } catch (err: any) {
          toast.error(err.response?.data?.message || "Failed to filter products");
          set({ loading: false });
        }
      }
    }),
    { name: "product-store", storage: createJSONStorage(() => localStorage) }
  )
);
