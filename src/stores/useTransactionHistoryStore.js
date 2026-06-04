import { create } from "zustand";
import { toast } from "sonner";
import { getTransactionById } from "../services/transactionService";

export const useTransactionHistoryStore = create((set) => ({
  transactions: [],
  isLoading: false,
  error: null,

  fetchTransactions: async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      toast.error("User ID not found. Please log in again.");
      return;
    }
    try {
      set({
        isLoading: true,
        error: null,
      });

      const response = await getTransactionById(userId);

      set({
        transactions: response?.data || [],
        isLoading: false,
      });
    } catch (error) {
      console.error("Failed to fetch transactions:", error);

      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to load transaction history";

      toast.error(message);

      set({
        error: message,
        isLoading: false,
      });
    }
  },

  clearTransactions: () =>
    set({
      transactions: [],
      error: null,
    }),
}));
