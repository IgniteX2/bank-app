import { create } from "zustand";
import { getUserAccount } from "../services/authService";
import { toast } from "sonner";

export const useAccountStore = create((set, get) => ({
  account: null,
  isLoading: false,
  hasFetched: false,

  fetchAccount: async (force = false) => {
    const { hasFetched } = get();

    if (hasFetched && !force) {
      console.log("Skipping account fetch");
      return;
    }

    const userId = localStorage.getItem("userId");

    if (!userId) {
      toast.error("User not found");
      return;
    }

    try {
      set({ isLoading: true });

      const response = await getUserAccount(userId);

      if (!response?.data) {
        throw new Error("No account data returned");
      }

      set({
        account: response.data,
        isLoading: false,
        hasFetched: true,
      });
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to load account",
      );

      set({
        isLoading: false,
      });
    }
  },

  clearAccount: () =>
    set({
      account: null,
      hasFetched: false,
    }),
}));
