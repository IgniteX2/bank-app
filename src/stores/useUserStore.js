import { create } from "zustand";
import { getUser } from "../services/authService";
import { toast } from "sonner";

export const useUserStore = create((set, get) => ({
  user: null,
  isLoading: false,
  hasFetched: false,

  fetchUser: async (force = false) => {
    const { hasFetched } = get();

    if (hasFetched && !force) {
      console.log("Skipping user fetch");
      return;
    }

    const userId = localStorage.getItem("userId");

    if (!userId) {
      toast.error("User ID not found. Please log in again.");
      return;
    }

    try {
      set({ isLoading: true });

      const response = await getUser(userId);

      if (!response?.data) {
        throw new Error("No user data returned");
      }

      set({
        user: response.data,
        isLoading: false,
        hasFetched: true,
      });
    } catch (error) {
      console.error("Failed to fetch user:", error);

      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to load user information",
      );

      set({
        user: null,
        isLoading: false,
      });
    }
  },

  updateTransactionPin: (pin) =>
    set((state) => ({
      user: state.user
        ? {
            ...state.user,
            transactionPin: pin,
          }
        : null,
    })),

  clearUser: () =>
    set({
      user: null,
      hasFetched: false,
    }),
}));
