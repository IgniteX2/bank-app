import { create } from "zustand";
import { registerUser } from "../services/authService";

const useAuthStore = create((set) => ({
    user: null,
    loading: false,
    error: null,

    signup: async (payload) => {
        try {
        set({
            loading: true,
            error: null,
        });

        const data = await registerUser(payload);

        set({
            user: data,
            loading: false,
        });

        return data;
        } catch (error) {
        set({
            loading: false,
            error:
            error?.response?.data?.message ||
            error.message ||
            "Registration failed",
        });

        throw error;
        }
    },
}));

export default useAuthStore;