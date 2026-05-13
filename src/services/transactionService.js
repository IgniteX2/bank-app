import API from "./api";

export const transferMoney = async (data) => {
  return await API.post("/transactions/transfer", data);
};

export const getTransactions = async () => {
  return await API.get("/transactions");
};

export const getTransactionById = async (id) => {
  return await API.get(`/transactions/${id}`);
};
