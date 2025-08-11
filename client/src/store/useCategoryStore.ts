import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "axios";
import { toast } from "sonner";

const API_END_POINT = "http://localhost:8002/api/v2/category";
axios.defaults.withCredentials = true;
type Category = {
  _id: string;
  name: string;
  description?: string;
};

type CategoryState = {
  categories: Category[];
  loading: boolean;
  getCategories: () => Promise<void>;
  createCategory: (data: Omit<Category, "_id">) => Promise<void>;
  updateCategory: (id: string, data: Partial<Category>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
};

export const useCategoryStore = create<CategoryState>()(
  persist(
    (set) => ({
      categories: [],
      loading: false,

      getCategories: async () => {
        try {
          set({ loading: true });
          const res = await axios.get(API_END_POINT);
          if (res.data.success) {
            set({ categories: res.data.categories, loading: false });
          }
        } catch (err: any) {
          toast.error(err.response?.data?.message || "Failed to fetch categories");
          set({ loading: false });
        }
      },

      createCategory: async (data) => {
        try {
          set({ loading: true });
          const res = await axios.post(API_END_POINT, data);
          if (res.data.success) {
            toast.success(res.data.message || "Category created");
            set((state) => ({
              categories: [...state.categories, res.data.category],
              loading: false,
            }));
          }
        } catch (err: any) {
          toast.error(err.response?.data?.message || "Failed to create category");
          set({ loading: false });
        }
      },

      updateCategory: async (id, data) => {
        try {
          set({ loading: true });
          const res = await axios.put(`${API_END_POINT}/${id}`, data);
          if (res.data.success) {
            toast.success(res.data.message || "Category updated");
            set((state) => ({
              categories: state.categories.map((cat) =>
                cat._id === id ? res.data.category : cat
              ),
              loading: false,
            }));
          }
        } catch (err: any) {
          toast.error(err.response?.data?.message || "Failed to update category");
          set({ loading: false });
        }
      },

      deleteCategory: async (id) => {
        try {
          set({ loading: true });
          const res = await axios.delete(`${API_END_POINT}/${id}`);
          if (res.data.success) {
            toast.success(res.data.message || "Category deleted");
            set((state) => ({
              categories: state.categories.filter((cat) => cat._id !== id),
              loading: false,
            }));
          }
        } catch (err: any) {
          toast.error(err.response?.data?.message || "Failed to delete category");
          set({ loading: false });
        }
      },
    }),
    {
      name: "category-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
