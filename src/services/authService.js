import API from "./api";

export const loginUser = async (data) => {
  return await API.post("/auth/login", data);
};

export const registerUser = async (data) => {
  return await API.post("/auth/signup", data);
};

export const getBalance = async () => {
  return await API.get("/accounts/balance");
};

export const getUser = async (id) => {
  return await API.get(`/api/users/${id}`);
};

// export const getUser = (userId) => {
//   return axios.get(
//     `https://schedule-tall-throwback.ngrok-free.dev/api/users/${userId}`,
//     {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//     },
//   );
// };
