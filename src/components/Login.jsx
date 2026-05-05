import { useState } from "react";
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { FaEnvelope } from "react-icons/fa6";
import { GiPadlock } from "react-icons/gi";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const [isViewPassword, setIsViewPassword] = useState(false);

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

  const handleShowPassword = () => {
    setIsViewPassword((prev) => !prev);
  };

  return (
    <div className="flex min-h-screen login flex-col justify-between ">
      <div className="login-header shadow-[0_0_50px_12px_whitesmoke]">
        <div></div>
      </div>
      <div className="form">
        <div className="innerForm">
          <div className="logo">
            <p>⚡</p>
          </div>

          <div className="formTag">
            <h3>Login to your account</h3>
            <p>Enter your details to login.</p>
          </div>

          <form onSubmit={handleSubmit} className="loginForm">
            <div style={{ position: "relative" }}>
              <FaEnvelope className="envelopeIcon" />
              <input
                className="cred"
                type="email"
                name="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div style={{ position: "relative" }}>
              <GiPadlock className="padlockIcon" />
              <input
                className="cred"
                name="password"
                type={isViewPassword ? "text" : "password"}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              <span
                className="togglePass"
                style={{
                  outline: "none",
                  border: "none",
                  cursor: "pointer",
                  backgroundColor: "transparent",
                }}
                onClick={handleShowPassword}
              >
                {isViewPassword ? (
                  <FaEyeSlash className="togPass" />
                ) : (
                  <FaEye className="togPass" />
                )}
              </span>
            </div>

            <div
              style={{
                display: "flex",
                colGap: "10px",
                justifyContent: "space-between",
              }}
            >
              <div>
                <input type="checkbox" className="remMe" />
                <label style={{ marginLeft: "10px", alignSelf: "center" }}>
                  Remember me
                </label>
              </div>

              <div>
                <Link to="../ResetPassword">Forget password? </Link>
              </div>
            </div>

            <button type="submit" className="submitBtn">
              Login
            </button>
          </form>
        </div>
      </div>

      <div className="login-header shadow-[0_0_50px_12px_whitesmoke]">
        <div></div>
      </div>
    </div>
  );
}

export default Login;
