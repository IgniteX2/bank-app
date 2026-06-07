import { create } from "zustand";
import { toast } from "sonner";
import { getUserAccount } from "../services/authService";
import { getAccountTransactions } from "../services/transactionService";

export const useTransactionHistoryStore = create((set, get) => ({
  transactions: [],
  isLoading: false,
  error: null,
  hasFetched: false,

  fetchTransactions: async (force = false) => {
    const { hasFetched } = get();

    if (hasFetched && !force) {
      console.log("Skipping transaction fetch");
      return;
    }

    const userId = localStorage.getItem("userId");

    if (!userId) {
      toast.error("User not found. Please log in again.");
      return;
    }

    try {
      set({
        isLoading: true,
        error: null,
      });

      const accountResponse = await getUserAccount(userId);
      const account = accountResponse.data;

      if (!account) {
        throw new Error("Account not found");
      }

      const accountId = account.accountID;

      const transactionResponse = await getAccountTransactions(accountId);

      set({
        transactions: transactionResponse.data || [],
        isLoading: false,
        error: null,
        hasFetched: true,
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

  clearTransactions: () =>
    set({
      transactions: [],
      error: null,
      hasFetched: false,
    }),
}));
