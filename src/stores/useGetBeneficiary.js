import { create } from "zustand";
import { getBeneficiaries } from "../services/beneficiaryService";

export const useGetBeneficiaryStore = create((set) => ({
  beneficiaryTransferData: [],
  loadingBeneficiaries: false,
  error: null,

  setBeneficiaryData: (data) =>
    set({
      beneficiaryTransferData: data,
    }),

  getBeneficiariesAction: async () => {
    try {
      set({
        loadingBeneficiaries: true,
        error: null,
      });

      const response = await getBeneficiaries();

      set({
        beneficiaryTransferData: response.data,
        loadingBeneficiaries: false,
      });
    } catch (error) {
      set({
        loadingBeneficiaries: false,
        error:
          error?.response?.data?.message || "Failed to fetch beneficiaries",
      });
    }
  },

  reset: () =>
    set({
      beneficiaryTransferData: [],
      loadingBeneficiaries: false,
      error: null,
    }),
}));
