import api from "@/lib/api";
import { create } from "zustand";

interface InsightState {
  data: any;
  loading: boolean;
  fetchInsights: () => Promise<void>;
}

export const useInsightsStore = create<InsightState>((set) => ({
  data: null,
  loading: false,

  fetchInsights: async () => {
    set({ loading: true });

    const res = await api.get("/insights");

    set({
      data: res.data,
      loading: false,
    });
  },
}));
