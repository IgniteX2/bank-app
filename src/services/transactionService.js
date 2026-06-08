import axios from "axios";
import API from "./api";

const API_URL = import.meta.env.VITE_API_URL;

export const getToken = () => {
  if (typeof window === "undefined") return null;

  const token = localStorage.getItem("token") || localStorage.getItem("jwt");

  if (token) return token;

  try {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.token || user?.accessToken || user?.jwt || null;
  } catch (err) {
    console.error("Token parse error:", err);
    return null;
  }
};

export const getTransaction = async (id) => {
  return await API.get(`/transaction/${id}`);
};

export const getAccountTransactions = async (accountId) => {
  return await API.get(`/api/transactions/history/${accountId}`);
};

export const getSenderAccount = () => {
  if (typeof window === "undefined") return null;

  // 1. Try explicit sender account first
  const senderAccount = localStorage.getItem("senderAccount");
  if (senderAccount && senderAccount.trim() !== "") {
    return senderAccount;
  }

  // 2. Try account number key
  const accountNumber = localStorage.getItem("accountNumber");
  if (accountNumber && accountNumber.trim() !== "") {
    return accountNumber;
  }

  // 3. Try user object
  try {
    const userStr = localStorage.getItem("user");
    if (!userStr) return null;

    const user = JSON.parse(userStr);

    const resolved =
      user?.accountNumber || user?.account || user?.senderAccount;

    if (resolved && resolved.trim() !== "") {
      return resolved;
    }
  } catch (err) {
    console.error("Account parse error:", err);
  }

  // 4. FINAL fallback (only if NOTHING exists)
  return null;
};

/* -------------------------
   TRANSACTION APIs
-------------------------- */

export const getTransactions = () => {
  return axios.get(`${API_URL}/transactions`);
};

export const getTransactionById = (id) => {
  return axios.get(`${API_URL}/transactions/${id}`);
};

/**
 * Standard internal transfer (your backend)
 */
export const transferMoney = (data) => {
  return axios.post(`${API_URL}/transactions/transfer`, data);
};

/**
 * External transfer (Render / microservice)
 */
export const executeTransfer = (payload) => {
  const token = getToken();

  return axios.post(RENDER_API_URL, payload, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
};
