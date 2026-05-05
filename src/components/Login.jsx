import { useState } from "react";
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser(form);

      login(res.data.token);

      toast.success("Login successful");
      window.location.href = "/dashboard";
    } catch (err) {
      toast.error("Login failed");
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        name="password"
        type="password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
