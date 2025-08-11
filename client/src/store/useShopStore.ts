import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "axios";
import { toast } from "sonner";

const API_END_POINT = "http://localhost:8002/api/v2/shop";
axios.defaults.withCredentials = true;

type Shop = {
  _id: string;
  name: string;
  owner: string; // could be ObjectId or populated User
  category: string;
  floor: string;
  description?: string;
  address: string;
  contact: string;
  image?: string;
};

type ShopState = {
  shops: Shop[];
  shopById: Shop | null;
  loading: boolean;
  getShops: () => Promise<void>;
  getShopById: (id: string) => Promise<void>;
  createShop: (data: Omit<Shop, "_id">) => Promise<void>;
  updateShop: (id: string, data: Partial<Shop>) => Promise<void>;
  deleteShop: (id: string) => Promise<void>;
};

export const useShopStore = create<ShopState>()(
  persist(
    (set) => ({
      shops: [],
      shopById: null,
      loading: false,

      // Get all shops
      getShops: async () => {
        try {
          set({ loading: true });
          const res = await axios.get(API_END_POINT);
          if (res.data.success) set({ shops: res.data.shops, loading: false });
        } catch (err: any) {
          toast.error(err.response?.data?.message || "Failed to fetch shops");
          set({ loading: false });
        }
      },

      // Get shop by ID
      getShopById: async (id) => {
        try {
          set({ loading: true });
          const res = await axios.get(`${API_END_POINT}/${id}`);
          if (res.data.success) {
            set({ shopById: res.data.shop, loading: false });
          }
        } catch (err: any) {
          toast.error(err.response?.data?.message || "Failed to fetch shop");
          set({ loading: false });
        }
      },

      // Create shop
      createShop: async (data) => {
        try {
          set({ loading: true });
          const res = await axios.post(API_END_POINT, data);
          if (res.data.success) {
            toast.success("Shop created");
            set((state) => ({
              shops: [...state.shops, res.data.shop],
              loading: false
            }));
          }
        } catch (err: any) {
          toast.error(err.response?.data?.message || "Failed to create shop");
          set({ loading: false });
        }
      },

      // Update shop
      updateShop: async (id, data) => {
        try {
          set({ loading: true });
          const res = await axios.put(`${API_END_POINT}/${id}`, data);
          if (res.data.success) {
            toast.success("Shop updated");
            set((state) => ({
              shops: state.shops.map((s) => s._id === id ? res.data.shop : s),
              loading: false
            }));
          }
        } catch (err: any) {
          toast.error(err.response?.data?.message || "Failed to update shop");
          set({ loading: false });
        }
      },

      // Delete shop
      deleteShop: async (id) => {
        try {
          set({ loading: true });
          const res = await axios.delete(`${API_END_POINT}/${id}`);
          if (res.data.success) {
            toast.success("Shop deleted");
            set((state) => ({
              shops: state.shops.filter((s) => s._id !== id),
              loading: false
            }));
          }
        } catch (err: any) {
          toast.error(err.response?.data?.message || "Failed to delete shop");
          set({ loading: false });
        }
      }
    }),
    { name: "shop-store", storage: createJSONStorage(() => localStorage) }
  )
);
