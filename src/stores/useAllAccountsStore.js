import { create } from "zustand";
import { toast } from "sonner";
import { getAllUsersAccount } from "../services/authService";

export const useAllAccountsStore = create((set, get) => ({
  accounts: [],
  isLoadingAll: false,
  error: null,
  hasFetched: false,

  fetchAccounts: async (force = false) => {
    const { hasFetched } = get();

    if (hasFetched && !force) {
      return;
    }

    try {
      set({
        isLoadingAll: true,
        error: null,
      });

      const response = await getAllUsersAccount();

      set({
        accounts: response.data || [],
        isLoadingAll: false,
        error: null,
        hasFetched: true,
      });
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to load accounts";

      toast.error(message);

      set({
        error: message,
        isLoadingAll: false,
      });
    }
  },

  clearAccounts: () =>
    set({
      accounts: [],
      error: null,
      hasFetched: false,
    }),
}));
