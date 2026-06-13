import { create } from "zustand";
import { addFavouriteBeneficiary } from "../services/beneficiaryService";

export const useAddFavouriteBeneficiaryStore = create((set) => ({
  loadingFavourite: false,
  error: null,

  addFavouriteBeneficiaryAction: async (id) => {
    try {
      set({
        loadingFavourite: true,
        error: null,
      });

      const response = await addFavouriteBeneficiary(id);

      set({
        loadingFavourite: false,
      });

      return response.data;
    } catch (error) {
      set({
        loadingFavourite: false,
        error:
          error?.response?.data?.message ||
          "Failed to add favourite beneficiary",
      });

      throw error;
    }
  },
}));
