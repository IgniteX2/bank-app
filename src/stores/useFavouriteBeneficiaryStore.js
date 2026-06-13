import { create } from "zustand";
import { getFavouriteBeneficiaries } from "../services/beneficiaryService";

export const useFavouriteBeneficiaryStore = create((set) => ({
  favouriteBeneficiaries: [],
  loadingFavorite: false,
  error: null,

  getFavouriteBeneficiariesAction: async () => {
    try {
      set({
        loadingFavorite: true,
        error: null,
      });

      const response = await getFavouriteBeneficiaries();

      set({
        favouriteBeneficiaries: response.data,
        loadingFavorite: false,
      });

      return response.data;
    } catch (error) {
      set({
        loadingFavorite: false,
        error:
          error?.response?.data?.message ||
          "Failed to fetch favourite beneficiaries",
      });

      throw error;
    }
  },

  reset: () =>
    set({
      favouriteBeneficiaries: [],
      loadingFavorite: false,
      error: null,
    }),
}));
