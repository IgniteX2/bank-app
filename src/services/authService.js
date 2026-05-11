import API from "./api";

export const loginUser = async (data) => {
  return await API.post("/auth/login", data);
};

export const registerUser = async (data) => {
  return await API.post("/auth/register", data);
};

export const getBalance = async () => {
  return await API.get("/accounts/balance");
};

export const getUser = async (id) => {
  return await API.get(`users/${id}`);
};

export const getCurrentUser = async () => {
  return await API.get("/me");
};
