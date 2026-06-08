import API from "./api";

export const loginUser = async (data) => {
  return await API.post("/auth/login", data);
};

export const registerUser = async (data) => {
  return await API.post("/auth/signup", data);
};

export const getUserAccount = async (userId) => {
  return await API.get(`/acc/accounts/${userId}`);
};

export const getUser = async (id) => {
  return await API.get(`/api/users/${id}`);
};
