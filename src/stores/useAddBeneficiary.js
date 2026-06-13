import { create } from "zustand";
import { addBeneficiary } from "../services/beneficiaryService";

export const useBeneficiaryStore = create((set) => ({
  loadingAddBeneficiary: false,
  success: false,
  error: null,

  addBeneficiaryAction: async (payload) => {
    try {
      set({
        loadingAddBeneficiary: true,
        success: false,
        error: null,
      });

      const response = await addBeneficiary(payload);

      set({
        loadingAddBeneficiary: false,
        success: true,
      });

      return response.data;
    } catch (error) {
      set({
        loadingAddBeneficiary: false,
        success: false,
        error: error?.response?.data?.message || "Failed to add beneficiary",
      });

      throw error;
    }
  },

  reset: () =>
    set({
      loadingAddBeneficiary: false,
      success: false,
      error: null,
    }),
}));
