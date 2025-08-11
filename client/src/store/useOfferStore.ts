import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "axios";
import { toast } from "sonner";

const API_END_POINT = "http://localhost:8002/api/v2/offer";
axios.defaults.withCredentials = true;
type Offer = {
  _id: string;
  title: string;
  description?: string;
  discountPercentage: number;
  startDate: string;
  endDate: string;
  shop: string;
};

type OfferState = {
  offers: Offer[];
  shopOffers: Offer[];
  loading: boolean;
  getOffers: () => Promise<void>;
  getOffersByShop: (shopId: string) => Promise<void>;
  createOffer: (data: Omit<Offer, "_id">) => Promise<void>;
  updateOffer: (id: string, data: Partial<Offer>) => Promise<void>;
  deleteOffer: (id: string) => Promise<void>;
};

export const useOfferStore = create<OfferState>()(
  persist(
    (set) => ({
      offers: [],
      shopOffers: [],
      loading: false,
      getOffers: async () => {
        try {
          set({ loading: true });
          const res = await axios.get(API_END_POINT);
          if (res.data.success) set({ offers: res.data.offers, loading: false });
        } catch (err: any) {
          toast.error(err.response?.data?.message || "Failed to fetch offers");
          set({ loading: false });
        }
      },
      getOffersByShop: async (shopId) => {
        try {
          set({ loading: true });
          const res = await axios.get(`${API_END_POINT}/shop/${shopId}`);
          if (res.data.success) set({ shopOffers: res.data.offers, loading: false });
        } catch (err: any) {
          toast.error(err.response?.data?.message || "Failed to fetch shop offers");
          set({ loading: false });
        }
      },
      createOffer: async (data) => {
        try {
          set({ loading: true });
          const res = await axios.post(API_END_POINT, data);
          if (res.data.success) {
            toast.success("Offer created");
            set((state) => ({ offers: [...state.offers, res.data.offer], loading: false }));
          }
        } catch (err: any) {
          toast.error(err.response?.data?.message || "Failed to create offer");
          set({ loading: false });
        }
      },
      updateOffer: async (id, data) => {
        try {
          set({ loading: true });
          const res = await axios.put(`${API_END_POINT}/${id}`, data);
          if (res.data.success) {
            toast.success("Offer updated");
            set((state) => ({
              offers: state.offers.map((o) => o._id === id ? res.data.offer : o),
              loading: false
            }));
          }
        } catch (err: any) {
          toast.error(err.response?.data?.message || "Failed to update offer");
          set({ loading: false });
        }
      },
      deleteOffer: async (id) => {
        try {
          set({ loading: true });
          const res = await axios.delete(`${API_END_POINT}/${id}`);
          if (res.data.success) {
            toast.success("Offer deleted");
            set((state) => ({
              offers: state.offers.filter((o) => o._id !== id),
              loading: false
            }));
          }
        } catch (err: any) {
          toast.error(err.response?.data?.message || "Failed to delete offer");
          set({ loading: false });
        }
      }
    }),
    { name: "offer-store", storage: createJSONStorage(() => localStorage) }
  )
);
