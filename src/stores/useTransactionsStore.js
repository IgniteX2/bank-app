import { create } from "zustand";
import { toast } from "sonner";
import { getUserAccount } from "../services/authService";
import { getAccountTransactions } from "../services/transactionService";

export const useTransactionHistoryStore = create((set) => ({
  transactions: [],
  isLoading: false,
  error: null,

  fetchTransactions: async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      toast.error("User not found. Please log in again.");
      return;
    }

    try {
      set({ isLoading: true, error: null });

      // 1. Get account
      const accountResponse = await getUserAccount(userId);
      const account = accountResponse.data;

      if (!account) {
        throw new Error("Account not found");
      }

      // 2. Use accountID
      const accountId = account.accountID;

      // 3. Fetch transactions
      const transactionResponse = await getAccountTransactions(accountId);

      set({
        transactions: transactionResponse.data || [],
        isLoading: false,
      });
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to load transactions";

      toast.error(message);

      set({
        error: message,
        isLoading: false,
      });
    }
  },
}));
