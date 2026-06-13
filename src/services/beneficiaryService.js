import API from "./api";

export const addBeneficiary = async (payload) => {
  return await API.post("/api/bene", payload);
};

export const getBeneficiaries = async () => {
  return await API.get("/api/bene");
};

export const getFavouriteBeneficiaries = async () => {
  return await API.get("/api/bene/favorites");
};

export const addFavouriteBeneficiary = async (id) => {
  return await API.put(`/api/bene/${id}/favorite`);
};
