import API from "./api";

export const getAccountTransactions = async (accountId) => {
  return await API.get(`/api/transactions/history/${accountId}`);
};

export const transferMoney = async (data) => {
  return await API.post(`/api/transfer`, data);
};

export const createPin = async (pin, confirmPin) => {
  return await API.post("/api/pin/create", {
    pin,
    confirmpin: confirmPin,
  });
};
