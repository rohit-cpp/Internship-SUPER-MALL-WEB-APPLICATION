import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "axios";
import { toast } from "sonner";

const API_END_POINT = "http://localhost:8002/api/v2/floor";
axios.defaults.withCredentials = true;
type Floor = { _id: string; floorNumber: number; description?: string };

type FloorState = {
  floors: Floor[];
  loading: boolean;
  getFloors: () => Promise<void>;
  createFloor: (data: Omit<Floor, "_id">) => Promise<void>;
  updateFloor: (id: string, data: Partial<Floor>) => Promise<void>;
  deleteFloor: (id: string) => Promise<void>;
};

export const useFloorStore = create<FloorState>()(
  persist(
    (set) => ({
      floors: [],
      loading: false,

      getFloors: async () => {
        try {
          set({ loading: true });
          const res = await axios.get(API_END_POINT);
          if (res.data.success) {
            set({ floors: res.data.floors, loading: false });
          }
        } catch (err: any) {
          toast.error(err.response?.data?.message || "Failed to fetch floors");
          set({ loading: false });
        }
      },

      createFloor: async (data) => {
        try {
          set({ loading: true });
          const res = await axios.post(API_END_POINT, data);
          if (res.data.success) {
            toast.success(res.data.message || "Floor created");
            set((state) => ({
              floors: [...state.floors, res.data.floor],
              loading: false,
            }));
          }
        } catch (err: any) {
          toast.error(err.response?.data?.message || "Failed to create floor");
          set({ loading: false });
        }
      },

      updateFloor: async (id, data) => {
        try {
          set({ loading: true });
          const res = await axios.put(`${API_END_POINT}/${id}`, data);
          if (res.data.success) {
            toast.success(res.data.message || "Floor updated");
            set((state) => ({
              floors: state.floors.map((f) =>
                f._id === id ? res.data.floor : f
              ),
              loading: false,
            }));
          }
        } catch (err: any) {
          toast.error(err.response?.data?.message || "Failed to update floor");
          set({ loading: false });
        }
      },

      deleteFloor: async (id) => {
        try {
          set({ loading: true });
          const res = await axios.delete(`${API_END_POINT}/${id}`);
          if (res.data.success) {
            toast.success(res.data.message || "Floor deleted");
            set((state) => ({
              floors: state.floors.filter((f) => f._id !== id),
              loading: false,
            }));
          }
        } catch (err: any) {
          toast.error(err.response?.data?.message || "Failed to delete floor");
          set({ loading: false });
        }
      },
    }),
    {
      name: "floor-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
