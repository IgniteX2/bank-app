// stores/useUIStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUIStore = create(
  persist(
    (set) => ({
      isBalanceVisible: false,

      toggleBalanceVisibility: () =>
        set((state) => ({
          isBalanceVisible: !state.isBalanceVisible,
        })),
    }),
    {
      name: "ui-settings",
    },
  ),
);
