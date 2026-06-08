import API from "./api";

export const transferMoney = async (data) => {
  return await API.post("/transactions/transfer", data);
};

export const getTransaction = async (id) => {
  return await API.get(`/transaction/${id}`);
};

export const getAccountTransactions = async (accountId) => {
  return await API.get(`/api/transactions/history/${accountId}`);
};

export const getTransactionById = async (userId) => {
  return await API.get(`/transactions/${userId}`);
};
