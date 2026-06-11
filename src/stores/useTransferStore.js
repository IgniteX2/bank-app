import { create } from "zustand";
import { toast } from "react-toastify";
import { transferMoney } from "../services/transactionService";

export const useTransferStore = create((set) => ({
  isLoadingTransfer: false,
  error: null,
  transferResponse: null,

  makeTransfer: async (payload) => {
    try {
      set({
        isLoadingTransfer: true,
        error: null,
      });

      const response = await transferMoney(payload);

      set({
        transferResponse: response.data,
        isLoadingTransfer: false,
        error: null,
      });

      toast.success("Transfer successful");

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      const message =
        error?.response?.data?.message || error?.message || "Transfer failed";

      toast.error(message);

      set({
        error: message,
        isLoadingTransfer: false,
      });

      return {
        success: false,
        error: message,
      };
    }
  },

  clearTransferState: () =>
    set({
      error: null,
      transferResponse: null,
      isLoadingTransfer: false,
    }),
}));
