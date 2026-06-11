import { create } from "zustand";
import { toast } from "react-toastify";
import { createPin } from "../services/transactionService";
import { useUserStore } from "./useUserStore";

export const usePinStore = create((set) => ({
  isLoadingCreation: false,

  createTransactionPin: async (pin, confirmpin) => {
    try {
      set({ isLoadingCreation: true });

      const response = await createPin(pin, confirmpin);

      await useUserStore.getState().fetchUser(true);

      toast.success("Transaction PIN created successfully");

      return response.data;
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to create transaction PIN",
      );

      throw error;
    } finally {
      set({ isLoadingCreation: false });
    }
  },
}));
